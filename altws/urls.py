from django.conf.urls import url
from django.contrib import admin
import altws.views
import core_forms.urls
import api2.urls

urlpatterns = [
    url(r'^$', altws.views.home, name='home'),
    url(r'^maquette/$', altws.views.maquette, name='maquette'),
    url(r'^maquette2/$', altws.views.maquette2, name='maquette2'),
    url(r'^coreforms/', core_forms.urls, name='forms'),
    url(r'^topic/(?P<topic_id>\d*)/$', altws.views.topic_id, name='topic'),
    url(r'^searchproduct/(?P<topic_id>\d*)/$', altws.views.search_product, name='topic'),
    url(r'^rest/', api2.urls),
    url(r'^admin/', admin.site.urls),
]
