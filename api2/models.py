from django.db import models

class Entity(models.Model):
    pass
    # def __str__(self):
    #     a = ""
    #     try:
    #         #for cla in Entity.__subclasses__():
    #         try:
    #             a = self.tostr()
    #         except:
    #             pass
    #     except:
    #         return("Une entité")
    #     return(a)
    #relations = models.ManyToManyField(Entity, through='Relation')

#class Compagny(Entity):
#    raisonSociale = models.CharField(max_length=255)

#class Labo(Entity):
#    ville = models.CharField(max_length=255)


class Source(models.Model):
    title = models.CharField(max_length=5000)
    url = models.URLField(unique= True)
    date = models.DateField()


class RelationType(models.Model):
    PROPAGATION_CHOICES = (
        ('P','propagates'),
        ('R','restricts'),
        ('U','unset')
    )
    name = models.CharField(max_length=255)
    propagation_type = models.CharField(max_length=1, choices= PROPAGATION_CHOICES, default= 'U')


class Relation(models.Model):

    from_rel = models.ForeignKey(Entity, related_name="relations_from")
    to_rel = models.ForeignKey(Entity, related_name="relations_to")
    name = models.ForeignKey(RelationType)
    sources = models.ManyToManyField(Source)

class Product(Entity):
    name = models.CharField(max_length=255, unique= True)
    # def tostr(self):
    #     return( str(self.name) )

class Behaviour(models.Model):
    #BEHAVIOUR_TYPE = (
    #    ('habit'),
    #    ('consume_product'),
    #    ('consume_at')
    #)
    pass

#class ConsumeAt(Behaviour):
#    compagny =

class Habit(Behaviour):
    name = models.CharField(max_length=1000, unique= True)
class ConsumeAProduct(Behaviour):
    product = models.ForeignKey(Product)


class Alternative(models.Model):
    from_rel = models.ForeignKey(Behaviour, related_name="relations_alt_from")
    to_rel = models.ForeignKey(Behaviour, related_name="relations_alt_to")






class ImpactCateg(models.Model):
    name = models.CharField(max_length=255, unique= True)



class HasImpactOn(models.Model):
    behavior = models.ForeignKey(Behaviour, related_name="has_impact_on")
    impactCateg = models.ForeignKey(ImpactCateg)



#  c.relations_from.all()[0].to_rel.labo.ville
