# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0013_auto_20150828_1850'),
    ]

    operations = [
        migrations.AlterField(
            model_name='alternative',
            name='to_rel',
            field=models.ForeignKey(to='api2.Behaviour', related_name='is_alternative_of'),
        ),
    ]
