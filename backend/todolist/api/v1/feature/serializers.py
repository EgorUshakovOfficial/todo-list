from rest_framework import serializers
from api.v1.models import Feature
from api.v1.constants import INITIAL_STATUS, PROCESS_STATUS, COMPLETE_STATUS

class FeatureSerializer(serializers.ModelSerializer):
    status = serializers.CharField(max_length=11)

    def validate_status(self, value):
        if ( value not in [INITIAL_STATUS, PROCESS_STATUS, COMPLETE_STATUS]):
            raise serializers.ValidationError('Status is invalid.')
        return value

    def update(self, instance, validated_data):
        if 'name' in validated_data:
            instance.name = validated_data.get('name')
        if 'description' in validated_data:
            instance.description = validated_data.get('description')
        if 'status' in validated_data:
            instance.status = validated_data.get('status')

        instance.save()
        return instance

    class Meta:
        model = Feature
        fields = [ 'id', 'name', 'description', 'status' ]
        extra_kwargs = {
            'id':{
                'read_only':True
            }
        }