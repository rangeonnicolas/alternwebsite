# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='relation',
            name='to_rel',
            field=models.ForeignKey(related_name='relations_to', to='api2.Entity'),
        ),
    ]
