from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User
from homeApp.models import *
from homeApp.serializers import *

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

class AccountBigSerializer(serializers.ModelSerializer):
    location = serializers.SerializerMethodField('get_location')

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'location']
    
    def get_location(self, account):
        userLocation = UserToLocation.objects.get(user = account.id)
        userLocationSerializer = UserToLocationSerializer(userLocation, many = False)
        return userLocationSerializer.data
        

        
