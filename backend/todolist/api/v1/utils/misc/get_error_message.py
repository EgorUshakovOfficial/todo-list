def get_error_message(status, message, error_code):
    """
    Generate a standardized error message for API responses.

    Parameters:
    - status (int): HTTP status code indicating the nature of the error.
    - message (str): A human-readable description of the error.
    - error_code (str): An identifier or code for programmatic handling of the error.

    Returns:
    dict: A JSON-like dictionary representing the error message with status, message, and error_code.
    """
    return {
        'error': {
            'status': status,
            'message': message,
            'error_code': error_code,
        }
    }
