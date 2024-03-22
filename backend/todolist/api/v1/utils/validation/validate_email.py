import re

def validate_email(input_str):
    """
    Validate an email address using a regular expression pattern.

    @param input_str (str): The email address to validate.
    """

    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

    is_email_match = re.match(email_pattern, input_str) != None

    return is_email_match
