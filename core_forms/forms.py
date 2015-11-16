from django.forms import modelformset_factory
from django import forms
from api2.models import *


class AlternativeForm(forms.ModelForm):
    class Meta:
        model = Alternative
        exclude = []




class AuthorForm(forms.ModelForm):
    class Meta:
        model = Author
        exclude = []

class SourceForm(forms.ModelForm):

    sujet = forms.CharField(max_length=100)
    message = forms.CharField(widget=forms.Textarea)
    envoyeur = forms.EmailField(label="Votre adresse mail")
    renvoi = forms.BooleanField(help_text="Cochez si vous souhaitez obtenir une copie du mail envoyé.", required=False)
    class Meta:
        model = Source
        exclude = []