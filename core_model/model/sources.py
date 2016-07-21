from django.db import models
from core_model.models import Model

class Source(Model):
    label = models.CharField(max_length=200)

