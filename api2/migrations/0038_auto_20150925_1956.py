# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0037_auto_20150920_1314'),
    ]

    operations = [
        migrations.AddField(
            model_name='mainimpact',
            name='sources',
            field=models.ManyToManyField(verbose_name='Source that prooves this impact', to='api2.Source'),
        )
    ]
