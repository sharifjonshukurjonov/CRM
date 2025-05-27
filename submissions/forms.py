from django import forms
from .models import Submission

class SubmissionForm(forms.ModelForm):
    class Meta:
        model = Submission
        fields = ['content', 'file']
        widgets = {
            'content': forms.Textarea(attrs={'rows': 8, 'placeholder': 'Enter your answer here...'}),
        }

class GradingForm(forms.ModelForm):
    class Meta:
        model = Submission
        fields = ['score', 'feedback']
        widgets = {
            'feedback': forms.Textarea(attrs={'rows': 5, 'placeholder': 'Provide feedback to the student...'}),
        }
