from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import mixins

from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework import permissions
from api2.serializers import *




class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer




# class HasImpactOnList(generics.ListCreateAPIView):
#     queryset = HasImpactOn.objects.all()
#     serializer_class = HasImpactOnSerializer
#
# class HasImpactOnDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = HasImpactOn.objects.all()
#     serializer_class = HasImpactOnSerializer


class EntityList(generics.ListCreateAPIView):
    queryset = Entity.objects.all()
    serializer_class = EntitySerializer

class EntityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Entity.objects.all()
    serializer_class = EntitySerializer


class SourceList(generics.ListCreateAPIView):
    queryset = Source.objects.all()
    serializer_class = SourceSerializer

class SourceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Source.objects.all()
    serializer_class = SourceSerializer


class RelationTypeList(generics.ListCreateAPIView):
    queryset = RelationType.objects.all()
    serializer_class = RelationTypeSerializer

class RelationTypeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = RelationType.objects.all()
    serializer_class = RelationTypeSerializer


class RelationList(generics.ListCreateAPIView):
    queryset = Relation.objects.all()
    serializer_class = RelationSerializer

class RelationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Relation.objects.all()
    serializer_class = RelationSerializer


class BehaviourList(generics.ListCreateAPIView):
    queryset = Behaviour.objects.all()
    serializer_class = BehaviourSerializer

class BehaviourDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Behaviour.objects.all()
    serializer_class = BehaviourSerializer


class HabitList(generics.ListCreateAPIView):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer

class HabitDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer


# class ConsumeAProductList(generics.ListCreateAPIView):
#     queryset = ConsumeAProduct.objects.all()
#     serializer_class = ConsumeAProductSerializer
#
# class ConsumeAProductDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = ConsumeAProduct.objects.all()
#     serializer_class = ConsumeAProductSerializer
#
#
# class AlternativeList(generics.ListCreateAPIView):
#     queryset = Alternative.objects.all()
#     serializer_class = AlternativeSerializer
#
# class AlternativeDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Alternative.objects.all()
#     serializer_class = AlternativeSerializer


class ImpactCategList(generics.ListCreateAPIView):
    queryset = ImpactCateg.objects.all()
    serializer_class = ImpactCategSerializer

class ImpactCategDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ImpactCateg.objects.all()
    serializer_class = ImpactCategSerializer

