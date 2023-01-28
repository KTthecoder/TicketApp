# Generated by Django 4.1.5 on 2023-01-23 11:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('homeApp', '0003_locationmodel'),
    ]

    operations = [
        migrations.AddField(
            model_name='eventmodel',
            name='location',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='homeApp.locationmodel'),
            preserve_default=False,
        ),
    ]