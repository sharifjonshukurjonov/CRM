from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('courses/', views.course_list, name='course_list'),
    path('courses/<int:pk>/', views.course_detail, name='course_detail'),
    path('courses/create/', views.create_course, name='create_course'),
    path('courses/<int:pk>/edit/', views.edit_course, name='edit_course'),
    path('courses/<int:course_id>/assignments/create/', views.create_assignment, name='create_assignment'),
    path('courses/browse/', views.browse_courses, name='browse_courses'),
]
