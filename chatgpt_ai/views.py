import json
import openai
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.conf import settings
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from .models import ChatSession, ChatMessage

# Set OpenAI API key
openai.api_key = settings.OPENAI_API_KEY

@login_required
def ai_assistant(request):
    user = request.user
    
    # Get or create a chat session
    chat_sessions = ChatSession.objects.filter(user=user).order_by('-created_at')
    
    if chat_sessions.exists():
        current_session = chat_sessions.first()
    else:
        current_session = ChatSession.objects.create(user=user)
    
    # Get chat history
    messages = ChatMessage.objects.filter(session=current_session)
    
    # Get templates based on user role
    if user.is_teacher():
        templates = [
            {"title": "Create Lesson Plan", "prompt": "Help me create a lesson plan for teaching [topic]"},
            {"title": "Generate Quiz", "prompt": "Generate 5 quiz questions about [topic] for [grade level] students"},
            {"title": "Assignment Feedback", "prompt": "Help me write feedback for a student assignment on [topic]"},
            {"title": "Explain Concept", "prompt": "Explain [difficult concept] in simple terms for my students"},
        ]
    else:
        templates = [
            {"title": "Explain a Concept", "prompt": "Can you explain [concept] in simple terms?"},
            {"title": "Help with Homework", "prompt": "I need help solving this [subject] problem: [problem details]"},
            {"title": "Study Tips", "prompt": "What are some effective ways to study for my [subject] exam?"},
            {"title": "Check My Understanding", "prompt": "Can you check if my understanding of [concept] is correct? Here's what I think: [your explanation]"},
        ]
    
    context = {
        'chat_sessions': chat_sessions,
        'current_session': current_session,
        'messages': messages,
        'templates': templates,
    }
    
    return render(request, 'chatgpt_ai/ai_assistant.html', context)

@login_required
@require_POST
@csrf_exempt
def chat_message(request):
    try:
        data = json.loads(request.body)
        message_content = data.get('message')
        session_id = data.get('session_id')
        
        if not message_content or not session_id:
            return JsonResponse({'error': 'Message and session ID are required'}, status=400)
        
        # Get the chat session
        session = get_object_or_404(ChatSession, id=session_id, user=request.user)
        
        # Save user message
        user_message = ChatMessage.objects.create(
            session=session,
            role=ChatMessage.Role.USER,
            content=message_content
        )
        
        # Get chat history for context
        messages = []
        
        # Add system message based on user role
        if request.user.is_teacher():
            system_message = {
                "role": "system", 
                "content": "You are an AI teaching assistant. Help the teacher with creating lesson plans, generating quiz questions, providing feedback templates, and explaining difficult concepts."
            }
        else:
            system_message = {
                "role": "system", 
                "content": "You are an AI learning assistant. Help the student understand concepts, solve problems, and provide study guidance. Explain things clearly and at an appropriate level."
            }
        
        messages.append(system_message)
        
        # Add previous messages for context (limit to last 10)
        previous_messages = ChatMessage.objects.filter(session=session).order_by('timestamp')[:10]
        for msg in previous_messages:
            messages.append({"role": msg.role, "content": msg.content})
        
        # Call OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=1000,
            temperature=0.7,
        )
        
        # Extract response
        ai_response = response.choices[0].message.content
        
        # Save assistant message
        assistant_message = ChatMessage.objects.create(
            session=session,
            role=ChatMessage.Role.ASSISTANT,
            content=ai_response
        )
        
        return JsonResponse({
            'message': ai_response,
            'user_message_id': user_message.id,
            'assistant_message_id': assistant_message.id,
        })
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@login_required
def new_chat(request):
    # Create a new chat session
    session = ChatSession.objects.create(user=request.user)
    
    # Add initial assistant message
    if request.user.is_teacher():
        initial_message = "Hello! I'm your AI teaching assistant. How can I help you today? You can ask me to help create lesson plans, generate quiz questions, or provide feedback on student work."
    else:
        initial_message = "Hello! I'm your AI learning assistant. How can I help you today? You can ask me questions about your coursework, request explanations of difficult concepts, or get help with problem-solving."
    
    ChatMessage.objects.create(
        session=session,
        role=ChatMessage.Role.ASSISTANT,
        content=initial_message
    )
    
    return redirect('ai_assistant')

@login_required
def chat_history(request, session_id):
    session = get_object_or_404(ChatSession, id=session_id, user=request.user)
    messages = ChatMessage.objects.filter(session=session)
    
    # Get all user's chat sessions
    chat_sessions = ChatSession.objects.filter(user=request.user).order_by('-created_at')
    
    # Get templates based on user role
    if request.user.is_teacher():
        templates = [
            {"title": "Create Lesson Plan", "prompt": "Help me create a lesson plan for teaching [topic]"},
            {"title": "Generate Quiz", "prompt": "Generate 5 quiz questions about [topic] for [grade level] students"},
            {"title": "Assignment Feedback", "prompt": "Help me write feedback for a student assignment on [topic]"},
            {"title": "Explain Concept", "prompt": "Explain [difficult concept] in simple terms for my students"},
        ]
    else:
        templates = [
            {"title": "Explain a Concept", "prompt": "Can you explain [concept] in simple terms?"},
            {"title": "Help with Homework", "prompt": "I need help solving this [subject] problem: [problem details]"},
            {"title": "Study Tips", "prompt": "What are some effective ways to study for my [subject] exam?"},
            {"title": "Check My Understanding", "prompt": "Can you check if my understanding of [concept] is correct? Here's what I think: [your explanation]"},
        ]
    
    context = {
        'chat_sessions': chat_sessions,
        'current_session': session,
        'messages': messages,
        'templates': templates,
    }
    
    return render(request, 'chatgpt_ai/ai_assistant.html', context)
