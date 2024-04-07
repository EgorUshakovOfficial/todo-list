from rest_framework import serializers
from api.v1.models import Feature
from api.v1.constants import INITIAL_STATUS, PROCESS_STATUS, COMPLETE_STATUS

class FeatureSerializer(serializers.ModelSerializer):
    status = serializers.CharField(max_length=11)

    def validate_status(self, value):
        if ( value not in [INITIAL_STATUS, PROCESS_STATUS, COMPLETE_STATUS]):
            raise serializers.ValidationError('Status is invalid.')
        return value

    class Meta:
        model = Feature
        fields = [ 'id', 'name', 'description', 'status' ]
        extra_kwargs = {
            'id':{
                'read_only':True
            }
        }