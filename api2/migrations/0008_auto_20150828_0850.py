# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0007_entity_toprint'),
    ]

    operations = [
        migrations.RenameField(
            model_name='relation',
            old_name='name',
            new_name='relationType',
        ),
    ]
