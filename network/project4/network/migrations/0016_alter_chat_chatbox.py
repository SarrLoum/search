# Generated by Django 4.2.1 on 2023-05-28 00:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0015_alter_chat_chatbox'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chat',
            name='chatbox',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='chats', to='network.chatbox'),
        ),
    ]
