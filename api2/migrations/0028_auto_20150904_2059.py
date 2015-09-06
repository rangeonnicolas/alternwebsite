# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0027_source_topic'),
    ]

    operations = [
        migrations.CreateModel(
            name='Component',
            fields=[
                ('entity_ptr', models.OneToOneField(parent_link=True, to='api2.Entity', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
            bases=('api2.entity',),
        ),
        migrations.CreateModel(
            name='Phenomenon',
            fields=[
                ('entity_ptr', models.OneToOneField(parent_link=True, to='api2.Entity', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
            bases=('api2.entity',),
        ),
        migrations.CreateModel(
            name='Policy',
            fields=[
                ('entity_ptr', models.OneToOneField(parent_link=True, to='api2.Entity', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
            bases=('api2.entity',),
        ),
        migrations.CreateModel(
            name='Ressource',
            fields=[
                ('entity_ptr', models.OneToOneField(parent_link=True, to='api2.Entity', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
            bases=('api2.entity',),
        ),
        migrations.AlterField(
            model_name='source',
            name='topic',
            field=models.ManyToManyField(to='api2.Topic'),
        ),
    ]
