# Generated by Django 5.0.2 on 2024-02-18 04:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("store", "0024_alter_productimage_options"),
    ]

    operations = [
        migrations.AlterField(
            model_name="orderitem",
            name="unit_price",
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=6),
        ),
    ]