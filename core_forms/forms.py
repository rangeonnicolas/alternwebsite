from django.forms import modelformset_factory
from django import forms
import api2.models as api2
from core_model.models import *

#TODO: changer ts les exclude en mettant le nom des fileds (secu:https://docs.djangoproject.com/fr/1.9/topics/forms/modelforms/#selecting-the-fields-to-use)
#TODO: vor les fncs de fabrique : https://docs.djangoproject.com/fr/1.9/topics/forms/modelforms/#modelform-factory-function
class AlternativeForm(forms.ModelForm):
    name = forms.CharField(max_length=100)
    class Meta:
        model = TestAlternative
        exclude = []


class HabitForm(forms.ModelForm):
    class Meta:
        model = TestHabit
        exclude = []

class UseAKindOfEntityForm(forms.ModelForm):
    class Meta:
        model = TestUseAKindOfEntity
        exclude = []

class EntityThatHavePropertiesForm(forms.ModelForm):
    class Meta:
        model = TestEntityThatHaveProperties
        exclude = []

class ProductForm(forms.ModelForm):
    class Meta:
        model = TestProduct
        exclude = []

class CompanyForm(forms.ModelForm):
    class Meta:
        model = TestCompany
        exclude = []

class AssociationForm(forms.ModelForm):
    class Meta:
         model = TestAssociation
         exclude = []

class BehaviourForm(forms.ModelForm):
    class Meta:
        model = TestBehaviour
        exclude = []

class OtherBehaviourForm(forms.ModelForm):
    class Meta:
        model = TestOtherBehaviour
        exclude = []

class TopicForm(forms.ModelForm):

    #def clean_name(self):
    #    if self.cleaned_data['name'] == 'jj':
    #        raise forms.ValidationError(
    #            "oh non!"
    #        )
    #    return "bobo"

    #def clean(self):
        #cleaned_data = super(TopicForm, self).clean()
        #raise forms.ValidationError(
        #        "Did not send for 'help' in the subject despite "
        #        "CC'ing yourself."
        #    )
    class Meta:
        model = TestTopic
        exclude = []
