from django.shortcuts import render
from django.template.defaulttags import csrf_token
from core_forms.forms import *
from django.forms import inlineformset_factory
import datetime as dt
import dateutil.parser as p
import json
import re
from django.http import JsonResponse,HttpResponse
from django.forms.models import modelform_factory
from django.utils.safestring import SafeString
from django.template.utils import import_string
from django.template.loader import get_template, TemplateDoesNotExist
from django.template import loader

from core_model.model import *






#def formJs(request):
#    # todo: mettre ça en fichier statique
#    return render(request,'core_forms/form.js')

def process_livesearch(request, formName):

    # A layer of security against those Bots that submit a form quickly
    if verifyBotSearched(request.POST['_page_loaded_at']) < 3:
        return JsonResponse({'status':'failed','message':'too fast!'})

    try:
        formNames[formName]
    except KeyError:
        return JsonResponse({'errors': 'config {0} doesn\'t exists'.format(formName)})

    Model = eval(formNames[formName]['class']) #todo: degueu
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

    return render(request, 'core_forms/livesearch/resultDiv.html', locals())

def verifyBotSearched(time):
    """returns the number of seconds between the loading of the page and the
    form submit"""
    return (dt.datetime.now() - p.parse(time)).seconds

def model_post_form(request, formName, isRootForm=False, formId=''):

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
        modifiable = False

    try:
        objectMayNotExist = request.GET["objectMayNotExist"]
    except:
        objectMayNotExist = False

    try:
        formNames[formName]
    except KeyError:
        return JsonResponse({'errors': 'config {0} doesn\'t exists'.format(formName)})

    if request.method == 'POST':
        # erreurs possibles : erreur classique de champ (detectee par django)
        # chanmp vide (ex: polmorphicforeignkey jamais initialisee par un click sur les boxes)
        # doublons : veux-ton modifier l'objet deja existant ou un nouveau? normalement géré par le ajaxlivesearch (?)
        # clés uniques?
        # lien en foreign key interdite

        form = ModelForm(request.POST)
        if form.is_valid():  # Nous vérifions que les données envoyées sont valides
            #todo: gerer le isRootForm
            # form.save()
            return JsonResponse({'success': '/success'})
    else:
        htmlResponse, _ = getForm(request, isRootForm, formName, formNames[formName],formId, objectId,modifiable, objectMayNotExist, False)
        return HttpResponse(htmlResponse)

def removeEndOfString(string, suffix):
    return re.findall("(.*?)"+suffix+"$", string)[0]

def getForm(request, isRootForm, formName, formConf, formId, objectId, modifiable, objectMayNotExist, hideIfObjectIdNotFound):

    try: #todo: remove (old version)
        if 'view' in formConf:
            ModelForm, conf, templates = eval(formConf['view']+"(request)")
        else:
            raise Exception('')
    except:
        conf = formConf['class']().get_conf()
        ModelForm, conf, templates = conf['form'], conf['conf'], conf['templates']

    print('____________________',templates, formConf['class'])

    if templates is None:
        try: #todo: remove (old version)
            modifiableTemplate   = 'core_forms/modelforms/modifiable/' + formConf['view'] + '.html'
            unmodifiableTemplate = 'core_forms/modelforms/unmodifiable/' + formConf['view'] + '.html'
        except KeyError:
            n = removeEndOfString(formConf['class'].__name__,'Conf')
            modifiableTemplate   = 'core_forms/modelforms/modifiable/' + str.lower(n) + '.html'
            unmodifiableTemplate = 'core_forms/modelforms/unmodifiable/' + str.lower(n) + '.html'
    else:
        modifiableTemplate = templates[0]
        unmodifiableTemplate = templates[1]

    #if method == 'POST':
        #if request.is_ajax():
        #if 1:
        #    form = ModelForm(post)

        #    if form.is_valid(): # Nous vérifions que les données envoyées sont valides
                #form.save()
        #        return JsonResponse({'success': '/success'})

    #else:
    if 1:
        returnEmptyForm = True
        if objectId:
            Model = formConf['class']().get_conf()['form'].Meta.model

            try:
                object=Model.objects.get(id=objectId)
                returnEmptyForm = False
            except:
                if objectMayNotExist:
                    returnEmptyForm = True
                else:
                    raise Exception('Object identifier provided in the "objectId" parameter doesn\'t match any object of type '+formConf['model']+' in the database')

        if returnEmptyForm:
            form = ModelForm
        else:
            form = ModelForm(data=object.__dict__)
            print("________________________________")
            form = ModelForm(instance=object)

        pageLoadedAt = dt.datetime.now().isoformat()
        maxInputLength = 40 # todo: used in the php source but not implemented here

        if returnEmptyForm or modifiable:
            try:
                get_template(modifiableTemplate)
                template = modifiableTemplate
            except TemplateDoesNotExist:
                template = 'core_forms/modelforms/modifiable/defaultForm.html'
        else:
            try:
                get_template(unmodifiableTemplate)
                template = unmodifiableTemplate
            except TemplateDoesNotExist:
                #template = 'rien de prévu encore!'
                template = 'core_forms/modelforms/unmodifiable/defaultForm.html'

        doNotDisplay = hideIfObjectIdNotFound and returnEmptyForm

        print("template:",template, form)

        vars = {
            'isRootForm': isRootForm,
            'request': request,
            'formId': formId,
            'form': form,
            'formName': formName,
            'pageLoadedAt': pageLoadedAt,
            'conf': conf,
            'doNotDisplay': doNotDisplay
        }

        return loader.render_to_string(template, vars, request=request), not returnEmptyForm


































