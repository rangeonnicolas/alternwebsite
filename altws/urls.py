from django.conf.urls import url, include
from django.contrib import admin
import home.views
import core_forms.urls
import api2.urls
import core.urls

urlpatterns = [
    url(r'^$',          home.views.home, name='home'),
    url(r'^',           include(core.urls)),
    url(r'^coreforms/', include(core_forms.urls), name='forms'),
    url(r'^api/',       include(api2.urls)),
    url(r'^admin/',     include(admin.site.urls)),
]
