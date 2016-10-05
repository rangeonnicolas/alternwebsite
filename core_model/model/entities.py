from django.db import models
from core_model.models import Model
from core_model.model.languages import Language

class Entity(Model):
    parents = models.ManyToManyField('Entity', related_name="children")
    is_leaf = models.BooleanField()
    name = models.CharField(max_length= 500)
    #class Meta:
    #    abstract = True

    def __str__(self):
        return self.name

class Product(Entity):
    pass

class Company(Entity):
    pass

class Association(Entity): #todo: verify term
    description = models.TextField(default='')
    lang = models.ForeignKey('Language', null=True) #todo: null=True?
    country = models.ManyToManyField('Country')

# integrity verifications:
# Entity : no circuit in the graph
# RelationSet : either a Relation or a RelationClassif but not both
# Behaviour : reglarly verify the "other" field
# Association: must always have a country
# Association: trans-country association: be aware of duplicates (ex: Unicef France, Unicef [international])
# OtherBehaviour: review them regularily to moderate it

# automations:
# Entity : is_leaf
# Entity : type
# RelationSet : first_level

# secu:
# limiter la taille des fields (notemment les textfields)