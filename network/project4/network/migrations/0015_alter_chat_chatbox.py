# Generated by Django 4.2.1 on 2023-05-28 00:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0014_alter_chatbox_user1_alter_chatbox_user2'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chat',
            name='chatbox',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='chats', to='network.chatbox'),
        ),
    ]
