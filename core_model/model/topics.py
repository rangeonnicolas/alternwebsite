from django.db import models
from core_model.models import Model

from slugify import slugify

class Topic(Model):

    name = models.CharField(max_length=255,unique=True)
    description_en = models.TextField(null=True)
    in_navigation_bar = models.BooleanField(default=False,verbose_name="appears in main menu")
    position_in_nav_bar = models.IntegerField()
    _slug = models.SlugField(max_length=100)

    def _get_slug(self):
        return slugify(self.name)
    def _set_slug(self, slug):
        pass

    def __str__(self):
        return self.name

    slug = property(_get_slug, _set_slug)
    # todo: use the decorator @property instead

