# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0029_auto_20150906_1448'),
    ]

    operations = [
        migrations.AddField(
            model_name='behaviour',
            name='topic',
            field=models.ManyToManyField(to='api2.Topic'),
        ),
    ]
