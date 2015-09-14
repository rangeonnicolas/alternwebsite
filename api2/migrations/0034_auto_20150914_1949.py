# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0033_source_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='topic',
            name='description_en',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='topic',
            name='in_navigation_bar',
            field=models.BooleanField(default=False),
        ),

    ]
