from django.conf import settings
from api.v1.lib import s3

def upload_profile_image_to_s3(image, key):
    try:
        print('Uploading profile image to the AWS S3 bucket...')
        file_path = f'profile-images/{key}'
        s3.upload_fileobj(image, settings.AWS_STORAGE_BUCKET_NAME, file_path)
        print('Successfully uploaded the image to the S3 bucket!')
        return True

    except Exception as e:
        print(f'Error: {e}')
        ('Failed to upload the image to the S3 bucket.')
        return False