##################################################### new model ########################################################
class CoreFormConf:
    form_conf = {}
    def get_conf(self):
        form_conf = json.dumps(self.form_conf)
        # when rendered in the template, the quotes are transformed in '&quot;'. This is not what we want as form_conf
        # will be printed in a JS script, not as a HtmL string
        form_conf = SafeString(form_conf)

        if not hasattr(self,'form'):
            self.form = eval(removeEndOfString(self.__class__.__name__ ,'Conf') + 'Form') #todo: uggly
        return {'form':self.form, 'conf':form_conf, 'templates':None} #todo: remove the None if never used

class HabitConf(CoreFormConf):
    form_conf = {
        'fields': {}
    }
    form = HabitForm

class UseAKindOfEntityConf(CoreFormConf):
    form_conf = {
        'fields': {
            'entity_with_properties': {
                'type': 'foreignKey',
                'formName': 'entityThatHaveProperties'#todo: change the name of this field?
            }
        }
    }
    form = UseAKindOfEntityForm

class EntityThatHavePropertiesConf(CoreFormConf):
    form_conf = {
        'fields':{
            'target_entity':{
                'type': 'polymorphicForeignKey',
                'classes': [
                    ['product','Un produit'],
                    ['company','Une marque'],
                    ['company', 'Une Banque'],
                    ['company', 'Un magasin'],
                    ['company', 'Un organisme'],
                    ['association','Une association']
                ]
            },
        }
    }

class AlternativeConf(CoreFormConf):
    form_conf = \
        {
            'fields': {
                #'from_behaviour': {
                #    'type': 'polymorphicForeignKey',
                #    'classes': [  # todo change the name of this field
                #        ['habit', 'Une habitude de vie'],
                #        ['useAKindOfEntity', 'Utiliser...']
                #    ]
                #},
                'to_behaviour': {
                    'type': 'polymorphicForeignKey',
                    'classes': [
                        ['habit', 'Une habitude de vie'],
                        ['useAKindOfEntity', 'Utiliser...'],
                        ['behaviour', 'Autre:']
                    ]
                },
                'topics': {
                    'type': 'manyToMany',
                    'formName' : 'topic'
                }
            }
        }
    form = AlternativeForm

class ProductConf(CoreFormConf):
    form_conf = {}
    form = ProductForm

class CompanyConf(CoreFormConf):
    pass

class AssociationConf(CoreFormConf):
    pass

class BehaviourConf(CoreFormConf):
    pass

class TopicConf(CoreFormConf):
    pass








###################################################### old model #######################################################




