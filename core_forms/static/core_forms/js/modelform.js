    'use strict';

    function applyFormConfiguration(formIdStr, formName, url, url2, formTreePtr) { //todo: donner un nom plus explicite que url

        $('#' + formIdStr).submit(function() { // catch the form's submit event
            submit(formTree,url);
            /*$.ajax({ // create an AJAX call...
                data: $(this).serialize(), // get the form data
                type: $(this).attr('method'), // GET or POST
                url: $(this).attr('action'), // the file to call
                success: function(response) { // on success..
                    $('#' + formIdStr ).html(response); // update the DIV
                }
            });*/
            return false;
        });

        if (formIdStr in allFormsConf) {
            var formConf = allFormsConf[formIdStr];
            if (formConf != null) {
                if ('fields' in formConf) {

                    var fieldId;
                    for (fieldId in formConf['fields']) {
                        var field = formConf['fields'][fieldId],
                            fieldToReplace = getFormField(formIdStr, fieldId),
                            childFormId = formIdStr + '_' + fieldId;
                        //console.log("passe a getformfield:", formIdStr,fieldId)

                        if (field['type'] == 'polymorphicForeignKey') {
                            //if(fieldId!='target_entity'){console.log("___",fieldId);
                            polymorphicForeignKey(fieldToReplace, childFormId, field, url, formIdStr);
                            //}

                        } else if (field['type'] == 'foreignKey') {
                            foreignKey(fieldToReplace, childFormId, field, url, formIdStr);
                        } else if (field['type'] == 'manyToMany') {
                            manyToMany(fieldToReplace, childFormId, field, url, formIdStr)
                        }

                        //updateFormTree(formIdStr,childFormId,formTreePtrs,formTree);
                    }
                }

                if ('ajax' in formConf) {

                    pushAjaxFormConf(formIdStr, formName);

                    var fieldGroup = [];
                    for (var i = 0; i < formConf['ajax']['searchOn'].length; i++) {
                        fieldGroup.push($('#' + formIdStr + ' #id_' + (formConf['ajax']['searchOn'][i])));
                        //console.log(1,$('#'+(formConf['ajax']['searchOn'][i])));
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
                            url
                        );
                    }

                    // ajout de la zone d'affichage des resultats de la recherche en dessous du formulaire
                    $.ajax({
                        type: 'GET', // GET or POST
                        url: url2, // the file to call
                        success: function(response) {
                            $('#' + formIdStr).append(response); // update the DIV
                        }
                    });
                }
            }
        }
    }

    function submit(tree, url){
        for(var el in tree){
            recursiveSubmit(tree[el],url); //todo: formTree has a strange structure at its root... no need to have a list as a root
        }
    }

    function recursiveSubmit(node,url){
        var childrenAreOk = true;

        for(var child in node.children){
            childrenAreOk = childrenAreOk && recursiveSubmit(node.children[child],url);
        }

        if(childrenAreOk){
            return submitOneForm(node,url);
        }else{
            return false;
        }
    }

    function submitOneForm(node,url){
        if(node['is_visible']){
                    $.ajax({
                        type: 'POST',
                        url: url,
                        data: $('#'+node['form_id']).serialize(),
                        success: function(response) {
                            //$('#' + formIdStr).append(response); // update the DIV
                        }
                    });
        }
        return true;
    }

    function updateFormTree(parentFormId, childFormId, groupId, formTreePtrs, formTree, is_visible) {
        var ind,ptr,
            node = {
                form: $('#' + childFormId),
                form_id: childFormId,
                children: [],
                status: "being_edited",
                is_visible: is_visible,
                groupId: groupId
            };
        if(parentFormId==null){ // in case of rootForm
            formTree.push(node);
            //ptr = formTree[ind -1].children;
        }else{
            formTreePtrs[parentFormId].children.push(node);
            //ptr = formTreePtrs[parentFormId].children[ind - 1];
        }
        formTreePtrs[childFormId] = node;
    }



    function getFormField(formId, fieldId) {
        'use strict';
        return $('#' + formId + ' #id_' + fieldId)
    }

    function showFormContent(elem, groupId, formTreePtrs) {
        var radioButtonValue = $(elem).val();
        var children = $('#' + groupId + '_content').children();
        children.hide();
        var formId = groupId + '_' + radioButtonValue;
        $('#' + formId).show();

        //update formTree
        /*var groupId = formTreePtrs[formId]['groupId'];
        for(fid in formTreePtrs){
            if(formTreePtrs[fid]['groupId'] == groupId){
                formTreePtrs[fid]['is_visible'] = false;
            }
        }
        formTreePtrs[formId]['is_visible'] = true;
        */

        updateVisibilityInfo(formTreePtrs);
    }

    function updateVisibilityInfo(formTreePtrs){
        for(fid in formTreePtrs){
            formTreePtrs[fid]['is_visible'] = $('#'+fid).is(":visible");
        }
    }

    function polymorphicForeignKey(fieldToReplace, childFormId, fieldConf, url, parentFormId) {
        'use strict';

        var boxList = [];
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
            "objectId": fieldToReplace.val(),
            "parentFormId": parentFormId
        }

        function success(res) {
            fieldToReplace.replaceWith(res); //console.log("je passe la avec", boxList, fieldToReplace)
        }

        plop('/coreforms/getformpart/polymorphicForeignKey/', data, success, childFormId);
    }

    function foreignKey(fieldToReplace, childFormId, fieldConf, url, parentFormId) {
        'use strict';

        //var whereToAddTheForm = childFormId + '_content';
        var data = {
            "formId": childFormId,
            "formName": fieldConf['formName'],
            "objectId": fieldToReplace.val(),
            "parentFormId": parentFormId
        }

        function success(res) {
            fieldToReplace.replaceWith(res);
        }

        plop('/coreforms/getformpart/foreignKey/', data, success, childFormId);
    }

    function manyToMany(fieldToReplace, childFormId, fieldConf, url, parentFormId) {
        'use strict';

        var contentId = childFormId + "_content",
            initialValuesOfTheManyToManyField = fieldToReplace.val(),
            formName = fieldConf['formName'];
            console.log('ATTENTION!!!! fieldToReplace.val() n a pas le meme comportmeent sur chrome et sur firefox!! sur firefix, il ne retourne quun seul element meme si plusieurs st selectionnes, ca fait un bug. Verifier a ts les endroits de ce fichiers où il est utilisé .val()');

        var data = {
            'formId': childFormId,
            'parentFormId' : parentFormId,
            'formName': formName,
            'contentId': contentId,
            'initVal':JSON.stringify(initialValuesOfTheManyToManyField)
        }

        function success(res) {
            fieldToReplace.replaceWith(res);
            // set the events of the "add" button
            var addButton = $('#' + childFormId + "_control").find('.addElemToManyToMany')[0];
            $(addButton).on('click', {
                    'formName': formName,
                    'firstPartOfChildFormId': childFormId,
                    'contentId': contentId,
                    'url': url,
                    'parentFormId': parentFormId,
                },
                manuallyAddFormToManyToMany); //todo: pas besoin de faire une requete ajax: le formulaire vide a ajouter a deja ete renvoyé et se trouve dans une div cachée dont l'id est formId + '_templateForm'

                console.log("!!!!!penser a ajouter ici le update formtree!!!");
        }
        plop('/coreforms/getformpart/manytomany/', data, success, childFormId);
    }

    function addFormToManyToMany(formName, childFormId, contentId, url, objectId, parentFormId) {
        'use strict';
        getFormWithAjax(formName, childFormId, parentFormId, contentId, function() {}, null, false, url, objectId, false);
    }

    function plop(url, data, success, formId, type = 'POST') {
        $.ajax({
            type: type,
            url: url,
            data: data,
            headers: {
                "X-CSRFToken": getCookie('csrftoken')
            },
            success: success
        });
        //updateFormTree(parentFormId, formId, formTreePtrs, formTree);
    }


    function getFormWithAjax(formName, newFormId, parentFormId, whereToAddTheForm,
        successHandler, successHandlerParams, replace, url,
        objectId, hide, objectMayNotExist, modifiable) {
        //todo: certains de ces parametre sont peut etre maintenant obsoletes
        'use strict';

        var data = {
            formId: newFormId,
            parentFormId: parentFormId
        };
        if (objectId !== undefined) {
            //console.log('objectId=',objectId);
            data['objectId'] = objectId;
        }
        if (modifiable !== undefined) {
            data['modifiable'] = modifiable;
        }

        if (objectMayNotExist == true) {
            data['objectMayNotExist'] = true
        } else {
            data['objectMayNotExist'] = false
        }

        //console.log('data=',data);

        function success(res) {
            var where = $('#' + whereToAddTheForm);
            if (replace) {
                where.html('');
            }
            if (hide) {
                where.hide();
            }
            where.append(response);
            if (hide) { //todo: a bit dirty
                $('#' + newFormId).hide();
                where.show();
            }
            successHandler(successHandlerParams);
        }

        if (parentFormId)
            plop(url + formName, data, success, newFormId, 'GET');

        /*$.ajax({
            type: 'GET',
            url: url + formName,
            data: data,
            success: function(response) {
                var where = $('#' + whereToAddTheForm);
                if(replace){
                    where.html('');
                }
                if(hide){
                    where.hide();
                }
                where.append(response);
                if(hide){ //todo: a bit dirty
                    $('#'+newFormId).hide();
                    where.show();
                }
                successHandler(successHandlerParams);
            }
        });*/
    }

    //si ouverture: attention aux ids qui pourraient avoir des doublons (ex: un champ appele 'to_rel' avec un champ 'to' incluant un champ 'rel' qui donneraient 'to_rel' tous les 2. Mettre si possible des entiers)

    //function manuallyAddFormToManyToMany()//just to test
    function manuallyAddFormToManyToMany(event) {
        'use strict';

        var evtData = event.data,
            formName = evtData['formName'],
            firstPartOfChildFormId = evtData['firstPartOfChildFormId'],
            contentId = evtData['contentId'],
            url = evtData['url'],
            objectId = evtData['objectId'],
            parentFormId = evtData['parentFormId'];

        var testIndex = 0,
            unusedIndex = -1,
            idToTest = "",
            children = $("#" + contentId).children('form'),
            testedIdExists = false;

        //console.log(children);

        while (unusedIndex == -1) {
            idToTest = firstPartOfChildFormId + '_' + testIndex;
            testedIdExists = $("#" + contentId).children('#' + idToTest).size() > 0;

            //console.log(1,$("#"+contentId).children('#'+idToTest));

            if (!testedIdExists) {
                unusedIndex = testIndex;
            } else {
                testIndex++;
            }
            //console.log(testIndex);
        }

        //console.log(unusedIndex);


        //var numberOfAlreadyInPlaceElements = ;
        //EH NON!!! IL FAUT PRENDRE LE MAX!!! (en cas de suppression!)

        var childFormId = firstPartOfChildFormId + '_' + unusedIndex;

        addFormToManyToMany(formName, childFormId, contentId, url, objectId, parentFormId);
    }

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
            //console.log(children[ch].tagName);
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