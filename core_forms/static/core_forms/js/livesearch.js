'use strict'

function updateLivesearchConf(formId, formName, url){  //todo: formId innulitle ?
    ls[formId] = {
        urlLiveSearch: url,
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

function pressedEnterKey(event){
    var keycode = event.keyCode || event.which;
    return keycode === 13;
}

function initFieldsForAjax(queryField, fieldGroup, whereToDisplayTheResult, formId, url){

    // Trigger search when typing is started
    $(queryField).on('keyup', function (event) {

        var tmp = getQueryToSendFromFieldGroup(fieldGroup, true, formId),
            queryToSend = tmp[0],
            totalLength = tmp[1];

        console.log(queryToSend);

        // If enter key is pressed check if the user want to selected hovered row
        if (!pressedEnterKey(event) && totalLength>0){
            search_query(fieldGroup, true, true, queryToSend, formId, whereToDisplayTheResult,url);
            console.log("remoover le bypasscheckvalue... pour reelement faire la verif du last_value!"); //todo
        }else {
            if(totalLength > 0){
                /*if ((whereToDisplayTheResult.is(":visible") || whereToDisplayTheResult.is(":animated")) && whereToDisplayTheResult.find("tr").length !== 0) {
                    // find hovered row
                    if (queryField.selected_row !== undefined) {
                         //Do whatever you want with the selected row
                         //Instead of calling directly select function, it should be through click event
                         //then easily can bind or unbind to page_range result handler
                        $(whereToDisplayTheResult).find("tr").trigger("click");
                    } // If there is any results and hidden and the search input is in focus, show result by press enter
                } else {
                    show_result(whereToDisplayTheResult);
                }*/
                console.log("Ici il faudra éclaircir ce que font les quelques lignes de codes précédentes..."); //todo
            }else{
                //todo: faire quelquechose ou pas? Avant il y avait cela:
                // If search field is empty, hide the result
                // If $(ls.result_id + ":animated") is removed, it may check visibility of the result div
                // while it's animating and may not hide the div
                //if (result.is(":visible") || result.is(":animated")) {
                //    hide_result();
                //}
            }
        }
    });
/*
    // While search input is in focus
    // Move among the rows, by pressing or keep pressing arrow up and down
    $(queryField).on('keydown', function (event) {

        var tmp = getQueryToSendFromFieldGroup(fieldGroup, true, formId);
        //var queryToSend = tmp[0];
        var totalLength = tmp[1];

        var keycode = event.keyCode || event.which;
        if (keycode === 40 || keycode === 38) {

            if (totalLength && whereToDisplayTheResult.find("tr").length !== 0) {
                if ((whereToDisplayTheResult.is(":visible") || whereToDisplayTheResult.is(":animated"))) {
                    whereToDisplayTheResult.find('tr').removeClass('hover');
                    if (ls[formId].selected_row === undefined) {
                        // Moving just started
                        ls[formId].selected_row = whereToDisplayTheResult.find("tr").eq(0);
                        $(ls[formId].selected_row).addClass("hover");
                    } else {

                        $(ls[formId].selected_row).removeClass("hover");

                        if (keycode === 40) {
                            // next
                            if ($(ls[formId].selected_row).next().length === 0) {
                                // here is the end of the table
                                ls[formId].selected_row = whereToDisplayTheResult.find("tr").eq(0);
                                $(ls[formId].selected_row).addClass("hover");
                            } else {
                                $(ls[formId].selected_row).next().addClass("hover");
                                ls[formId].selected_row = $(ls[formId].selected_row).next();
                            }

                        } else {
                            // previous
                            if ($(ls[formId].selected_row).prev().length === 0) {
                                // here is the end of the table
                                ls[formId].selected_row = whereToDisplayTheResult.find("tr").last();
                                ls[formId].selected_row.addClass("hover");
                            } else {
                                $(ls[formId].selected_row).prev().addClass("hover");
                                ls[formId].selected_row = $(ls[formId].selected_row).prev();
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

        var tmp = getQueryToSendFromFieldGroup(fieldGroup, true, formId);
        var queryToSend = tmp[0];
        var totalLength = tmp[1];

        // check if the result is not empty show it
        if (totalLength>0 && (queryField.is(":hidden") || queryField.is(":animated")) && queryField.find("tr").length !== 0) {
            search_query(fieldGroup, false, true, queryToSend, formId, whereToDisplayTheResult,url);
            show_result(whereToDisplayTheResult);

        }
    });

    // In the beginning, there is no result / tr, so we bind the event to the future tr
    $(whereToDisplayTheResult).on('mouseover', 'tr', function () {
        // remove all the hover classes, otherwise there are more than one hovered rows
        whereToDisplayTheResult.find('tr').removeClass('hover');
        //console.log("MouseOver!");

        // set the current selected row
        ls[formId].selected_row = this;

        $(this).addClass('hover');
    });

    // In the beginning, there is no result / tr, so we bind the event to the future tr
    $(whereToDisplayTheResult).on('mouseleave', 'tr', function () {
        // remove all the hover classes, otherwise there are more than one hovered rows
        whereToDisplayTheResult.find('tr').removeClass('hover');

        // Reset selected row
        ls[formId].selected_row = undefined;
    });
*/


}




function getQueryToSendFromFieldGroup(fieldGroup, include_csrf_and_loaded_at, formId){

    var queryToSend = {},
        i,
        totalLength=0,
        fieldGroup=fieldGroup['fieldGroup']; //todo: changer nom fieldgroup

    for(var i in fieldGroup){
        var val = $.trim(fieldGroup[i].val());
        queryToSend[fieldGroup[i][0].name] = val;
        if(val){
            totalLength += val.length;
        }
    }

    if(include_csrf_and_loaded_at){
        //queryToSend['csrfmiddlewaretoken'] = $("#" + formId + ">input[name=csrfmiddlewaretoken]").val();
        queryToSend['csrfmiddlewaretoken'] = selectFieldOfForm(formId,'csrfmiddlewaretoken').val();
        queryToSend['_page_loaded_at'] = selectFieldOfForm(formId,'_page_loaded_at').val();
    }

    return [queryToSend,totalLength];
}


function show_result(result) {
    result.slideDown(ls.slide_speed);
}

function hide_result(result) {
    result.slideUp(ls.slide_speed);
}


/*
 get the search input object (not just its value)
 */
function search_query(search_objects, bypass_check_last_value, reset_current_page, queryToSend, formId, whereToDisplayTheResult,url) {

    console.log("Yop Yop Yop! il est temps de checker search_objects.latest_value!:", search_objects.latest_value,search_objects);

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
            if (search_objects.timeoutId) {
                clearTimeout(search_objects.timeoutId);
            }

            var send_query_wrapper = function(){
                send_query_to_server(formId, queryToSend, whereToDisplayTheResult, url);
            }

            // Start search after the type delay
            search_objects.timeoutId = setTimeout(send_query_wrapper, ls.type_delay);

        }
    //aaasearch_object.latest_value = search_object.value;
}

function send_query_to_server(formId, queryToSend, whereToDisplayTheResult, url) {
                // Sometimes requests with no search value get through, double check the length to avoid it
                //if ($.trim(query.val()).length) {
                    // Display loading icon
                    //query.addClass('ajax_loader');
                    // Send the request
                    $.ajax({
                        type: "post",
                        url: ls[formId].urlLiveSearch,
                        data: queryToSend,//$(ls.form_id).serialize(),
                        dataType: "json",
                        success:  function(response){on_search_success(response, whereToDisplayTheResult, formId, url)},
                        error:    function()        {on_search_error(            whereToDisplayTheResult, formId, url)},
                        complete: function()        {on_search_complete(         whereToDisplayTheResult)}
                    });
}

function on_search_success(response, whereToDisplayTheResult, formId, url){
                            if (response.status === 'success') {
                                var resultObj = $.parseJSON(response.result);

                                // set html result and total pages
                                var tmp = $(whereToDisplayTheResult.find('.whereToAddTheResultContent')).selector; // it looks dirty but I didn't find any other way to do... :(
                                $(tmp).html(resultObj.html); //todo: security?

                                /*
                                 If the number of results is zero, hide the footer (pagination)
                                 also unbind click and select_result handler
                                 */
                                if (resultObj.number_of_results === 0) {
                                    remove_footer(formId,url);
                                } else {
                                    /*
                                     If total number of pages is 1 there is no point to have navigation / paging
                                     */
                                    if (resultObj.total_pages > 1) {
                                        $("#" + formId + '_ajax_navigation').show();
                                        $("#" + formId + "_ls_last_page_lbl").html(resultObj.total_pages);
                                        //console.log("#" + formId + "_ls_last_page_lbl");
                                    } else {
                                        // Hide paging
                                        $("#" + formId + '_ajax_navigation').hide();
                                    }

                                    /*
                                     Display select options based on the total number of results
                                     There is no point to have a option with the value of 10 when there is
                                     only 5 results
                                     */
                                    //remove_select_options(resultObj.number_of_results);

                                    //console.log("où là____")

                                    //$($(whereToDisplayTheResult).selector).on("click", "tr",{'formId': formId, 'url': url}, select_result); //todo: degueulasse
                                    $($(whereToDisplayTheResult).selector + ' tr').each(function(){ //degueulasse
                                        $(this).click({'formId': formId, 'url': url, 'objectId': 39}, select_result); //todo: degueulasse
                                    })
                                    show_footer(formId);
                                }
                            } else {
                                // There is an error
                                var tmp = $(whereToDisplayTheResult.find('.whereToAddTheResultContent')).selector; // it looks dirty but I didn't find any other way to do... :(
                                $(tmp).html(response.message);

                                remove_footer(formId,url);
                            }

}

 function on_search_error(whereToDisplayTheResult, formId, url) { // todo: tester!
                            console.log("Bato!");
                            var tmp = $(whereToDisplayTheResult.find('.whereToAddTheResultContent')).selector; // it looks dirty but I didn't find any other way to do... :(
                            $(tmp).html('Something went wront. Please refresh the page.');
                            remove_footer(formId,url);
}

 function on_search_complete(whereToDisplayTheResult) { // todo: tester!
                            /* Because this is a asynchronous request
                             it may add result even after there is no query in the search field */
                            //if ($.trim(search_object.value).length && result.is(":hidden")) {
                                show_result(whereToDisplayTheResult);
                                console.log("revoir ici merci");
                            //}
                            //query.removeClass('ajax_loader');
}



var select_result = function (ev) {

    var formId = ev.data['formId'];
    //$("#ls_form").submit(); //modif nico?
    //query.val($(this).find('input[type="objectId"]').eq(ls.select_column_index).html());
    //hide_result();
    console.log("attention cette fonction s'exécute plusieures fois, une fois par appel ajax :p");

    getFormWithAjax(
        ls[formId]['formName'],
        formId,
        null,
        'liiiiiiiiiilaliiiiiiiiilalouuuuuuuuu!!!!!!!!!!!!!!!!' ,
        formId,
        function(){},
        {},
        true,
        ev.data['url']
        ,49
        ,false)
};

function remove_footer(formId,url) {

    var footer = $("#" + formId + "_ls_result_footer");
    var result = $("#" + formId + "_ls_result_div");

    //console.log("ici___");

    result.off("click", "tr",{'formId':formId, 'url':url, 'objectId' : 39},select_result);
    footer.hide();
    // add border radius to the last row of the result
    result.find("table").addClass("border_radius");
}

// Fonction faite à l'arrache... :p
function show_footer(formId) {

    var footer = $("#" + formId + "_ls_result_footer");
    var result = $("#" + formId + "_ls_result_div");
    footer.show();
    // add border radius to the last row of the result
    result.find("table").removeClass("border_radius");
}


