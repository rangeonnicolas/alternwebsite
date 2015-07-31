from django.db import models
from models.new import *

# Create your models here.
class Labo(models.Model):
    ville = models.CharField(max_length=255)

    def __str__(self):

        """

        Cette méthode que nous définirons dans tous les modèles

        nous permettra de reconnaître facilement les différents objets que

        nous traiterons plus tard et dans l'administration

        """

        return self.titre