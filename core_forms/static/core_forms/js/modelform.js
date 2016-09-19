    'use strict';

    function applyFormConfiguration(formIdStr, formName, url_post, url_get, url_livesearch, callbackQunitFunction=null) { //todo: donner un nom plus explicite que url

        if(callbackQunitFunction != null){
            if(callbackQunitFunction.name ==''){
                throw Error("Be carreful when applying Qunit tests: callbackQunitFunction has no name."
                            +"Please define this function like 'function IHaveAName(){ ...' rather than 'IDonTHaveAName = function(){ ...'")
            }
        }

        $('#' + formIdStr).submit(function() { // catch the form's submit event
            submit(formTree,url_post,callbackQunitFunction);
            return false;
        });

        if (formIdStr in allFormsConf) {
            var formConf = allFormsConf[formIdStr];
            if (formConf != null) {
                if ('fields' in formConf) {

                    for (var fieldId in formConf['fields']) {
                        var field = formConf['fields'][fieldId],
                            fieldToReplace = getFormField(formIdStr, fieldId),
                            childFormId = formIdStr + '_' + fieldId;

                        if (field['type'] == 'polymorphicForeignKey') {
                            polymorphicForeignKey(fieldToReplace, childFormId, field, url_get, formIdStr, fieldId, callbackQunitFunction);
                        } else if (field['type'] == 'foreignKey') {
                            foreignKey(fieldToReplace, childFormId, field, url_get, formIdStr, fieldId, callbackQunitFunction);
                        } else if (field['type'] == 'manyToMany') {
                            manyToMany(fieldToReplace, childFormId, field, url_post, formIdStr, fieldId, formTreePtrs, callbackQunitFunction)
                        }
                    }
                }

                if ('ajax' in formConf) {

                    pushAjaxFormConf(formIdStr, formName);

                    var fieldGroup = [];
                    for (var i = 0; i < formConf['ajax']['searchOn'].length; i++) {
                        fieldGroup.push($('#' + formIdStr + ' #id_' + (formConf['ajax']['searchOn'][i])));
                    }


                    for (var i = 0; i < formConf['ajax']['searchOn'].length; i++) {

                        initFieldsForAjax(
                            fieldGroup[i], {
                                'fieldGroup': fieldGroup,
                                'latest_value': '',
                                'value': ''
                            },
                            $('#' + formIdStr + '_ls_result_div'),
                            formIdStr,
                            url_livesearch
                        );
                    }

                    // ajout de la zone d'affichage des resultats de la recherche en dessous du formulaire
                    $.ajax({
                        type: 'GET', // GET or POST
                        url: url_liveserach, // the file to call
                        data: callbackQunitFunction? '&qunitTesting=true&callbackQunitFunction'+callbackQunitFunction.name : '',
                        success: function(response) {
                            $('#' + formIdStr).append(response); // update the DIV # todo: security : "C’est une opération triviale avec une biblioth" at https://docs.djangoproject.com/fr/1.9/ref/forms/api/
                        },
                        complete: function(jqXHR, textStatus){
                            if(callbackQunitFunction != null)
                                callbackQunitFunction(jqXHR.responseText, textStatus, this);
                        }
                    });
                }
            }
        }
    }

    function submit(tree, url_post, callbackQunitFunction= null){
        for(var el in tree){
            recursiveSubmit(tree[el],url_post,callbackQunitFunction); //todo: formTree has a strange structure at its root... no need to have a list as a root
        }
    }

    function countAttributes(obj){
        var count = 0;
        for(var a in obj)
            count ++;
        return count;
    }

    function recursiveSubmit(node,url_post, callbackQunitFunction = null){
        var stop = false;
        if(countAttributes(node.children) == 0){
            submitOneForm(node,url_post,callbackQunitFunction);
            //submitOneForm(node,url_post, undefined, callbackQunitFunction);
        }else{
            for(var child in node.children){
                if(needsToBeSubmited(node.children[child])){
                    recursiveSubmit(node.children[child],url_post,callbackQunitFunction);
                    stop = true;
                }
            }
            // submission of 'node' doesn't come here. it comes in a 'script' tag included in the html code returned by the server (when calling 'updateFormTree' function with parameter 'inValidationProcess' = true)
            if(!stop)
                //submitOneForm(node,url_post,undefined,callbackQunitFunction);
                submitOneForm(node,url_post,callbackQunitFunction);
            }

    }

    function notifyParentForm(parentFormId, url_post, formTreePtrs, callbackQunitFunction=null){
        if(parentFormId != null){
            var parent = formTreePtrs[parentFormId],
                parentIsReadyForSubmission = true,
                data_from_children = '';
            for(var c in parent.children){
                var child = parent.children[c];
                if(needsToBeSubmited(child)){
                    parentIsReadyForSubmission = false; //todo: optim
                }
                //childFieldsValues = childFieldsValues + '&' ++ '=' + child['validatedValue'];
            }
            if(parentIsReadyForSubmission){
                /*for(var c in parent.children){
                    var child = parent.children[c];
                    if(child['validatedValue'] != null)
                        data_from_children += '&' + child['fieldOfParentForm'] + '=' + child['validatedValue'];
                }*/
                submitOneForm(parent, url_post, callbackQunitFunction);
            }
        }else{
            //todo: specifier quelquechose
        }
    }

    function getFormData(node){
        var dataStr = $('#'+node['form_id']).serialize();
        for(var c in node.children){
                    var child = node.children[c];
                    if(child['validatedValue'] != null)
                        dataStr += '&' + child['fieldOfParentForm'] + '=' + child['validatedValue'];
        }
        return dataStr;
    }

    // TESTED
    function needsToBeSubmited(node){
        return node['is_visible'] & node['submissionStatus'] == "being_edited";
    }

    function submitOneForm(node,url_post, callbackQunitFunction= null){
    //function submitOneForm(node,url_post,additional_data='', callbackQunitFunction= null){
        if(needsToBeSubmited(node)){ //todo: redondant
            var dataString = getFormData(node) + '&formId=' + node['form_id'];// todo: supposes that no form contains a field called formId
            //var dataString = $('#'+node['form_id']).serialize() + additional_data + '&formId=' + node['form_id'];
            if(node['parentFormId'] != null){
                dataString += '&parentFormId=' + node['parentFormId'] + '&fieldOfParentForm=' + node['fieldOfParentForm'];//todo:idem
            }else{
                dataString += '&isRootForm=true'; //todo: idem
            }
                    $.ajax({
                        type: 'POST',
                        url: url_post + node['form_name'],
                        /*data: {
                            'formId': node['form_id'],
                            'csrfmiddlewaretoken': $("#foo>input[name=csrfmiddlewaretoken]").val(),
                            'formData': formDataAsJson($('#'+node['form_id']))
                        },*/
                        data: dataString + (callbackQunitFunction? '&qunitTesting=true&callbackQunitFunction'+callbackQunitFunction.name : ''),
                        success: function(response) {
                            if(response.status == "success"){
                                $('#' + node['form_id'] + '_container').replaceWith(response.html); //todo: optimisation: voir si le code js renvoyé en réponse ne peut pas etre anticipé et donc réduire la réponse
                                //updateFormTree([{'fid':node['form_id'], 'fname':node['form_name'],'isEditable':false}],node['parentFormId'],node['fieldOfParentForm']);
                                //notifyParentForm(node);
                            }else if(response.status == "error"){
                                var field, errorDiv, errorDivId;

                                $("#"+node['form_id']+" *").filter(function(a,e){return $(e).hasClass('errorlist')}).remove();

                                for(field in response.errors){
                                    errorDivId = node['form_id'] + '_' + field + '_errors';
                                    errorDiv   = constructErrorList(field, response.errors[field]);

                                    if(field=='__all__'){
                                        var formObject = $('#'+node['form_id']);
                                        formObject.prepend(errorDiv + '<hr/>');
                                    }else{
                                        var fieldObject  = selectFieldOfForm(node['form_id'], field),
                                            wrapperDivId = node['form_id'] + '_' + field + '_wrapper';
                                        if(!$("#"+wrapperDivId).length){
                                            fieldObject.replaceWith('<div id="'+wrapperDivId+'" style="width:'+ fieldObject.width() +'"></div>');
                                            $("#" + wrapperDivId).append(errorDiv);
                                            $("#" + wrapperDivId).append(fieldObject);
                                        }else
                                            fieldObject.before(errorDiv);
                                    }
                                }
                            }
                            //$('#' + formIdStr).append(response); // update the DIV

                        },
                        error: function(){
                            // todo: do something please...
                        },
                        complete: function(jqXHR, textStatus){
                            if(callbackQunitFunction != null)
                                callbackQunitFunction(jqXHR.responseText, textStatus, this);
                        }
                    });
        }
        //###########!!!!!!!!!! prendre en compte cela:  C’est une opération triviale avec une bibliothèque JavaScript comme jQuery, il suffit d’utiliser $(el).text(errorText) plutôt que .html().
        //########### a la page https://docs.djangoproject.com/fr/1.9/ref/forms/api/
        return true;
    }

    function selectFieldOfForm(formId, fieldName){
        var inCurentFormAndInChildForms = "#" + formId + "      [name=" + fieldName + "]" ,
            onlyInChildForms            = "#" + formId + " form [name=" + fieldName + "]" ;
        // we have to select the field (whose name is [fieldName]) which is in the current form form [formId],
        // but not the fields (whose name are also [fieldName]) which are in the child forms
        return $(inCurentFormAndInChildForms).not(onlyInChildForms);
    }

    // TESTED
    function constructErrorList(fieldName, errors){
    // returns a Django-like error list
        var nonFieldClass = fieldName == '__all__' ? " nonfield" : "",
            str = "<ul class='errorlist" + nonFieldClass + "'>";
        for(var error in errors)
            str += "<li>" + errors[error] + "</li>";
        return str + "</ul>";
    }
