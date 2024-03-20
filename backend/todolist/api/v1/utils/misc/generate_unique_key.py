import string
import secrets
from api.v1.constants import AWS_S3_KEY_LENGTH

def generate_unique_key(filename):
    """
    Generates a unique key for AWS S3 using a random string of characters and the file extension.
    @param filename is the name of the file including its extension.
    """
    # Generates 32 bit string of random characters
    random_chars = string.ascii_letters + string.digits  + "@#$"
    random_str = ''.join(secrets.choice(random_chars) for _ in range(AWS_S3_KEY_LENGTH))

    # Extracts the file extension from the name of the file
    file_extension = filename.split('.')[1]

    # Concatenates the random string of characters with the file extension together to form the key
    key = f'{random_str}.{file_extension}'

    return key