from django.shortcuts import render
from django.template.defaulttags import csrf_token
from core_forms.forms import *
from django.forms import inlineformset_factory
import datetime as dt
import dateutil.parser as p
import json
import re
from django.http import JsonResponse,HttpResponse,Http404
from django.http.request import QueryDict
from django.forms.models import modelform_factory
from django.utils.safestring import SafeString
from django.template.utils import import_string
from django.template.loader import get_template, TemplateDoesNotExist
from django.conf import settings
from django.template import loader
from core_model.model import *
import core_model.model as mdls
import django
from django.views.decorators.csrf import csrf_protect
from django.db.models import Q


LS_CACHE_SIZE = 20 #todo: put this somewhere else



#def formJs(request):
#    # todo: mettre ça en fichier statique
#    return render(request,'core_forms/form.js')


class CoreFormConf:
    form_conf = {}
    def get_conf(self):
        form_conf = json.dumps(self.form_conf)
        # when rendered in the template, the quotes are transformed in '&quot;'. This is not what we want as form_conf
        # will be printed in a JS script, not as a HtmL string
        form_conf = SafeString(form_conf)

        if not hasattr(self,'form'):
            self.form = eval(removeEndOfString(self.__class__.__name__ ,'Conf') + 'Form') #todo: uggly
        return {'form':self.form, 'conf_str':form_conf, 'templates':None, 'conf': self.form_conf} #todo: remove the None if never used




#apps = django.conf.settings.INSTALLED_APPS
#for app in apps:
#    print(app)
#    try:
#        eval('from '+app+'.nestedForms import *')
#    except:
#        pass
from core_forms.nestedForms import *

def get_from_request(query, field, type_of_field, defaultValue = None):
    if type_of_field == 'isoDate':
        cleaned = clean(query.get(field), isoDate= True)
    elif type_of_field == 'json':
        cleaned = clean(query.get(field), isJson= True)
    else:
        cleaned = clean(query.get(field))

    if cleaned is None:
        return defaultValue

    if type_of_field == 'int':
        cleaned = int(cleaned)
    #if type_of_field == "json":
    #    return json.loads(cleaned)
    #else:

    return cleaned

#todo: this HAS to be tested (also with object="false",isJson=True)
def clean(object, isJson=False, jsonIsStillAString= True, isoDate=False):
    if isoDate:
        REGEXP = '[^\d\w\-.:]'
    else:
        REGEXP = '[^\d\w_ ]'

    if type(object) == str and (not isJson or not jsonIsStillAString):
        if object == '':
            return None
        return re.sub(REGEXP,'',object)
    if type(object) == bool:
        return object
    elif object is None:
        return None
    elif isJson:
        if type(object) == str:
            try:
                js = json.loads(object)
                return clean(js, isJson=True, jsonIsStillAString=False)
            except:
                raise Exception("json seems to be corrupted")
        elif type(object) == list:
            for i, elem in enumerate(object):
                object[i] = clean(elem, isJson=True, jsonIsStillAString=False)
            return object
        elif type(object) == dict:
            for key in object:
                object[key] = clean(object[key], isJson=True, jsonIsStillAString=False)
            return object
        elif type(object) == int or type(object) == float:
            return object

def whichDatabase(request_dict):
    inTest = get_from_request(request_dict,'qunitTesting','json',False)
    if inTest:
        return 'tests'
    else:
        return 'default'

def someSecurityChecks(req):
    # A layer of security against the Bots that submit a form quickly
    loadedAt = get_from_request(req,'_page_loaded_at','isoDate')
    if loadedAt is None:
        return JsonResponse({'status': 'failed', 'message': 'missing "_page_loaded_at" parameter'})
    elif verifyBotSearched(loadedAt) < 3:
        return JsonResponse({'status': 'failed', 'message':'too fast!'})
    return None

def getFormConf(formName):
    try:
        formConf = formNames[formName]
    except KeyError:
        return None, None, JsonResponse(
            {'status': 'programming_error', 'message': 'config {0} doesn\'t exists'.format(formName)})
    _, _, _, model, conf = getInfoFromFormConf(formConf)
    return model, conf, None


