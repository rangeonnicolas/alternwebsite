# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0030_auto_20150908_1414'),
    ]

    operations = [
        migrations.RenameField(
            model_name='source',
            old_name='date',
            new_name='publication_date',
        ),
    ]
