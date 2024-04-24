from rest_framework import serializers
from api.v1.models import DeveloperTask
from api.v1.constants import INITIAL_STATUS, COMPLETE_STATUS

class DeveloperTaskSerializer(serializers.ModelSerializer):
    status = serializers.CharField(max_length=11)

    def validate_status(self, value):
        if (value not in [ INITIAL_STATUS, COMPLETE_STATUS ]):
            raise serializers.ValidationError('Status is invalid.')
        return value

    class Meta:
        model = DeveloperTask
        fields = ['id', 'description', 'status']
        extra_kwargs = {
            'id':{
                'read_only':True
            }
        }

    def update(self, instance, validated_data):
        if 'status' in validated_data:
            instance.status = validated_data.get('status')

        instance.save()
        return instance
