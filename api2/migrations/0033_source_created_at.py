# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0032_auto_20150908_1422'),
    ]

    operations = [
        migrations.AddField(
            model_name='source',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2015, 9, 8, 14, 29, 50, 353800, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
