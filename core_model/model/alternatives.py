from django.db import models
from core_model.models import Model

from core_model.model.topics import Topic

class Behaviour(Model):
    pass

class Habit(Behaviour):
    label_en = models.CharField(max_length=255)

class UseACategoryOfEntity(Behaviour):
    use_or_dontuse = models.BooleanField()

class Alternative(Model):
    """A Behaviour can be an alternative to an other behaviour"""
    from_behaviour = models.ForeignKey(Behaviour, null=True, related_name="alternatives") # null=True : in case one want
                                                             # to create an alternative to
                                                             # which one don't know to which behaviour it's an alternative to.
    to_behaviour = models.ForeignKey(Behaviour, related_name="is_alternative_to")
    topics = models.ManyToManyField(Topic) #todo: maybe it's not the best way to do