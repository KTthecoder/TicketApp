from .models import *
from rest_framework import serializers

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriesModel
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField('get_category')

    class Meta:
        model = EventModel
        fields = ['name', 'eventStartDate', 'eventFinishDate', 'bannerVerticalImg', 'bannerHorizontalImg', 'localization', 'description', 'slug', 'isBanner', 'location', 'recommended', 'category']

    def get_category(self, event):
        try:
            category = CategoriesModel.objects.get(id = event.category.id)
            cateogrySerializer = CategorySerializer(category, many = False)
            return cateogrySerializer.data
        except:
            category = None
            return category

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationModel
        fields = '__all__'
        
class UserToLocationSerializer(serializers.ModelSerializer):
    location = serializers.SerializerMethodField('get_location')

    class Meta:
        model = UserToLocation
        fields = ['id', 'location', 'user']

    def get_location(self, profile):
        try:
            location = LocationModel.objects.get(id = profile.location.id)
            locationSerializer = LocationSerializer(location, many = False)
            return locationSerializer.data
        except:
            location = None
            return location