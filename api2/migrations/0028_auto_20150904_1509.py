# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0027_source_topic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='source',
            name='topic',
            field=models.ManyToManyField(to='api2.Topic'),
        ),
    ]
