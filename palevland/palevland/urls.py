from django.conf.urls import url
from django.contrib import admin
from palevlandsite import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^send_carpet_form/$', views.send_carpet_form, name='send_carpet_form'),
]
