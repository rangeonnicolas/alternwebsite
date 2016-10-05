# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.contrib.postgres.operations import CreateExtension, UnaccentExtension

class TrigramExtension(CreateExtension):

    def __init__(self):
        self.name = 'pg_trgm'

class Migration(migrations.Migration):

    dependencies = [
        ('core_model', '0009_auto_20160929_2205'),
    ]

    operations = [
        TrigramExtension(),
        UnaccentExtension()
    ]
    # seems not to work. Do instead manually CREATE EXTENSION pg_trgm; CREATE EXTENSION unaccent;
