from django.db import models
from users.models import CustomUser
from courses.models import Assignment

class Submission(models.Model):
    student = models.ForeignKey(
        CustomUser, 
        on_delete=models.CASCADE, 
        related_name='submissions'
    )
    assignment = models.ForeignKey(
        Assignment, 
        on_delete=models.CASCADE, 
        related_name='submissions'
    )
    content = models.TextField()
    file = models.FileField(upload_to='submissions/', blank=True, null=True)
    submitted = models.BooleanField(default=False)
    submission_date = models.DateTimeField(null=True, blank=True)
    graded = models.BooleanField(default=False)
    score = models.FloatField(null=True, blank=True)
    feedback = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['student', 'assignment']
    
    def __str__(self):
        return f"{self.student.username}'s submission for {self.assignment.title}"
    
    @property
    def is_late(self):
        if self.submitted and self.submission_date:
            return self.submission_date > self.assignment.due_date
        return False
