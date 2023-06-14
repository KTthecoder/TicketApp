from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import stripe
from decimal import Decimal

@api_view(['POST'])
def StripePayment(request):  
    stripe.api_key = "sk_test_51NHP70CPMf2RXRk0fPBbj5ze3U7G6HJktmVqO0h2IZCwWDkp7NRojVZbyYL6v81cLLvX23YwBjzrgS8F3FyYlNPv00r8tsHN0G"
    if request.method == 'POST':
        try:
            paymentIntent = stripe.PaymentIntent.create(
                amount =  int(Decimal(request.data['orderTotal']) * 100), 
                currency = 'usd', 
                payment_method_types = ['card'],
                receipt_email = request.data['email'],
            )
            return Response(status=status.HTTP_200_OK, data=paymentIntent.client_secret)
        except:
            return Response(status=status.HTTP_200_OK, data={'Error' : 'Error while creating payment intent'})
    else:
        response = {'Error': 'User Unauthorized'}
        return Response(response, status=status.HTTP_401_UNAUTHORIZED)