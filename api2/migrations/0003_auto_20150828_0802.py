# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0002_auto_20150828_0758'),
    ]

    operations = [
        migrations.AlterField(
            model_name='relationtype',
            name='propagation_type',
            field=models.CharField(choices=[('U', 'unset'), ('P', 'propagates'), ('R', 'restricts')], default='U', max_length=1),
        ),
    ]
