def extract_first_error(errors, fields):
    """
    Extracts the first error message for specified fields from a validation errors dictionary.
    @param errors is a dictionary containing validation error messages. Each key represents a field name, and the corresponding value is a list of error messages for that field.
    @param fields is a list of field names to check for errors.
    """
    for field in fields:
        if field in errors:
            return field, errors[field][0]
    return None