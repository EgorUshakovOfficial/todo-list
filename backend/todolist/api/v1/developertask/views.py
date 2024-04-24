from django.core.exceptions import ObjectDoesNotExist
from rest_framework.serializers import ValidationError
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.v1.developertask.serializers import DeveloperTaskSerializer
from api.v1.models import DeveloperTask, UserStory
from api.v1.constants import HTTP_201_CREATED,  HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND,  HTTP_500_SYSTEM, DEVELOPER_TASK_NOT_FOUND_DATABASE_ERROR_MESSAGE, \
    USER_STORY_NOT_FOUND_DATABASE_ERROR_MESSAGE, SYSTEM_LEVEL_ERROR_MESSAGE, INTEGRITY_ERROR_CODE, SYSTEM_LEVEL_ERROR_CODE
from api.v1.utils.misc import get_error_message, extract_first_error

@api_view(["GET"])
def retrieve_developer_tasks_view(request, user_story_id):
    try:
        developer_tasks_list = DeveloperTask.objects.filter(user_story=user_story_id, user=request.user.id)
        serializer = DeveloperTaskSerializer(developer_tasks_list, many=True)
        return Response(data={ 'tasks': serializer.data })

    except Exception:
        error_obj = get_error_message(HTTP_500_SYSTEM, SYSTEM_LEVEL_ERROR_MESSAGE, SYSTEM_LEVEL_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_500_SYSTEM)

@api_view(["GET"])
def retrieve_developer_task_view(request, user_story_id, developer_task_id):
    try:
        developer_task_instance = DeveloperTask.objects.get(id=developer_task_id, user_story=user_story_id)
        serializer = DeveloperTaskSerializer(developer_task_instance)
        return Response(data=serializer.data)

    except ObjectDoesNotExist:
        error_obj = get_error_message(HTTP_404_NOT_FOUND, DEVELOPER_TASK_NOT_FOUND_DATABASE_ERROR_MESSAGE, INTEGRITY_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_404_NOT_FOUND)

    except Exception:
        error_obj = get_error_message(HTTP_500_SYSTEM, SYSTEM_LEVEL_ERROR_MESSAGE, SYSTEM_LEVEL_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_500_SYSTEM)

@api_view(["POST"])
def edit_developer_task_view(request, user_story_id, developer_task_id):
    try:
        developer_task_instance = DeveloperTask.objects.get(
            user_story=user_story_id,
            id=developer_task_id,
            user=request.user.id
        )
        serializer = DeveloperTaskSerializer(instance=developer_task_instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data)

    except ObjectDoesNotExist:
        error_obj = get_error_message(HTTP_404_NOT_FOUND, DEVELOPER_TASK_NOT_FOUND_DATABASE_ERROR_MESSAGE, INTEGRITY_ERROR_CODE)
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
def create_developer_task_view(request, user_story_id):
    serializer = DeveloperTaskSerializer(data=request.data)

    try:
        serializer.is_valid(raise_exception=True)
        user_story_instance = UserStory.objects.get(id=user_story_id)
        validated_data = serializer.validated_data
        developer_task_instance = DeveloperTask.objects.create(
            **validated_data,
            user=request.user,
            user_story=user_story_instance
        )

        validated_data['id'] = developer_task_instance.id
        return Response(data=validated_data, status=HTTP_201_CREATED)

    except ValidationError:
        errors = serializer.errors
        field_name, error_message = extract_first_error(errors, ['description', 'status'])
        error_message = error_message.replace('This field', field_name)
        error_obj = get_error_message(HTTP_400_BAD_REQUEST, error_message, INTEGRITY_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_400_BAD_REQUEST)

    except ObjectDoesNotExist:
        error_obj = get_error_message(HTTP_404_NOT_FOUND, USER_STORY_NOT_FOUND_DATABASE_ERROR_MESSAGE, INTEGRITY_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_404_NOT_FOUND)

    except Exception:
        error_obj = get_error_message(HTTP_500_SYSTEM, SYSTEM_LEVEL_ERROR_MESSAGE, SYSTEM_LEVEL_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_500_SYSTEM)

@api_view(["POST"])
def delete_developer_task_view(request, user_story_id, developer_task_id):
    try:
        developer_task_instance = DeveloperTask.objects.get(id=developer_task_id, user_story=user_story_id)
        developer_task_instance.delete()
        return Response()

    except ObjectDoesNotExist:
        error_obj = get_error_message(HTTP_404_NOT_FOUND, DEVELOPER_TASK_NOT_FOUND_DATABASE_ERROR_MESSAGE, INTEGRITY_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_404_NOT_FOUND)

    except Exception:
        error_obj = get_error_message(HTTP_500_SYSTEM, SYSTEM_LEVEL_ERROR_MESSAGE, SYSTEM_LEVEL_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_500_SYSTEM)