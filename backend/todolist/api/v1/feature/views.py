from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.serializers import ValidationError
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.v1.feature.serializers import FeatureSerializer
from api.v1.models import Feature, ProjectWorkflow
from api.v1.utils.misc import get_error_message, extract_first_error
from api.v1.constants import HTTP_404_NOT_FOUND, HTTP_500_SYSTEM, HTTP_400_BAD_REQUEST,  INTEGRITY_ERROR_CODE, SYSTEM_LEVEL_ERROR_CODE, \
    SYSTEM_LEVEL_ERROR_MESSAGE, PROJECT_NOT_FOUND_DATABASE_ERROR_MESSAGE

@api_view(["POST"])
def create_feature_view(request, project_id):
    serializer = FeatureSerializer(data=request.data)

    try:
        serializer.is_valid(raise_exception=True)

        validated_data = serializer.validated_data
        project_instance = ProjectWorkflow.objects.get(id=project_id)
        feature_instance = Feature.objects.create(
            **validated_data,
            project=project_instance,
            user=request.user
        )

        validated_data['id'] = feature_instance.id
        return Response(data=validated_data)

    except IntegrityError as ie:
        error_message = ie.__cause__
        error_obj = get_error_message(HTTP_400_BAD_REQUEST, error_message, INTEGRITY_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_400_BAD_REQUEST)

    except ValidationError:
        errors = serializer.errors
        field_name, error_message = extract_first_error(errors, ['name', 'description', 'status'])
        error_message = error_message.replace('This field', field_name)
        error_obj = get_error_message(HTTP_400_BAD_REQUEST, error_message, INTEGRITY_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_400_BAD_REQUEST)

    except ObjectDoesNotExist:
        error_obj = get_error_message(HTTP_404_NOT_FOUND, PROJECT_NOT_FOUND_DATABASE_ERROR_MESSAGE, INTEGRITY_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_404_NOT_FOUND)

    except Exception as e:
        print(e)
        error_obj = get_error_message(HTTP_500_SYSTEM, SYSTEM_LEVEL_ERROR_MESSAGE, SYSTEM_LEVEL_ERROR_MESSAGE)
        return Response(data=error_obj, status=HTTP_500_SYSTEM)

@api_view(['GET'])
def retrieve_features_view(request, project_id):
    try:
        feature_instances = Feature.objects.filter(user=request.user.id, project=project_id)
        serializer = FeatureSerializer(feature_instances, many=True)
        return Response(data={ 'features':serializer.data })
    except Exception:
        error_obj = get_error_message(HTTP_500_SYSTEM, SYSTEM_LEVEL_ERROR_MESSAGE, SYSTEM_LEVEL_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_500_SYSTEM)
