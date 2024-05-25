# Generated by Django 4.0.4 on 2024-05-23 04:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_ordersummary_add_ordersummary_color_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='ordersummary',
            name='paymentStatus',
            field=models.CharField(choices=[('pending', 'pending'), ('success', 'success'), ('failed', 'failed')], default='pending', max_length=20),
            preserve_default=False,
        ),
    ]