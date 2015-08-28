# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('maquette', '0003_auto_20150806_1226'),
    ]

    operations = [
        migrations.DeleteModel(
            name='mails',
        ),
    ]
