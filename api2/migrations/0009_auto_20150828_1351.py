# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.db.migrations import operations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0008_auto_20150828_0850'),
    ]

    operations = [
        operations.RenameModel("Compagny", "Company")
    ]
