__author__ = 'developpeur'

from django.conf.urls import include, url
from api2 import views
from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^product/$', views.ProductList.as_view()),
    url(r'^product/(?P<pk>[0-9]+)/$', views.ProductDetail.as_view()),

    # url(r'^hasimpacton/$', views.HasImpactOnList.as_view()),
    # url(r'^hasimpacton/(?P<pk>[0-9]+)/$', views.HasImpactOnDetail.as_view()),

    url(r'^entity/$', views.EntityList.as_view()),
    url(r'^entity/(?P<pk>[0-9]+)/$', views.EntityDetail.as_view()),

  	url(r'^source/$', views.SourceList.as_view()),
    url(r'^source/(?P<pk>[0-9]+)/$', views.SourceDetail.as_view()),

  	url(r'^relationtype/$', views.RelationTypeList.as_view()),
    url(r'^relationtype/(?P<pk>[0-9]+)/$', views.RelationTypeDetail.as_view()),

  	url(r'^relation/$', views.RelationList.as_view()),
    url(r'^relation/(?P<pk>[0-9]+)/$', views.RelationDetail.as_view()),

  	url(r'^behaviour/$', views.BehaviourList.as_view()),
    url(r'^behaviour/(?P<pk>[0-9]+)/$', views.BehaviourDetail.as_view()),

  	url(r'^habit/$', views.HabitList.as_view()),
    url(r'^habit/(?P<pk>[0-9]+)/$', views.HabitDetail.as_view()),

  	# url(r'^consumeaproduct/$', views.ConsumeAProductList.as_view()),
    # url(r'^consumeaproduct/(?P<pk>[0-9]+)/$', views.ConsumeAProductDetail.as_view()),
    #
  	# url(r'^alternative/$', views.AlternativeList.as_view()),
    # url(r'^alternative/(?P<pk>[0-9]+)/$', views.AlternativeDetail.as_view()),

  	url(r'^impactcateg/$', views.ImpactCategList.as_view()),
    url(r'^impactcateg/(?P<pk>[0-9]+)/$', views.ImpactCategDetail.as_view()),

]

urlpatterns = format_suffix_patterns(urlpatterns)
