from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *

# Create your views here.
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def MyTicketsScreen(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            response = {
                'Tickets': None,
            }

            order = OrderModel.objects.filter(user = request.user, ordered = True)
            if order.exists():
                orderSerializer = OrderSerializer(order, many = True, context={'user': request.user})
                response['Tickets'] = orderSerializer.data
            else:
                orderSerializer = "No Bought Tickets"
                response['Tickets'] = orderSerializer

            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def TicketById(request, orderItemId):
    if request.method == 'GET':
        if request.user.is_authenticated:
            response = {
                'Ticket': None,
            }

            try:
                orderItems = OrderItemModel.objects.get(id = orderItemId)
                orderItemsSerializer = OrderItemSerializer(orderItems, many = False, context={'user': request.user})
                response['Ticket'] = orderItemsSerializer.data
            except:
                orderItemsSerializer = "No Bought Tickets"
                response['Ticket'] = orderItemsSerializer

            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def CartScreen(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            response = {
                'OrderTotal' : None,
                'OrderItems': None,
            }

            user = request.user
            order, created = OrderModel.objects.get_or_create(user = user, ordered = False)
            orderItems = OrderItemModel.objects.filter(order = order)
            response['OrderTotal'] = order.order_total 

            if not orderItems.exists():
                data = {'Response' : 'Your Shopping Cart is Empty'}
                return Response(data, status=status.HTTP_200_OK)

            response['OrderItems'] = OrderItemSerializer(orderItems, many = True).data
            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def AddToCart(request, ticketId):
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                ticket = TicketModel.objects.get(id = ticketId)
            except TicketModel.DoesNotExist:
                data = {'Error' : 'Product Does Not Exists'}
                return Response(data)

            user = request.user
            order, created = OrderModel.objects.get_or_create(user=user, ordered=False) 

            orderItem, created = OrderItemModel.objects.get_or_create(ticket=ticket, order=order, user = user)
            orderItem.quantity = (orderItem.quantity + 1)
            orderItem.save()

            data = {'Success' : 'Ticket Added To Cart Succesfully'}
            return Response(data, status=status.HTTP_200_OK)
        else:
            data = {'Error' : 'User is not authenticated'}
            return Response(data, status=status.HTTP_401_UNAUTHORIZED)
    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def RemoveFromCart(request, orderItemId):
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                orderItem = OrderItemModel.objects.get(id = orderItemId)
            except OrderItemModel.DoesNotExist:
                data = {'Error' : 'OrderItem Does Not Exists'}
                return Response(data)

            orderItem.quantity = (orderItem.quantity - 1)
            orderItem.save()

            if orderItem.quantity <= 0:
                orderItem.delete()

            data = {'Success' : 'Ticket Deleted From Cart Succesfully'}
            return Response(data, status=status.HTTP_200_OK)
        else:
            data = {'Error' : 'User is not authenticated'}
            return Response(data, status=status.HTTP_401_UNAUTHORIZED)
    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def RemoveFromCartPrenamently(request, orderItemId):
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                orderItem = OrderItemModel.objects.get(id = orderItemId)
            except OrderItemModel.DoesNotExist:
                data = {'Error' : 'OrderItem Does Not Exists'}
                return Response(data)

            orderItem.delete()

            data = {'Success' : 'Ticket Deleted From Cart Succesfully'}
            return Response(data, status=status.HTTP_200_OK)
        else:
            data = {'Error' : 'User is not authenticated'}
            return Response(data, status=status.HTTP_401_UNAUTHORIZED)
    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def CheckoutScreen(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            response = {
                'CheckoutInfo': None,
                'OrderTotal' : None,
                'OrderItems': None,
            }

            user = request.user
            order, created = OrderModel.objects.get_or_create(user = user, ordered = False)
            orderItems = OrderItemModel.objects.filter(order = order)
            response['OrderTotal'] = order.order_total 

            if not orderItems.exists():
                data = {'Response' : 'Your Shopping Cart is Empty'}
                return Response(data, status=status.HTTP_200_OK)

            response['OrderItems'] = OrderItemSerializer(orderItems, many = True).data

            try:
                user = User.objects.get(id = request.user.id)
                userSerializer = AccountBigSerializer(user, many = False)
                response['CheckoutInfo'] = userSerializer.data
            except:
                userSerializer = 'No User Data'
                response['CheckoutInfo'] = userSerializer

            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

