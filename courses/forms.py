from django import forms
from .models import Course, Assignment

class CourseForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = ['title', 'description', 'subject_area', 'level', 'start_date', 'end_date']
        widgets = {
            'start_date': forms.DateInput(attrs={'type': 'date'}),
            'end_date': forms.DateInput(attrs={'type': 'date'}),
        }

class AssignmentForm(forms.ModelForm):
    class Meta:
        model = Assignment
        fields = ['title', 'description', 'due_date', 'points_possible']
        widgets = {
            'due_date': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
        }

class EnrollmentForm(forms.Form):
    enrollment_code = forms.CharField(
        max_length=10, 
        label="Course Enrollment Code",
        widget=forms.TextInput(attrs={'placeholder': 'Enter enrollment code'})
    )

