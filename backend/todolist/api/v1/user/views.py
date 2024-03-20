from django.contrib.auth import authenticate
from django.conf import settings
from django.db import IntegrityError
from rest_framework.serializers import ValidationError
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from api.v1.utils.validation import validate_refresh_token
from api.v1.utils.users import get_tokens_for_user
from api.v1.utils.misc import get_error_message, generate_unique_key, upload_profile_image_to_s3
from api.v1.user.serializers import UserSerializer
from api.v1.models import User
from api.v1.constants import MISSING_REQUIRED_FIELD_ERROR_CODE, EMAIL_ALREADY_EXISTS_ERROR_CODE, INVALID_ACCESS_ERROR_CODE, SYSTEM_LEVEL_ERROR_CODE, REFRESH_TOKEN_ERROR_CODE, \
    PASSWORDS_MISMATCH_ERROR_CODE, REFRESH_TOKEN_COOKIE_NAME, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_500_SYSTEM

@api_view(['POST'])
@authentication_classes([])
def login_view(request):
    data = request.data
    email = data.get('email', None)
    password = data.get('password', None)

    if not email:
        error = get_error_message(HTTP_400_BAD_REQUEST, 'You must provide an email field.', MISSING_REQUIRED_FIELD_ERROR_CODE)
        return Response(data=error, status=HTTP_400_BAD_REQUEST)

    if not password:
        error = get_error_message(HTTP_400_BAD_REQUEST, 'You must provide a password field.', MISSING_REQUIRED_FIELD_ERROR_CODE)
        return Response(data=error, status=HTTP_400_BAD_REQUEST)

    user = authenticate(request, email=email, password=password)
    if not user:
        error = get_error_message(HTTP_401_UNAUTHORIZED, 'Email or password is incorrect.', INVALID_ACCESS_ERROR_CODE)
        return Response(data=error, status=HTTP_401_UNAUTHORIZED)

    # Generates access and refresh JWT tokens from the user object
    tokens = get_tokens_for_user(user)
    access_token = tokens['access']
    response = Response({'access':access_token})

    # Sets refresh token as a HTTP only cookie
    refresh_token = tokens['refresh']
    response.set_cookie(refresh_token, httponly=True)

    return response

@api_view(['POST'])
@authentication_classes([])
def register_user_view(request):
    data = request.data
    password = data.get('password', None)
    if not password:
        error = get_error_message(HTTP_400_BAD_REQUEST, 'You must provide a password field.', MISSING_REQUIRED_FIELD_ERROR_CODE)
        return Response(data=error, status=HTTP_400_BAD_REQUEST)

    confirm_password = data.get('confirmPassword', None)
    if not confirm_password:
        error = get_error_message(HTTP_400_BAD_REQUEST, 'You must provide a confirm password field.', MISSING_REQUIRED_FIELD_ERROR_CODE)
        return Response(data=error, status=HTTP_400_BAD_REQUEST)

    # Verify password and confirm-password are the same
    if password != confirm_password:
        error = get_error_message(HTTP_400_BAD_REQUEST, 'Password and confirm password must match.', PASSWORDS_MISMATCH_ERROR_CODE)
        return Response(data=error, status=HTTP_400_BAD_REQUEST)

    try:
        # Validates email, username, and name in the body of the request
        serializer = UserSerializer(data=data)

        if serializer.is_valid(raise_exception=True):
            profile_image = data.get('profileImage', None)
            profile_image_url = ''

            # If a profile image is uploaded, save it to the AWS S3 bucket
            if profile_image:
                filename = profile_image.name
                key = generate_unique_key(filename)
                is_upload_success = upload_profile_image_to_s3(profile_image, key)

                # If the upload to the S3 bucket is successful, update the profile image url
                if is_upload_success:
                    profile_image_url = f'https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/profile-images/{key}'

            # Creates new user in the database
            validated_data = serializer.validated_data
            user_instance = User.objects.create_user(
                email=validated_data['email'],
                username=validated_data['username'],
                name=validated_data['name'],
                password=password,
                profile_image_url=profile_image_url
            )

            # Generates access and refresh tokens
            tokens = get_tokens_for_user(user_instance)
            access_token = tokens['access']
            response = Response({'access':access_token})

            # Sets refresh token as a HTTP only cookie
            refresh_token = tokens['refresh']
            response.set_cookie(REFRESH_TOKEN_COOKIE_NAME, refresh_token, httponly=True)

            return response

    except IntegrityError:
        error = get_error_message(HTTP_400_BAD_REQUEST, 'Email is already in use.', EMAIL_ALREADY_EXISTS_ERROR_CODE)
        return Response(data=error, status=HTTP_400_BAD_REQUEST)

    except ValidationError:
        error_obj = serializer.errors
        status = error_obj['error']['status']
        return Response(data=error_obj, status=status)

    except Exception:
        error_obj = get_error_message(HTTP_500_SYSTEM, 'Error! Something went wrong', SYSTEM_LEVEL_ERROR_CODE)
        return Response(data=error_obj, status=SYSTEM_LEVEL_ERROR_CODE)

@api_view(['GET'])
def retrieve_user_view(request):
    serializer = UserSerializer(request.user)
    return Response(data=serializer.data)

@api_view(['GET'])
@authentication_classes([])
def refresh_access_token_view(request):
    refresh_token = request.COOKIES.get(REFRESH_TOKEN_COOKIE_NAME, None)
    refresh_token = validate_refresh_token(refresh_token)
    if not refresh_token:
        error_obj = get_error_message(HTTP_400_BAD_REQUEST, 'Refresh token is missing or invalid.', REFRESH_TOKEN_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_400_BAD_REQUEST)

    data = {'access':str(refresh_token.access_token)}
    return Response(data=data)


