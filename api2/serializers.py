__author__ = 'developpeur'

__author__ = 'developpeur'

from rest_framework import serializers
from api2.models import *




    #kwcluster_set = serializers.PrimaryKeyRelatedField(many= True, queryset=KWCluster.objects.all())

    #sheets = SheetSerializer2(many=True, read_only=True)

    #sheets = serializers.SlugRelatedField(many= True, read_only=True, slug_field='descr')

    #kwcluster = serializers.HyperlinkedRelatedField(read_only=True,view_name='KWCSerializer')



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        # fields = (['kwcluster', 'weight'])
class EntitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entity
class SourceSerializer(serializers.ModelSerializer):
    authors = serializers.SlugRelatedField(many=True, queryset=Author.objects.all(), slug_field="name")
    newspaper = serializers.SlugRelatedField(read_only=False, queryset=Newspaper.objects.all(), slug_field='name')
    class Meta:
        model = Source
class RelationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RelationType
class BehaviourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Behaviour
class ImpactCategSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImpactCateg
class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit


class RelationSerializer(serializers.ModelSerializer):
    #name = RelationTypeSerializer()
    sources = serializers.SlugRelatedField(many= True, queryset=Source.objects.all(), slug_field='title', label="Sources that proove this relation")
    from_rel = serializers.SlugRelatedField(queryset=Entity.objects.all(), slug_field='toPrint', label = "There is a relation from this object:")
    to_rel   = serializers.SlugRelatedField(queryset=Entity.objects.all(), slug_field='toPrint', label = "to this object:")
    relationType = serializers.SlugRelatedField(queryset=RelationType.objects.all(), slug_field='name', label = "of type")
    class Meta:
        model = Relation
        fields = ["from_rel","relationType","to_rel","sources"]

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author

class NewspaperSerializer(serializers.ModelSerializer):
    languages = serializers.SlugRelatedField(many=True, queryset=Language.objects.all(), slug_field="englishName")
    class Meta:
        model = Newspaper


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language

class CompagnySerializer(serializers.ModelSerializer):
    class Meta:
        model = Compagny

class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
#
# class Serializer(serializers.ModelSerializer):
#     class Meta:
#         model =
# class Serializer(serializers.ModelSerializer):
#     class Meta:
#         model =
# class Serializer(serializers.ModelSerializer):
#     class Meta:
#         model =
# class Serializer(serializers.ModelSerializer):
#     class Meta:
#         model =
#
#
#
#
#
#
# class Relation(models.Model):
#
#     from_rel = models.ForeignKey(Entity, related_name="relations_from")
#     to_rel = models.ForeignKey(Entity, related_name="relations_to")
#     name = models.ForeignKey(RelationType)
#     sources = models.ManyToManyField(Source)
#
#
# class ConsumeAProduct(Behaviour):
#     product = models.ForeignKey(Product)
#
#
# class Alternative(models.Model):
#     from_rel = models.ForeignKey(Behaviour, related_name="relations_alt_from")
#     to_rel = models.ForeignKey(Behaviour, related_name="relations_alt_to")
#
#
# class HasImpactOn(models.Model):
#     behavior = models.ForeignKey(Behaviour, related_name="has_impact_on")
#     impactCateg = models.ForeignKey(ImpactCateg)
#