def queryForAllFIelds(model,fieldsToSearchOn, projection, limit):

    theQ = Q()
    for field in fieldsToSearchOn:
        if field not in ['_page_loaded_at','csrfmiddlewaretoken']:
            for word in fieldsToSearchOn[field]:
                #print('on ajoute "{}"'.format(word))
                q = {field + '__icontains' : word}
                theQ &= Q(**q)
                #print(theQ)
    query_set = model.objects.filter(theQ)
    ids = [e['id'] for e in query_set.values('id')]
    objects_all_fields = query_set.values(*projection)[:limit]
    return ids, objects_all_fields

def queryForCurrentField(model,fieldsToSearchOn, currentField, ids, projection, limit):

    objects_in_common = []
    objects_excluding_already_found = []
    if currentField is not None:
        theQ = Q()
        for word in fieldsToSearchOn[currentField]:
            q = {currentField + '__icontains': word}
            theQ &= Q(**q)
        objects = model.objects.filter(theQ).values(*projection)[:limit]
        for o in objects:
            print(ids)
            if o['id'] in ids:
                objects_in_common += [o['id']]
            else:
                objects_excluding_already_found += [o]

    return objects_excluding_already_found, objects_in_common


@csrf_protect
def process_livesearch(request, formName):

    RESULT_LIMIT = 5

    c = someSecurityChecks(request.POST)
    if c is not None:
        return c

    # todo: controler les caracteres non accentues

    model, conf, error = getFormConf(formName)
    if error is not None:
        return error

    primaryKey = None
    if 'primaryKey' in conf:
        primaryKey = conf['primaryKey']

    fieldsToSearchOn = json.loads(request.POST.get('fieldsToSearchOn'))
    currentField = request.POST.get('currentField')

    err = False
    if 'livesearch' not in conf:
        err = True
    elif 'searchOn' not in conf['livesearch']:
        err = True
    if err:
        return JsonResponse( #todo: to test
            {'status': 'programming_error', 'message': "Forbidden request. Model '{}' is not allowed".format(model.__name__)})
    for f in fieldsToSearchOn:
        if f not in conf['livesearch']['searchOn']:
            return JsonResponse(
                {'status': 'programming_error', 'message': "Forbidden request. The field '{}' is not allowed".format(f)})

    # For the well-being of the front-end cache, projection must depend NEITHER on currentField NOR on fieldsToSearchOn
    projection = ['id']
    if primaryKey is not None:
        projection += primaryKey
    for field in conf['livesearch']['searchOn']:  # todo: to test
        if field not in projection:
            projection += [field]

    ids, objects_all_fields = queryForAllFIelds(model,fieldsToSearchOn, projection, RESULT_LIMIT)

    objects_current_field, common_ids = queryForCurrentField(model,fieldsToSearchOn, currentField, ids, projection, RESULT_LIMIT)

    print(len(objects_current_field),len(common_ids))

    #result = list(objects_all_fields)
    #cpt = len(result)
    #if cpt < RESULT_LIMIT:
    #    it = objects_current_field.iterator()
    #    while cpt < RESULT_LIMIT:
    #        try:
    #            next = it.__next__()
    #            result += [next]
    #        except StopIteration:
    #            break
    #        cpt += 1

    objects_all_fields = list(objects_all_fields)
    objects_current_field = list(objects_current_field)
    result = {}
    if len(objects_all_fields):
        result['matchAll'] = objects_all_fields
    if len(objects_current_field):
        result['matchCurField'] = objects_current_field
    if len(common_ids):
        result['common'] = common_ids

    #TODO: FAIRE LE UNIT TEST!!!!
    #todo: si l'un des champs est trop long (champ texte), ne renvoyer que la partie recherchee

    resp = {'status': 'success', 'result': result, 'order': projection}

    return JsonResponse(resp)

def verifyBotSearched(time):
    """returns the number of seconds between the loading of the page and the
    form submit"""
    if time is not None:
        return (dt.datetime.now() - p.parse(time)).seconds
    else:
        return None

