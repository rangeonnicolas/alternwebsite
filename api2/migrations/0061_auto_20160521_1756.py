# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-05-21 17:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0060_auto_20160521_1755'),
    ]

    operations = [
        migrations.AlterField(
            model_name='behaviour',
            name='topic',
            field=models.ManyToManyField(to='api2.Topic'),
        ),
        migrations.AlterField(
            model_name='mainimpact',
            name='topics',
            field=models.ManyToManyField(to='api2.Topic'),
        ),
        migrations.AlterField(
            model_name='source',
            name='topic',
            field=models.ManyToManyField(to='api2.Topic'),
        ),
    ]
