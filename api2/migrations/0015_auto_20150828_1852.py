# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0014_auto_20150828_1851'),
    ]

    operations = [
        migrations.AlterField(
            model_name='consumeaproduct',
            name='product',
            field=models.OneToOneField(to='api2.Product'),
        ),
    ]
