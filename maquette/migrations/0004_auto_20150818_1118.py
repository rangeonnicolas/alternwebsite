# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('maquette', '0003_auto_20150806_1226'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mails',
            name='email',
            field=models.EmailField(unique=True, max_length=254, verbose_name='email'),
        ),
    ]
