from django.db import models

class Entity(models.Model):
    toPrint = models.CharField(max_length=1000)

    def __init__(self,*k):
        super(Entity, self).__init__(*k)
        self.toPrint = self.__unicode__()

    def __unicode__(self):
        return(str(2)+str(1))

    def __str__(self):
        name = ""
        rightClass = ""
        for cla in ["product","bank","compagny","newspaper","author"]:
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
        for cla in ["product","bank","compagny","newspaper","author"]:
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

class Compagny(Entity):
    name = models.CharField(max_length=255)
    def __str__(self):
        return(str(self.pk) +' - ' +str(self.name))
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.name))

class Bank(Entity):    #Une banque est une compagny, mais alors il faudrait creer la classe IndustrialCompagny et faire extant ces 2 de COmpagny. Voir dans evernote les precautio,ns avant de renommer une classe
    name = models.CharField(max_length=255)
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
    name = models.CharField(max_length=255)
    lastname  = models.CharField(max_length=255, null=True)
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
    name = models.CharField(max_length=255)
    propagation_type = models.CharField(max_length=1, choices= PROPAGATION_CHOICES, default= 'U')
    def __str__(self):
        return(str(self.pk) +' - ' +str(self.name))
    def __unicode__(self):
        return(str(self.pk) +' - ' +str(self.name))

class Relation(models.Model):

    from_rel = models.ForeignKey(Entity, related_name="relations_from")
    to_rel = models.ForeignKey(Entity, related_name="relations_to")
    relationType = models.ForeignKey(RelationType)
    sources = models.ManyToManyField(Source)
    # toPrint = models.CharField(max_length=1000)
    # def __init__(self,*kk):
    #     super(Relation, self).__init__(*kk)
    #     self.testt = self.__unicode__()
    # def __unicode__(self):
    #     return(str(2)+str(1))

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
