
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

from . import api_views


urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),


    #API Views
    path("login", api_views.LogIn.as_view(), name="login"),
    path("logout", api_views.LogOut.as_view(), name="logout"),
    path("register", api_views.Register.as_view(), name="register"),

    path('feed/', api_views.UserTL.as_view(), name="time-line"),
    path('compose/cube/', api_views.Post.as_view(), name="post"),
    path('compose/cube/', api_views.Reply.as_view(), name="reply"),
    path('compose/cube/', api_views.Quote.as_view(), name="quote"),
    path('compose/cube/', api_views.Repost.as_view(), name="repost"),
    path('<str:username>/Follow', api_views.Follow.as_view(), name="follow"),
    path('<str:username>/thread/<int:id>/', api_views.Thread.as_view(), name="thread"),

]

urlpatterns = format_suffix_patterns(urlpatterns)
