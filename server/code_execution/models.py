from django.db import models
from django.contrib.auth.models import User

class CodeExecution(models.Model):
    LANGUAGE_CHOICES = [
        ('python', 'Python'),
        ('javascript', 'JavaScript'),
        ('typescript', 'TypeScript'),
        ('java', 'Java'),
        ('csharp', 'C#'),
        ('php', 'PHP'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.TextField()
    language = models.CharField(max_length=20, choices=LANGUAGE_CHOICES)
    output = models.TextField(null=True, blank=True)
    error = models.TextField(null=True, blank=True)
    executed_at = models.DateTimeField(auto_now_add=True)
    question_id = models.IntegerField()

    class Meta:
        ordering = ['-executed_at']
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['question_id']),
            models.Index(fields=['executed_at']),
        ]