def get_some_fields(request_dict, formName, isRootForm= False, formId= None):

    if formId is None:
        formId = get_from_request(request_dict,'formId','str')

    if formId is None:
        return False, None, None, None, None, None, None, None, JsonResponse({'status': 'requestError',
                             'errors': 'formId is not provided'})  # todo: revoie les codes d'erreur (requestError') et leur gestion coté js

    parentFormId = get_from_request(request_dict,'parentFormId','str')
    fieldOfParentForm = get_from_request(request_dict,'fieldOfParentForm','str')  # todo: fieldOfParentForm est peut etre obsolete (innutile)
    qunitTesting = get_from_request(request_dict,'qunitTesting','json',False)
    callbackQunitFunction = get_from_request(request_dict,'callbackQunitFunction','str')

    isRootForm = isRootForm or get_from_request(request_dict,'isRootForm','json',False)

    if (parentFormId is None) and not isRootForm:
        return False, None, None, None, None, None, None, None, JsonResponse(
                {'status': 'requestError', 'errors': 'isRootForm is not true and parentFormId is not provided'})

    if isRootForm:
        parentFormId = None
        fieldOfParentForm = None

    try:
        formConf = formNames[formName]
    except KeyError:
        return False, None, None, None, None, None, None, None, JsonResponse({'status': 'requestError', 'errors': 'config {0} doesn\'t exists'.format(formName)})


    return True, formId, formConf, parentFormId, fieldOfParentForm, isRootForm, qunitTesting, callbackQunitFunction, None



def get_form(request, formName, isRootForm= False, formId= None, firstRootFormCall= False):

    database = whichDatabase(request.GET)

    if request.method == 'GET':

        isOk, formId, formConf, parentFormId, fieldOfParentForm, isRootForm, qunitTesting, callbackQunitFunction, error = get_some_fields(request.GET,formName,isRootForm,formId)
        if not isOk:
            return error

        objectId = get_from_request(request.GET,'objectId','str')
        editableIfObjectExists = get_from_request(request.GET,'modifiable','json', False)
        objectIdMayNotExistForThisModel = get_from_request(request.GET,'objectMayNotExist','json',False)

        if objectId is not None:
            objectId = int(objectId)

        formAsHtml, _ , isEditable, validatedValue, objectBeingModified = getHtmlForm(
            request= request,
            database=database,
            formName= formName,
            formConf= formConf,
            formId= formId,
            parentFormId= parentFormId,
            fieldOfParentForm= fieldOfParentForm,
            isRootForm=isRootForm,
            objectId= objectId,
            editableIfObjectExists= editableIfObjectExists,
            objectIdMayNotExistForThisModel= objectIdMayNotExistForThisModel,
            qunitTesting=qunitTesting,
            callbackQunitFunction=callbackQunitFunction
        )

        formInfo = [{'fid': formId, 'fname': formName, 'isEditable': isEditable, 'validatedValue': validatedValue, 'objectBeingModified': objectBeingModified}]

        #formTreeUpdatedByClient = False
        inValidationProcess= False

        lsCacheSize = LS_CACHE_SIZE

        return constructFormAndRender(request, 'core_forms/constructform/singleForm.html', locals())
    else:
        raise Http404 # or forbidden?



