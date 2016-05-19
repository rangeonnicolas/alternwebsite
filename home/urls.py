from django.conf.urls import url, include
import home.views

urlpatterns = [
    url(r'^$', home.views.home),
]