# Generated by Django 4.0.4 on 2024-05-23 06:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_ordersummary_date_alter_ordersummary_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ordersummary',
            name='paymentMode',
            field=models.CharField(default='COD', max_length=20),
        ),
    ]
