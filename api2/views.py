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




class HasImpactOnList(generics.ListCreateAPIView):
    queryset = HasImpactOn.objects.all()
    serializer_class = HasImpactOnSerializer
class HasImpactOnDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = HasImpactOn.objects.all()
    serializer_class = HasImpactOnSerializer
class HasImpactOnReadList(generics.ListAPIView):
    queryset = HasImpactOn.objects.all()
    serializer_class = HasImpactOnReadSerializer

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
class RelationReadList(generics.ListAPIView):
    queryset = Relation.objects.all()
    serializer_class = RelationReadSerializer
#class RelationReadDetail(generics.RetrieveUpdateDestroyAPIView):
#    queryset = Relation.objects.all()
#    serializer_class = RelationSerializer


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


class ConsumeAProductList(generics.ListCreateAPIView):
    queryset = ConsumeAProduct.objects.all()
    serializer_class = ConsumeAProductSerializer

class ConsumeAProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ConsumeAProduct.objects.all()
    serializer_class = ConsumeAProductSerializer


class AlternativeList(generics.ListCreateAPIView):
    queryset = Alternative.objects.all()
    serializer_class = AlternativeSerializer
class AlternativeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Alternative.objects.all()
    serializer_class = AlternativeSerializer
class AlternativeReadList(generics.ListAPIView):
    queryset = Alternative.objects.all()
    serializer_class = AlternativeReadSerializer


class ImpactCategList(generics.ListCreateAPIView):
    queryset = ImpactCateg.objects.all()
    serializer_class = ImpactCategSerializer

class ImpactCategDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ImpactCateg.objects.all()
    serializer_class = ImpactCategSerializer

class AuthorList(generics.ListCreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class AuthorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class NewspaperList(generics.ListCreateAPIView):
    queryset = Newspaper.objects.all()
    serializer_class = NewspaperSerializer

class NewspaperDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Newspaper.objects.all()
    serializer_class = NewspaperSerializer

class LanguageList(generics.ListCreateAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

class LanguageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer


class CompanyList(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class CompanyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class BankList(generics.ListCreateAPIView):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer

class BankDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer

class TopicList(generics.ListCreateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

class TopicDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer





class RessourceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ressource.objects.all()
    serializer_class = RessourceSerializer

class RessourceList(generics.ListCreateAPIView):
    queryset = Ressource.objects.all()
    serializer_class = RessourceSerializer

class ComponentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer

class ComponentList(generics.ListCreateAPIView):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer

class PhenomenonDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Phenomenon.objects.all()
    serializer_class = PhenomenonSerializer

class PhenomenonList(generics.ListCreateAPIView):
    queryset = Phenomenon.objects.all()
    serializer_class = PhenomenonSerializer

class PolicyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Policy.objects.all()
    serializer_class = PolicySerializer

class PolicyList(generics.ListCreateAPIView):
    queryset = Policy.objects.all()
    serializer_class = PolicySerializer


class MainImpactDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MainImpact.objects.all()
    serializer_class = MainImpactSerializer

class MainImpactList(generics.ListCreateAPIView):
    queryset = MainImpact.objects.all()
    serializer_class = MainImpactSerializer


class AlternativeToMainImpactDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = AlternativeToMainImpact.objects.all()
    serializer_class = AlternativeToMainImpactSerializer

class AlternativeToMainImpactList(generics.ListCreateAPIView):
    queryset = AlternativeToMainImpact.objects.all()
    serializer_class = AlternativeToMainImpactSerializer