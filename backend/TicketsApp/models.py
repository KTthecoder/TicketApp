from django.db import models
from homeApp.models import *
from django.contrib.auth.models import User

# Create your models here.
class TicketModel(models.Model):
    name = models.CharField(max_length=80)
    event = models.ForeignKey(EventModel, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return self.name + ' - ' + self.event.name + ' | ' +  "$" + str(self.price) + " | " + "Available: " + str(self.quantity) 

class OrderModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ordered = models.BooleanField(blank=False, null=False)
    dataOrdered = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return str(self.id) + " - " + self.user.username

    @property
    def order_total(self):
        items = self.orderItem.all()
        total = sum(item.item_total for item in items)
        return round(total, 2)

class OrderItemModel(models.Model):
    quantity = models.IntegerField(default=0, null=True, blank=True)
    order = models.ForeignKey(OrderModel, related_name='orderItem', null=True, blank=True, on_delete=models.CASCADE)
    ticket = models.ForeignKey(TicketModel, on_delete=models.CASCADE, blank=False, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return "Order " + str(self.order.id) + " - " + str(self.ticket.name)

    @property
    def item_total(self):
        value = float(self.ticket.price) * float(self.quantity)
        return round(value, 2)