def post_form(request, formName):

    database = whichDatabase(request.POST)

    if request.method == 'POST':
        # OK erreurs possibles : erreur classique de champ (detectee par django)
        # chanmp vide (ex: polmorphicforeignkey jamais initialisee par un click sur les boxes)
        # doublons : veux-ton modifier l'objet deja existant ou un nouveau? normalement géré par le ajaxlivesearch (?)
        # clés uniques?
        # cas ou il y a un plantage sur un submit et qu'un meme objet est re-envoyé une seconde fois
        # OK lien en foreign key interdite ==> a voir lors de la creation du modele (contraintes de modele)
        # en js: ojets crees et deja reutilisables sans acces serveur

        isOk, formId, formConf, parentFormId, fieldOfParentForm, isRootForm, qunitTesting, callbackQunitFunction, error = get_some_fields(request.POST,formName)
        if not isOk:
            return error

        ModelForm, _, _ , _,_= getInfoFromFormConf(formConf)

        form = ModelForm(request.POST) #todo: secu: si plus de fields que prévu? + prendre chaque field et les passer dans clean!!

        #errors = form.errors
        #for field in errors:
        #    print('field: ' + field + " " + str(errors[field].__dict__['data'][0].__dict__))

        if form.is_valid():  # Nous vérifions que les données envoyées sont valides

            #todo: gerer le isRootForm

            createdObject = form.save()
            #createdObject = form.save(commit=False)
            #createdObject.save(using=database)
            #if database != 'default':                   #todo: this is strange. But is_valid() method (6lines before) checkes the foreign keys in the 'default' database. So we have to replicate every object into 'default' so that is_valid() doesn't fail
            #    createdObject.save(using='default')

            createdObjectAsHtml, _, _, validatedValue, objectBeingModified = getHtmlForm(
                request= request,
                database= database,
                formName= formName,
                formConf= formConf,
                formId= formId,
                parentFormId= parentFormId,
                fieldOfParentForm= fieldOfParentForm,
                isRootForm= isRootForm,
                objectId= createdObject.id,
                qunitTesting=qunitTesting,
                callbackQunitFunction=callbackQunitFunction
            )
            #pender a l'actualisation du formTreeeeeee!!!!!!!'

            vars = {
                'formId': formId,
                'formAsHtml': createdObjectAsHtml,
                'firstRootFormCall': False,
                'formInfo': [{'fid': formId, 'fname': formName, 'isEditable': False, 'validatedValue': validatedValue, 'objectBeingModified': objectBeingModified}],
                'parentFormId': parentFormId,
                'fieldOfParentForm': fieldOfParentForm,
                #'formTreeUpdatedByClient': True,
                'inValidationProcess': True,
                'qunitTesting': qunitTesting,
                'callbackQunitFunction': callbackQunitFunction,
                'lsCacheSize' : LS_CACHE_SIZE,
                #'validatedValue': {'objectId': createdObject.id,'fieldOfParentForm': fieldOfParentForm}
            }

            html = constructFormAsHtml(request, 'core_forms/constructform/singleForm.html', vars)

            return JsonResponse({'status': 'success', 'inbase_object': createdObject.id, 'html': html})
        else:
            return JsonResponse({'status':'error', 'errors': form.errors}, safe=False)
            #formAsHtml = form
            #return render(request, 'core_forms/constructform/singleForm.html', locals())
    else:
        raise Http404 #or forbidden


def removeEndOfString(string, suffix):
    return re.findall("(.*?)"+suffix+"$", string)[0]

def getInfoFromFormConf(formConf):
    conf = formConf['class']().get_conf()
    return conf['form'], conf['conf_str'], conf['templates'], conf['form'].Meta.model, conf['conf']

