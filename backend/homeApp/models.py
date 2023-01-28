from django.db import models
from django_resized import ResizedImageField
from django.contrib.auth.models import User

# Create your models here.
class CategoriesModel(models.Model):
    name = models.CharField(max_length=30)
    slug = models.SlugField(unique=True)
    bgColor = models.CharField(max_length=8)
    tintColor = models.CharField(max_length=8)

    def __str__(self):
        return self.name

class LocationModel(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(unique=True)
    
    def __str__(self):
        return self.name

class UserToLocation(models.Model):
    location = models.ForeignKey(LocationModel, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.location) + " - " + str(self.user.username)

class EventModel(models.Model):
    name = models.CharField(max_length=100)
    eventStartDate = models.DateTimeField(auto_now=False, auto_now_add=False)
    eventFinishDate = models.DateTimeField(auto_now=False, auto_now_add=False, null=True, blank=True)
    bannerVerticalImg = ResizedImageField(force_format="WEBP", quality=80, upload_to="EventBannerVerticalImage/")
    bannerHorizontalImg = ResizedImageField(force_format="WEBP", quality=80, upload_to="EventBannerHorizontalImage/")
    localization = models.CharField(max_length=150)
    description = models.TextField()
    isBanner = models.BooleanField(default=False)
    category = models.ForeignKey(CategoriesModel, on_delete=models.CASCADE)
    location = models.ForeignKey(LocationModel, on_delete=models.CASCADE)
    recommended = models.BooleanField(default=False)
    slug = models.SlugField(unique=False)

    def __str__(self):
        return self.name

