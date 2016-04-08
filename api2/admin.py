from django.contrib import admin
from django.apps import apps
from api2.models import *

app = apps.get_app_config('api2')

for model_name, model in app.models.items():
    admin.site.register(model)
