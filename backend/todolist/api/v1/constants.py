# Status codes
HTTP_400_BAD_REQUEST=400
HTTP_401_UNAUTHORIZED=401
HTTP_500_SYSTEM=500

# Error machine codes
REFRESH_TOKEN_ERROR_CODE='missing_refresh_token'
INVALID_ACCESS_ERROR_CODE='invalid_access'
INTEGRITY_ERROR_CODE='database_level'
MISSING_REQUIRED_FIELD_ERROR_CODE='missing_required_field'
PASSWORDS_MISMATCH_ERROR_CODE='passwords_mismatch'
SYSTEM_LEVEL_ERROR_CODE='system_level'

AWS_S3_KEY_LENGTH=32
COOKIE_MAX_AGE=3600*7*30
REFRESH_TOKEN_COOKIE_NAME='refresh-token'
REFRESH_TOKEN_COOKIE_OPTIONS={
    'httponly':True,
    'secure':False,
    'samesite':'Strict',
    'path':'/',
    'max_age':COOKIE_MAX_AGE
}