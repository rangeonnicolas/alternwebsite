from django.db import models

class Model(models.Model):

    def __unicode__(self):
        """Method used to print objects"""
        return self.__str__()

from core_model.model.alternatives import *
from core_model.model.topics import *

