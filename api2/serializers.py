from rest_framework import serializers
from api2.models import *

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
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
    sources = serializers.SlugRelatedField(many= True, queryset=Source.objects.all(), slug_field='title', label="Sources that proove this relation")
    relationType = serializers.SlugRelatedField(queryset=RelationType.objects.all(), slug_field='name', label="has this relation [ /rest/relationtype ]")
    class Meta:
        model = Relation
        fields = ["id","from_rel","relationType","to_rel","sources"]

class RelationReadSerializer(serializers.ModelSerializer):
    sources = serializers.SlugRelatedField(many= True, queryset=Source.objects.all(), slug_field='title', label="Sources that proove this relation")
    from_rel = serializers.StringRelatedField(label = "There is a relation from this object:")
    to_rel   = serializers.StringRelatedField(label = "to this object:")
    relationType = serializers.SlugRelatedField(queryset=RelationType.objects.all(), slug_field='name', label = "of type")
    class Meta:
        model = Relation
        fields = ["id","from_rel","relationType","to_rel","sources"]

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

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company

class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank

class AlternativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alternative
class AlternativeReadSerializer(serializers.ModelSerializer):
    from_rel = serializers.StringRelatedField(label="Instead of having this behaviour:")
    to_rel = serializers.StringRelatedField(label="better choose this alternative")
    class Meta:
        model = Alternative

class ConsumeAProductSerializer(serializers.ModelSerializer):
    product = serializers.SlugRelatedField(queryset=Product.objects.all(), slug_field="name")
    class Meta:
        model = ConsumeAProduct

class HasImpactOnSerializer(serializers.ModelSerializer):
    impactCateg = serializers.SlugRelatedField(queryset=ImpactCateg.objects.all(), slug_field="name", label="has an impact on")
    class Meta:
        model = HasImpactOn
        fields = ["id","behavior","impactCateg","becauseOf","impact_type","sources"]
class HasImpactOnReadSerializer(serializers.ModelSerializer):
    impactCateg = serializers.SlugRelatedField(queryset=ImpactCateg.objects.all(), slug_field="name", label="has an impact on")
    behavior    = serializers.StringRelatedField(label="This behavior :")
    becauseOf    = serializers.StringRelatedField()
    class Meta:
        model = HasImpactOn
        fields = ["id","behavior","impactCateg","becauseOf","impact_type","sources"]

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic

class RessourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ressource

class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component

class PhenomenonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phenomenon

class PolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = Policy

class MainImpactSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainImpact
        fields = ["id","impactCateg","via","topics","sources"]

class AlternativeToMainImpactSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlternativeToMainImpact
