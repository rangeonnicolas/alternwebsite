    'use strict';

        function applyFormConfiguration(formIdStr,formName,url,url2){ //todo: donner un nom plus explicite que url

            $('#' + formIdStr ).submit(function() { // catch the form's submit event
                $.ajax({ // create an AJAX call...
                    data: $(this).serialize(), // get the form data
                    type: $(this).attr('method'), // GET or POST
                    url: $(this).attr('action'), // the file to call
                    success: function(response) { // on success..
                        $('#' + formIdStr ).html(response); // update the DIV
                    }
                });
                return false;
            });

            if(formIdStr in allFormsConf){
                var formConf = allFormsConf[formIdStr];
                if(formConf != null){
                    if('fields' in formConf){

                        var fieldId;
                        for(fieldId in formConf['fields']){
                            var field = formConf['fields'][fieldId],
                                fieldToReplace = getFormField(formIdStr,fieldId),
                                childFormId = formIdStr + '_' + fieldId;

                            if(field['type'] == 'polymorphicForeignKey')
                            {
                                polymorphicForeignKey(fieldToReplace,childFormId,field,url);

                            }else if (field['type'] == 'foreignKey')
                            {
                                foreignKey(fieldToReplace,childFormId,field,url);
                            }
                            else if (field['type'] == 'manyToMany')
                            {
                                manyToMany(fieldToReplace,childFormId,field,url)
                            }
                        }
                    }

                    if('ajax' in formConf){

                        pushAjaxFormConf(formIdStr, formName);

                        var fieldGroup = [];
                        for(var i=0; i<formConf['ajax']['searchOn'].length;i++){
                            fieldGroup.push($('#' + formIdStr + ' #id_'+(formConf['ajax']['searchOn'][i])));
                            //console.log(1,$('#'+(formConf['ajax']['searchOn'][i])));
                        }


                        for(var i=0; i<formConf['ajax']['searchOn'].length;i++){

                            initFieldsForAjax(
                                fieldGroup[i],
                                {'fieldGroup':fieldGroup,'latest_value':'','value':''},
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
                                $('#' + formIdStr ).append(response); // update the DIV
                            }
                        });
                    }
                }
            }
        }
/*
        function constructRadioBoxesForm(boxList, formId)
        {
            'use strict';

            var str = "<form id='" + formId + "Radioboxes'>";
            var i;
            for(i=0; i<boxList.length;i++){
                str += '<INPUT type="radio" name="'+ formId + '_radiogroup" value="'+ boxList[i][0] +'" checked>'
                str += boxList[i][1] + '<br/>';
            }
            str += "</form>";
            str += formContentDiv(formId);

            return str;
        }
*/
        function constructForeignKeyForm(formId)
        {
            'use strict';

            return formContentDiv(formId)
        }

        function formContentDiv(formId)
        {
            'use strict';

            return "<div id='" + formId + "_content'></div>"
        }

        function encloseInDiv(str, divId, divClass)
        {
            'use strict';

            return "<div id='" + divId + "_div' class='" + divClass + "'>" + str + "</div>";
        }

        function getFormField(formId, fieldId)
        {
            'use strict';

            return $('#' + formId + ' #id_' + fieldId)
        }

        function getFormWithAjax(formName,newFormId,whereToAddTheForm,successHandler,successHandlerParams,replace,url,objectId,hide,objectMayNotExist,modifiable)
        {
            'use strict';

            var data = {formId: newFormId};
            if(objectId !== undefined){
                //console.log('objectId=',objectId);
                data['objectId']= objectId;
            }
            if(modifiable !== undefined){
                data['modifiable'] = modifiable;
            }

            if(objectMayNotExist == true){
                data['objectMayNotExist'] = true
            }else{
                data['objectMayNotExist'] = false
            }

            //console.log('data=',data);


                    $.ajax({
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
                    });
        }


                    function showFormContent(elem, childFormId){
                        var radioButtonValue = $(elem).val();
                        var children = $('#' + childFormId + '_content').children();
                        children.hide();
                        $('#' + childFormId + '_' + radioButtonValue).show();
                    }

        //getFormWithAjax('habit_1','titBiloute','html',function(){},{})

        function polymorphicForeignKey(fieldToReplace,childFormId,fieldConf,url)
        {
            'use strict';

            fieldConf['classes'],childFormId

                var RadioBoxesForm = constructRadioBoxesForm(fieldConf['classes'],childFormId),
                    replacement = encloseInDiv(RadioBoxesForm,childFormId,'nestedBox formBox');
                fieldToReplace.replaceWith(replacement);

                var successHandler = function(params){

                    var children = $('#' + params['whereToAddTheForm']).children();

                    if ($('#' + params['newFormId'] + '_was_originally_empty').val() == "False"){
                        var elem = $('input[name=' + params['formId'] + '_radiogroup][value=' + params['radioButtonValue'] + ']:radio');
                        elem.trigger('click');
                    }
                };

                $('input[name=' + childFormId + '_radiogroup]:radio')
                .each(function(){
                    var radioButtonValue = $(this).val(),
                        newFormId = childFormId + '_' + radioButtonValue,
                        whereToAddTheForm = childFormId + '_content' ;
                    getFormWithAjax(
                        radioButtonValue,
                        newFormId,
                        whereToAddTheForm,
                        successHandler,{'formId':childFormId,'fieldConf':fieldConf,'whereToAddTheForm':whereToAddTheForm,'newFormId':newFormId,'radioButtonValue':radioButtonValue},
                        false,
                        url,
                        fieldToReplace.val(),
                        true,
                        true);
                })
                .click(function() {

                    showFormContent(this, childFormId);

                });

        }

        function foreignKey(fieldToReplace,childFormId,fieldConf,url)
        {
            'use strict';

            var whereToAddTheForm = childFormId + '_content'

            fieldToReplace.replaceWith(constructForeignKeyForm(childFormId));
            getFormWithAjax(fieldConf['formName'],childFormId,whereToAddTheForm,function(){},null,false,url,fieldToReplace.val(),false);

        }

        function manyToMany(fieldToReplace,childFormId,fieldConf,url)
        {
            'use strict';

            var contentId = childFormId + "_content",
                initialValuesOfTheManyToManyField = fieldToReplace.val(),
                index=0,
                formName = fieldConf['formName'],
                addButton;

            var str = "<div id='"+childFormId+"_control'>A cette ligne il faut dire que faire quand on clique sur ajouter<a class='addElemToManyToMany' alt='Ajouter' href='#'>Ajouter</a></div>";
            str += "<div id='"+contentId+"'></div> ";
            str = encloseInDiv(str,childFormId,'nestedBox formBox');
            fieldToReplace.replaceWith(str);
            addButton = $('#'+childFormId+"_control").find('.addElemToManyToMany')[0];
            $(addButton).on('click',{'formName':formName,'firstPartOfChildFormId':childFormId,'contentId':contentId,'url':url},manuallyAddFormToManyToMany);

            if(fieldToReplace.val() == null){
                addFormToManyToMany(formName,childFormId + '_' + index,contentId,url,undefined,index);
                index++;
            }else{
                for(var objectId in fieldToReplace.val()){
                    addFormToManyToMany(formName,childFormId + '_' + index,contentId,url,objectId,index);
                    index++;
                }
            }
            console.log('$("'+contentId+'")');
        }

        //si ouverture: attention aux ids qui pourraient avoir des doublons (ex: un champ appele 'to_rel' avec un champ 'to' incluant un champ 'rel' qui donneraient 'to_rel' tous les 2. Mettre si possible des entiers)



        //function manuallyAddFormToManyToMany()//just to test
        function manuallyAddFormToManyToMany(event)
        {
            'use strict';

            var evtData = event.data,
                formName                = evtData['formName'],
                firstPartOfChildFormId  = evtData['firstPartOfChildFormId'],
                contentId               = evtData['contentId'],
                url                     = evtData['url'],
                objectId                = evtData['objectId'];

            var testIndex = 0,
                unusedIndex = -1,
                idToTest = "",
                children = $("#"+contentId).children('form'),
                testedIdExists = false;

                console.log(children);

            while(unusedIndex == -1){
                idToTest = firstPartOfChildFormId + '_' + testIndex;
                testedIdExists = $("#"+contentId).children('#'+idToTest).size() > 0;

                console.log(1,$("#"+contentId).children('#'+idToTest));

                if(!testedIdExists){
                    unusedIndex = testIndex;
                }else{
                    testIndex++;
                }
                console.log(testIndex);
            }

            console.log(unusedIndex);


            //var numberOfAlreadyInPlaceElements = ;
            //EH NON!!! IL FAUT PRENDRE LE MAX!!! (en cas de suppression!)

            var childFormId = firstPartOfChildFormId + '_' + unusedIndex;

            addFormToManyToMany(formName,childFormId,contentId,url,objectId);
        }

        function addFormToManyToMany(formName,childFormId,contentId,url,objectId)
        {
            'use strict';

            getFormWithAjax(formName,childFormId,contentId,function(){},null,false,url,objectId,false);
        }

        function disableForm(node,isFirstRecursiveLevel){
            var children = node.children().toArray();

            if(isFirstRecursiveLevel == undefined){
                node.addClass('isUneditable');
            }

            if(node[0].tagName == "INPUT" || node[0].tagName == "SELECT"){
                node[0].setAttribute('disabled',1) // removeAttribute
            }

            for(var ch in children){
                disableForm($(children[ch]),false);
                console.log(children[ch].tagName);
            }

        }

///////////////////////////////////////// AJAX ///////////////

function pushAjaxFormConf(formIdStr, formName){  //todo: formIdStr innulitle ?
    ls[formIdStr] = {
        urlLiveSearch: "process_livesearch/" + formName,
        formName: formName,
        //form_id: euh je sais plus en fait...,
        //form_anti_bot_id: "#ls_anti_bot",
        // This should be the same as the same parameter's value in config file
        //form_anti_bot: "Ehsan's guard",
        //query_id: "#ls_query",
        //result_id: "#ls_result_div",
        //footer_id: "#ls_result_footer",
        //current_page_hidden_id: "#ls_current_page",
        //current_page_lbl_id: "#ls_current_page_lbl",
        //last_page_lbl_id: "#ls_last_page_lbl",
        //page_range_id: "#ls_items_per_page",
        //navigation_class: ".navigation",
        //arrow_class: ".arrow",
        //next_page_id: "ls_next_page",
        //previous_page_id: "ls_previous_page",
        slide_speed: "fast",
        //type_delay: 350,
        //select_column_index: 0,

        selected_row: undefined,
    };
}


function initFieldsForAjax(queryField, fieldGroup, whereToDisplayTheResult, formIdStr, url){
    'use strict';

    //console.log("wheretodisplaytheresult c'est ca:", whereToDisplayTheResult);

    // Trigger search when typing is started
    $(queryField).on('keyup', function (event) {
        'use strict';

        var tmp = getQueryToSendFromFieldGroup(fieldGroup, true, formIdStr);
        var queryToSend = tmp[0];
        var totalLength = tmp[1];

        // If enter key is pressed check if the user want to selected hovered row
        var keycode = event.keyCode || event.which;
        if (totalLength && keycode === 13) {

            if ((whereToDisplayTheResult.is(":visible") || whereToDisplayTheResult.is(":animated")) && whereToDisplayTheResult.find("tr").length !== 0) {
                // find hovered row
                if (queryField.selected_row !== undefined) {

                     //Do whatever you want with the selected row
                     //Instead of calling directly select function, it should be through click event
                     //then easily can bind or unbind to page_range result handler

                    $(whereToDisplayTheResult).find("tr").trigger("click");
                } // If there is any results and hidden and the search input is in focus, show result by press enter
            } else {
                show_result(whereToDisplayTheResult);
            }

            console.log("Ici il faudra éclaircir ce que font les quelques lignes de codes précédentes...");
        } else {
            // If something other than enter is pressed start search immediately
            search_query(fieldGroup, true, true, totalLength, queryToSend, formIdStr, whereToDisplayTheResult,url);
            console.log("remoover le bypasscheckvalue");
        }

    });

    // While search input is in focus
    // Move among the rows, by pressing or keep pressing arrow up and down
    $(queryField).on('keydown', function (event) {

        var tmp = getQueryToSendFromFieldGroup(fieldGroup, true, formIdStr);
        //var queryToSend = tmp[0];
        var totalLength = tmp[1];

        var keycode = event.keyCode || event.which;
        if (keycode === 40 || keycode === 38) {

            if (totalLength && whereToDisplayTheResult.find("tr").length !== 0) {
                if ((whereToDisplayTheResult.is(":visible") || whereToDisplayTheResult.is(":animated"))) {
                    whereToDisplayTheResult.find('tr').removeClass('hover');
                    if (ls[formIdStr].selected_row === undefined) {
                        // Moving just started
                        ls[formIdStr].selected_row = whereToDisplayTheResult.find("tr").eq(0);
                        $(ls[formIdStr].selected_row).addClass("hover");
                    } else {

                        $(ls[formIdStr].selected_row).removeClass("hover");

                        if (keycode === 40) {
                            // next
                            if ($(ls[formIdStr].selected_row).next().length === 0) {
                                // here is the end of the table
                                ls[formIdStr].selected_row = whereToDisplayTheResult.find("tr").eq(0);
                                $(ls[formIdStr].selected_row).addClass("hover");
                            } else {
                                $(ls[formIdStr].selected_row).next().addClass("hover");
                                ls[formIdStr].selected_row = $(ls[formIdStr].selected_row).next();
                            }

                        } else {
                            // previous
                            if ($(ls[formIdStr].selected_row).prev().length === 0) {
                                // here is the end of the table
                                ls[formIdStr].selected_row = whereToDisplayTheResult.find("tr").last();
                                ls[formIdStr].selected_row.addClass("hover");
                            } else {
                                $(ls[formIdStr].selected_row).prev().addClass("hover");
                                ls[formIdStr].selected_row = $(ls[formIdStr].selected_row).prev();
                            }
                        }

                    }
                } else {
                    // If there is any results and hidden and the search input is in focus, show result by press down
                    if (keycode === 40) {
                        show_result(whereToDisplayTheResult);
                    }
                }
            }
        }

    });





    // Show result when is focused
    $(queryField).on('focus', function () {

        var tmp = getQueryToSendFromFieldGroup(fieldGroup, true, formIdStr);
        var queryToSend = tmp[0];
        var totalLength = tmp[1];

        // check if the result is not empty show it
        if (totalLength && (queryField.is(":hidden") || queryField.is(":animated")) && queryField.find("tr").length !== 0) {
            search_query(fieldGroup, false, true, totalLength, queryToSend, formIdStr, whereToDisplayTheResult,url);
            show_result(whereToDisplayTheResult);

        }
    });

    // In the beginning, there is no result / tr, so we bind the event to the future tr
    $(whereToDisplayTheResult).on('mouseover', 'tr', function () {
        // remove all the hover classes, otherwise there are more than one hovered rows
        whereToDisplayTheResult.find('tr').removeClass('hover');
        //console.log("MouseOver!");

        // set the current selected row
        ls[formIdStr].selected_row = this;

        $(this).addClass('hover');
    });

    // In the beginning, there is no result / tr, so we bind the event to the future tr
    $(whereToDisplayTheResult).on('mouseleave', 'tr', function () {
        // remove all the hover classes, otherwise there are more than one hovered rows
        whereToDisplayTheResult.find('tr').removeClass('hover');

        // Reset selected row
        ls[formIdStr].selected_row = undefined;
    });



}




function getQueryToSendFromFieldGroup(fieldGroup, include_csrf_and_loaded_at, formIdStr){

    var queryToSend = {}, i, totalLength=0, fieldGroup=fieldGroup['fieldGroup'];
    for(i=0; i<fieldGroup.length;i++){
        var val = $.trim(fieldGroup[i].val());
        queryToSend[fieldGroup[i][0].name] = val;
        if(val){
            totalLength += val.length;
        }
    }

    if(include_csrf_and_loaded_at){
        queryToSend['csrfmiddlewaretoken'] = $("#" + formIdStr + ">input[name=csrfmiddlewaretoken]").val();
        queryToSend['_page_loaded_at'] = $("#" + formIdStr + ">input[name=_page_loaded_at]").val();
    }

    return [queryToSend,totalLength];
}


function show_result(result) {
    'use strict';
    result.slideDown(ls.slide_speed);
}

function hide_result(result) {
    'use strict';
    result.slideUp(ls.slide_speed);
}


/*
 get the search input object (not just its value)
 */
function search_query(search_objects, bypass_check_last_value, reset_current_page, fieldsContentLength, queryToSend, formIdStr, whereToDisplayTheResult,url) {
    'use strict';
    //console.log("Yop Yop Yop! il est temps de checker search_objects.latest_value!:", search_objects.latest_value,search_objects);
    if (fieldsContentLength) {
        // If the previous value is different from the new one perform the search
        // Otherwise ignore that. This is useful when user change cursor position on the search field
        if (bypass_check_last_value || search_objects.latest_value !== search_objects.value) {
            //if (reset_current_page) {
                // Reset the current page (label and hidden input)
            //    current_page.val("1");
            //    current_page_lbl.html("1");
            //}
            console.log("verifier le comportement ici");

            // Reset selected row if there is any
            //search_object.selected_row = undefined;

            /*
             If a search is in the queue to be executed while another one is coming,
             prevent the last one
             */
            if (search_objects.to_be_executed) {
                clearTimeout(search_objects.to_be_executed);
            }

            // Start search after the type delay
            search_objects.to_be_executed = setTimeout(function () {

                // Sometimes requests with no search value get through, double check the length to avoid it
                //if ($.trim(query.val()).length) {
                    // Display loading icon
                    //query.addClass('ajax_loader');

                    // Send the request
                    $.ajax({
                        type: "post",
                        url: ls[formIdStr].urlLiveSearch,
                        data: queryToSend,//$(ls.form_id).serialize(),
                        dataType: "json",
                        success: function (response) {
                            if (response.status === 'success') {

                                var resultObj = $.parseJSON(response.result);

                                // set html result and total pages
                                var tmp = $(whereToDisplayTheResult.find('.whereToAddTheResultContent')).selector; // it looks dirty but I didn't find any other way to do... :(
                                $(tmp).html(resultObj.html);

                                /*
                                 If the number of results is zero, hide the footer (pagination)
                                 also unbind click and select_result handler
                                 */
                                if (resultObj.number_of_results === 0) {
                                    remove_footer(formIdStr,url);
                                } else {
                                    /*
                                     If total number of pages is 1 there is no point to have navigation / paging
                                     */
                                    if (resultObj.total_pages > 1) {
                                        $("#" + formIdStr + '_ajax_navigation').show();
                                        $("#" + formIdStr + "_ls_last_page_lbl").html(resultObj.total_pages);
                                        //console.log("#" + formIdStr + "_ls_last_page_lbl");
                                    } else {
                                        // Hide paging
                                        $("#" + formIdStr + '_ajax_navigation').hide();
                                    }

                                    /*
                                     Display select options based on the total number of results
                                     There is no point to have a option with the value of 10 when there is
                                     only 5 results
                                     */
                                    //remove_select_options(resultObj.number_of_results);

                                    console.log("où là____")

                                    //$($(whereToDisplayTheResult).selector).on("click", "tr",{'formIdStr': formIdStr, 'url': url}, select_result); //todo: degueulasse
                                    $($(whereToDisplayTheResult).selector + ' tr').each(function(){ //degueulasse
                                        $(this).click({'formIdStr': formIdStr, 'url': url, 'objectId': 39}, select_result); //todo: degueulasse
                                    })




                                    show_footer(formIdStr);
                                }

                            } else {
                                // There is an error
                                var tmp = $(whereToDisplayTheResult.find('.whereToAddTheResultContent')).selector; // it looks dirty but I didn't find any other way to do... :(
                                $(tmp).html(response.message);

                                remove_footer(formIdStr,url);
                            }

                        },
                        error: function () {
                            var tmp = $(whereToDisplayTheResult.find('.whereToAddTheResultContent')).selector; // it looks dirty but I didn't find any other way to do... :(
                            $(tmp).html('Something went wront. Please refresh the page.');

                            remove_footer(formIdStr,url);
                        },
                        complete: function () {
                            /*
                             Because this is a asynchronous request
                             it may add result even after there is no query in the search field
                             */
                            //if ($.trim(search_object.value).length && result.is(":hidden")) {
                                show_result(whereToDisplayTheResult);
                                console.log("revoir ici merci");
                            //}

                            //query.removeClass('ajax_loader');


                        }
                    });
                    // End of request
                //}

            }, ls.type_delay);

        }

    } else {
        // If search field is empty, hide the result
        // If $(ls.result_id + ":animated") is removed, it may check visibility of the result div
        // while it's animating and may not hide the div
        //if (result.is(":visible") || result.is(":animated")) {
        //    hide_result();
        //}

        //console.log("Ici il faudra ajouter le code de serach_query en fonction de ce que tu veux faire...");

    }

    //aaasearch_object.latest_value = search_object.value;

}

var select_result = function (ev) {
    'use strict';
    var formIdStr = ev.data['formIdStr'];
    //$("#ls_form").submit(); //modif nico?
    //query.val($(this).find('input[type="objectId"]').eq(ls.select_column_index).html());
    //hide_result();
    //console.log("attention cette fonction s'exécute plusieures fois, une fois par appel ajax :p");

    getFormWithAjax(ls[formIdStr]['formName'],formIdStr,formIdStr,function(){},{},true,ev.data['url'],49,false)
};

function remove_footer(formIdStr,url) {
    'use strict';
    var footer = $("#" + formIdStr + "_ls_result_footer");
    var result = $("#" + formIdStr + "_ls_result_div");

    //console.log("ici___");

    result.off("click", "tr",{'formIdStr':formIdStr, 'url':url, 'objectId' : 39},select_result);
    footer.hide();
    // add border radius to the last row of the result
    result.find("table").addClass("border_radius");
}

// Fonction faite à l'arrache... :p
function show_footer(formIdStr) {
    'use strict';
    var footer = $("#" + formIdStr + "_ls_result_footer");
    var result = $("#" + formIdStr + "_ls_result_div");
    footer.show();
    // add border radius to the last row of the result
    result.find("table").removeClass("border_radius");
}






