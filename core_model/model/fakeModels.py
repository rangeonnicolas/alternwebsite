"""
This file contains models dedicated only to unit tests
All the models taht begin with Test are saved in a distinct
database (see DATABASE_ROUTERS in the setting.py file)
"""

from django.db import models
from core_model.models import Model

#from core_model.model.relations import EntityThatHaveProperties
#from core_model.model.topics import Topic
#from django.core.exceptions import ValidationError
#from django.utils.translation import ugettext as _

class TestBehaviour(Model):

    def getChild(self):
        child = None
        childClass = None
        for canditateClass in [c.lower() for c in ["TestUseAKindOfEntity", "TestOtherBehaviour", "TestHabit"]]:
            print(canditateClass)
            try:
                child = self.__getattribute__(canditateClass)
                childClass = canditateClass
                print('oui!!',canditateClass)
            except:
                pass

        return (child, childClass)

    def __str__(self):
        child, childClass = self.getChild()
        return str(child)

class TestOtherBehaviour(TestBehaviour):
    title_en = models.CharField(max_length=255)
    description_en = models.TextField()

    def __str__(self):
        return self.title_en

    def clean(self):
        if self.title_en == 'fuck':
            raise ValidationError(
                _('Unauthorised work'),
                code='unauthorised'
            )

class TestHabit(TestBehaviour):
    label_en = models.CharField(max_length=255)

    def __str__(self):
        return self.label_en

class TestEntity(Model):
    parents = models.ManyToManyField('TestEntity', blank=True, related_name="children")
    is_leaf = models.BooleanField()
    name = models.CharField(max_length= 500)

    def __str__(self):
        return self.name

class TestRelation(Model):
    from_entity = models.ManyToManyField(TestEntity, related_name= "to_relations")
    to_entity = models.ManyToManyField(TestEntity, related_name= "from_relations")

    def __str__(self):
        return str(self.from_entity) + ' -> ' + str(self.to_entity)

class TestEntityThatHaveProperties(Model):
    target_entity = models.ForeignKey(TestEntity, related_name='ethp')
    properties = models.ManyToManyField(TestRelation, blank=True)
    first_level = models.BooleanField(default= False)

    def __str__(self):
        return str(self.target_entity)

class TestUseAKindOfEntity(TestBehaviour):
    entity_with_properties = models.ForeignKey(TestEntityThatHaveProperties)

    def __str__(self):
        return str(self.entity_with_properties)




class TestTopic(Model):

    name = models.CharField(max_length=255,unique=True)
    description_en = models.TextField(null=True)
    in_navigation_bar = models.BooleanField(default=False,verbose_name="appears in main menu")
    position_in_nav_bar = models.IntegerField()
    _slug = models.SlugField(max_length=100)

    def _get_slug(self):
        return slugify(self.name)
    def _set_slug(self, slug):
        pass

    slug = property(_get_slug, _set_slug)

    def __str__(self):
        return self.name


class TestLanguage(Model):
    label_en = models.CharField(max_length=255)
    code = models.CharField(max_length=255)

    def __str__(self):
        return self.label_en


class TestAlternative(Model):
    """A Behaviour can be an alternative to an other behaviour"""
    from_behaviours = models.ManyToManyField(TestBehaviour, blank=True, related_name="alternatives")
    to_behaviour = models.ForeignKey(TestBehaviour, related_name="is_alternative_to")
    topics = models.ManyToManyField(TestTopic) #todo: maybe it's not the best way to do
    #language =  models.ForeignKey(TestLanguage)
    foo = models.BooleanField()

    def __str__(self):
        return ','.join([str(b) for b in self.from_behaviours.all()]) + ' -> ' + str(self.to_behaviour)


class TestProduct(TestEntity):
    pass

class TestCompany(TestEntity):
    pass

class TestAssociation(TestEntity): #todo: verify term
    description = models.TextField(default='')
    lang = models.ForeignKey('TestLanguage', null=True) #todo: null=True?
    country = models.ManyToManyField('TestCountry')



class TestCountry(Model):
    label_en = models.CharField(max_length=255)
    code = models.CharField(max_length=255)

    def __str__(self):
        return self.label_en