def getHtmlForm(
        request,
        database,
        formName,
        formConf,
        formId,
        parentFormId,
        fieldOfParentForm,
        isRootForm=False,
        objectId= None,
        editableIfObjectExists= False,
        objectIdMayNotExistForThisModel= False,
        hideIfObjectIdNotFound= False,
        qunitTesting= False,
        callbackQunitFunction= None):

    #try: #todo: remove (old version)
    #    if 'view' in formConf:
    #        ModelForm, conf, templates = eval(formConf['view']+"(request)")
    #    else:
    #        raise Exception('')
    #except:
    #    conf = formConf['class']().get_conf()
    #    ModelForm, conf, templates = conf['form'], conf['conf'], conf['templates']

    ModelForm, conf, templates, Model, _ = getInfoFromFormConf(formConf)

    if templates is None:
        n = removeEndOfString(formConf['class'].__name__,'Conf')
        modifiableTemplate   = 'core_forms/modelforms/modifiable/' + str.lower(n) + '.html'
        unmodifiableTemplate = 'core_forms/modelforms/unmodifiable/' + str.lower(n) + '.html'
    else:
        modifiableTemplate = templates[0]
        unmodifiableTemplate = templates[1]

    returnEmptyForm = True
    # try to find the object in database from the object_id (if provided)
    if objectId is not None:
        #Model = formConf['class']().get_conf()['form'].Meta.model
        try:
            #object=Model.objects.using(database).get(id=objectId) #todo!!!!!! cette erreur n'est pas catchee par le except....!! ??
            object=Model.objects.get(id=objectId) #todo!!!!!! cette erreur n'est pas catchee par le except....!! ??
            returnEmptyForm = False
            #objectIdFound = True
        except:
            #objectIdFound = False
            if objectIdMayNotExistForThisModel:
                returnEmptyForm = True
            else:
                raise Exception('Object identifier ('+str(objectId)+') provided as the "objectId" parameter doesn\'t match any object of type '+str(Model)+' in the database '+ database)

    # if object_id is not provided OR if the object_id was not found
    if returnEmptyForm:
        form = ModelForm
    else:
        #form = ModelForm(data=object.__dict__)
        form = ModelForm(instance=object)

    pageLoadedAt = dt.datetime.now().isoformat()
    maxInputLength = 40 # todo: used in the php source but not implemented here

    isEditable = returnEmptyForm or editableIfObjectExists

    if isEditable: #todo: factorisable
        try:
            get_template(modifiableTemplate)
            template = modifiableTemplate
        except TemplateDoesNotExist:
            template = 'core_forms/modelforms/defaultForm.html'
    else:
        try:
            get_template(unmodifiableTemplate)
            template = unmodifiableTemplate
        except TemplateDoesNotExist:
            template = 'core_forms/modelforms/defaultForm.html'

    doNotDisplay = hideIfObjectIdNotFound and returnEmptyForm

    if not isEditable and fieldOfParentForm is not None:
        validatedValue = objectId

        #if qunitTesting:        # todo: horrible! remove!
        #    validatedValue = 65 # todo: horrible! remove!

    else:
        validatedValue = None

    if isEditable and objectId is not None and not objectIdMayNotExistForThisModel:
        objectBeingModified = objectId
    else:
        objectBeingModified = None

    vars = {
        'isRootForm': isRootForm,
        #'request': request,
        'formId': formId,
        'form': form,
        'formName': formName,
        'pageLoadedAt': pageLoadedAt,
        'conf': conf,
        'doNotDisplay': doNotDisplay,
        'isEditable': isEditable,
        'objectId': objectId,
        'parentFormId': json.dumps(parentFormId),
        'fieldOfParentForm': json.dumps(fieldOfParentForm),
        'objectBeingModified': objectBeingModified,
        'qunitTesting': qunitTesting,
        'callbackQunitFunction': callbackQunitFunction,
    }
    # todo:mignifier le html!!! et le js dans le html(partout)
    return loader.render_to_string(template, vars, request=request), not returnEmptyForm, isEditable, validatedValue, objectBeingModified #todo: remove 'isEditable' if never used



########################################################################################################################



def polymorphicForeignKeyWrapper(request):

    database = whichDatabase(request.GET)

    formId = get_from_request(request.GET,'formId','str')
    nbBoxes = get_from_request(request.GET,'nbBoxes','int')
    objectId = get_from_request(request.GET,'objectId','str')
    parentFormId = get_from_request(request.GET,'parentFormId','str')
    fieldOfParentForm = get_from_request(request.GET,'fieldOfParentForm','str')
    qunitTesting = get_from_request(request.GET,'qunitTesting','json',False)
    callbackQunitFunction = get_from_request(request.GET,'callbackQunitFunction','str')

    return polymorphicForeignKey(database,formId,nbBoxes,objectId,parentFormId,fieldOfParentForm,request,qunitTesting,callbackQunitFunction)

