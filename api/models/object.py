from django.db import models
from django.auth import User

class Object:
    updated = models.DateTimeField(auto_created= True)
    created = models.DateTimeField(auto_now_add= True)
    owner = models.ForeignKey(User)