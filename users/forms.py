from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    role = forms.ChoiceField(
        choices=CustomUser.Role.choices,
        widget=forms.RadioSelect,
        initial=CustomUser.Role.STUDENT
    )
    
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'role', 'password1', 'password2')
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].help_text = 'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'
        self.fields['email'].required = True

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'bio', 'profile_picture')
