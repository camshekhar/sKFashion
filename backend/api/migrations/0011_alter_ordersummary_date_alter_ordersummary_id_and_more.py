# Generated by Django 4.0.4 on 2024-05-23 05:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_ordersummary_date_alter_ordersummary_prod'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ordersummary',
            name='date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='ordersummary',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='ordersummary',
            name='prod',
            field=models.JSONField(),
        ),
    ]