# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0003_auto_20150828_0802'),
    ]

    operations = [
        migrations.AddField(
            model_name='relation',
            name='testt',
            field=models.CharField(default='f', max_length=1000),
            preserve_default=False,
        ),
    ]
