# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('maquette', '0004_delete_mails'),
    ]

    operations = [
        migrations.CreateModel(
            name='mails',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('email', models.EmailField(verbose_name='email', unique=True, max_length=254)),
            ],
        ),
    ]
