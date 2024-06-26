from django.contrib.auth import authenticate
from django.conf import settings
from django.db import IntegrityError
from rest_framework.serializers import ValidationError
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from api.v1.utils.validation import validate_refresh_token
from api.v1.utils.users import get_tokens_for_user
from api.v1.utils.misc import get_error_message, generate_unique_key, upload_profile_image_to_s3, extract_first_error
from api.v1.user.serializers import UserSerializer
from api.v1.models import User
from api.v1.constants import MISSING_REQUIRED_FIELD_ERROR_CODE, INVALID_ACCESS_ERROR_CODE, SYSTEM_LEVEL_ERROR_CODE, REFRESH_TOKEN_ERROR_CODE, INTEGRITY_ERROR_CODE, \
     REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_OPTIONS, SYSTEM_LEVEL_ERROR_MESSAGE,  HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND, HTTP_500_SYSTEM

@api_view(['POST'])
@authentication_classes([])
def login_view(request):
    data = request.data
    email = data.get('email', None)
    password = data.get('password', None)

    if not email:
        error_obj = get_error_message(HTTP_400_BAD_REQUEST, 'You must provide an email field.', MISSING_REQUIRED_FIELD_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_400_BAD_REQUEST)

    if not password:
        error_obj = get_error_message(HTTP_400_BAD_REQUEST, 'You must provide a password field.', MISSING_REQUIRED_FIELD_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_400_BAD_REQUEST)

    user = authenticate(request, email=email, password=password)
    if not user:
        error_obj = get_error_message(HTTP_401_UNAUTHORIZED, 'Email or password is incorrect.', INVALID_ACCESS_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_401_UNAUTHORIZED)

    # Generates access and refresh JWT tokens from the user object
    tokens = get_tokens_for_user(user)
    access_token = tokens['access']
    response = Response({'access':access_token})

    # Sets refresh token as a HTTP only cookie
    refresh_token = tokens['refresh']
    response.set_cookie(
        REFRESH_TOKEN_COOKIE_NAME,
        refresh_token,
        **REFRESH_TOKEN_COOKIE_OPTIONS
    )

    return response

@api_view(['POST'])
@authentication_classes([])
def register_user_view(request):
    serializer = UserSerializer(data=request.data)

    try:
        # Validates email, username, and name in the body of the request
        serializer.is_valid(raise_exception=True)

        # Creates new user in the database
        validated_data = serializer.validated_data
        user_instance = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            name=validated_data['name'],
            password=validated_data['password'],
            profile_image_url=''
        )

        # Generates access and refresh tokens
        tokens = get_tokens_for_user(user_instance)
        access_token = tokens['access']
        response = Response({'access':access_token})

        # Sets refresh token as a HTTP only cookie
        refresh_token = tokens['refresh']
        response.set_cookie(
            REFRESH_TOKEN_COOKIE_NAME,
            refresh_token,
            **REFRESH_TOKEN_COOKIE_OPTIONS
        )

        return response

    except IntegrityError:
        error_obj = get_error_message(HTTP_400_BAD_REQUEST, 'Email is already in use.', INTEGRITY_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_400_BAD_REQUEST)

    except ValidationError:
        errors = serializer.errors
        field_name, error_message = extract_first_error(errors, ['email', 'username', 'name', 'password'])
        error_message = error_message.replace('This field', field_name)
        error_obj = get_error_message(HTTP_400_BAD_REQUEST, error_message, INTEGRITY_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_404_NOT_FOUND)

    except Exception as e:
        print(e)
        error_obj = get_error_message(HTTP_500_SYSTEM, SYSTEM_LEVEL_ERROR_MESSAGE, SYSTEM_LEVEL_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_500_SYSTEM)

@api_view(['GET'])
def retrieve_user_view(request):
    serializer = UserSerializer(request.user)
    return Response(data=serializer.data)

@api_view(['GET'])
@authentication_classes([])
def refresh_access_token_view(request):
    refresh_token = request.COOKIES.get(REFRESH_TOKEN_COOKIE_NAME, '')
    refresh_token = validate_refresh_token(refresh_token)
    if not refresh_token:
        error_obj = get_error_message(HTTP_400_BAD_REQUEST, 'Refresh token is missing or invalid.', REFRESH_TOKEN_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_400_BAD_REQUEST)

    data = {'access':str(refresh_token.access_token)}
    return Response(data=data)

@api_view(['GET'])
@authentication_classes([])
def logout_view(request):
    response = Response()
    response.delete_cookie(REFRESH_TOKEN_COOKIE_NAME)
    return response

@api_view(["POST"])
def delete_user_view(request):
    # Deletes user from the database
    user = request.user
    user.delete()

    # Removes HTTP cookie from the browser
    response = Response()
    response.delete_cookie(REFRESH_TOKEN_COOKIE_NAME)

    return response

@api_view(['POST'])
def partial_user_edit_view(request):
    serializer = UserSerializer(instance=request.user, data=request.data, partial=True)

    try:
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response()

    except IntegrityError:
        error_obj = get_error_message(HTTP_400_BAD_REQUEST, 'Email is already in use!', INTEGRITY_ERROR_CODE)
        return Response(data=error_obj)

    except ValidationError:
        errors = serializer.errors
        field_name, error_message = extract_first_error(errors, ['email'])
        error_message = error_message.replace('This field', field_name)
        error_obj = get_error_message(HTTP_400_BAD_REQUEST, error_message, INTEGRITY_ERROR_CODE)
        return Response(data=error_obj)

    except Exception as e:
        error_obj = get_error_message(HTTP_500_SYSTEM, SYSTEM_LEVEL_ERROR_MESSAGE, SYSTEM_LEVEL_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_500_SYSTEM)



