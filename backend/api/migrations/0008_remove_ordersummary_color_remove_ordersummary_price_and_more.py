# Generated by Django 4.0.4 on 2024-05-23 05:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_ordersummary_transaction_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ordersummary',
            name='color',
        ),
        migrations.RemoveField(
            model_name='ordersummary',
            name='price',
        ),
        migrations.RemoveField(
            model_name='ordersummary',
            name='quantity',
        ),
        migrations.AlterField(
            model_name='ordersummary',
            name='paymentStatus',
            field=models.CharField(choices=[('pending', 'pending'), ('success', 'success'), ('failed', 'failed')], default='pending', max_length=20),
        ),
        migrations.AlterField(
            model_name='ordersummary',
            name='prod',
            field=models.CharField(default='null', max_length=200),
        ),
    ]
