from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from profileApp.models import *
from profileApp.serializers import *
from TicketsApp.models import *
from TicketsApp.serializers import *

# Create your views here.
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def HomeScreen(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            response = {
                'EventsHorizontal': None,
                'Categories': None,
                'RecommendedEvents' : None,
                'EventsLocation' : None,
                'EventsFestivals': None,
            }

            # Horizontal Events
            eventsHorizontal = EventModel.objects.filter(isBanner = True)
            if eventsHorizontal.exists():
                eventHorizontalSerializer = EventSerializer(eventsHorizontal, many = True, context={'user': request.user})
                response['EventsHorizontal'] = eventHorizontalSerializer.data
            else:
                eventHorizontalSerializer = None
                response['EventsHorizontal'] = eventHorizontalSerializer

            # All Categories
            cateogries = CategoriesModel.objects.all()
            if cateogries.exists():
                cateogriesSerializer = CategorySerializer(cateogries, many = True, context={'user': request.user})
                response['Categories'] = cateogriesSerializer.data
            else:
                cateogriesSerializer = None
                response['Categories'] = cateogriesSerializer

            # Recommended Events
            eventsRecommended = EventModel.objects.filter(recommended = True)
            if eventsRecommended.exists():
                eventRecommendedSerializer = EventSerializer(eventsRecommended, many = True, context={'user': request.user})
                response['RecommendedEvents'] = eventRecommendedSerializer.data
            else:
                eventRecommendedSerializer = None
                response['RecommendedEvents'] = eventRecommendedSerializer

            # In your location 
            userLocation = UserToLocation.objects.get(user = request.user)
            locationEvents = EventModel.objects.filter(location = userLocation.location.id)
            if locationEvents.exists():
                eventLocationSerializer = EventSerializer(locationEvents, many = True, context={'user': request.user})
                response['EventsLocation'] = eventLocationSerializer.data
            else:
                eventLocationSerializer = None
                response['EventsLocation'] = eventLocationSerializer

            # Recommended Events
            eventsFestivals = EventModel.objects.filter(category = 1)
            if eventsFestivals.exists():
                eventFestivalsSerializer = EventSerializer(eventsFestivals, many = True, context={'user': request.user})
                response['EventsFestivals'] = eventFestivalsSerializer.data
            else:
                eventFestivalsSerializer = None
                response['EventsFestivals'] = eventFestivalsSerializer

            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

# Event Details Screen
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def EventDetailsScreen(request, slug):
    if request.method == 'GET':
        if request.user.is_authenticated:
            response = {
                'Event' : None,
                'ArtistsOnEvent' : None,
                'Tickets' : None,
            }

            try:
                eventDetails = EventModel.objects.get(slug = slug)
                eventDetailsSerializer = EventSerializer(eventDetails, many = False, context={'user': request.user})
                response['Event'] = eventDetailsSerializer.data
            except:
                eventDetailsSerializer = "Event Does Not Exists"
                response['Event'] = eventDetailsSerializer

            event = EventModel.objects.get(slug = slug)
            artists = ArtistsOnEventModel.objects.filter(event = event)
            if artists.exists():
                artistsSerializer = ArtistsOnEventSerializer(artists, many = True, context={'user': request.user})
                response['ArtistsOnEvent'] = artistsSerializer.data
            else:
                artistsSerializer = "No Artists In This Event"
                response['ArtistsOnEvent'] = artistsSerializer

            event = EventModel.objects.get(slug = slug)
            tickets = TicketModel.objects.filter(event = event.id)
            if tickets.exists():
                ticketsSerializer = TicketsSerializer(tickets, many = True, context={'user': request.user})
                response['Tickets'] = ticketsSerializer.data
            else:
                ticketsSerializer = "No Tickets Available"
                response['Tickets'] = ticketsSerializer

            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

# Event Details Screen
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def EventByCategory(request, slug):
    if request.method == 'GET':
        if request.user.is_authenticated:
            response = {
                'Event' : None,
                'Category' : None,
            }

            category = None

            try:
                category = CategoriesModel.objects.get(slug = slug)
                categorySerializer = CategorySerializer(category, many = False, context={'user': request.user})
                response['Category'] = categorySerializer.data
            except:
                categorySerializer = None
                response['Category'] = categorySerializer

            event = EventModel.objects.filter(category = category)
            if event.exists():
                eventSerializer = EventSerializer(event, many = True, context={'user': request.user})
                response['Event'] = eventSerializer.data
            else:
                eventSerializer = "Event Does Not Exists"
                response['Event'] = eventSerializer

            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def AllRecomendedEvents(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            response = {
                'RecommendedEvents' : None,
            }

            # Recommended Events
            eventsRecommended = EventModel.objects.filter(recommended = True)
            if eventsRecommended.exists():
                eventRecommendedSerializer = EventSerializer(eventsRecommended, many = True, context={'user': request.user})
                response['RecommendedEvents'] = eventRecommendedSerializer.data
            else:
                eventRecommendedSerializer = None
                response['RecommendedEvents'] = eventRecommendedSerializer

            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def AllLocationEventsScreen(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            response = {
                'EventsLocation' : None,
            }

            # In your location 
            userLocation = UserToLocation.objects.get(user = request.user)
            locationEvents = EventModel.objects.filter(location = userLocation.location.id)
            if locationEvents.exists():
                eventLocationSerializer = EventSerializer(locationEvents, many = True, context={'user': request.user})
                response['EventsLocation'] = eventLocationSerializer.data
            else:
                eventLocationSerializer = None
                response['EventsLocation'] = eventLocationSerializer

            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
