# Generated by Django 4.1.5 on 2023-01-23 11:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homeApp', '0002_eventmodel_category'),
    ]

    operations = [
        migrations.CreateModel(
            name='LocationModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('slug', models.SlugField(unique=True)),
            ],
        ),
    ]
