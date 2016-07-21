from django.db import models
from core_model.models import Model
from core_model.model.entities import Entity

class Relation(Model):
    from_entity = models.ManyToManyField(Entity, related_name= "to_relations")
    to_entity = models.ManyToManyField(Entity, related_name= "from_relations")

class EntityThatHaveProperties(Model):
    target_entity = models.ForeignKey(Entity, related_name='ethp')
    properties = models.ManyToManyField(Relation)
    first_level = models.BooleanField(default= False)