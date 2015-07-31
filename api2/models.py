from django.db import models

class Entity(models.Model):
    name = models.CharField(max_length=255)
    #relations = models.ManyToManyField(Entity, through='Relation')

class Compagny(Entity):
    raisonSociale = models.CharField(max_length=255)

class Labo(Entity):
    ville = models.CharField(max_length=255)

class Relation(models.Model):
    from_rel = models.ForeignKey(Entity, related_name="relations_from")
    to_rel = models.ForeignKey(Entity, related_name="relations_to")
    name = models.CharField(max_length=255)