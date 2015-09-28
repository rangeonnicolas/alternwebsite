# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0036_auto_20150920_1307'),
    ]

    operations = [
        migrations.CreateModel(
            name='AlternativeToMainImpact',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
            ],
        ),
        migrations.AddField(
            model_name='alternativetomainimpact',
            name='from_rel',
            field=models.ForeignKey(related_name='alternatives', to='api2.MainImpact', verbose_name='This Main Impact'),
        ),
        migrations.AddField(
            model_name='alternativetomainimpact',
            name='sources',
            field=models.ManyToManyField(to='api2.Source'),
        ),
        migrations.AddField(
            model_name='alternativetomainimpact',
            name='to_rel',
            field=models.ForeignKey(related_name='is_alternative_of_main_impact', to='api2.Behaviour', verbose_name='has this alternative'),
        ),
    ]
