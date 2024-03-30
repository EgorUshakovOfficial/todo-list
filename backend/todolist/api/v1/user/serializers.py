from rest_framework import serializers

class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField()
    name = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def update(self, instance, validated_data):
        if 'email' in validated_data:
            instance.email = validated_data.get('email')
        if 'username' in validated_data:
            instance.username = validated_data.get('username')
        if 'name' in validated_data:
            instance.name = validated_data.get('name')

        instance.save()
        return instance

