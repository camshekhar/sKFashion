# Generated by Django 4.0.4 on 2024-04-26 03:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='mobile',
            field=models.CharField(default='999999999', max_length=10),
        ),
    ]
