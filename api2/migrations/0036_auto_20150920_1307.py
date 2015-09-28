# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0035_auto_20150920_1243'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mainimpact',
            name='alternatives',
        ),

    ]
