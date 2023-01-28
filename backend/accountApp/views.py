from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# Create your views here.
@api_view(['POST'])
def RegisterPage(request):
    if request.method == "POST":
        account = AccountSerializer(data = request.data, context={'user': request.user})
        if account.is_valid():
            data = {}
            username = account.data["username"]
            password = account.data["password"]
            email = account.data["email"]

            user = User.objects.create_user(username, email, password)
            user.save()
            data = {'Response' : 'User created Succesfully'}
            return Response(data)
        else:
            data = {'Response' : 'Username or email is already taken!'} 
            return Response(data)
    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def GetUserinfo(request):
    if request.method == "GET":
        response = {
            'User' : None,
        }

        try:
            user = User.objects.get(id = request.user.id)
            userSerializer = AccountBigSerializer(user, many = False, context={'user': request.user})
            response['User'] = userSerializer.data
        except:
            userSerializer = 'User Does Not Exists'
            response['User'] = userSerializer
        return Response(response, status=status.HTTP_200_OK)
    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def PostUserinfo(request):
    if request.method == "POST":
        user = User.objects.get(id = request.user.id)
        print(user)
        userInfo = AccountBigSerializer(data = request.data, instance=user)
        if userInfo.is_valid():
            userInfo.save()
            data = {'Response' : 'User Info Edited Succesfully'}
            return Response(data)
        else:
            data = {'Response' : 'Username or email is already taken!'} 
            return Response(data)
    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)
