"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_simplejwt.views import TokenVerifyView
from accountApp.views import *
from homeApp.views import *
from django.conf.urls.static import static
from django.conf import settings
from searchApp.views import *
from profileApp.views import *
from TicketsApp.views import *
from paymentApp.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/register', RegisterPage, name='RegisterPage'),
    path('api/user/info', GetUserinfo, name='GetUserinfo'),
    path('api/user/info/post', PostUserinfo, name='PostUserinfo'),

    # HomeApp
    path('api/home', HomeScreen, name='HomeScreen'),
    path('api/event/details/<slug:slug>', EventDetailsScreen, name='EventDetailsScreen'),
    path('api/event/by-category/<slug:slug>', EventByCategory, name='EventByCategory'),
    path('api/events/recomended', AllRecomendedEvents, name='AllRecomendedEvents'),
    path('api/events/location', AllLocationEventsScreen, name='AllLocationEventsScreen'),

    # Stripe Payment
    path('api/stripe/payment', StripePayment, name='StripePayment'),

    # SearchApp
    path('api/search', SearchScreen, name='SearchScreen'),
    path('api/search/<str:search>', FindEventScreen, name='FindEventScreen'),

    # ProfileApp
    path('api/artist/<slug:slug>', ArtistDetailsScreen, name='ArtistDetailsScreen'),
    path('api/profile', ProfileScreen, name='ProfileScreen'),
    path('api/followed-artists', AllFollowedArtists, name='AllFollowedArtists'),
    path('api/followed-events', AllFollowedEvents, name='AllFollowedEvents'),

    # TicketsApp
    path('api/my-tickets', MyTicketsScreen, name='MyTicketsScreen'),
    path('api/my-tickets/<int:orderItemId>', TicketById, name='TicketById'),
    path('api/cart', CartScreen, name='CartScreen'),
    path('api/cart/add/<int:ticketId>', AddToCart, name='AddToCart'),
    path('api/cart/remove/<int:orderItemId>', RemoveFromCart, name='RemoveFromCart'),
    path('api/cart/remove-per/<int:orderItemId>', RemoveFromCartPrenamently, name='RemoveFromCartPrenamently'),
    path('api/checkout', CheckoutScreen, name='CheckoutScreen'),
    path('api/accept-order-payment', AcceptOrder, name='AcceptOrder'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)