from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from ..models import CodeExecution
from ..serializers import CodeExecutionSerializer
from ..services.code_execution_service import CodeExecutionService

class CodeExecutionViewSet(viewsets.ModelViewSet):
    serializer_class = CodeExecutionSerializer
    permission_classes = [AllowAny]
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.execution_service = CodeExecutionService()

    def get_queryset(self):
        return CodeExecution.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        execution = self.execution_service.create_execution(
            code=serializer.validated_data['code'],
            language=serializer.validated_data['language'],
            question_id=serializer.validated_data['question_id']
        )
        
        result_serializer = self.get_serializer(execution)
        return Response(result_serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def by_question(self, request):
        question_id = request.query_params.get('question_id')
        if not question_id:
            return Response(
                {'error': 'question_id is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        executions = self.execution_service.get_question_executions(int(question_id))
        serializer = self.get_serializer(executions, many=True)
        return Response(serializer.data)