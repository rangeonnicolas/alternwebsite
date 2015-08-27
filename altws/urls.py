from django.conf.urls import patterns, include, url
from django.contrib import admin
from api2 import urls as api2urls

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'altws.views.home', name='home'),
    url(r'^maquette/', 'altws.views.maquette', name='maquette'),
    url(r'^rest/', include(api2urls)),
    url(r'^admin/', include(admin.site.urls)),
)
