from django.db import models
from core_model.models import Model
from core_model.model.relations import EntityThatHaveProperties

from core_model.model.topics import Topic

class Behaviour(Model):
    other = models.TextField(default='') #todo: sure?

class Habit(Behaviour):
    label_en = models.CharField(max_length=255)

class UseAKindOfEntity(Behaviour):
    entity_with_properties = models.ForeignKey(EntityThatHaveProperties)

class Alternative(Model):
    """A Behaviour can be an alternative to an other behaviour"""
    from_behaviours = models.ManyToManyField(Behaviour, related_name="alternatives")
    to_behaviour = models.ForeignKey(Behaviour, related_name="is_alternative_to")
    topics = models.ManyToManyField(Topic) #todo: maybe it's not the best way to do

