# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Entity',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Relation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Compagny',
            fields=[
                ('entity_ptr', models.OneToOneField(auto_created=True, primary_key=True, parent_link=True, to='api2.Entity', serialize=False)),
                ('raisonSociale', models.CharField(max_length=255)),
            ],
            bases=('api2.entity',),
        ),
        migrations.CreateModel(
            name='Labo',
            fields=[
                ('entity_ptr', models.OneToOneField(auto_created=True, primary_key=True, parent_link=True, to='api2.Entity', serialize=False)),
                ('ville', models.CharField(max_length=255)),
            ],
            bases=('api2.entity',),
        ),
        migrations.AddField(
            model_name='relation',
            name='from_rel',
            field=models.ForeignKey(to='api2.Entity', related_name='relations_from'),
        ),
        migrations.AddField(
            model_name='relation',
            name='to_rel',
            field=models.ForeignKey(to='api2.Entity', related_name='relation_to'),
        ),
    ]
