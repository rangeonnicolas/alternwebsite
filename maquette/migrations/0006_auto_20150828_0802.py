# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('maquette', '0005_auto_20150828_0745'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mails',
            name='email',
            field=models.EmailField(verbose_name='email', max_length=254, unique=True),
        ),
    ]
