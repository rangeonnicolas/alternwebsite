from django.db import models

class Institution(Alternative): #todo: why should it inherit from Alternative???
    display_name = models.CharField(max_length= 100)
    complete_name = models.CharField(max_length= 200)
    short_name = models.CharField(max_length= 50)

    website_url = models.URLField()
    affiliates = models.ManyToManyField(Institution)
    # todo: filiales?
    clients = models.ManyToManyField(Institution)

    gets_financements_from = models.ManyToManyField(Institution, through= FinancementRelationOfInterest)
    # todo: maybe this field should be placed rather in 'Laboratory'

class Compagny(Institution):


class University(Institution):


class Laboratory(Institution):
    parent_institution = models.ManyToManyField(Institution)

#todo: is this useful????????
class Shop():

class Location(Object):
    city = models.CharField(max_length= 100)
    district = models.CharField(max_length= 100)
    country = models.CharField(max_length= 100)

class RelationOfInterest():
    DateType = ["period_of_time"]


class DatedRelationForFinancement(RelationOfInterest):
    #todo: orthograph of 'Interest' (one or 2 R ???)


