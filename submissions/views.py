from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponseForbidden
from django.utils import timezone
from .models import Submission
from .forms import SubmissionForm, GradingForm
from courses.models import Assignment, Course

@login_required
def assignment_list(request):
    user = request.user
    
    if user.is_teacher():
        # For teachers, show assignments they've created
        assignments = Assignment.objects.filter(course__teacher=user)
        
        # Get submission stats
        for assignment in assignments:
            assignment.submission_count = assignment.submissions.filter(submitted=True).count()
            assignment.student_count = assignment.course.students.count()
        
        return render(request, 'submissions/teacher_assignment_list.html', {
            'assignments': assignments
        })
    else:
        # For students, show assignments from enrolled courses
        assignments = Assignment.objects.filter(course__students=user)
        
        # Get submission status for each assignment
        for assignment in assignments:
            try:
                submission = Submission.objects.get(assignment=assignment, student=user)
                assignment.submission_status = 'Submitted' if submission.submitted else 'Draft'
                assignment.submission_id = submission.id
                assignment.is_graded = submission.graded
                assignment.score = submission.score
            except Submission.DoesNotExist:
                assignment.submission_status = 'Not Started'
        
        return render(request, 'submissions/student_assignment_list.html', {
            'assignments': assignments
        })

@login_required
def assignment_detail(request, pk):
    assignment = get_object_or_404(Assignment, pk=pk)
    user = request.user
    
    # Check if user has access to this assignment
    if user.is_teacher():
        if assignment.course.teacher != user:
            return HttpResponseForbidden("You don't have access to this assignment")
        
        # For teachers, show all submissions
        submissions = Submission.objects.filter(assignment=assignment, submitted=True)
        return render(request, 'submissions/teacher_assignment_detail.html', {
            'assignment': assignment,
            'submissions': submissions,
        })
    else:
        # Check if student is enrolled in the course
        if user not in assignment.course.students.all():
            return HttpResponseForbidden("You don't have access to this assignment")
        
        # For students, show their submission or submission form
        try:
            submission = Submission.objects.get(assignment=assignment, student=user)
        except Submission.DoesNotExist:
            submission = None
        
        if request.method == 'POST':
            form = SubmissionForm(request.POST, request.FILES, instance=submission)
            if form.is_valid():
                submission = form.save(commit=False)
                submission.student = user
                submission.assignment = assignment
                
                # Check if student is submitting or saving as draft
                if 'submit' in request.POST:
                    submission.submitted = True
                    submission.submission_date = timezone.now()
                    messages.success(request, 'Assignment submitted successfully!')
                else:
                    messages.success(request, 'Draft saved successfully!')
                
                submission.save()
                return redirect('assignment_detail', pk=assignment.pk)
        else:
            form = SubmissionForm(instance=submission)
        
        return render(request, 'submissions/student_assignment_detail.html', {
            'assignment': assignment,
            'submission': submission,
            'form': form,
        })

@login_required
def grade_submission(request, pk):
    submission = get_object_or_404(Submission, pk=pk)
    user = request.user
    
    # Only the teacher of the course can grade submissions
    if not user.is_teacher() or submission.assignment.course.teacher != user:
        return HttpResponseForbidden("You don't have permission to grade this submission")
    
    if request.method == 'POST':
        form = GradingForm(request.POST, instance=submission)
        if form.is_valid():
            submission = form.save(commit=False)
            submission.graded = True
            submission.save()
            messages.success(request, 'Submission graded successfully!')
            return redirect('submission_list', assignment_id=submission.assignment.id)
    else:
        form = GradingForm(instance=submission)
    
    return render(request, 'submissions/grade_submission.html', {
        'submission': submission,
        'form': form,
    })

@login_required
def submission_list(request, assignment_id):
    assignment = get_object_or_404(Assignment, pk=assignment_id)
    user = request.user
    
    # Only the teacher of the course can view all submissions
    if not user.is_teacher() or assignment.course.teacher != user:
        return HttpResponseForbidden("You don't have permission to view these submissions")
    
    submissions = Submission.objects.filter(assignment=assignment, submitted=True)
    
    return render(request, 'submissions/submission_list.html', {
        'assignment': assignment,
        'submissions': submissions,
    })
