# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0011_auto_20150828_1459'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='behaviour',
            name='toPrint',
        ),
        migrations.RemoveField(
            model_name='entity',
            name='toPrint',
        ),
    ]
