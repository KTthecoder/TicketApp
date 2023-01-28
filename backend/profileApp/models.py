from django.db import models
from django_resized import ResizedImageField
from django.contrib.auth.models import User
from homeApp.models import *

# Create your models here.
class ArtistsModel(models.Model):
    profileImage = ResizedImageField(force_format="WEBP", quality=80, upload_to="ArtistProfileImg/")
    name = models.CharField(max_length=80)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    instagram = models.URLField(max_length=300)
    spotify = models.URLField(max_length=300)
    facebook = models.URLField(max_length=300)

    def __str__(self):
        return self.name

class FollowedArtistsModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artists = models.ForeignKey(ArtistsModel, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.first_name + " " + self.user.last_name + " - " + self.artists.name

class FollowedEventsModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    events = models.ForeignKey(EventModel, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.first_name + " " + self.user.last_name + " - " + self.events.name


class ArtistsOnEventModel(models.Model):
    event = models.ForeignKey(EventModel, on_delete=models.CASCADE)
    artist = models.ForeignKey(ArtistsModel, on_delete=models.CASCADE)

    def __str__(self):
        return self.event.name + " - " + self.artist.name