from django.db import models

# Create your models here.

class mails(models.Model):
    email = models.EmailField(verbose_name = "Your email:", unique=True)