from .models import *
from rest_framework import serializers
from homeApp.models import *
from homeApp.serializers import *

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistsModel
        fields = '__all__'

class FollowedArtistSerializer(serializers.ModelSerializer):
    artists = serializers.SerializerMethodField('get_artists')

    class Meta:
        model = FollowedArtistsModel
        fields = ['id', 'user', 'artists']

    def get_artists(self, artist):
        artists = ArtistsModel.objects.filter(id = artist.artists.id)
        artistsSerializer = ArtistSerializer(artists, many = True)
        return artistsSerializer.data

class FollowedEventSerializer(serializers.ModelSerializer):
    events = serializers.SerializerMethodField('get_events')

    class Meta:
        model = FollowedArtistsModel
        fields = ['id', 'user', 'events']

    def get_events(self, event):
        events = EventModel.objects.filter(id = event.events.id)
        eventSerializer = EventSerializer(events, many = True)
        return eventSerializer.data

class ArtistsOnEventSerializer(serializers.ModelSerializer):
    events = serializers.SerializerMethodField('get_events')
    artist = serializers.SerializerMethodField('get_artist')

    class Meta:
        model = ArtistsOnEventModel
        fields = ['id', 'events', 'artist']

    def get_events(self, event):
        events = EventModel.objects.get(id = event.event.id)
        eventSerializer = EventSerializer(events, many = False)
        return eventSerializer.data
    
    def get_artist(self, event):
        events = ArtistsModel.objects.filter(id = event.artist.id)
        eventSerializer = ArtistSerializer(events, many = True)
        return eventSerializer.data