# Generated by Django 4.1.5 on 2023-03-13 02:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0003_alter_follow_follower'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='website',
            field=models.URLField(blank=True),
        ),
    ]
