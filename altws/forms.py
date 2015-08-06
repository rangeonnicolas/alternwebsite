__author__ = 'developpeur'

from django import forms
from maquette.models import mails


class ContactForm(forms.ModelForm):
    class Meta:
        model = mails
        fields = ["email"]

    #email__ = forms.EmailField(label="Email", required=True)
