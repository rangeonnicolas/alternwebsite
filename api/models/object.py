__author__ = 'developpeur'
from django.db import models

class Object:
    updated = models.DateTimeField(auto_created= True)
    created = models.DateTimeField(auto_now_add= True)