# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('maquette', '0002_auto_20150806_1133'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mails',
            name='email',
            field=models.EmailField(verbose_name='Your email:', max_length=254, unique=True),
        ),
    ]
