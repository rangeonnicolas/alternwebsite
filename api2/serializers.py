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
    # from_rel = EntitySerializer(many= True)
    sources = serializers.SlugRelatedField(many= True, queryset=Source.objects.all(), slug_field='title')
    class Meta:
        model = Relation

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
