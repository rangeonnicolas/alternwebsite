from django.conf.urls import url
from django.contrib import admin
import core.views

urlpatterns = [
    url(r'^topic/(?P<topic_id>\d*)/$',                  core.views.get_topic_by_id),
    url(r'^topic/(?P<topic_id>\d*)-(?P<slug>[\w-]*)/$', core.views.get_topic_by_name_and_id),
    url(r'^searchproduct/(?P<topic_id>\d*)/$',          core.views.search_product),
]
