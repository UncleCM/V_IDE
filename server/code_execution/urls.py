from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.execution_view import CodeExecutionViewSet

router = DefaultRouter()
router.register(r'executions', CodeExecutionViewSet, basename='code-execution')

urlpatterns = [
    path('', include(router.urls)),
]