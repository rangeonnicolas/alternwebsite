from django.forms import modelformset_factory
from django import forms
import api2.models as api2
from core_model.models import *

class AlternativeForm(forms.ModelForm):
    class Meta:
        model = Alternative
        exclude = []

class HabitForm(forms.ModelForm):
    class Meta:
        model = Habit
        exclude = []

class UseAKindOfEntityForm(forms.ModelForm):
    class Meta:
        model = UseAKindOfEntity
        exclude = []

class EntityThatHavePropertiesForm(forms.ModelForm):
    class Meta:
        model = EntityThatHaveProperties
        exclude = []

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        exclude = []

class CompanyForm(forms.ModelForm):
    class Meta:
        model = Company
        exclude = []

class AssociationForm(forms.ModelForm):
    class Meta:
         model = Association
         exclude = []

class BehaviourForm(forms.ModelForm):
    class Meta:
        model = Behaviour
        exclude = []

class TopicForm(forms.ModelForm):
    class Meta:
        model = Topic
        exclude = []


###################################################################

class Api2AlternativeForm(forms.ModelForm):
    class Meta:
        model = api2.Alternative
        exclude = []

class Api2ConsumeAProductForm(forms.ModelForm):
    class Meta:
        model = api2.ConsumeAProduct
        exclude = []

class Api2HabitForm(forms.ModelForm):
    class Meta:
        model = api2.Habit
        exclude = []

class Api2ProductForm(forms.ModelForm):
    class Meta:
        model = api2.Product
        exclude = []

class Api2SourceForm(forms.ModelForm):
    class Meta:
        model = api2.Source
        exclude = []

class Api2NewspaperForm(forms.ModelForm):
    class Meta:
        model = api2.Newspaper
        exclude = []

class Api2BehaviourForm(forms.ModelForm):
    class Meta:
        model = api2.Behaviour
        exclude = []

class Api2hasImpactOnForm(forms.ModelForm):
    class Meta:
        model = api2.HasImpactOn
        exclude = []

class Api2AuthorForm(forms.ModelForm):
    class Meta:
        model = api2.Author
        exclude = []
