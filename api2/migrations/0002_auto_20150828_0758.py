# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='lastname',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='author',
            name='name',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterUniqueTogether(
            name='author',
            unique_together=set([('name', 'lastname')]),
        ),
    ]
