from django.shortcuts import render
from django.template.defaulttags import csrf_token
from core_forms.forms import *
from django.forms import inlineformset_factory
import datetime as dt
import dateutil.parser as p
import json
from django.http import JsonResponse,HttpResponse
from django.forms.models import modelform_factory
from core_forms.models import *
from django.utils.safestring import SafeString
from django.template.loader import get_template, TemplateDoesNotExist


formNames = {
    'habit_1':           {'model': 'Habit'          , 'view': 'habit1'              },
    'consumeaproduct_1': {'model': 'ConsumeAProduct', 'view': 'consumeaproduct1' },
    'alternative_1':     {'model': 'Alternative',     'view': 'alternative1'},
    'product_1':         {'model': 'Product',         'view': 'product1'},
    'source_1':          {'model': 'Source',          'view': 'source1'},
    'newspaper_1':       {'model': 'Newspaper',       'view': 'newspaper1'},

    'topic_1':           {'model': 'Topic',           'view': 'topic1'},
    'ressource_1':       {'model': 'Ressource',       'view': 'ressource1'},
    'component_1':       {'model': 'Component',       'view': 'component1'},
    'phenomenon_1':      {'model': 'Phenomenon',      'view': 'phenomenon1'},
    'policy_1':          {'model': 'Policy',          'view': 'policy1'},
    'company_1':         {'model': 'Company',         'view': 'company1'},
    'language_1':        {'model': 'Language',        'view': 'language1'},
    'author_1':          {'model': 'Author',          'view': 'author1'},
    'relationType_1':    {'model': 'RelationType',    'view': 'relationType1'},
    'relation_1':        {'model': 'Relation',        'view': 'relation1'},
    'bank_1':            {'model': 'Bank',            'view': 'bank1'},
    'impactCateg_1':     {'model': 'ImpactCateg',     'view': 'impactCateg1'},
    'hasImpactOn_1':     {'model': 'HasImpactOn',     'view': 'hasImpactOn1'},
    'mainImpact_1':      {'model': 'MainImpact',      'view': 'mainImpact1'},

    'alternativeToMainImpact_1':       {'model': 'AlternativeToMainImpact',       'view': 'alternativeToMainImpact1'},
}




def formJs(request):
    # todo: mettre ça en fichier statique
    return render(request,'core_forms/form.js')

def process_livesearch(request, formName):

    # A layer of security against those Bots that submit a form quickly
    if verifyBotSearched(request.POST['_page_loaded_at']) < 3:
        return JsonResponse({'status':'failed','message':'too fast!'})

    try:
        formNames[formName]
    except KeyError:
        return JsonResponse({'errors': 'config {0} doesn\'t exists'.format(formName)})

    Model = eval(formNames[formName]['model']) #todo: degueu
    objects = Model.objects.all()

    resultString = "{\"html\":\""
    for o in objects:
        resultString += "<tr><td>"
        resultString += str(o)
        resultString += "</td><td style='display:none'><input type='hidden' name='objectId' value='" + str(o.id) + "'/></td>"
        resultString += "</td></tr>"
    resultString += "\",\"number_of_results\":10,\"total_pages\":10}"

    return JsonResponse({
        'status': 'success',
        'message': '<tr><td class=\'success\'>Successful request</td></tr>',
        'result': resultString
        #'result': "{\"html\":\"<tr><td>23</td><td>0</td></tr><tr><td>3</td><td>30</td></tr>\",\"number_of_results\":30,\"total_pages\":2}"
    })


def process_livesearch_resultdiv(request, id):

    return render(request, 'core_forms/resultDiv.html', locals())

def verifyBotSearched(time):
    """returns the number of seconds between the loading of the page and the
    form submit"""
    return (dt.datetime.now() - p.parse(time)).seconds



