# Generated by Django 4.2.1 on 2023-07-03 10:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mail', '0003_wallpaper'),
    ]

    operations = [
        migrations.AddField(
            model_name='email',
            name='spam',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='email',
            name='starred',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='email',
            name='trash',
            field=models.BooleanField(default=False),
        ),
    ]
