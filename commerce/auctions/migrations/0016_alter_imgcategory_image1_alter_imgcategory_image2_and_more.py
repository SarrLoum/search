# Generated by Django 4.2.1 on 2023-08-11 01:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0015_alter_imgcategory_image1_alter_imgcategory_image2_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imgcategory',
            name='image1',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='imgcategory',
            name='image2',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='imgcategory',
            name='image3',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