def polymorphicForeignKey(database,formId,nbBoxes,objectId,parentFormId,fieldOfParentForm,request,qunitTesting,callbackQunitFunction):

    boxList = []
    for i in range(nbBoxes):
        boxList += [{
            'id':    clean(request.GET.getlist('boxList['+ str(i) +'][id]')[0]),
            'label': clean(request.GET.getlist('boxList['+ str(i) +'][label]')[0])
        }]

    forms = []
    formInfo = []
    #formTreeUpdatedByClient = False

    noObjectFound = True
    formNameList = []

    for b in boxList:
        formName = b['id']
        if formName in formNameList:
            if not qunitTesting:    #todo: horrible! delete please!
                raise Http404('formName "{0}" was asked more than once in parameter boxList'.format(formName)) #todo: raise a BadRequest instead of a 404
        formNameList += [formName]
        fid = formId+'_'+formName
        formAsHtml, isObjectIdFound, isEditable, validatedValue, objectBeingModified = getHtmlForm(
            request=request,
            database=database,
            formName=formName,
            formConf=formNames[formName],
            formId=fid,
            parentFormId= parentFormId,
            fieldOfParentForm=fieldOfParentForm,
            objectId=objectId,
            objectIdMayNotExistForThisModel=True,
            hideIfObjectIdNotFound=True,
            qunitTesting=qunitTesting,
            callbackQunitFunction=callbackQunitFunction
        )
        forms += [{'id': fid,'formAsHtml':formAsHtml,'fname': formName}]
        formInfo += [{'fid': fid, 'fname': formName, 'isEditable': isEditable, 'validatedValue': validatedValue, 'objectBeingModified': objectBeingModified}]
        if (objectId is not None) and isObjectIdFound:
            b['checked'] = True
            noObjectFound = False

    if (objectId is not None) and noObjectFound:
        raise Http404('objectId is provided and no object belonging to one of the belonging classes was found') #todo: un peu aggressif. Plutot envoyer un mail de warning

    checkBoxesAreEditable = (objectId is not None) and not noObjectFound
    inValidationProcess = False

    lsCacheSize = LS_CACHE_SIZE

    return constructFormAndRender(request, 'core_forms/constructform/polymorphicForeignKey.html', locals())

def foreignKeyWrapper(request):

    database = whichDatabase(request.GET)

    formId = get_from_request(request.GET,'formId','str')
    formName = get_from_request(request.GET,'formName','str')
    objectId = get_from_request(request.GET,'objectId','str')
    parentFormId = get_from_request(request.GET,'parentFormId','str')
    fieldOfParentForm = get_from_request(request.GET,'fieldOfParentForm','str')
    qunitTesting = get_from_request(request.GET,'qunitTesting','json',False)
    callbackQunitFunction = get_from_request(request.GET,'callbackQunitFunction','str')

    return foreignKey(database,formId,objectId,formName,parentFormId,fieldOfParentForm,request,qunitTesting,callbackQunitFunction)

def foreignKey(database,formId,objectId,formName,parentFormId,fieldOfParentForm,request,qunitTesting,callbackQunitFunction):

    #formTreeUpdatedByClient = False

    formAsHtml, _, isEditable, validatedValue, objectBeingModified = getHtmlForm(
        request=request,
        database=database,
        formName=formName,
        formConf=formNames[formName],
        formId=formId,
        parentFormId= parentFormId,
        fieldOfParentForm=fieldOfParentForm,
        objectId=objectId,
        qunitTesting=qunitTesting,
        callbackQunitFunction=callbackQunitFunction
    )
    formInfo = [{'fid': formId, 'fname': formName, 'isEditable': isEditable, 'validatedValue': validatedValue, 'objectBeingModified': objectBeingModified}]

    inValidationProcess = False

    lsCacheSize = LS_CACHE_SIZE

    return constructFormAndRender(request, 'core_forms/constructform/foreignKey.html', locals())

def manyToManyWrapper(request):

    database = whichDatabase(request.GET)

    formId = get_from_request(request.GET,'formId','str')
    formName = get_from_request(request.GET,'formName','str')
    contentId = get_from_request(request.GET,'contentId','str')
    initVal = get_from_request(request.GET,'initVal','json')
    parentFormId = get_from_request(request.GET,'parentFormId','str')
    fieldOfParentForm = get_from_request(request.GET,'fieldOfParentForm','str')
    qunitTesting = get_from_request(request.GET,'qunitTesting','json',False)
    callbackQunitFunction = get_from_request(request.GET,'callbackQunitFunction','str')

    return manyToMany(database,formId,formName,contentId,parentFormId,initVal,fieldOfParentForm,request,qunitTesting,callbackQunitFunction)

