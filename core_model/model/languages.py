from django.db import models
from core_model.models import Model

class Language(Model):
    label_en = models.CharField(max_length=255)
    code = models.CharField(max_length=255)

    def __str__(self):
        return self.label_en

class Country(Model):
    label_en = models.CharField(max_length=255)
    code = models.CharField(max_length=255)

    def __str__(self):
        return self.label_en