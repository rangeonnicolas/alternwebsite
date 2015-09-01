# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0009_auto_20150828_1351'),
    ]

    operations = [
        migrations.AddField(
            model_name='behaviour',
            name='toPrint',
            field=models.CharField(max_length=1000, default='l'),
            preserve_default=False,
        ),
    ]
