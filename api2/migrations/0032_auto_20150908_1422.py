# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0031_auto_20150908_1421'),
    ]

    operations = [
        migrations.AlterField(
            model_name='source',
            name='publication_date',
            field=models.DateField(null=True),
        ),
    ]