def manyToMany(database,formId,formName,contentId,parentFormId,initialValues,fieldOfParentForm,request,qunitTesting,callbackQunitFunction):

    formInfo = []
    forms = []
    #formTreeUpdatedByClient = False

    templateForm, _, _, _, _ = getHtmlForm(
        request=request,
        database=database,
        formName=formName,
        formConf=formNames[formName],
        formId=formId + '_STRINGTOBEREPLACED',
        parentFormId=parentFormId,
        fieldOfParentForm=fieldOfParentForm,
        qunitTesting=qunitTesting,
        callbackQunitFunction=callbackQunitFunction
    )

    if initialValues is not None:
        for i, objectId in enumerate(initialValues):
            fid = formId + '_' + str(i)
            formAsHtml, _, isEditable, validatedValue, objectBeingModified = getHtmlForm(
                request= request,
                database= database,
                formName= formName,
                formConf= formNames[formName],
                formId= fid,
                parentFormId= parentFormId,
                fieldOfParentForm=fieldOfParentForm,
                objectId= objectId,
                qunitTesting=qunitTesting,
                callbackQunitFunction=callbackQunitFunction
            )
            forms += [{'id': fid,'formAsHtml':formAsHtml,'fname': formName}]
            formInfo += [{'fid': fid,'fname': formName, 'isEditable': isEditable, 'validatedValue': validatedValue, 'objectBeingModified': objectBeingModified}]
    else:
        fid = formId + '_0'
        formAsHtml, _, isEditable, validatedValue, objectBeingModified = getHtmlForm( # todo: isEditable = True toujours non?
            request=request,
            database=database,
            formName=formName,
            formConf=formNames[formName],
            formId=fid,
            parentFormId=parentFormId,
            fieldOfParentForm=fieldOfParentForm,
            qunitTesting=qunitTesting,
            callbackQunitFunction=callbackQunitFunction
        )
        forms += [{'id': fid,'formAsHtml':formAsHtml,'fname': formName}]
        formInfo += [{'fid': fid ,'fname': formName, 'isEditable': isEditable, 'validatedValue': validatedValue, 'objectBeingModified': objectBeingModified}]

    inValidationProcess = False

    return constructFormAndRender(request, 'core_forms/constructform/manyToMany.html', locals())

def constructFormAsHtml(request, template, vars):
    for var in ['formInfo', 'parentFormId', 'fieldOfParentForm', 'inValidationProcess']:
        vars[var] = json.dumps(vars[var])
    return loader.render_to_string(template, vars, request= request)

def constructFormAndRender(request, template, vars):

    return HttpResponse(constructFormAsHtml(request, template, vars))

#################################################################################################################
from django.core.management import call_command
import os
import core_forms
FIXTURE_OUTPUT = 'coreformsFixture_' #todo: change the directory where it is saved

app_path = os.path.dirname(core_forms.__file__)
dir = os.path.join(app_path, 'fixtures')
try: os.mkdir(dir)
except FileExistsError: pass


def save_fixture(request):
    fileFixture = FIXTURE_OUTPUT + dt.datetime.now().isoformat()[:19] + '.json'
    testModels = []
    for possibleModel in mdls.fakeModels.__dict__:
        if possibleModel.startswith('Test'):
            testModels += ['core_model.' + possibleModel]

    call_command('dumpdata','-o',os.path.join(dir,fileFixture),*testModels,database='default')

    return JsonResponse({'status':'ok','file': fileFixture,'url_to_load':'core_forms/tests/loadfixture?file='+fileFixture})

def load_fixture(request):

    fileName = request.GET.get('file')
    fileName = os.path.join(dir,fileName)

    if fileName is None:
        return JsonResponse({'status':'error','message':'Please provide GET parameter "file"'})

    call_command('migrate', database='tests')  # todo: how to catch error?

    call_command('loaddata', fileName, database='tests') # todo: how to catch error?

    return JsonResponse({'status':'ok? (not sure)','file': fileName})

# procedure:
# load the last fixture
# add objects (with the admin interface for example)
# save the fixture

#########################################################################################################

# todo: renvoyer les requetes http si elles ont echouées la premiere fois




