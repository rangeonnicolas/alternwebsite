from django.db import models

class Entity(models.Model):
    #toPrint = models.CharField(max_length=1000)

    #def __init__(self,*k):
    #    super(Entity, self).__init__(*k)
    #    self.toPrint = self.__unicode__()

    def __str__(self):
        name = ""
        rightClass = ""
        for cla in ["product","bank","company","newspaper","author"]:
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
        for cla in ["product","bank","company","newspaper","author"]:
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
    def __str__(self):
        return self.__unicode__()
    def __unicode__(self):
        return(str(self.name))



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
    date = models.DateField()
    authors = models.ManyToManyField(Author)
    newspaper = models.ForeignKey(Newspaper,null=True)
    topic = models.ManyToManyField(Topic)

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

    from_rel = models.ForeignKey(Entity, related_name="relations_from",verbose_name="This object")
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
    behavior = models.ForeignKey(Behaviour, related_name="has_impact_on",verbose_name="This behaviour")
    becauseOf = models.ForeignKey(Relation, related_name="has_impact_on",verbose_name="because of")
    impactCateg = models.ForeignKey(ImpactCateg,verbose_name="has this impact")
    sources = models.ManyToManyField(Source,verbose_name="Source that prooves this impact") #todo: il peut y avoir plusieures sources
    impact_type = models.CharField(max_length=3, choices= TYPE_CHOICES, default= 'U')
    #todo: contrainte uniquetogether des 3 champs behavior becauseof et impactcateg
    def __str__(self):
        return self.__unicode__()
    def __unicode__(self):
        return('[ '+str(self.behavior)+' ]   HAS AN IMPACT ON   [ '+str(self.impactCateg.name)+' ]  BECAUSE  [ ' +str(self.becauseOf.simplePrint())+' ]')


class Alternative(models.Model):
    from_rel = models.ForeignKey(HasImpactOn, related_name="alternatives",verbose_name="This impact")
    to_rel = models.ForeignKey(Behaviour, related_name="is_alternative_of",verbose_name="has this alternative")
    sources = models.ManyToManyField(Source) #todo: plusieures sources possibles



# todo: couper les arguments des urls car elle est limitée à 200 carac

#  c.relations_from.all()[0].to_rel.labo.ville
