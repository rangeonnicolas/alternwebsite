# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0023_hasimpacton_impact_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='author',
            name='type',
            field=models.CharField(default='U', max_length=1, choices=[('U', 'unset'), ('P', 'real people'), ('O', 'organisation')]),
        ),
    ]
