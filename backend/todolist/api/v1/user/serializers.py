from rest_framework import serializers
from api.v1.models import User
from api.v1.utils.misc import get_error_message
from api.v1.utils.validation import validate_email
from api.v1.constants import HTTP_400_BAD_REQUEST, MISSING_REQUIRED_FIELD_ERROR_CODE

class UserSerializer(serializers.Serializer):
    email = serializers.EmailField(validators=[], required=False)
    username = serializers.CharField(validators=[], required=False)
    name = serializers.CharField(validators=[], required=False)

    def validate(self, data, **kwargs):
        email = data.get('email', None)
        if not email:
            error = get_error_message(HTTP_400_BAD_REQUEST, 'You must provide an email field.', MISSING_REQUIRED_FIELD_ERROR_CODE)
            raise serializers.ValidationError(error)
        if not validate_email(email):
            error = get_error_message(HTTP_400_BAD_REQUEST, 'Invalid email field.', MISSING_REQUIRED_FIELD_ERROR_CODE)
            raise serializers.ValidationError(error)

        username = data.get('username', None)
        if not username:
            error = get_error_message(HTTP_400_BAD_REQUEST, 'You must provide a username field.', MISSING_REQUIRED_FIELD_ERROR_CODE)
            raise serializers.ValidationError(error)

        name = data.get('name', None)
        if not name:
            error = get_error_message(HTTP_400_BAD_REQUEST, 'You must provide a name field.', MISSING_REQUIRED_FIELD_ERROR_CODE)
            raise serializers.ValidationError(error)

        return data
