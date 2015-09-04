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

    url(r'^hasimpacton/$', views.HasImpactOnList.as_view()),
    url(r'^hasimpacton/(?P<pk>[0-9]+)/$', views.HasImpactOnDetail.as_view()),
    url(r'^hasimpacton/read/$', views.HasImpactOnReadList.as_view()),


    url(r'^entity/$', views.EntityList.as_view()),
    url(r'^entity/(?P<pk>[0-9]+)/$', views.EntityDetail.as_view()),

  	url(r'^source/$', views.SourceList.as_view()),
    url(r'^source/(?P<pk>[0-9]+)/$', views.SourceDetail.as_view()),

  	url(r'^relationtype/$', views.RelationTypeList.as_view()),
    url(r'^relationtype/(?P<pk>[0-9]+)/$', views.RelationTypeDetail.as_view()),

  	url(r'^relation/$', views.RelationList.as_view()),
    url(r'^relation/(?P<pk>[0-9]+)/$', views.RelationDetail.as_view()),
  	url(r'^relation/read/$', views.RelationReadList.as_view()),
    #url(r'^relation/read/(?P<pk>[0-9]+)/$', views.RelationReadDetail.as_view()),

  	url(r'^behaviour/$', views.BehaviourList.as_view()),
    url(r'^behaviour/(?P<pk>[0-9]+)/$', views.BehaviourDetail.as_view()),

  	url(r'^habit/$', views.HabitList.as_view()),
    url(r'^habit/(?P<pk>[0-9]+)/$', views.HabitDetail.as_view()),

  	url(r'^consumeaproduct/$', views.ConsumeAProductList.as_view()),
    url(r'^consumeaproduct/(?P<pk>[0-9]+)/$', views.ConsumeAProductDetail.as_view()),
    #
  	url(r'^alternative/$', views.AlternativeList.as_view()),
    url(r'^alternative/(?P<pk>[0-9]+)/$', views.AlternativeDetail.as_view()),
    url(r'^alternative/read/$', views.AlternativeReadList.as_view()),

  	url(r'^impactcateg/$', views.ImpactCategList.as_view()),
    url(r'^impactcateg/(?P<pk>[0-9]+)/$', views.ImpactCategDetail.as_view()),

  	url(r'^author/$', views.AuthorList.as_view()),
    url(r'^author/(?P<pk>[0-9]+)/$', views.AuthorDetail.as_view()),

  	url(r'^newspaper/$', views.NewspaperList.as_view()),
    url(r'^newspaper/(?P<pk>[0-9]+)/$', views.NewspaperDetail.as_view()),

  	url(r'^language/$', views.LanguageList.as_view()),
    url(r'^language/(?P<pk>[0-9]+)/$', views.LanguageDetail.as_view()),

  	url(r'^company/$', views.CompanyList.as_view()),
    url(r'^company/(?P<pk>[0-9]+)/$', views.CompanyDetail.as_view()),

  	url(r'^bank/$', views.BankList.as_view()),
    url(r'^bank/(?P<pk>[0-9]+)/$', views.BankDetail.as_view()),

    url(r'^topic/$', views.TopicList.as_view()),
    url(r'^topic/(?P<pk>[0-9]+)/$', views.TopicDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
