# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-09-29 22:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core_model', '0008_testalternative_foo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='testalternative',
            name='from_behaviours',
            field=models.ManyToManyField(blank=True, related_name='alternatives', to='core_model.TestBehaviour'),
        ),
        migrations.AlterField(
            model_name='testentity',
            name='parents',
            field=models.ManyToManyField(blank=True, related_name='children', to='core_model.TestEntity'),
        ),
        migrations.AlterField(
            model_name='testentitythathaveproperties',
            name='properties',
            field=models.ManyToManyField(blank=True, to='core_model.TestRelation'),
        ),
    ]
