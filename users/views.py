from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView, UpdateView
from django.contrib.messages.views import SuccessMessageMixin
from .models import CustomUser
from .forms import CustomUserCreationForm, CustomUserChangeForm

class SignUpView(SuccessMessageMixin, CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'
    success_message = "Your account was created successfully. You can now log in."
    
    def form_valid(self, form):
        response = super().form_valid(form)
        # Auto-login after registration
        login(self.request, self.object)
        return redirect('dashboard')

@login_required
def profile_view(request):
    return render(request, 'users/profile.html')

class ProfileUpdateView(SuccessMessageMixin, UpdateView):
    model = CustomUser
    form_class = CustomUserChangeForm
    template_name = 'users/profile_edit.html'
    success_url = reverse_lazy('profile')
    success_message = "Your profile was updated successfully."
    
    def get_object(self):
        return self.request.user
