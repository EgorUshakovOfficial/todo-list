from rest_framework_simplejwt.tokens import RefreshToken

def validate_refresh_token(token):
    """
    Verifies refresh token is a valid JWT token
    @param token is the refresh token to validate.
    """
    try:
        refresh_token = RefreshToken(token)
        refresh_token.verify()
        return refresh_token

    except Exception as e:
        return None