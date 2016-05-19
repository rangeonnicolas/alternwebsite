# -*- coding: UTF-8 -*-

from django.db import models

class Entity(models.Model):
    # si l'on met le champ 'name' dans Entity, il se posera le problème des doublons (ex: entreprises qui ont le même nom que leur produit) à réfléchir donc...
    def getChild(self):
        child = None
        childClass = None
        for canditateClass in ["product", "bank", "company", "newspaper", "author", "ressource", "component", "policy",
                    "phenomenon"]:
            try:
                child = self.__getattribute__(canditateClass)
                childClass = canditateClass
            except:
                pass

        return (child, childClass)

    def __str__(self):
        child, childClass = self.getChild()
        return "{0} ({1}) - {2}".format(str(self.pk), rightClass, str(child.name))

    def __unicode__(self):
        return self.__str__()

    def simplePrint(self):
        '''A displaying method'''
        child, childClass = self.getChild()
        return child.name

from slugify import slugify

class Topic(models.Model):
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
        return self.__unicode__()
    def __unicode__(self):
        return str(self.name)



class Ressource(Entity):
    name = models.CharField(max_length=255,unique=True)

    def __str__(self):
        return self.__unicode__()
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.name))

class Component(Entity):
    name = models.CharField(max_length=255,unique=True)
    def __str__(self):
        return self.__unicode__()
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.name))

class Phenomenon(Entity):
    name = models.CharField(max_length=255,unique=True)
    def __str__(self):
        return self.__unicode__()
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.name))

class Policy(Entity):
    name = models.CharField(max_length=255,unique=True)
    def __str__(self):
        return self.__unicode__()
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.name))

class Company(Entity):
    name = models.CharField(max_length=255,unique=True)
    def __str__(self):
        return self.__unicode__()
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.name))

class Bank(Entity):    #Une banque est une company, mais alors il faudrait creer la classe IndustrialCompagy et faire extant ces 2 de COmpany. Voir dans evernote les precautio,ns avant de renommer une classe
    name = models.CharField(max_length=255,unique=True)
    def __str__(self):
        return self.__unicode__()
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.name))

#class Labo(Entity):
#    ville = models.CharField(max_length=255)

class Language(models.Model):
    englishName =  models.CharField(max_length=255, unique= True)
    localName = models.CharField(max_length=255, unique= True)
    def __str__(self):
        return self.__unicode__()
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.englishName))

class Newspaper(Entity):
    name =  models.CharField(max_length=255)#, unique= True)
    url =  models.URLField(unique= True)
    languages = models.ManyToManyField(Language)
    def __str__(self):
        return self.__unicode__()
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.name))

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
        return self.__unicode__()
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
        return self.__unicode__()
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
        return self.__unicode__()
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.name))

class Relation(models.Model):

    from_rel = models.ForeignKey(Entity, related_name="relations_from",verbose_name="This Object")
    to_rel = models.ForeignKey(Entity, related_name="relations_to",verbose_name="with this object")
    relationType = models.ForeignKey(RelationType,verbose_name="has this relation")
    sources = models.ManyToManyField(Source)
    def __str__(self):
        return(self.__unicode__())
    def __unicode__(self):
        return(  self.from_rel.simplePrint()  + ' / ' + self.relationType.name + ' / ' +  self.to_rel.simplePrint()  )
        #return( '[ ' + str(self.from_rel) + ' ] ___' + str(self.relationType.name) + '___ [' + str(self.to_rel) + ' ]' )
    def simplePrint(self):
        return( str(self.from_rel) + ' ' + str(self.relationType.name) + ' ' + str(self.to_rel) )

class Product(Entity):
    name = models.CharField(max_length=255, unique= True)

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
        for cla in ["consumeaproduct","habit","consumeatacompany"]:
            try :
                sub = eval("self."+cla)
                if cla == "consumeaproduct":
                    name = sub.product.name
                elif cla == "consumeatacompany":
                    name = sub.company.name
                elif cla == "habit":
                    name = sub.name
                rightClass = cla
            except :
                pass
        return(str(self.pk) +' ( ' + rightClass +  ' ) - ' +str(name))
    def __str__(self):
        return self.__unicode__()




#class ConsumeAt(Behaviour):
#    company =

class Habit(Behaviour):
    name = models.CharField(max_length=1000, unique= True)

class ConsumeAProduct(Behaviour):
    product = models.OneToOneField(Product,verbose_name="Consume ...")

class ConsumeAtACompany(Behaviour):
    company = models.OneToOneField(Company,verbose_name="Consume at ...")


class ImpactCateg(models.Model):
    name = models.CharField(max_length=255, unique= True)
    def __str__(self):
        return self.__unicode__()
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

class ImpactLevel1(models.Model):
    label = models.CharField(max_length=255,unique=True)
    def __str__(self):
        return self.__unicode__()
    def __unicode__(self):
        return self.label
class ImpactLevel2(models.Model):
    label = models.CharField(max_length=255,unique=True)
    parents = models.ManyToManyField(ImpactLevel1)
    def __str__(self):
        return self.__unicode__()
    def __unicode__(self):
        return self.label
class ImpactLevel3(models.Model):
    label = models.CharField(max_length=255,unique=True)
    parents = models.ManyToManyField(ImpactLevel2)
    def __str__(self):
        return self.__unicode__()
    def __unicode__(self):
        return self.label



class MainImpact(models.Model):
    topics = models.ManyToManyField(Topic)
    impactCateg = models.ForeignKey(ImpactCateg,verbose_name="has an main impact on")
    via = models.CharField(max_length= 200)
    tag = models.CharField(max_length= 200, null=True)
    sources = models.ManyToManyField(Source,verbose_name="Source that prooves this impact")
    def __str__(self):
        return self.__unicode__()
    def __unicode__(self):
        topicsStr = ""
        for t in self.topics.all():
            topicsStr = topicsStr + ", " + t.name
        return('[ '+ topicsStr +' ]  HAVE IMPACT ON  ['+str(self.impactCateg)+' ]  VIA  [ '+ str(self.via) +' ]')

class AlternativeToMainImpact(models.Model):
    #from_rel = models.ForeignKey(MainImpact, related_name="alternatives",verbose_name="This Main Impact [ /rest/mainimpact ]")
    impact_on = models.ManyToManyField(ImpactLevel2)
    to_rel = models.ForeignKey(Behaviour, related_name="is_alternative_of_main_impact",verbose_name="has this alternative [ /rest/habit OU /rest/behaviour ]")
    sources = models.ManyToManyField(Source)
    def __str__(self):
        return self.__unicode__()
    def __unicode__(self):
        return('[ '+str(self.to_rel)+' ]  is an alternative to this impact:  [ '+str(self.to_rel)+' ]')


class Association(Entity):
    name = models.CharField(max_length=255,unique=True)	

class WebPlatform(Entity):
    name = models.CharField(max_length=255,unique=True)	


# todo: couper les arguments des urls car elle est limitee à 200 carac

