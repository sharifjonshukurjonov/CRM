from django.urls import path
from . import views

urlpatterns = [
    path('', views.assignment_list, name='assignment_list'),
    path('<int:pk>/', views.assignment_detail, name='assignment_detail'),
    path('grade/<int:pk>/', views.grade_submission, name='grade_submission'),
    path('list/<int:assignment_id>/', views.submission_list, name='submission_list'),
]
