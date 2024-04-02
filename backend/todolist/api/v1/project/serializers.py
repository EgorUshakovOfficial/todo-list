from rest_framework import serializers
from api.v1.models import ProjectWorkflow

class ProjectWorkflowSerializer(serializers.ModelSerializer):
    status = serializers.CharField(max_length=100)  # Assuming a maximum length for status

    def validate_status(self, value):
        if value not in ['in-progress', 'completed', 'to-do']:
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
