from rest_framework import serializers

class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField()
    name = serializers.CharField()
    password = serializers.CharField(write_only=True)

