# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-07-12 02:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0076_auto_20160712_0229'),
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