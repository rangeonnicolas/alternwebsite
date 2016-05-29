# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-05-21 17:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core_model', '0002_auto_20160521_1755'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='alternative',
            name='topicm',
        ),
        migrations.AddField(
            model_name='alternative',
            name='topics',
            field=models.ManyToManyField(to='core_model.Topic'),
        ),
    ]
