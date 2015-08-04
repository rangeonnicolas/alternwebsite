from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'altws.views.home', name='home'),
    url(r'^maquette/', 'altws.views.maquette', name='maquette'),

    url(r'^admin/', include(admin.site.urls)),
)
