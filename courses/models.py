from django.db import models
from django.utils.crypto import get_random_string
from users.models import CustomUser

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    teacher = models.ForeignKey(
        CustomUser, 
        on_delete=models.CASCADE, 
        related_name='courses_teaching'
    )
    students = models.ManyToManyField(
        CustomUser, 
        related_name='courses_enrolled', 
        blank=True
    )
    enrollment_code = models.CharField(max_length=10, unique=True, blank=True)
    subject_area = models.CharField(max_length=100)
    level = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        if not self.enrollment_code:
            self.enrollment_code = get_random_string(length=8).upper()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title

class Assignment(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    course = models.ForeignKey(
        Course, 
        on_delete=models.CASCADE, 
        related_name='assignments'
    )
    due_date = models.DateTimeField()
    points_possible = models.PositiveIntegerField(default=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.title} - {self.course.title}"
