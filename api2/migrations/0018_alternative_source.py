# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0017_hasimpacton_becauseof'),
    ]

    operations = [
        migrations.AddField(
            model_name='alternative',
            name='source',
            field=models.ForeignKey(null=True, to='api2.Source'),
        ),
    ]
