from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.serializers import ValidationError
from api.v1.userstory.serializers import UserStorySerializer
from api.v1.models import Feature, UserStory
from api.v1.constants import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_500_SYSTEM, SYSTEM_LEVEL_ERROR_CODE, INTEGRITY_ERROR_CODE, \
    SYSTEM_LEVEL_ERROR_MESSAGE, FEATURE_NOT_FOUND_DATABASE_ERROR_MESSAGE, USER_STORY_NOT_FOUND_DATABASE_ERROR_MESSAGE
from api.v1.utils.misc import extract_first_error, get_error_message

@api_view(["GET"])
def retrieve_user_stories_view(request, feature_id):
    try:
        user_story_list = UserStory.objects.filter(feature=feature_id, user=request.user.id)
        serializer = UserStorySerializer(instance=user_story_list, many=True)
        return Response(data={ 'stories': serializer.data })

    except Exception:
        error_obj = get_error_message(HTTP_500_SYSTEM, SYSTEM_LEVEL_ERROR_MESSAGE, SYSTEM_LEVEL_ERROR_CODE)
        return Response(data=error_obj)

@api_view(["GET"])
def retrieve_user_story_view(request, feature_id, user_story_id):
    try:
        user_story_instance = UserStory.objects.get(id=user_story_id, feature=feature_id)
        serializer = UserStorySerializer(instance=user_story_instance)
        return Response(data=serializer.validated_data)

    except ObjectDoesNotExist:
        error_obj = get_error_message(HTTP_404_NOT_FOUND, USER_STORY_NOT_FOUND_DATABASE_ERROR_MESSAGE, INTEGRITY_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_404_NOT_FOUND)

    except Exception:
        error_obj = get_error_message(HTTP_500_SYSTEM, SYSTEM_LEVEL_ERROR_MESSAGE, SYSTEM_LEVEL_ERROR_CODE)
        return Response(data=error_obj)

@api_view(["POST"])
def partial_edit_user_story_view(request, feature_id, user_story_id):
    try:
        user_story_instance = UserStory.objects.get(
            id=user_story_id,
            feature=feature_id,
            user=request.user.id
        )
        serializer = UserStorySerializer(instance=user_story_instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data)

    except ObjectDoesNotExist:
        error_obj = get_error_message(HTTP_404_NOT_FOUND, USER_STORY_NOT_FOUND_DATABASE_ERROR_MESSAGE, INTEGRITY_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_404_NOT_FOUND)

    except ValidationError:
        errors = serializer.errors
        field_name, error_message = extract_first_error(errors, ['description', 'status'])
        error_message = error_message.replace('This field', field_name)
        error_obj = get_error_message(HTTP_400_BAD_REQUEST, error_message, INTEGRITY_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_400_BAD_REQUEST)

    except Exception:
        error_obj = get_error_message(HTTP_500_SYSTEM, SYSTEM_LEVEL_ERROR_MESSAGE, SYSTEM_LEVEL_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_500_SYSTEM)

@api_view(["POST"])
def delete_user_story_view(request, feature_id, user_story_id):
    try:
        user_story_instance = UserStory.objects.get(id=user_story_id, feature=feature_id)
        user_story_instance.delete()
        return Response()

    except ObjectDoesNotExist:
        error_obj = get_error_message(HTTP_404_NOT_FOUND, USER_STORY_NOT_FOUND_DATABASE_ERROR_MESSAGE, INTEGRITY_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_404_NOT_FOUND)

    except Exception:
        error_obj = get_error_message(HTTP_500_SYSTEM, SYSTEM_LEVEL_ERROR_MESSAGE, SYSTEM_LEVEL_ERROR_CODE)
        return Response(data=error_obj)

@api_view(["POST"])
def create_user_story_view(request, feature_id):
    serializer = UserStorySerializer(data=request.data)

    try:
        serializer.is_valid(raise_exception=True)
        feature_instance = Feature.objects.get(id=feature_id)
        validated_data = serializer.validated_data
        user_story_instance = UserStory.objects.create(
            **validated_data,
            user=request.user,
            feature=feature_instance
        )
        validated_data['id'] = user_story_instance.id
        return Response(data=validated_data)

    except ValidationError:
        errors = serializer.errors
        field_name, error_message = extract_first_error(errors, ['name', 'description', 'status'])
        error_message = error_message.replace('This field', field_name)
        error_obj = get_error_message(HTTP_400_BAD_REQUEST, error_message, INTEGRITY_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_400_BAD_REQUEST)

    except ObjectDoesNotExist:
        error_obj = get_error_message(HTTP_404_NOT_FOUND, FEATURE_NOT_FOUND_DATABASE_ERROR_MESSAGE, INTEGRITY_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_404_NOT_FOUND)

    except Exception as err:
        print(err)
        error_obj = get_error_message(HTTP_500_SYSTEM, SYSTEM_LEVEL_ERROR_MESSAGE, SYSTEM_LEVEL_ERROR_CODE)
        return Response(status=HTTP_500_SYSTEM)
