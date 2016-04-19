from django.forms import modelformset_factory
from django import forms
from api2.models import *


class AlternativeForm(forms.ModelForm):
    class Meta:
        model = Alternative
        exclude = []

class ConsumeAProductForm(forms.ModelForm):
    class Meta:
        model = ConsumeAProduct
        exclude = []

class HabitForm(forms.ModelForm):
    class Meta:
        model = Habit
        exclude = []

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        exclude = []

class SourceForm(forms.ModelForm):
    class Meta:
        model = Source
        exclude = []

class NewspaperForm(forms.ModelForm):
    class Meta:
        model = Newspaper
        exclude = []

class BehaviourForm(forms.ModelForm):
    class Meta:
        model = Behaviour
        exclude = []

class hasImpactOnForm(forms.ModelForm):
    class Meta:
        model = HasImpactOn
        exclude = []




class AuthorForm(forms.ModelForm):
    class Meta:
        model = Author
        exclude = []














class SourceTestForm(forms.ModelForm):
    aa=forms.CharField(max_length=100,initial=Source.alternative_set)
    class Meta:
        model = Source
        #exclude = []
        fields = ['url','authors']
