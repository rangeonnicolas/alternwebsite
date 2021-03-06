# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-27 01:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0043_auto_20160426_2005'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='alternativetomainimpact',
            name='from_rel',
        ),
        migrations.AddField(
            model_name='alternativetomainimpact',
            name='impact_on',
            field=models.ManyToManyField(to='api2.ImpactLevel2'),
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
