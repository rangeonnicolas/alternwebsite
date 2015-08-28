# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0006_remove_relation_toprint'),
    ]

    operations = [
        migrations.AddField(
            model_name='entity',
            name='toPrint',
            field=models.CharField(max_length=1000, default='test'),
            preserve_default=False,
        ),
    ]
