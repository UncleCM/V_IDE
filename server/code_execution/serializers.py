from rest_framework import serializers
from .models import CodeExecution

class CodeExecutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeExecution
        fields = ['id', 'code', 'language', 'output', 'error', 'executed_at', 'question_id']
        read_only_fields = ['id', 'executed_at']