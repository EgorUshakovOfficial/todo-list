from rest_framework_simplejwt.authentication import JWTAuthentication as BaseJWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from api.v1.utils.validation import validate_refresh_token
from api.v1.constants import REFRESH_TOKEN_COOKIE_NAME

class JWTAuthentication(BaseJWTAuthentication):
    def authenticate(self, request):
        # Extract the refresh token from the HTTP-only cookie
        refresh_token = request.COOKIES.get(REFRESH_TOKEN_COOKIE_NAME, '')

        # Validate refresh token and ensure it is always sent with the access token
        validated_refresh_token = validate_refresh_token(refresh_token)
        if not validated_refresh_token:
            raise InvalidToken('Invalid refresh token.')

        # Ensure request header exists
        header = self.get_header(request)
        if header is None:
            return None

        # Extract access token from the Authorization header
        raw_token = self.get_raw_token(header)
        if raw_token is None:
            return None

        # Validate access token against the user object
        validated_token = self.get_validated_token(raw_token)


        return self.get_user(validated_token), validated_token