###################################################### old model #######################################################






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
                'from_rel' : {
                    'type': 'foreignKey',
                    'formName': 'hasImpactOn_1'
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

def hasImpactOn1(request):

    form_conf = {}
    form_conf = json.dumps(form_conf)
    form_conf = SafeString(form_conf) # when rendered in the template, the quotes are transformed in '&quot;'. This is not what we want as form_conf will be printed in a JS script, not as a HtmL string

    form = hasImpactOnForm
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

def sourceTest(request): #todo: a retirer

    form_conf = {
    }

    form_conf = json.dumps(form_conf)
    form_conf = SafeString(form_conf) # when rendered in the template, the quotes are transformed in '&quot;'. This is not what we want as form_conf will be printed in a JS script, not as a HtmL string

    form = SourceTestForm
    return form, form_conf, None


def newspaper1(request):

    form = NewspaperForm
    return form, 'null', None



########################################################################################################################



def polymorphicForeignKeyWrapper(request):

    formId = request.POST.get('formId')
    nbBoxes = request.POST.get('nbBoxes')
    objectId = request.POST.get('objectId')
    parentFormId = request.POST.get('parentFormId')

    return HttpResponse(polymorphicForeignKey(formId,nbBoxes,objectId,parentFormId,request))

def polymorphicForeignKey(formId,nbBoxes,objectId,parentFormId,request):

    boxList = []
    for i in range(int(nbBoxes)):
        boxList += [{
            'id':    request.POST.getlist('boxList['+ str(i) +'][id]')[0],
            'label': request.POST.getlist('boxList['+ str(i) +'][label]')[0]
        }]

    forms = []
    formIds = []
    groupId = formId
    isVisible = 'false'  # JS string

    for b in boxList:
        formName = b['id']
        fid = formId+'_'+formName
        formIds += [fid]
        formAsHtml, isObjectIdFound = getForm(request, False, formName, formNames[formName], fid , objectId, False, True, True)
        forms += [{'html':formAsHtml}]
        if (objectId is not None) and isObjectIdFound:
            b['checked'] = True

    return loader.render_to_string('core_forms/constructform/polymorphicForeignKey.html', locals(), request=request)


def foreignKeyWrapper(request):

    formId = request.POST.get('formId')
    formName = request.POST.get('formName')
    objectId = request.POST.get('objectId')
    parentFormId = request.POST.get('parentFormId')

    return HttpResponse(foreignKey(formId,objectId,formName,parentFormId,request))

def foreignKey(formId,objectId,formName,parentFormId,request):

    formIds = [formId]
    groupId = formId
    isVisible = 'true' # JS string

    formAsHtml, isObjectIdFound = getForm(request, False, formName, formNames[formName], formId , objectId, False, False, False)

    return loader.render_to_string('core_forms/constructform/foreignKey.html', locals(), request=request)

def manyToManyWrapper(request):

    formId = request.POST.get('formId')
    formName = request.POST.get('formName')
    contentId = request.POST.get('contentId')
    parentFormId = request.POST.get('parentFormId')
    initVal = json.loads(request.POST.get('initVal'))


    return HttpResponse(manyToMany(formId,formName,contentId,parentFormId,initVal,request))

def manyToMany(formId,formName,contentId,parentFormId,initVal,request):

    formIds = []
    forms = []
    groupId = formId
    isVisible = 'true'  # JS string

    emptyForm, _ = getForm(
        request,
        False,
        formName,
        formNames[formName],
        formId + '_0',
        None,
        False,  # verifier que l'argument "modifiable" doiven etre tjrs a false?
        False,  # idem
        False,
    )
    if not initVal is None:
        for i, objectId in enumerate(initVal):
            fid = formId + '_' + str(i)
            forms += [getForm(
                request,
                False,
                formName,
                formNames[formName],
                fid,
                objectId,
                False,  # verifier que l'argument "modifiable" doiven etre tjrs a false?
                False,  # idem
                False,
            )[0]]
            formIds += [fid]
    else:
        forms += [emptyForm]
        formIds += [formId + '_0']

    return loader.render_to_string('core_forms/constructform/manyToMany.html', locals(), request=request)

#########################################################################################################



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
    'source_test':         {'view': 'sourceTest'},
    ######################################################### newmodel ###############################################
    'alternative':              {'class': AlternativeConf},
    'entityThatHaveProperties': {'class': EntityThatHavePropertiesConf},
    'habit':                    {'class': HabitConf},
    'useAKindOfEntity':         {'class': UseAKindOfEntityConf},
    'product':                  {'class': ProductConf},
    'company':                  {'class': CompanyConf},
    'association':              {'class': AssociationConf},
    'behaviour':                {'class': BehaviourConf},
    'topic':                    {'class': TopicConf},
}


