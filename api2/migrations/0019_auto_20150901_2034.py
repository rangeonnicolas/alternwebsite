# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api2', '0018_alternative_source'),
    ]

    operations = [
        migrations.AddField(
            model_name='entity',
            name='name2',
            field=models.CharField(default='foo', max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='alternative',
            name='from_rel',
            field=models.ForeignKey(to='api2.HasImpactOn', related_name='alternatives', verbose_name='This impact'),
        ),
        migrations.AlterField(
            model_name='alternative',
            name='to_rel',
            field=models.ForeignKey(to='api2.Behaviour', related_name='is_alternative_of', verbose_name='has this alternative'),
        ),
        migrations.AlterField(
            model_name='consumeaproduct',
            name='product',
            field=models.OneToOneField(to='api2.Product', verbose_name='Consume ...'),
        ),
        migrations.AlterField(
            model_name='hasimpacton',
            name='becauseOf',
            field=models.ForeignKey(to='api2.Relation', related_name='has_impact_on', verbose_name='because of'),
        ),
        migrations.AlterField(
            model_name='hasimpacton',
            name='behavior',
            field=models.ForeignKey(to='api2.Behaviour', related_name='has_impact_on', verbose_name='This behaviour'),
        ),
        migrations.AlterField(
            model_name='hasimpacton',
            name='impactCateg',
            field=models.ForeignKey(to='api2.ImpactCateg', verbose_name='has this impact'),
        ),
        migrations.AlterField(
            model_name='relation',
            name='from_rel',
            field=models.ForeignKey(to='api2.Entity', related_name='relations_from', verbose_name='This object'),
        ),
        migrations.AlterField(
            model_name='relation',
            name='relationType',
            field=models.ForeignKey(to='api2.RelationType', verbose_name='has this relation'),
        ),
        migrations.AlterField(
            model_name='relation',
            name='to_rel',
            field=models.ForeignKey(to='api2.Entity', related_name='relations_to', verbose_name='with this object'),
        ),
    ]
