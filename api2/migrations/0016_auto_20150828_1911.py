# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0015_auto_20150828_1852'),
    ]

    operations = [
        migrations.AlterField(
            model_name='alternative',
            name='from_rel',
            field=models.ForeignKey(to='api2.HasImpactOn', related_name='alternatives'),
        ),
    ]
