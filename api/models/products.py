from django.db import models
from api.models.institutions import Compagny

class Product():
    name = models.CharField(max_length= 100)
    producers = models.ManyToManyField(Compagny)
    #dealers = models.ForeignKey(Shop)
    #todo: is it useful?
# todo: inclure les notions de produits génériques etc.

class PieceOfFood(Product):
    pass

class Clothe(Product):
    pass

class ProduitsPourEtreBelleEtAutresTrucsDeFilles(Product):
    pass

class BiensDEquipement(Product):
    pass

class BiensDeConsommation(Product):
    pass

class WebService(Product):