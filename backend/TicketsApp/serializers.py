from .models import *
from rest_framework import serializers
from homeApp.models import *
from homeApp.serializers import EventSerializer
from accountApp.serializers import *
from django.contrib.auth.models import User

class TicketsSerializer(serializers.ModelSerializer):
    event = serializers.SerializerMethodField('get_event')

    class Meta:
        model = TicketModel
        fields = ['id', 'name', 'price', 'quantity', 'event']

    def get_event(self, ticket):
        event = EventModel.objects.get(id = ticket.event.id)
        eventSerializer = EventSerializer(event, many = False)
        return eventSerializer.data

class OrderItemSerializer(serializers.ModelSerializer):
    ticket = TicketsSerializer(read_only = True)
    user = serializers.SerializerMethodField('get_user')
    item_total = serializers.FloatField()

    class Meta:
        model = OrderItemModel
        fields = ['id', 'quantity', 'item_total', 'user', 'order', 'ticket']

    def get_user(self, orderItem):
        user = User.objects.get(id = orderItem.user.id)
        userSerializer = AccountBigSerializer(user, many = False)
        return userSerializer.data

class OrderSerializer(serializers.ModelSerializer):
    orderItem = serializers.SerializerMethodField('get_order_items')

    class Meta:
        model = OrderModel
        fields = ['id', 'user', 'ordered', 'dataOrdered', 'order_total', 'orderItem'] 

    def get_order_items(self, order):
        orderItem = OrderItemModel.objects.filter(order = order.id)
        orderItemSerializer = OrderItemSerializer(orderItem, many = True)
        return orderItemSerializer.data

