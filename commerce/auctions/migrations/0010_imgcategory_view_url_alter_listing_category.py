# Generated by Django 4.2.1 on 2023-07-09 23:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0009_rename_image1_suggestion_image_suggestion_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='imgcategory',
            name='view_url',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AlterField(
            model_name='listing',
            name='category',
            field=models.ForeignKey(blank=True, max_length=100, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='listings', to='auctions.category'),
        ),
    ]