def model_post_form(request, formName, formId=''):

    try:
        formId = request.GET["formId"]
    except:
        pass

    try:
        objectId = request.GET["objectId"]
    except:
        objectId = None

    try:
        modifiable = request.GET["modifiable"]
    except:
        modifiable = None

    try:
        objectMayNotExist = request.GET["objectMayNotExist"]
    except:
        objectMayNotExist = False

    try:
        formNames[formName]
    except KeyError:
        return JsonResponse({'errors': 'config {0} doesn\'t exists'.format(formName)})

    ModelForm, conf, templates = eval(formNames[formName]['view']+"(request)")# remplacer par un truc du genre 'call'

    if not templates:
        modifiableTemplate   = 'core_forms/m/' + formNames[formName]['view'] + '.html'
        unmodifiableTemplate = 'core_forms/u/' + formNames[formName]['view'] + '.html'

    if request.method == 'POST':
    #if 1:
        #if request.is_ajax():
        if 1:
            form = ModelForm(request.POST)

            if form.is_valid(): # Nous vérifions que les données envoyées sont valides
                #form.save()
                return JsonResponse({'success': '/success'})

    else:
        returnEmptyForm = True
        if objectId:
            Model = eval(formNames[formName]['model']) #todo: degueu

            try:
                object=Model.objects.get(id=objectId)
                returnEmptyForm = False
            except:
                if objectMayNotExist:
                    returnEmptyForm = True
                else:
                    raise Exception('Object identifier provided in the "objectId" parameter doesn\'t match any object of type '+formNames[formName]['model']+' in the database')

        if returnEmptyForm:
            form = ModelForm
        else:
            form = ModelForm(data=object.__dict__)
            print("________________________________")
            form = ModelForm(instance=object)

        pageLoadedAt = dt.datetime.now().isoformat()
        maxInputLength = 40

        if returnEmptyForm or modifiable:
            try:
                get_template(modifiableTemplate)
                template = modifiableTemplate
            except TemplateDoesNotExist:
                template = 'core_forms/defaultForm.html'
        else:
            try:
                get_template(unmodifiableTemplate)
                template = unmodifiableTemplate
            except TemplateDoesNotExist:
                template = 'rien de prévu encore!'

        return render(request, template, locals())

        #return JsonResponse({'errors': 'Only POST requests are allowed'})

def alternative1(request):

    form_conf = \
        {
            'fields':{
                'to_rel' : {
                    'type': 'polymorphicForeignKey',
                    'classes': [                                            #changer le nom
                        ['habit_1','Une habitude de vie'],
                        ['consumeaproduct_1','Consommer un meilleur produit']
                    ]
                },
                'sources' : {
                    'type': 'manyToMany',
                    'formName': 'source_1'
                }
            }
        }
    #modifiableTemplate   = 'core_forms/m/alternative.html'
    #unmodifiableTemplate = 'core_forms/u/alternative.html'

    form_conf = json.dumps(form_conf)
    form_conf = SafeString(form_conf) # when rendered in the template, the quotes are transformed in '&quot;'. This is not what we want as form_conf will be printed in a JS script, not as a HtmL string

    form = AlternativeForm

    #form2 = AlternativeForm()
    #modelName= 'Alternative'
    #return render(request, 'core_forms/source.html', locals())
    return form, form_conf, None

def consumeaproduct1(request):

    form_conf = {
        'fields':{
                'product' : {
                    'type': 'foreignKey',
                    'formName': 'product_1'
                }
            },
        }
    form_conf = json.dumps(form_conf)
    form_conf = SafeString(form_conf) # when rendered in the template, the quotes are transformed in '&quot;'. This is not what we want as form_conf will be printed in a JS script, not as a HtmL string

    form = ConsumeAProductForm
    return form, form_conf, None

def habit1(request):

    form_conf = {
        'ajax':{
            'searchOn': ['topic','name']
        }
    }
    form_conf = json.dumps(form_conf)
    form_conf = SafeString(form_conf) # when rendered in the template, the quotes are transformed in '&quot;'. This is not what we want as form_conf will be printed in a JS script, not as a HtmL string

    form = HabitForm
    return form, form_conf, None

def product1(request):

    form_conf = {
        'ajax':{
            'searchOn': ['name']
        }
    }
    form_conf = json.dumps(form_conf)
    form_conf = SafeString(form_conf) # when rendered in the template, the quotes are transformed in '&quot;'. This is not what we want as form_conf will be printed in a JS script, not as a HtmL string

    form = ProductForm
    return form, form_conf, None

def source1(request):

    form_conf = {
        'fields':{
                'newspaper' : {
                    'type': 'foreignKey',
                    'formName': 'newspaper_1'
                },
            },
        'ajax':{
            'searchOn': ['title','url']
        }
    }

    form_conf = json.dumps(form_conf)
    form_conf = SafeString(form_conf) # when rendered in the template, the quotes are transformed in '&quot;'. This is not what we want as form_conf will be printed in a JS script, not as a HtmL string

    form = SourceForm
    return form, form_conf, None


def newspaper1(request):

    form = NewspaperForm
    return form, 'null', None







def polymorphicForeignKeyWrapper(request):
    #request.POST["formId"]
    print(request.GET.getlist("a"))
    return JsonResponse({2:request.GET.getlist("a")})

def polymorphicForeignKey(request):

    return render(request, 'core_forms/polymorphicForeignKey.html', locals())

