# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0022_auto_20150903_2112'),
    ]

    operations = [
        migrations.AddField(
            model_name='hasimpacton',
            name='impact_type',
            field=models.CharField(max_length=3, choices=[('Pos', 'positive'), ('Neg', 'negative'), ('Neu', 'neutral'), ('U', 'unknown')], default='U'),
        ),
    ]
