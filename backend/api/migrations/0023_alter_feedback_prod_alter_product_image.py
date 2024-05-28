# Generated by Django 4.0.4 on 2024-05-28 00:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_alter_cart_cust'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='prod',
            field=models.ForeignKey(default='0', on_delete=django.db.models.deletion.CASCADE, to='api.product'),
        ),
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(default='prod_img.jpg', upload_to='images'),
        ),
    ]