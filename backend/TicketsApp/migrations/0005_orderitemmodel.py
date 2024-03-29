# Generated by Django 4.1.5 on 2023-01-24 22:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('TicketsApp', '0004_ordermodel'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderItemModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(blank=True, default=0, null=True)),
                ('order', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='orderItem', to='TicketsApp.ordermodel')),
                ('ticket', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='TicketsApp.ticketmodel')),
            ],
        ),
    ]
