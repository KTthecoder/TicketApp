from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from django.contrib.auth.models import User
from accountApp.serializers import *
from profileApp.models import *

# Create your views here.
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def ArtistDetailsScreen(request, slug):
    if request.method == 'GET':
        if request.user.is_authenticated:
            response = {
                'EventsCount' : None,
                'Artist' : None,
                'Events' : None,
            }

            try:
                artist = ArtistsModel.objects.get(slug = slug)
                artistSerializer = ArtistSerializer(artist, many = False, context={'user': request.user})
                response['Artist'] = artistSerializer.data
            except:
                artistSerializer = "Artist Does Not Exists"
                response['Artist'] = artistSerializer

            artist = ArtistsModel.objects.get(slug = slug)
            events = ArtistsOnEventModel.objects.filter(artist = artist)
            eventsCount = events.count()
            response['EventsCount'] = eventsCount
            if events.exists():
                eventsSerializer = ArtistsOnEventSerializer(events, many = True, context={'user': request.user})
                response['Events'] = eventsSerializer.data
            else:
                eventsSerializer = 'Artist Does Not Have Events'
                response['Events'] = eventsSerializer

            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def ProfileScreen(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            response = {
                'Profile' : None,
                'FollowedArtists' : None,
                'FollowedEvents' : None,
            }

            try:
                artist = User.objects.get(id = request.user.id)
                artistSerializer = AccountBigSerializer(artist, many = False, context={'user': request.user})
                response['Profile'] = artistSerializer.data
            except:
                artistSerializer = "Profile Does Not Exists"
                response['Profile'] = artistSerializer

            user = User.objects.get(id = request.user.id)
            followedArtist = FollowedArtistsModel.objects.filter(user = user)
            if followedArtist.exists():
                artistSerializer = FollowedArtistSerializer(followedArtist, many = True, context={'user': request.user})
                response['FollowedArtists'] = artistSerializer.data
            else:
                artistSerializer = "No Followed Artists"
                response['FollowedArtists'] = artistSerializer

            followedEvents= FollowedEventsModel.objects.filter(user = user)
            if followedEvents.exists():
                eventSerializer = FollowedEventSerializer(followedEvents, many = True, context={'user': request.user})
                response['FollowedEvents'] = eventSerializer.data
            else:
                eventSerializer = "No Followed Events"
                response['FollowedEvents'] = eventSerializer

            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def AllFollowedArtists(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            response = {
                'FollowedArtists' : None,
            }

            user = User.objects.get(id = request.user.id)
            followedArtist = FollowedArtistsModel.objects.filter(user = user)
            if followedArtist.exists():
                artistSerializer = FollowedArtistSerializer(followedArtist, many = True, context={'user': request.user})
                response['FollowedArtists'] = artistSerializer.data
            else:
                artistSerializer = "No Followed Artists"
                response['FollowedArtists'] = artistSerializer

            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def AllFollowedEvents(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            response = {
                'FollowedEvents' : None,
            }

            user = User.objects.get(id = request.user.id)
            followedEvents= FollowedEventsModel.objects.filter(user = user)
            if followedEvents.exists():
                eventSerializer = FollowedEventSerializer(followedEvents, many = True, context={'user': request.user})
                response['FollowedEvents'] = eventSerializer.data
            else:
                eventSerializer = "No Followed Events"
                response['FollowedEvents'] = eventSerializer

            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)