from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(ArtistsModel)
admin.site.register(FollowedArtistsModel)
admin.site.register(FollowedEventsModel)
admin.site.register(ArtistsOnEventModel)