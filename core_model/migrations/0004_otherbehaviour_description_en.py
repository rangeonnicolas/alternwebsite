# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-08-02 02:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core_model', '0003_auto_20160802_0248'),
    ]

    operations = [
        migrations.AddField(
            model_name='otherbehaviour',
            name='description_en',
            field=models.TextField(default=None),
            preserve_default=False,
        ),
    ]
