# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0005_auto_20150828_0837'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='relation',
            name='toPrint',
        ),
    ]
