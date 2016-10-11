# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-08-02 02:48
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core_model', '0002_source'),
    ]

    operations = [
        migrations.CreateModel(
            name='OtherBehaviour',
            fields=[
                ('behaviour_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='core_model.Behaviour')),
                ('label_en', models.CharField(max_length=255)),
            ],
            options={
                'abstract': False,
            },
            bases=('core_model.behaviour',),
        ),
        migrations.RemoveField(
            model_name='behaviour',
            name='other',
        ),
    ]