# Generated by Django 4.2.1 on 2023-05-27 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0008_chat_chatbox'),
    ]

    operations = [
        migrations.AddField(
            model_name='chatbox',
            name='name',
            field=models.CharField(default=None, max_length=100),
        ),
    ]
