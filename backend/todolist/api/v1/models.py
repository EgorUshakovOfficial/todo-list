import uuid
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.db import models
from api.v1.constants import INITIAL_STATUS, PROCESS_STATUS, COMPLETE_STATUS

class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **kwargs):

        if not email:
            raise ValueError('The email field must be set.')

        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **kwargs):
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_superuser', True)

        if kwargs.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff set to True')

        if kwargs.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser set to True')

        return self.create_user(email, password, **kwargs)

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    name= models.CharField(max_length=60)
    profile_image_url = models.CharField(max_length=50, null=True, blank='')
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'

    objects = UserManager()


class ProjectWorkflow(models.Model):
    PROJECT_STATUSES = [
        ('In process', PROCESS_STATUS),
        ('Complete', COMPLETE_STATUS)
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=11, default=PROCESS_STATUS, choices=PROJECT_STATUSES)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

class Feature(models.Model):
    FEATURE_STATUSES = [
        ('To do', INITIAL_STATUS),
        ('In process', PROCESS_STATUS),
        ('Complete', COMPLETE_STATUS)
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=11, default=INITIAL_STATUS, choices=FEATURE_STATUSES)
    project = models.ForeignKey(ProjectWorkflow, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

class UserStory(models.Model):
    USER_STORY_STATUSES = [
        ('To do', INITIAL_STATUS),
        ('In process', PROCESS_STATUS),
        ('Complete', COMPLETE_STATUS)
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description = models.TextField()
    status = models.CharField(max_length=11, default=INITIAL_STATUS, choices=USER_STORY_STATUSES)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    feature = models.ForeignKey(Feature, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

class DeveloperTask(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description = models.TextField()
    user_story = models.ForeignKey(UserStory, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)



