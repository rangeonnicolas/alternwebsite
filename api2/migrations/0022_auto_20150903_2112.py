# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0021_auto_20150903_2112'),
    ]

    operations = [
        migrations.AlterField(
            model_name='alternative',
            name='sources',
            field=models.ManyToManyField(to='api2.Source'),
        ),
    ]
