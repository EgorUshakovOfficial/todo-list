from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.serializers import ValidationError
from api.v1.models import ProjectWorkflow
from api.v1.project.serializers import ProjectWorkflowSerializer
from api.v1.constants import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_500_SYSTEM, INTEGRITY_ERROR_CODE, SYSTEM_LEVEL_ERROR_CODE
from api.v1.utils.misc import extract_first_error, get_error_message

@api_view(["GET"])
def retrieve_project_list_view(request):
    project_workflows = ProjectWorkflow.objects.filter(user=request.user)
    serializer = ProjectWorkflowSerializer(instance=project_workflows, many=True)
    return Response(data={'projects':serializer.data})

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
        error_obj = get_error_message(HTTP_500_SYSTEM, 'Error! Something went wrong', SYSTEM_LEVEL_ERROR_CODE)
        return Response(data=error_obj, status=SYSTEM_LEVEL_ERROR_CODE)