# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0034_auto_20150914_1949'),
    ]

    operations = [
        migrations.CreateModel(
            name='MainImpact',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('via', models.CharField(max_length=200)),
                ('alternatives', models.ManyToManyField(to='api2.Alternative')),
                ('impactCateg', models.ForeignKey(to='api2.ImpactCateg', verbose_name='has this impact')),
            ],
        ),
        migrations.AlterField(
            model_name='topic',
            name='in_navigation_bar',
            field=models.BooleanField(default=False, verbose_name='appears in main menu'),
        ),
        migrations.AddField(
            model_name='mainimpact',
            name='topics',
            field=models.ManyToManyField(to='api2.Topic'),
        ),
    ]