/*
    function formDataAsJson(form){
        var data = {},
            ser = form.serializeArray();
        for(var field in ser)
            if(field != 'csrfmiddlewaretoken')
                if(field in data){ // in this case, the value is a list
                    //transformToListAndAdd(data, field,);
                }else{
                    data[ser[field].name] = ser[field].value
                }
        return JSON.stringify(data);
    }

    function transformToListAndAdd(data, field){
        //if(typeof data[ser[field].name] )
    }
    */

    function updateFormTree(formInfo, parentFormId, fieldOfParentForm, inValidationProcess, url_post, formTreePtrs){
                for(var fi in formInfo)
                    addOrUpdateFormTreeNode(parentFormId,formInfo[fi].fid,formInfo[fi].fname,fieldOfParentForm,formTreePtrs,formTree,formInfo[fi].isEditable, formInfo[fi].validatedValue);
                updateVisibilityInfo(formTreePtrs);
                if(inValidationProcess)
                    notifyParentForm(parentFormId, url_post, formTreePtrs);
    }

    function addOrUpdateFormTreeNode(parentFormId, formId, formName, fieldOfParentForm, formTreePtrs, formTree, isEditable=true, validatedValue=null) {
        // todo: a optimiser: en cas d'update, tout le noeud est reforme, alors qu'il ne suffit que d'acutaliser submissionstatus et re reinitialiser children a []
        var ind,ptr,listToCheck,index,
            node = {
                //form: $('#' + formId),
                form_id: formId,
                form_name: formName,
                children: {},
                submissionStatus : isEditable ? "being_edited" : "uneditable_inbase_object",
                is_visible: false,
                validatedValue: validatedValue,
            };
        if(parentFormId==null){ // in case of rootForm
            node['parentFormId'] = null;
            node['fieldOfParentForm'] = null;
            listToCheck = formTree;
        }else{
            node['fieldOfParentForm'] = fieldOfParentForm;
            node['parentFormId'] = parentFormId;
            listToCheck = formTreePtrs[parentFormId].children;
        }

        index = indexOfNode(node,listToCheck);
        console.log(index);
        if(parentFormId==null){
            index = indexOfNode(node,listToCheck);
            if(index == -1)
                listToCheck.push(node);
            else
                listToCheck[index] = node;
        }else
            listToCheck[formId] = node;

        /*index = indexOfNode(node,listToCheck);
        if(index == -1)
            // add
            listToCheck.push(node);
        else
            // add or update
            listToCheck[index] = node;*/

        formTreePtrs[formId] = node;
    }
    //todo: IMPORTANT : units tests : vérifier qu'il n'y ait jamais dans l'abre de noeuds "being_edited" enfants de "vald_inbase_object"
    //todo: unit tests : verifier si le formTree s'actualise bien en cas d'objet inbase sur lequel on clique sur "modifier"
    //todo: unit tests : cas où l'on valide, certains objets se créent et s'affichent ensuite comme uneditable, puis on reclique sur "modifier": verifier formTree
    //todo: unit tests : changements modifiable/unmodifiable (et vice versa) dans une polymorphicforeignkey
    //todo: unit tests : cas où il y a une validation qui reussit et une autre qui ne réussit pas (bug sur l'affichage des mesages d'erreur)

    function indexOfNode(node,list){
        for(var elem in list)
            if(list[elem].form_id == node.form_id)
                return elem;
        return(-1)
    }

    /*function childAlreadyExists(node,list){
        var exists = false;
        for(var elem in list)
            if(list[elem].form_id == node.form_id){
                exists = true;
            }
        return(exists)
    }*/

    function getFormField(formId, fieldId) {
        'use strict';
        return $('#' + formId + ' #id_' + fieldId)
    }

    function showFormContent(elem, containerId, fieldOfParentForm, formTreePtrs) { //todo: parametres obsoletes?
        var radioButtonValue = $(elem).val();
        var children = $('#' + containerId).children().children();
        children.hide();
        children.filter('[model=' + radioButtonValue + ']').show();
        //var formId = fieldOfParentForm + '_' + radioButtonValue + '_container';
        //$('#' + formId).show();
        updateVisibilityInfo(formTreePtrs);
    }

    function updateVisibilityInfo(formTreePtrs){
        for(var fid in formTreePtrs){
            formTreePtrs[fid]['is_visible'] = $('#'+fid).is(":visible");
        }
    }

    function polymorphicForeignKey(fieldToReplace, childFormId, fieldConf, url_get, parentFormId, fieldOfParentForm, callbackQunitFunction = null) {
        'use strict';

        var boxList = []; var objectId = fieldToReplace.val();
        for (var c in fieldConf['classes']) {
            boxList.push({
                'id': fieldConf['classes'][c][0],
                'label': fieldConf['classes'][c][1]
            })
        }

        var data = {
            "nbBoxes": boxList.length,
            "boxList": boxList,
            "formId": childFormId,
            "parentFormId": parentFormId,
            "fieldOfParentForm": fieldOfParentForm
        }
        if(objectId != '')
            data['objectId'] = objectId

        function success(res) {
            fieldToReplace.replaceWith(res);
        }

        plop('/coreforms/getformpart/polymorphicForeignKey/', data, success, childFormId, undefined, callbackQunitFunction);
    }

    function foreignKey(fieldToReplace, childFormId, fieldConf, url_get, parentFormId, fieldOfParentForm, callbackQunitFunction= null) {
        'use strict';

        var objectId = fieldToReplace.val();
        //var whereToAddTheForm = childFormId + '_content';
        var data = {
            "formId": childFormId,
            "formName": fieldConf['formName'],
            "parentFormId": parentFormId,
            "fieldOfParentForm": fieldOfParentForm
        }
        if(objectId != '')
            data['objectId'] = objectId

        function success(res) {
            fieldToReplace.replaceWith(res);
        }

        plop('/coreforms/getformpart/foreignKey/', data, success, childFormId, undefined, callbackQunitFunction);
    }

    function manyToMany(fieldToReplace, childFormId, fieldConf, url_post, parentFormId, fieldOfParentForm, formTreePtrs, callbackQunitFunction=null) { //todo: params obsoletes?
        'use strict';

        var contentId = childFormId + "_pool", //avant content
            initialValuesOfTheManyToManyField = fieldToReplace.val(),
            formName = fieldConf['formName'];
            console.log('ATTENTION!!!! fieldToReplace.val() n a pas le meme comportmeent sur chrome et sur firefox!! sur firefix, il ne retourne quun seul element meme si plusieurs st selectionnes, ca fait un bug. Verifier a ts les endroits de ce fichiers où il est utilisé .val()');
            //todo: egalement, si fieldToReplace.val() n'est pas rempli, ne pas mettre de param initialValue

        var data = {
            'formId': childFormId,
            'parentFormId' : parentFormId,
            'fieldOfParentForm': fieldOfParentForm,
            'formName': formName,
            'contentId': contentId,
            'initVal':JSON.stringify(initialValuesOfTheManyToManyField)
        }

        function success(res) {
            fieldToReplace.replaceWith(res);
            // set the events of the "add" button
            var addButton = $('#' + childFormId + "_control").find('.addElemToManyToMany')[0]; //!!todo: tester dans qunit l'existence de la classe addElemToManyToMany
            $(addButton).on('click', {
                    'formName': formName,
                    'formId': childFormId,
                    //'contentId': contentId,
                    'urlPost': url_post,
                    'parentFormId': parentFormId,
                    'fieldOfParentForm': fieldOfParentForm,
                    'formTreePtrs': formTreePtrs
                    //'callbackQunitFunction': callbackQunitFunction,
                },
                manuallyAddFormToManyToMany); //todo: pas besoin de faire une requete ajax: le formulaire vide a ajouter a deja ete renvoyé et se trouve dans une div cachée dont l'id est formId + '_templateForm'

                console.log("!!!!!penser a ajouter ici le update formtree!!!");
        }
        plop('/coreforms/getformpart/manytomany/', data, success, childFormId, undefined, callbackQunitFunction);
    }


    function manuallyAddFormToManyToMany(event) {
        'use strict';

        var evtData = event.data,
            formId = evtData['formId'],
            formName = evtData['formName'],
            url_post = evtData['urlPost'],
            parentFormId = evtData['parentFormId'],
            fieldOfParentForm = evtData['fieldOfParentForm'],
            formTreePtrs = evtData['formTreePtrs'],
            idOfTheFormToAdd,
            templateForm,
            clonedTemplateForm,
            formInfo;

        templateForm = $('#' + formId + '_templateForm');
        if(! templateForm.size())
            throw Error('Error while attempting to add a form: the template form ' + formId + '_templateForm was not found');

        idOfTheFormToAdd = findAnIdForANewForm(formId);
        clonedTemplateForm = $(templateForm[0].cloneNode(true));
        clonedTemplateForm.attr('id',idOfTheFormToAdd + '_container');
        $('#' + formId + '_pool').append(clonedTemplateForm);
        replaceIdInAllChildren(idOfTheFormToAdd + '_container', formId + '_STRINGTOBEREPLACED', idOfTheFormToAdd);
        clonedTemplateForm.show();

        formInfo = [{validatedValue: null, isEditable: true, fname: formName, fid: idOfTheFormToAdd}];
        updateFormTree(formInfo, parentFormId, fieldOfParentForm, false, url_post, formTreePtrs);

    }

    function replaceIdInAllChildren(formId, before, after){
            $('#' + formId + ' *').each(function(i, elem){   // select all the children (deeply) of the element
                var id = $(elem).attr('id'), newId;
                if(id){
                            newId = id.replace(before, after)
                            console.log("L'id est:", id," . Le nouvel id est:" , newId);
                            $(elem).attr('id', newId);
                }
            })
    }

    function findAnIdForANewForm(containerFormId){
            var indexIsUsed = true,
                idToTest = 0,
                testedId;

            while(indexIsUsed){
                testedId = containerFormId + '_' + idToTest;
                if( $("#" + containerFormId + '_div ' + '#' + testedId + '_container').size() == 0){
                    indexIsUsed = false;
                    return testedId;
                }else{
                    idToTest ++;
                }
            }
    }



    function plop(url, data, success, formId, type = 'GET', callbackQunitFunction = null) {
        if(callbackQunitFunction){
            data['callbackQunitFunction'] = callbackQunitFunction.name;
            data['qunitTesting'] = true;
        }

        $.ajax({
            type: type,
            url: url,
            data: data,
            headers: {
                "X-CSRFToken": csrftoken,//getCookie('csrftoken')
            },
            success: success,
            complete: function(jqXHR, textStatus){
                if(callbackQunitFunction != null)
                    callbackQunitFunction(jqXHR.responseText, textStatus, this);
            }
        });
        //addOrUpdateFormTreeNode(parentFormId, formId, formTreePtrs, formTree);
    }

