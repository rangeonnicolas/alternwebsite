# -*- coding: UTF-8 -*-

from django.db import models

class Entity(models.Model):
    #toPrint = models.CharField(max_length=1000)

    #def __init__(self,*k):
    #    super(Entity, self).__init__(*k)
    #    self.toPrint = self.__unicode__()

    def __str__(self):
        name = ""
        rightClass = ""
        for cla in ["product","bank","company","newspaper","author","ressource","component","policy","phenomenon"]:
            try :
                sub = eval("self."+cla)
                name = sub.name
                rightClass = cla
            except :
                pass
        return(str(self.pk) +' ( ' + rightClass +  ' ) - ' +str(name))
    def __unicode__(self):
        name = ""
        rightClass = ""
        for cla in ["product","bank","company","newspaper","author","ressource","component","policy","phenomenon"]:
            try :
                sub = eval("self."+cla)
                name = sub.name
                rightClass = cla
            except :
                pass
        return(str(self.pk) +' ( ' + rightClass +  ' ) - ' +str(name))
    # def __str__(self):
    #     a = ""
    #     try:
    #         #for cla in Entity.__subclasses__():
    #         try:
    #             a = self.tostr()
    #         except:
    #             pass
    #     except:
    #         return("Une entite")
    #     return(a)
    #relations = models.ManyToManyField(Entity, through='Relation')

class Topic(models.Model):
    name = models.CharField(max_length=255,unique=True)
    description_en = models.TextField(null=True)
    in_navigation_bar = models.BooleanField(default=False,verbose_name="appears in main menu")
    def __str__(self):
        return self.__unicode__()
    def __unicode__(self):
        return(str(self.name))



class Ressource(Entity):
    name = models.CharField(max_length=255,unique=True)
    def __str__(self):
        return(str(self.pk) +' - ' +str(self.name))
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.name))

class Component(Entity):
    name = models.CharField(max_length=255,unique=True)
    def __str__(self):
        return(str(self.pk) +' - ' +str(self.name))
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.name))

class Phenomenon(Entity):
    name = models.CharField(max_length=255,unique=True)
    def __str__(self):
        return(str(self.pk) +' - ' +str(self.name))
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.name))

class Policy(Entity):
    name = models.CharField(max_length=255,unique=True)
    def __str__(self):
        return(str(self.pk) +' - ' +str(self.name))
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.name))

class Company(Entity):
    name = models.CharField(max_length=255,unique=True)
    def __str__(self):
        return(str(self.pk) +' - ' +str(self.name))
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.name))

class Bank(Entity):    #Une banque est une compagy, mais alors il faudrait creer la classe IndustrialCompagy et faire extant ces 2 de COmpany. Voir dans evernote les precautio,ns avant de renommer une classe
    name = models.CharField(max_length=255,unique=True)
    def __str__(self):
        return(str(self.pk) +' - ' +str(self.name))
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.name))

#class Labo(Entity):
#    ville = models.CharField(max_length=255)

class Language(models.Model):
    englishName =  models.CharField(max_length=255, unique= True)
    localName = models.CharField(max_length=255, unique= True)
    def __str__(self):
        return(str(self.pk) +' - ' +str(self.englishName))
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.englishName))

class Newspaper(Entity):
    name =  models.CharField(max_length=255, unique= True)
    url =  models.URLField(unique= True)
    languages = models.ManyToManyField(Language)
    def __str__(self):
        return(str(self.pk) +' - ' +str(self.name))
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.name))

# class Author(Entity):
#     name = models.CharField(max_length=255, unique= True)
#     lastname  = models.CharField(max_length=255, unique= True, null=True)
#     def __str__(self):
#         return(str(self.pk) +' - ' +str(self.name) + ' ' + str(self.lastname))
#     def __unicode__(self):
#         return(str(self.pk) +' - ' +str(self.name) + ' ' + str(self.lastname))

class Author(Entity):
    TEMP_CHOICES = (
        ('U','unset'),
        ('P','real people'),
        ('O','organisation')
    )
    name = models.CharField(max_length=255)
    lastname  = models.CharField(max_length=255, null=True)
    type = models.CharField(max_length=1, choices= TEMP_CHOICES, default= 'U')
    def __str__(self):
        return(str(self.pk) +' - ' +str(self.name) + ' ' + str(self.lastname))
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.name) + ' ' + str(self.lastname))
    class Meta:
        unique_together = ('name', 'lastname')

class Source(models.Model):
    title = models.CharField(max_length=5000)
    url = models.URLField(unique= True)
    publication_date = models.DateField(null=True)
    authors = models.ManyToManyField(Author)
    newspaper = models.ForeignKey(Newspaper,null=True)
    topic = models.ManyToManyField(Topic)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return(str(self.pk) +' - ' +str(self.title))
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.title))


class RelationType(models.Model):
    PROPAGATION_CHOICES = (
        ('U','unset'),
        ('P','propagates'),
        ('R','restricts')
    )
    name = models.CharField(max_length=255,unique=True)
    propagation_type = models.CharField(max_length=1, choices= PROPAGATION_CHOICES, default= 'U')
    def __str__(self):
        return(str(self.pk) +' - ' +str(self.name))
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.name))

