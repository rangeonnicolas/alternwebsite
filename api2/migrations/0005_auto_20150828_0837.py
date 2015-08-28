# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0004_relation_testt'),
    ]

    operations = [
        migrations.RenameField(
            model_name='relation',
            old_name='testt',
            new_name='toPrint',
        ),
    ]
