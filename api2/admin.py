from django.contrib import admin
from django.apps import apps
from api2.models import *

app = apps.get_app_config('api2')

'''gets all the models of the app to make them editable from the admin'''
for model_name, model in app.models.items():
    if model not in [Topic,]:
        admin.site.register(model)

class TopicAdmin(admin.ModelAdmin):
    list_display = ('name','position_in_nav_bar')
    list_filter = ('name','position_in_nav_bar')
    #date_hierarchy = 'date'
    ordering = ('position_in_nav_bar',)
    search_fields = ('name','description_en')
    list_editable = ('position_in_nav_bar',)

admin.site.register(Topic, TopicAdmin)