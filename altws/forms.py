__author__ = 'developpeur'

from django import forms


class ContactForm(forms.Form):
    mail = forms.EmailField(label="Email")
