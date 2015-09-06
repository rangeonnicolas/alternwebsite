# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0028_auto_20150904_1509'),
    ]

    operations = [
        migrations.AlterField(
            model_name='source',
            name='topic',
            field=models.ManyToManyField(to='api2.Topic'),
        ),
    ]
