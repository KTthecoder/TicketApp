from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(CategoriesModel)
admin.site.register(EventModel)
admin.site.register(LocationModel)
admin.site.register(UserToLocation)