# Generated by Django 4.1.5 on 2023-01-28 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homeApp', '0008_eventmodel_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventmodel',
            name='eventFinishDate',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='eventmodel',
            name='eventStartDate',
            field=models.DateTimeField(),
        ),
    ]