class Relation(models.Model):

    from_rel = models.ForeignKey(Entity, related_name="relations_from",verbose_name="This Object")
    to_rel = models.ForeignKey(Entity, related_name="relations_to",verbose_name="with this object")
    relationType = models.ForeignKey(RelationType,verbose_name="has this relation")
    sources = models.ManyToManyField(Source)
    def __str__(self):
        return(self.__unicode__())
    # def __unicode__(self):
    #     return( '[ ' + str(self.from_rel) + ' ] ___' + str(self.relationType.name) + '___ [' + str(self.to_rel) + ' ]' )
    def __unicode__(self):
        return( '[ ' + str(self.from_rel) + ' ] ___' + str(self.relationType.name) + '___ [' + str(self.to_rel) + ' ]' )
    def simplePrint(self):
        return( str(self.from_rel) + ' ' + str(self.relationType.name) + ' ' + str(self.to_rel) )

class Product(Entity):
    name = models.CharField(max_length=255, unique= True)
    # def tostr(self):
    #     return( str(self.name) )

class Behaviour(models.Model):
    #BEHAVIOUR_TYPE = (from_re
    #    ('habit'),
    #    ('consume_product'),
    #    ('consume_at')
    #)
    #toPrint = models.CharField(max_length=1000, default=" ")

    #def __init__(self,*k):
    #    models.Model.__init__()
    #    self.toPrint = self.__unicode__(*k)
    topic = models.ManyToManyField(Topic)

    def __unicode__(self):
        name = ""
        rightClass = ""
        for cla in ["consumeaproduct","habit"]:
            try :
                sub = eval("self."+cla)
                if cla == "consumeaproduct":
                    name = sub.product.name
                elif cla == "habit":
                    name = sub.name
                rightClass = cla
            except :
                pass
        return(str(self.pk) +' ( ' + rightClass +  ' ) - ' +str(name))
    def __str__(self):
        name = ""
        rightClass = ""
        for cla in ["consumeaproduct","habit"]:
            try :
                sub = eval("self."+cla)
                if cla == "consumeaproduct":
                    name = sub.product.name
                elif cla == "habit":
                    name = sub.name
                rightClass = cla
            except :
                pass
        return(str(self.pk) +' ( ' + rightClass +  ' ) - ' +str(name))




#class ConsumeAt(Behaviour):
#    company =

class Habit(Behaviour):
    name = models.CharField(max_length=1000, unique= True)

class ConsumeAProduct(Behaviour):
    product = models.OneToOneField(Product,verbose_name="Consume ...")







class ImpactCateg(models.Model):
    name = models.CharField(max_length=255, unique= True)
    def __str__(self):
        return(str(self.pk) +' - ' +str(self.name))
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.name))


class HasImpactOn(models.Model):
    TYPE_CHOICES = (
        ('Pos','positive'),
        ('Neg','negative'),
        ('Neu','neutral'),
        ('U','unknown')
    )
    behavior = models.ForeignKey(Behaviour, related_name="has_impact_on",verbose_name="This behaviour [ /rest/consumeaproduct OU /rest/habit ]")
    becauseOf = models.ForeignKey(Relation, related_name="has_impact_on",verbose_name="because of [ /rest/relation ]")
    impactCateg = models.ForeignKey(ImpactCateg,verbose_name="has this impact")
    sources = models.ManyToManyField(Source,verbose_name="Source that prooves this impact") #todo: il peut y avoir plusieures sources
    impact_type = models.CharField(max_length=3, choices= TYPE_CHOICES, default= 'U')
    #todo: contrainte uniquetogether des 3 champs behavior becauseof et impactcateg
    def __str__(self):
        return self.__unicode__()
    def __unicode__(self):
        return('[ '+str(self.behavior)+' ]   HAS AN IMPACT ON   [ '+str(self.impactCateg.name)+' ]  BECAUSE  [ ' +str(self.becauseOf.simplePrint())+' ]')


class Alternative(models.Model):
    from_rel = models.ForeignKey(HasImpactOn, related_name="alternatives",verbose_name="This impact [ /rest/hasimpacton ]")
    to_rel = models.ForeignKey(Behaviour, related_name="is_alternative_of",verbose_name="has this alternative [ /rest/habit OU /rest/consumeaproduct ]")
    sources = models.ManyToManyField(Source)
    def __str__(self):
        return self.__unicode__()
    def __unicode__(self):
        return('[ '+str(self.to_rel)+' ]  is an alternative to this impact:  [ '+str(self.to_rel)+' ]')



class MainImpact(models.Model):
    topics = models.ManyToManyField(Topic)
    impactCateg = models.ForeignKey(ImpactCateg,verbose_name="has an main impact on")
    via = models.CharField(max_length= 200)
    sources = models.ManyToManyField(Source,verbose_name="Source that prooves this impact")
    def __str__(self):
        return self.__unicode__()
    def __unicode__(self):
        topicsStr = ""
        for t in self.topics.all():
            topicsStr = topicsStr + ", " + t.name
        return('[ '+ topicsStr +' ]  HAVE IMPACT ON  ['+str(self.impactCateg)+' ]  VIA  [ '+ str(self.via) +' ]')


class AlternativeToMainImpact(models.Model):
    from_rel = models.ForeignKey(MainImpact, related_name="alternatives",verbose_name="This Main Impact [ /rest/mainimpact ]")
    to_rel = models.ForeignKey(Behaviour, related_name="is_alternative_of_main_impact",verbose_name="has this alternative [ /rest/habit OU /rest/behaviour ]")
    sources = models.ManyToManyField(Source)
    def __str__(self):
        return self.__unicode__()
    def __unicode__(self):
        return('[ '+str(self.to_rel)+' ]  is an alternative to this impact:  [ '+str(self.to_rel)+' ]')




# todo: couper les arguments des urls car elle est limitee à 200 carac

#  c.relations_from.all()[0].to_rel.labo.ville
