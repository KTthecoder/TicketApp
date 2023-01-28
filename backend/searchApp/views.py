from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from homeApp.models import *
from homeApp.serializers import *

# Create your views here.
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def SearchScreen(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            response = {
                'EventsRecomended': None,
            }

            eventsRecomended = EventModel.objects.filter(recommended = True)
            if eventsRecomended.exists():
                eventRecomendedSerializer = EventSerializer(eventsRecomended, many = True, context={'user': request.user})
                response['EventsRecomended'] = eventRecomendedSerializer.data
            else:
                eventRecomendedSerializer = None
                response['EventsRecomended'] = eventRecomendedSerializer

            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def FindEventScreen(request, search):
    if request.method == 'GET':
        if request.user.is_authenticated:
            response = {
                'EventsFound': None,
            }

            eventsFound = EventModel.objects.filter(name__contains = search)
            if eventsFound.exists():
                eventFoundSerializer = EventSerializer(eventsFound, many = True, context={'user': request.user})
                response['EventsFound'] = eventFoundSerializer.data
            else:
                eventFoundSerializer = "Event Not Found"
                response['EventsFound'] = eventFoundSerializer

            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)