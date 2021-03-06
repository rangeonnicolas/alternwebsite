# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-26 15:48
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0039_auto_20160422_1848'),
    ]

    operations = [
        migrations.CreateModel(
            name='Association',
            fields=[
                ('entity_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api2.Entity')),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
            bases=('api2.entity',),
        ),
        migrations.CreateModel(
            name='WebPlatform',
            fields=[
                ('entity_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api2.Entity')),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
            bases=('api2.entity',),
        ),
        migrations.AddField(
            model_name='mainimpact',
            name='tag',
            field=models.CharField(max_length=200, null=True),
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
            field=models.ManyToManyField(null=True, to='api2.Topic'),
        ),
    ]
