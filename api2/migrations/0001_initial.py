# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Alternative',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Behaviour',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ConsumeAProduct',
            fields=[
                ('behaviour_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='api2.Behaviour')),
            ],
            options={
            },
            bases=('api2.behaviour',),
        ),
        migrations.CreateModel(
            name='Entity',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Compagny',
            fields=[
                ('entity_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='api2.Entity')),
                ('name', models.CharField(max_length=255)),
            ],
            options={
            },
            bases=('api2.entity',),
        ),
        migrations.CreateModel(
            name='Bank',
            fields=[
                ('entity_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='api2.Entity')),
                ('name', models.CharField(max_length=255)),
            ],
            options={
            },
            bases=('api2.entity',),
        ),
        migrations.CreateModel(
            name='Author',
            fields=[
                ('entity_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='api2.Entity')),
                ('name', models.CharField(unique=True, max_length=255)),
                ('lastname', models.CharField(max_length=255, unique=True, null=True)),
            ],
            options={
            },
            bases=('api2.entity',),
        ),
        migrations.CreateModel(
            name='Habit',
            fields=[
                ('behaviour_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='api2.Behaviour')),
                ('name', models.CharField(unique=True, max_length=1000)),
            ],
            options={
            },
            bases=('api2.behaviour',),
        ),
        migrations.CreateModel(
            name='HasImpactOn',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('behavior', models.ForeignKey(related_name=b'has_impact_on', to='api2.Behaviour')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ImpactCateg',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=255)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Language',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('englishName', models.CharField(unique=True, max_length=255)),
                ('localName', models.CharField(unique=True, max_length=255)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Newspaper',
            fields=[
                ('entity_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='api2.Entity')),
                ('name', models.CharField(unique=True, max_length=255)),
                ('url', models.URLField(unique=True)),
                ('languages', models.ManyToManyField(to='api2.Language')),
            ],
            options={
            },
            bases=('api2.entity',),
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('entity_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='api2.Entity')),
                ('name', models.CharField(unique=True, max_length=255)),
            ],
            options={
            },
            bases=('api2.entity',),
        ),
        migrations.CreateModel(
            name='Relation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('from_rel', models.ForeignKey(related_name=b'relations_from', to='api2.Entity')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='RelationType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('propagation_type', models.CharField(default=b'U', max_length=1, choices=[(b'U', b'unset'), (b'P', b'propagates'), (b'R', b'restricts')])),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Source',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=5000)),
                ('url', models.URLField(unique=True)),
                ('date', models.DateField()),
                ('authors', models.ManyToManyField(to='api2.Author')),
                ('newspaper', models.ForeignKey(to='api2.Newspaper', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='relation',
            name='name',
            field=models.ForeignKey(to='api2.RelationType'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='relation',
            name='sources',
            field=models.ManyToManyField(to='api2.Source'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='relation',
            name='to_rel',
            field=models.ForeignKey(related_name=b'relations_to', to='api2.Entity'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='hasimpacton',
            name='impactCateg',
            field=models.ForeignKey(to='api2.ImpactCateg'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='consumeaproduct',
            name='product',
            field=models.ForeignKey(to='api2.Product'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='alternative',
            name='from_rel',
            field=models.ForeignKey(related_name=b'relations_alt_from', to='api2.Behaviour'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='alternative',
            name='to_rel',
            field=models.ForeignKey(related_name=b'relations_alt_to', to='api2.Behaviour'),
            preserve_default=True,
        ),
    ]
