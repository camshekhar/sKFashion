# Generated by Django 4.0.4 on 2024-05-26 11:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_alter_ordersummary_transaction_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ordersummary',
            name='transit_status',
            field=models.CharField(choices=[('Ordered', 'Ordered'), ('Shipped', 'Shipped'), ('In Transit', 'In Transit'), ('Delivered', 'Delivered'), ('Cancelled', 'Cancelled')], default='Ordered', max_length=20),
        ),
    ]
