"""
Initial migration for code execution app

This migration:
1. Creates the code_execution table
2. Adds indexes for performance
"""

from django.db import migrations, models

class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='CodeExecution',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.TextField()),
                ('language', models.CharField(choices=[('python', 'Python'), ('javascript', 'JavaScript'), ('typescript', 'TypeScript'), ('java', 'Java'), ('csharp', 'C#'), ('php', 'PHP')], max_length=20)),
                ('output', models.TextField(blank=True, null=True)),
                ('error', models.TextField(blank=True, null=True)),
                ('executed_at', models.DateTimeField(auto_now_add=True)),
                ('question_id', models.IntegerField()),
            ],
            options={
                'ordering': ['-executed_at'],
            },
        ),
        migrations.AddIndex(
            model_name='codeexecution',
            index=models.Index(fields=['question_id'], name='code_exec_questio_e8701a_idx'),
        ),
        migrations.AddIndex(
            model_name='codeexecution',
            index=models.Index(fields=['executed_at'], name='code_exec_execute_f1ea72_idx'),
        ),
    ]