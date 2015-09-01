# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0012_auto_20150828_1657'),
    ]

    operations = [
        migrations.AlterField(
            model_name='alternative',
            name='from_rel',
            field=models.ForeignKey(related_name='alternatives', to='api2.Behaviour'),
        ),
    ]
