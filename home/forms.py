from django import forms
from home.models import mails

class ContactForm(forms.ModelForm):
    """Contact form of the temporary homepage"""
    class Meta:
        model = mails
        fields = ["email"]
