from django.conf.urls import url
from django.contrib import admin
from django.views.generic import TemplateView
import core.views

urlpatterns = [
    url(r'^topic/(?P<topic_id>\d*)/$',                  core.views.get_topic_by_id),
    url(r'^topic/(?P<topic_id>\d*)-(?P<slug>[\w-]*)/$', core.views.get_topic_by_name_and_id,name="get_topic_by_name_and_id"),
    url(r'^searchproduct/(?P<topic_id>\d*)/$',          core.views.search_product),
    url(r'^logo.svg$', core.views.get_logo,name="get-logo"), #todo: temporary
    url(r'^style.css$', core.views.get_css,name='get-css'), #todo: temporary
    url(r'^paletton$', TemplateView.as_view(template_name='paletton.html')), #todo: temporary
]