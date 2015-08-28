# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('maquette', '0004_auto_20150818_1118'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mails',
            name='email',
            field=models.EmailField(unique=True, max_length=75, verbose_name=b'email'),
        ),
    ]
