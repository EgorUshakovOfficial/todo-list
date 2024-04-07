# Generated by Django 5.0.3 on 2024-04-05 16:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('v1', '0004_feature_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='feature',
            name='status',
            field=models.CharField(choices=[('To do', 'to-do'), ('In process', 'in-progress'), ('Complete', 'completed')], default='to-do', max_length=11),
        ),
        migrations.AddField(
            model_name='userstory',
            name='status',
            field=models.CharField(choices=[('To do', 'to-do'), ('In process', 'in-progress'), ('Complete', 'completed')], default='to-do', max_length=11),
        ),
        migrations.AlterField(
            model_name='projectworkflow',
            name='status',
            field=models.CharField(choices=[('In process', 'in-progress'), ('Complete', 'completed')], default='in-progress', max_length=11),
        ),
    ]
