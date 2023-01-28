# Generated by Django 4.1.5 on 2023-01-24 12:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('homeApp', '0008_eventmodel_slug'),
        ('profileApp', '0004_followedeventsmodel'),
    ]

    operations = [
        migrations.CreateModel(
            name='ArtistsOnEventModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('artist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='profileApp.artistsmodel')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='homeApp.eventmodel')),
            ],
        ),
    ]