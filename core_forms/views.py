from django.shortcuts import render
from core_forms.forms import *
from django.forms import inlineformset_factory
import json
from django.http import JsonResponse,HttpResponse
from django.forms.models import modelform_factory
from core_forms.models import *
from django.utils.safestring import SafeString

# Create your views here.

def model_post_form(request, modelName, formId=''):

    try:
        formId = request.GET["formId"]
    except:
        pass

    try:
        ModelForm = modelform_factory(eval(modelName),exclude=())
    except NameError:
        return JsonResponse({'errors': 'Class {0} doesn\'t exists in models'.format(modelName)})

    if request.method == 'POST':
    #if 1:

        #if request.is_ajax():
        if 1:

            form = ModelForm(request.POST)

            if form.is_valid(): # Nous vérifions que les données envoyées sont valides
                #form.save()
                return JsonResponse({'success': '/success'})

    else:
        form = ModelForm()
        return render(request, 'core_forms/formOnly.html', locals())
        #return JsonResponse({'errors': 'Only POST requests are allowed'})

def alternative(request):

    form_conf = {
            'form1': {
                'to_rel' : {
                    'type': 'polymorphicForeignKey',
                    'classes': [
                        ['Habit','Une habitude de vie'],
                        ['ConsumeAProduct','Consommer un meilleur produit']
                    ]
                }
            }
        }
    form_conf = json.dumps(form_conf)
    form_conf = SafeString(form_conf) # when rendered in the template, the quotes are transformed in '&quot;'. This is not what we want as form_conf will be printed in a JS script, not as a HtmL string

    form = AlternativeForm()
    form2 = AlternativeForm()
    modelName= 'Alternative'
    return render(request, 'core_forms/source.html', locals())