from django.db import models
from core_model.models import Model
from core_model.model.relations import EntityThatHaveProperties

from core_model.model.topics import Topic
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext as _

class Behaviour(Model):
    #other = models.TextField(default='') #todo: sure?
    pass

class OtherBehaviour(Behaviour):
    title_en = models.CharField(max_length=255)
    description_en = models.TextField()

    def clean(self):
        if self.title_en == 'fuck':
            raise ValidationError(
                _('Unauthorised work'),
                code='unauthorised'
            )

    def __str__(self):
        return self.title_en

class Habit(Behaviour):
    label_en = models.CharField(max_length=255)

    def __str__(self):
        return self.label_en

class UseAKindOfEntity(Behaviour):
    entity_with_properties = models.ForeignKey(EntityThatHaveProperties)

    def __str__(self):
        return str(self.entity_with_properties)

class Alternative(Model):
    """A Behaviour can be an alternative to an other behaviour"""
    from_behaviours = models.ManyToManyField(Behaviour, related_name="alternatives")
    to_behaviour = models.ForeignKey(Behaviour, related_name="is_alternative_to")
    topics = models.ManyToManyField(Topic) #todo: maybe it's not the best way to do

    def __str__(self):
        return ','.join([str(b) for b in self.from_behaviours]) + ' -> ' + str(self.to_behaviour)



