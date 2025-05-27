from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Count, Avg
from django.http import HttpResponseForbidden
from .models import Course, Assignment
from .forms import CourseForm, AssignmentForm, EnrollmentForm
from submissions.models import Submission

@login_required
def dashboard(request):
    user = request.user
    
    if user.is_teacher():
        # Teacher dashboard
        courses = Course.objects.filter(teacher=user)
        course_count = courses.count()
        
        # Get student count across all courses
        student_count = sum(course.students.count() for course in courses)
        
        # Get pending assignments (with submissions)
        assignments = Assignment.objects.filter(course__teacher=user)
        pending_submissions = Submission.objects.filter(
            assignment__course__teacher=user,
            graded=False
        ).count()
        
        context = {
            'courses': courses,
            'course_count': course_count,
            'student_count': student_count,
            'pending_submissions': pending_submissions,
            'recent_assignments': assignments.order_by('-created_at')[:5]
        }
        return render(request, 'courses/teacher_dashboard.html', context)
    else:
        # Student dashboard
        courses = Course.objects.filter(students=user)
        
        # Get assignment stats
        completed_assignments = Submission.objects.filter(
            student=user,
            submitted=True
        ).count()
        
        all_assignments = Assignment.objects.filter(course__students=user).count()
        pending_assignments = all_assignments - completed_assignments
        
        context = {
            'courses': courses,
            'course_count': courses.count(),
            'completed_assignments': completed_assignments,
            'pending_assignments': pending_assignments,
            'upcoming_assignments': Assignment.objects.filter(
                course__students=user
            ).order_by('due_date')[:5]
        }
        return render(request, 'courses/student_dashboard.html', context)

@login_required
def course_list(request):
    user = request.user

    # Bu xamma kurslarni olish!

    # courses = Course.objects.all()
    # return render(request, 'courses/course_list.html', {'courses': courses})

    if user.is_teacher():
        courses = Course.objects.all()
        return render(request, 'courses/course_list.html', {'courses': courses})
    else:
        courses = Course.objects.filter(students=user)
        return render(request, 'courses/course_list.html', {'courses': courses})

@login_required
def course_detail(request, pk):
    course = get_object_or_404(Course, pk=pk)
    user = request.user
    
    # Check if user is teacher of this course or enrolled student
    if user != course.teacher and user not in course.students.all():
        return HttpResponseForbidden("You don't have access to this course")
    
    assignments = Assignment.objects.filter(course=course)
    
    context = {
        'course': course,
        'assignments': assignments,
        'is_teacher': user == course.teacher,
    }
    
    return render(request, 'courses/course_detail.html', context)

@login_required
def create_course(request):
    if not request.user.is_teacher():
        return HttpResponseForbidden("Only teachers can create courses")
    
    if request.method == 'POST':
        form = CourseForm(request.POST)
        if form.is_valid():
            course = form.save(commit=False)
            course.teacher = request.user
            course.save()
            messages.success(request, f'Course "{course.title}" has been created!')
            return redirect('course_detail', pk=course.pk)
    else:
        form = CourseForm()
    
    return render(request, 'courses/course_form.html', {'form': form})

@login_required
def edit_course(request, pk):
    course = get_object_or_404(Course, pk=pk)
    
    if request.user != course.teacher:
        return HttpResponseForbidden("You don't have permission to edit this course")
    
    if request.method == 'POST':
        form = CourseForm(request.POST, instance=course)
        if form.is_valid():
            form.save()
            messages.success(request, f'Course "{course.title}" has been updated!')
            return redirect('course_detail', pk=course.pk)
    else:
        form = CourseForm(instance=course)
    
    return render(request, 'courses/course_form.html', {'form': form, 'course': course})

@login_required
def create_assignment(request, course_id):
    course = get_object_or_404(Course, pk=course_id)
    
    if request.user != course.teacher:
        return HttpResponseForbidden("Only the course teacher can create assignments")
    
    if request.method == 'POST':
        form = AssignmentForm(request.POST)
        if form.is_valid():
            assignment = form.save(commit=False)
            assignment.course = course
            assignment.save()
            messages.success(request, f'Assignment "{assignment.title}" has been created!')
            return redirect('course_detail', pk=course.pk)
    else:
        form = AssignmentForm()
    
    return render(request, 'courses/assignment_form.html', {
        'form': form,
        'course': course
    })

@login_required
def browse_courses(request):
    if not request.user.is_student():
        return HttpResponseForbidden("This page is for students only")
    
    # Get courses the student is not enrolled in
    enrolled_courses = request.user.courses_enrolled.all()
    
    if request.method == 'POST':
        form = EnrollmentForm(request.POST)
        if form.is_valid():
            enrollment_code = form.cleaned_data['enrollment_code']
            try:
                course = Course.objects.get(enrollment_code=enrollment_code)
                if request.user in course.students.all():
                    messages.warning(request, f'You are already enrolled in "{course.title}"')
                else:
                    course.students.add(request.user)
                    messages.success(request, f'Successfully enrolled in "{course.title}"')
                return redirect('course_detail', pk=course.pk)
            except Course.DoesNotExist:
                messages.error(request, 'Invalid enrollment code. Please try again.')
    else:
        form = EnrollmentForm()
    
    return render(request, 'courses/browse_courses.html', {'form': form})
