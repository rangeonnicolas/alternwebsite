# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0019_auto_20150901_2034'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='entity',
            name='name2',
        ),
        migrations.AddField(
            model_name='hasimpacton',
            name='source',
            field=models.ForeignKey(default=0, to='api2.Source', verbose_name='Source that prooves this impact'),
            preserve_default=False,
        ),
    ]
