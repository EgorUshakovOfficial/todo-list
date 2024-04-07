from rest_framework import serializers
from api.v1.models import ProjectWorkflow
from api.v1.constants import PROCESS_STATUS, COMPLETE_STATUS

class ProjectWorkflowSerializer(serializers.ModelSerializer):
    status = serializers.CharField(max_length=11)

    def validate_status(self, value):
        if value not in [PROCESS_STATUS, COMPLETE_STATUS]:
            raise serializers.ValidationError("Invalid status value.")
        return value

    class Meta:
        model = ProjectWorkflow
        fields = ['id', 'title', 'description', 'status']
        extra_kwargs = {
            'id': {
                'read_only': True
            }
        }

    def update(self, instance, validated_data):
        if 'title' in validated_data:
            instance.title = validated_data.get('title')
        if 'description' in validated_data:
            instance.description = validated_data.get('description')
        if 'status' in validated_data:
            instance.status = validated_data.get('status')

        instance.save()
        return instance