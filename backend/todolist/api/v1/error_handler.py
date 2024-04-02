from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import AuthenticationFailed, InvalidToken
from api.v1.utils.misc import get_error_message
from api.v1.constants import HTTP_401_UNAUTHORIZED, INVALID_ACCESS_ERROR_CODE

IGNORED_ERRORS = [
    'Method "GET" not allowed.',
    'Method "HEAD" not allowed.',
    'Method "PUT" not allowed.',
    'Method "POST" not allowed.',
    'Method "DELETE" not allowed.',
]

def auth_required_handler(exc, context):
    if isinstance(exc, InvalidToken) or isinstance(exc, AuthenticationFailed):
        error_obj = get_error_message(HTTP_401_UNAUTHORIZED, 'Unauthorized access', INVALID_ACCESS_ERROR_CODE)
        return Response(data=error_obj, status=HTTP_401_UNAUTHORIZED)

    return exception_handler(exc, context)