from rest_framework.response import Response
from rest_framework.serializers import ValidationError
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view
from api.v1.models import ProjectWorkflow
from api.v1.project.serializers import ProjectWorkflowSerializer
from api.v1.constants import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_500_SYSTEM, INTEGRITY_ERROR_CODE, \
    SYSTEM_LEVEL_ERROR_CODE, SYSTEM_LEVEL_ERROR_MESSAGE, PROJECT_NOT_FOUND_DATABASE_ERROR_MESSAGE
from api.v1.utils.misc import extract_first_error, get_error_message

@api_view(["GET"])
def retrieve_project_list_view(request):
    project_workflows = ProjectWorkflow.objects.filter(user=request.user)
    serializer = ProjectWorkflowSerializer(instance=project_workflows, many=True)
    return Response(data={'projects':serializer.data})

@api_view(['GET'])
def retrieve_project_view(request, project_id):
    try:
        project_instance = ProjectWorkflow.objects.get(user=request.user.id, id=project_id)
        serializer = ProjectWorkflowSerializer(project_instance)
        return Response(data=serializer.data)

    except ObjectDoesNotExist:
        error_obj = get_error_message(HTTP_404_NOT_FOUND, SYSTEM_LEVEL_ERROR_MESSAGE, INTEGRITY_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_404_NOT_FOUND)

    except Exception:
        error_obj = get_error_message(HTTP_500_SYSTEM, SYSTEM_LEVEL_ERROR_MESSAGE, SYSTEM_LEVEL_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_500_SYSTEM)


@api_view(["GET"])
def delete_project_view(request, project_id):
    try:
        ProjectWorkflow.objects.get(id=project_id, user=request.user).delete()
        return Response()

    except ObjectDoesNotExist:
        error_obj = get_error_message(HTTP_404_NOT_FOUND, PROJECT_NOT_FOUND_DATABASE_ERROR_MESSAGE, INTEGRITY_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_404_NOT_FOUND)

    except Exception:
        error_obj = get_error_message(HTTP_500_SYSTEM, SYSTEM_LEVEL_ERROR_MESSAGE, SYSTEM_LEVEL_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_500_SYSTEM)


@api_view(["POST"])
def create_project_view(request):
    serializer = ProjectWorkflowSerializer(data=request.data)

    try:
        serializer.is_valid(raise_exception=True)

        validated_data = serializer.validated_data
        project_workflow_instance = ProjectWorkflow.objects.create(
            user=request.user,
            title=validated_data['title'],
            description=validated_data['description']
        )

        validated_data['id'] = project_workflow_instance.id
        validated_data['status'] = project_workflow_instance.status

        return Response(data=validated_data, status=HTTP_201_CREATED)

    except ValidationError:
        errors = serializer.errors
        field_name, error_message = extract_first_error(errors, ['title', 'description', 'status'])
        error_message = error_message.replace('This field', field_name)
        error_obj = get_error_message(HTTP_400_BAD_REQUEST, error_message, INTEGRITY_ERROR_CODE)
        return Response(data=error_obj)

    except Exception:
        error_obj = get_error_message(HTTP_500_SYSTEM, SYSTEM_LEVEL_ERROR_MESSAGE, SYSTEM_LEVEL_ERROR_CODE)
        return Response(data=error_obj, status=SYSTEM_LEVEL_ERROR_CODE)

@api_view(["POST"])
def partial_edit_project_view(request, project_id):
    try:
        project_instance = ProjectWorkflow.objects.get(user=request.user.id, id=project_id)
        serializer = ProjectWorkflowSerializer(instance=project_instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data)

    except ValidationError:
        errors = serializer.errors
        field_name, error_message = extract_first_error(errors, ['title', 'description', 'status'])
        error_message = error_message.replace('This field', field_name)
        error_obj = get_error_message(HTTP_400_BAD_REQUEST, error_message, INTEGRITY_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_400_BAD_REQUEST)

    except ObjectDoesNotExist:
        error_obj = get_error_message(HTTP_404_NOT_FOUND, PROJECT_NOT_FOUND_DATABASE_ERROR_MESSAGE, INTEGRITY_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_404_NOT_FOUND)

    except Exception:
        error_obj = get_error_message(HTTP_500_SYSTEM, SYSTEM_LEVEL_ERROR_MESSAGE, SYSTEM_LEVEL_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_500_SYSTEM)