/*
    function getFormWithAjax(
        formName,
        newFormId,
        parentFormId,
        fieldOfParentForm,
        whereToAddTheForm,
        successHandler,
        successHandlerParams,
        deleteExistingContent,
        url_get,
        objectId,
        hide,
        objectMayNotExist,
        modifiable,
        replace=false,
        isRootForm=false,
        callbackQunitFunction=null
        ) {
        //todo: certains de ces parametre sont peut etre maintenant obsoletes

        var data = {
            formId: newFormId,
        };
        if (typeof objectId !== "undefined") {
            data['objectId'] = objectId;
        }
        if (typeof modifiable !== "undefined") {
            data['modifiable'] = modifiable;
        }
        if(parentFormId != null){
            data['parentFormId']= parentFormId;
            data['fieldOfParentForm']= fieldOfParentForm;
        }
        if(isRootForm == true)
            data['isRootForm'] = true

        if (objectMayNotExist == true) {
            data['objectMayNotExist'] = true
        } else {
            data['objectMayNotExist'] = false
        }

        function success(response) {
            var where = $('#' + whereToAddTheForm);
            if (deleteExistingContent) {
                where.html('');
            }
            if (hide) {
                where.hide();
            }
            if(replace){
                where.replaceWith(response);
            }else{
                where.append(response);
            }
            if (hide) { //todo: a bit dirty
                $('#' + newFormId).hide();
                where.show();
            }
            successHandler(successHandlerParams);
        }
        plop(url_get + formName, data, success, newFormId, undefined, callbackQunitFunction);
    }
*/
    //si ouverture: attention aux ids qui pourraient avoir des doublons (ex: un champ appele 'to_rel' avec un champ 'to' incluant un champ 'rel' qui donneraient 'to_rel' tous les 2. Mettre si possible des entiers)

/*
    function disableForm(node, isFirstRecursiveLevel) {
        var children = node.children().toArray();

        if (isFirstRecursiveLevel == undefined) {
            node.addClass('isUneditable');
        }

        if (node[0].tagName == "INPUT" || node[0].tagName == "SELECT") {
            node[0].setAttribute('disabled', 1) // removeAttribute
        }

        for (var ch in children) {
            disableForm($(children[ch]), false);
        }

    }
*/

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');




