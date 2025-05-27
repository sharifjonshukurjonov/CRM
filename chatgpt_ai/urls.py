from django.urls import path
from . import views

urlpatterns = [
    path('', views.ai_assistant, name='ai_assistant'),
    path('chat/', views.chat_message, name='chat_message'),
    path('new-chat/', views.new_chat, name='new_chat'),
    path('history/<int:session_id>/', views.chat_history, name='chat_history'),
]
