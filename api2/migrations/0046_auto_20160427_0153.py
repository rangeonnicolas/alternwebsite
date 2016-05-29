# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-27 01:53
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0045_auto_20160427_0120'),
    ]

    operations = [
        migrations.RenameField(
            model_name='impactlevel2',
            old_name='parent',
            new_name='parents',
        ),
        migrations.RenameField(
            model_name='impactlevel3',
            old_name='parent',
            new_name='parents',
        ),
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