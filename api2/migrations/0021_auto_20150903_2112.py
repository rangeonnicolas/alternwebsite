# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0020_auto_20150902_1122'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='alternative',
            name='source',
        ),
        migrations.RemoveField(
            model_name='hasimpacton',
            name='source',
        ),
        migrations.AddField(
            model_name='alternative',
            name='sources',
            field=models.ManyToManyField(to='api2.Source', null=True),
        ),
        migrations.AddField(
            model_name='hasimpacton',
            name='sources',
            field=models.ManyToManyField(verbose_name='Source that prooves this impact', to='api2.Source'),
        ),
    ]
