# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0016_auto_20150828_1911'),
    ]

    operations = [
        migrations.AddField(
            model_name='hasimpacton',
            name='becauseOf',
            field=models.ForeignKey(default=0, to='api2.Relation', related_name='has_impact_on'),
            preserve_default=False,
        ),
    ]
