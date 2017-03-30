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
        type_delay: 1300,
        //select_column_index: 0,
        selected_row: undefined,
    };
}

                function getFieldGroup(formId, searchOn){
                    var fieldGroup = [];
                    for (var i in searchOn) {

                        var fieldName = searchOn[i],
                            query = selectFieldOfForm(formId, fieldName),
                            field = $(query);
                        if(field.length == 0){
                            throw Error('Field ' + fieldName + ' doen\'t exist on form '+ formId);
                        }
                        fieldGroup.push(field);
                    }

                    return fieldGroup
                }

function pressedEnterKey(event){
    var keycode = event.keyCode || event.which;
    return keycode === 13;
}

function initFieldsForAjax(ls,queryCaches,queryField, /*fieldName,*/ fieldGroup, whereToDisplayTheResult, formId, url){

    var fieldName = queryField.attr('name');

    // Trigger search when typing is started
    $(queryField).on('keyup', function (event) {

        // If enter key is pressed check if the user want to selected hovered row
        if (!pressedEnterKey(event)){
            search_query(ls,queryCaches,filterLengths,filterLengths2,fieldGroup, formId, fieldName,
                whereToDisplayTheResult,url);
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

        var fieldsInfo = extractFieldsInfo(fieldGroup);

        var tmp = getRequestDictFromFieldGroup(fieldsInfo, filterWords);
        //var requestDict = tmp[0];
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

        // check if the result is not empty show it
        if (totalLength>0 && (queryField.is(":hidden") || queryField.is(":animated")) && queryField.find("tr").length !== 0) {
            search_query();
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

///////////// Code dedicated to accent removing,
///////////// taken from here : http://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
var Latinise={};Latinise.latin_map={"Á":"A","Ă":"A","Ắ":"A","Ặ":"A","Ằ":"A","Ẳ":"A","Ẵ":"A","Ǎ":"A","Â":"A","Ấ":"A",
    "Ậ":"A","Ầ":"A","Ẩ":"A","Ẫ":"A","Ä":"A","Ǟ":"A","Ȧ":"A","Ǡ":"A","Ạ":"A","Ȁ":"A","À":"A","Ả":"A","Ȃ":"A","Ā":"A",
    "Ą":"A","Å":"A","Ǻ":"A","Ḁ":"A","Ⱥ":"A","Ã":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV",
    "Ꜻ":"AV","Ꜽ":"AY","Ḃ":"B","Ḅ":"B","Ɓ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ć":"C","Č":"C","Ç":"C","Ḉ":"C","Ĉ":"C","Ċ":"C",
    "Ƈ":"C","Ȼ":"C","Ď":"D","Ḑ":"D","Ḓ":"D","Ḋ":"D","Ḍ":"D","Ɗ":"D","Ḏ":"D","ǲ":"D","ǅ":"D","Đ":"D","Ƌ":"D",
    "Ǳ":"DZ","Ǆ":"DZ","É":"E","Ĕ":"E","Ě":"E","Ȩ":"E","Ḝ":"E","Ê":"E","Ế":"E","Ệ":"E","Ề":"E","Ể":"E","Ễ":"E",
    "Ḙ":"E","Ë":"E","Ė":"E","Ẹ":"E","Ȅ":"E","È":"E","Ẻ":"E","Ȇ":"E","Ē":"E","Ḗ":"E","Ḕ":"E","Ę":"E","Ɇ":"E","Ẽ":"E",
    "Ḛ":"E","Ꝫ":"ET","Ḟ":"F","Ƒ":"F","Ǵ":"G","Ğ":"G","Ǧ":"G","Ģ":"G","Ĝ":"G","Ġ":"G","Ɠ":"G","Ḡ":"G","Ǥ":"G","Ḫ":"H",
    "Ȟ":"H","Ḩ":"H","Ĥ":"H","Ⱨ":"H","Ḧ":"H","Ḣ":"H","Ḥ":"H","Ħ":"H","Í":"I","Ĭ":"I","Ǐ":"I","Î":"I","Ï":"I","Ḯ":"I",
    "İ":"I","Ị":"I","Ȉ":"I","Ì":"I","Ỉ":"I","Ȋ":"I","Ī":"I","Į":"I","Ɨ":"I","Ĩ":"I","Ḭ":"I","Ꝺ":"D","Ꝼ":"F","Ᵹ":"G",
    "Ꞃ":"R","Ꞅ":"S","Ꞇ":"T","Ꝭ":"IS","Ĵ":"J","Ɉ":"J","Ḱ":"K","Ǩ":"K","Ķ":"K","Ⱪ":"K","Ꝃ":"K","Ḳ":"K","Ƙ":"K","Ḵ":"K",
    "Ꝁ":"K","Ꝅ":"K","Ĺ":"L","Ƚ":"L","Ľ":"L","Ļ":"L","Ḽ":"L","Ḷ":"L","Ḹ":"L","Ⱡ":"L","Ꝉ":"L","Ḻ":"L","Ŀ":"L","Ɫ":"L",
    "ǈ":"L","Ł":"L","Ǉ":"LJ","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ń":"N","Ň":"N","Ņ":"N","Ṋ":"N","Ṅ":"N","Ṇ":"N","Ǹ":"N",
    "Ɲ":"N","Ṉ":"N","Ƞ":"N","ǋ":"N","Ñ":"N","Ǌ":"NJ","Ó":"O","Ŏ":"O","Ǒ":"O","Ô":"O","Ố":"O","Ộ":"O","Ồ":"O",
    "Ổ":"O","Ỗ":"O","Ö":"O","Ȫ":"O","Ȯ":"O","Ȱ":"O","Ọ":"O","Ő":"O","Ȍ":"O","Ò":"O","Ỏ":"O","Ơ":"O","Ớ":"O","Ợ":"O",
    "Ờ":"O","Ở":"O","Ỡ":"O","Ȏ":"O","Ꝋ":"O","Ꝍ":"O","Ō":"O","Ṓ":"O","Ṑ":"O","Ɵ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O",
    "Õ":"O","Ṍ":"O","Ṏ":"O","Ȭ":"O","Ƣ":"OI","Ꝏ":"OO","Ɛ":"E","Ɔ":"O","Ȣ":"OU","Ṕ":"P","Ṗ":"P","Ꝓ":"P","Ƥ":"P",
    "Ꝕ":"P","Ᵽ":"P","Ꝑ":"P","Ꝙ":"Q","Ꝗ":"Q","Ŕ":"R","Ř":"R","Ŗ":"R","Ṙ":"R","Ṛ":"R","Ṝ":"R","Ȑ":"R","Ȓ":"R","Ṟ":"R",
    "Ɍ":"R","Ɽ":"R","Ꜿ":"C","Ǝ":"E","Ś":"S","Ṥ":"S","Š":"S","Ṧ":"S","Ş":"S","Ŝ":"S","Ș":"S","Ṡ":"S","Ṣ":"S","Ṩ":"S",
    "Ť":"T","Ţ":"T","Ṱ":"T","Ț":"T","Ⱦ":"T","Ṫ":"T","Ṭ":"T","Ƭ":"T","Ṯ":"T","Ʈ":"T","Ŧ":"T","Ɐ":"A","Ꞁ":"L","Ɯ":"M",
    "Ʌ":"V","Ꜩ":"TZ","Ú":"U","Ŭ":"U","Ǔ":"U","Û":"U","Ṷ":"U","Ü":"U","Ǘ":"U","Ǚ":"U","Ǜ":"U","Ǖ":"U","Ṳ":"U","Ụ":"U",
    "Ű":"U","Ȕ":"U","Ù":"U","Ủ":"U","Ư":"U","Ứ":"U","Ự":"U","Ừ":"U","Ử":"U","Ữ":"U","Ȗ":"U","Ū":"U","Ṻ":"U","Ų":"U",
    "Ů":"U","Ũ":"U","Ṹ":"U","Ṵ":"U","Ꝟ":"V","Ṿ":"V","Ʋ":"V","Ṽ":"V","Ꝡ":"VY","Ẃ":"W","Ŵ":"W","Ẅ":"W","Ẇ":"W","Ẉ":"W",
    "Ẁ":"W","Ⱳ":"W","Ẍ":"X","Ẋ":"X","Ý":"Y","Ŷ":"Y","Ÿ":"Y","Ẏ":"Y","Ỵ":"Y","Ỳ":"Y","Ƴ":"Y","Ỷ":"Y","Ỿ":"Y","Ȳ":"Y",
    "Ɏ":"Y","Ỹ":"Y","Ź":"Z","Ž":"Z","Ẑ":"Z","Ⱬ":"Z","Ż":"Z","Ẓ":"Z","Ȥ":"Z","Ẕ":"Z","Ƶ":"Z","Ĳ":"IJ","Œ":"OE","ᴀ":"A",
    "ᴁ":"AE","ʙ":"B","ᴃ":"B","ᴄ":"C","ᴅ":"D","ᴇ":"E","ꜰ":"F","ɢ":"G","ʛ":"G","ʜ":"H","ɪ":"I","ʁ":"R","ᴊ":"J","ᴋ":"K",
    "ʟ":"L","ᴌ":"L","ᴍ":"M","ɴ":"N","ᴏ":"O","ɶ":"OE","ᴐ":"O","ᴕ":"OU","ᴘ":"P","ʀ":"R","ᴎ":"N","ᴙ":"R","ꜱ":"S","ᴛ":"T",
    "ⱻ":"E","ᴚ":"R","ᴜ":"U","ᴠ":"V","ᴡ":"W","ʏ":"Y","ᴢ":"Z","á":"a","ă":"a","ắ":"a","ặ":"a","ằ":"a","ẳ":"a","ẵ":"a",
    "ǎ":"a","â":"a","ấ":"a","ậ":"a","ầ":"a","ẩ":"a","ẫ":"a","ä":"a","ǟ":"a","ȧ":"a","ǡ":"a","ạ":"a","ȁ":"a","à":"a",
    "ả":"a","ȃ":"a","ā":"a","ą":"a","ᶏ":"a","ẚ":"a","å":"a","ǻ":"a","ḁ":"a","ⱥ":"a","ã":"a","ꜳ":"aa","æ":"ae",
    "ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ḃ":"b","ḅ":"b","ɓ":"b","ḇ":"b","ᵬ":"b","ᶀ":"b",
    "ƀ":"b","ƃ":"b","ɵ":"o","ć":"c","č":"c","ç":"c","ḉ":"c","ĉ":"c","ɕ":"c","ċ":"c","ƈ":"c","ȼ":"c","ď":"d","ḑ":"d",
    "ḓ":"d","ȡ":"d","ḋ":"d","ḍ":"d","ɗ":"d","ᶑ":"d","ḏ":"d","ᵭ":"d","ᶁ":"d","đ":"d","ɖ":"d","ƌ":"d","ı":"i","ȷ":"j",
    "ɟ":"j","ʄ":"j","ǳ":"dz","ǆ":"dz","é":"e","ĕ":"e","ě":"e","ȩ":"e","ḝ":"e","ê":"e","ế":"e","ệ":"e","ề":"e",
    "ể":"e","ễ":"e","ḙ":"e","ë":"e","ė":"e","ẹ":"e","ȅ":"e","è":"e","ẻ":"e","ȇ":"e","ē":"e","ḗ":"e","ḕ":"e","ⱸ":"e",
    "ę":"e","ᶒ":"e","ɇ":"e","ẽ":"e","ḛ":"e","ꝫ":"et","ḟ":"f","ƒ":"f","ᵮ":"f","ᶂ":"f","ǵ":"g","ğ":"g","ǧ":"g","ģ":"g",
    "ĝ":"g","ġ":"g","ɠ":"g","ḡ":"g","ᶃ":"g","ǥ":"g","ḫ":"h","ȟ":"h","ḩ":"h","ĥ":"h","ⱨ":"h","ḧ":"h","ḣ":"h","ḥ":"h",
    "ɦ":"h","ẖ":"h","ħ":"h","ƕ":"hv","í":"i","ĭ":"i","ǐ":"i","î":"i","ï":"i","ḯ":"i","ị":"i","ȉ":"i","ì":"i","ỉ":"i",
    "ȋ":"i","ī":"i","į":"i","ᶖ":"i","ɨ":"i","ĩ":"i","ḭ":"i","ꝺ":"d","ꝼ":"f","ᵹ":"g","ꞃ":"r","ꞅ":"s","ꞇ":"t","ꝭ":"is",
    "ǰ":"j","ĵ":"j","ʝ":"j","ɉ":"j","ḱ":"k","ǩ":"k","ķ":"k","ⱪ":"k","ꝃ":"k","ḳ":"k","ƙ":"k","ḵ":"k","ᶄ":"k","ꝁ":"k",
    "ꝅ":"k","ĺ":"l","ƚ":"l","ɬ":"l","ľ":"l","ļ":"l","ḽ":"l","ȴ":"l","ḷ":"l","ḹ":"l","ⱡ":"l","ꝉ":"l","ḻ":"l","ŀ":"l",
    "ɫ":"l","ᶅ":"l","ɭ":"l","ł":"l","ǉ":"lj","ſ":"s","ẜ":"s","ẛ":"s","ẝ":"s","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ᵯ":"m",
    "ᶆ":"m","ń":"n","ň":"n","ņ":"n","ṋ":"n","ȵ":"n","ṅ":"n","ṇ":"n","ǹ":"n","ɲ":"n","ṉ":"n","ƞ":"n","ᵰ":"n","ᶇ":"n",
    "ɳ":"n","ñ":"n","ǌ":"nj","ó":"o","ŏ":"o","ǒ":"o","ô":"o","ố":"o","ộ":"o","ồ":"o","ổ":"o","ỗ":"o","ö":"o","ȫ":"o",
    "ȯ":"o","ȱ":"o","ọ":"o","ő":"o","ȍ":"o","ò":"o","ỏ":"o","ơ":"o","ớ":"o","ợ":"o","ờ":"o","ở":"o","ỡ":"o","ȏ":"o",
    "ꝋ":"o","ꝍ":"o","ⱺ":"o","ō":"o","ṓ":"o","ṑ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","õ":"o","ṍ":"o","ṏ":"o","ȭ":"o",
    "ƣ":"oi","ꝏ":"oo","ɛ":"e","ᶓ":"e","ɔ":"o","ᶗ":"o","ȣ":"ou","ṕ":"p","ṗ":"p","ꝓ":"p","ƥ":"p","ᵱ":"p","ᶈ":"p",
    "ꝕ":"p","ᵽ":"p","ꝑ":"p","ꝙ":"q","ʠ":"q","ɋ":"q","ꝗ":"q","ŕ":"r","ř":"r","ŗ":"r","ṙ":"r","ṛ":"r","ṝ":"r","ȑ":"r",
    "ɾ":"r","ᵳ":"r","ȓ":"r","ṟ":"r","ɼ":"r","ᵲ":"r","ᶉ":"r","ɍ":"r","ɽ":"r","ↄ":"c","ꜿ":"c","ɘ":"e","ɿ":"r","ś":"s",
    "ṥ":"s","š":"s","ṧ":"s","ş":"s","ŝ":"s","ș":"s","ṡ":"s","ṣ":"s","ṩ":"s","ʂ":"s","ᵴ":"s","ᶊ":"s","ȿ":"s","ɡ":"g",
    "ᴑ":"o","ᴓ":"o","ᴝ":"u","ť":"t","ţ":"t","ṱ":"t","ț":"t","ȶ":"t","ẗ":"t","ⱦ":"t","ṫ":"t","ṭ":"t","ƭ":"t","ṯ":"t",
    "ᵵ":"t","ƫ":"t","ʈ":"t","ŧ":"t","ᵺ":"th","ɐ":"a","ᴂ":"ae","ǝ":"e","ᵷ":"g","ɥ":"h","ʮ":"h","ʯ":"h","ᴉ":"i","ʞ":"k",
    "ꞁ":"l","ɯ":"m","ɰ":"m","ᴔ":"oe","ɹ":"r","ɻ":"r","ɺ":"r","ⱹ":"r","ʇ":"t","ʌ":"v","ʍ":"w","ʎ":"y","ꜩ":"tz","ú":"u",
    "ŭ":"u","ǔ":"u","û":"u","ṷ":"u","ü":"u","ǘ":"u","ǚ":"u","ǜ":"u","ǖ":"u","ṳ":"u","ụ":"u","ű":"u","ȕ":"u","ù":"u",
    "ủ":"u","ư":"u","ứ":"u","ự":"u","ừ":"u","ử":"u","ữ":"u","ȗ":"u","ū":"u","ṻ":"u","ų":"u","ᶙ":"u","ů":"u","ũ":"u",
    "ṹ":"u","ṵ":"u","ᵫ":"ue","ꝸ":"um","ⱴ":"v","ꝟ":"v","ṿ":"v","ʋ":"v","ᶌ":"v","ⱱ":"v","ṽ":"v","ꝡ":"vy","ẃ":"w","ŵ":"w",
    "ẅ":"w","ẇ":"w","ẉ":"w","ẁ":"w","ⱳ":"w","ẘ":"w","ẍ":"x","ẋ":"x","ᶍ":"x","ý":"y","ŷ":"y","ÿ":"y","ẏ":"y","ỵ":"y",
    "ỳ":"y","ƴ":"y","ỷ":"y","ỿ":"y","ȳ":"y","ẙ":"y","ɏ":"y","ỹ":"y","ź":"z","ž":"z","ẑ":"z","ʑ":"z","ⱬ":"z","ż":"z",
    "ẓ":"z","ȥ":"z","ẕ":"z","ᵶ":"z","ᶎ":"z","ʐ":"z","ƶ":"z","ɀ":"z","ﬀ":"ff","ﬃ":"ffi","ﬄ":"ffl","ﬁ":"fi","ﬂ":"fl",
    "ĳ":"ij","œ":"oe","ﬆ":"st","ₐ":"a","ₑ":"e","ᵢ":"i","ⱼ":"j","ₒ":"o","ᵣ":"r","ᵤ":"u","ᵥ":"v","ₓ":"x"};
String.prototype.latinise=function(){return this.replace(/[^A-Za-z0-9\[\] ]/g,function(a){return Latinise.latin_map[a]||a})};
String.prototype.latinize=String.prototype.latinise;
String.prototype.isLatin=function(){return this==this.latinise()}
/////////////
/////////////

function normalizeAndSplit(s){
    var wordList, finalList=[];

    s = s.toLowerCase();
    s = s.latinize();   // removing accents
    s = s.replace(/[^a-z0-9]/gi,' ');
    wordList = s.split(' ');
    for(var w in wordList){
        if(wordList[w].length > 0){
            finalList.push(wordList[w])
        }
    }
    return finalList
}

function filterWords(word){
    if(typeof word != "string")
        return false
    if(stringIsAnInteger(word))
        return true
    return word.length > 1;
}

function stringIsAnInteger(s){
    return parseInt(s).toString() == s;
}


function normalizeWordList(str,filterWords){
        // Important note:
        // It is very important that this function returns
        // an array without any duplicates, and ordered.
        // Otherwise, the cache search will fail
        //alert(str);
        var wordList = normalizeAndSplit(str);
        wordList = wordList.filter(filterWords);
        wordList = uniqueArray(wordList);
        wordList = wordList.sort();
        return wordList;
}

function getRequestDictFromFieldGroup(fieldsInfo, normalizeWordList,filterWords){

    var fieldValue, fieldName, wordList,
        requestDict = {},
        fieldsToSearchOn = {},
        fieldLengths = {};

    for(var f in fieldsInfo){
        fieldName = fieldsInfo[f].name;
        fieldValue = fieldsInfo[f].val;

        wordList = normalizeWordList(fieldValue, filterWords);

        fieldsToSearchOn[fieldName] = wordList;
        fieldLengths[fieldName] = wordList.map(s => s.length);
    }

    return [fieldsToSearchOn,fieldLengths]
}

function arraySum(arr){
    return arr.reduce((a,b)=>a+b,0);
}

function filterLengths(fieldsToSearchOn,totalLengths){
    var lengthsList;
    for (var field in totalLengths){
        lengthsList = totalLengths[field];
        if(arraySum(lengthsList) > 2)
            return true;
    }
    return false;
}

function filterLengths2(wordList,lengthsList){
    return arraySum(lengthsList) > 2;
}



//todo: needs to be tested
function extractFieldsInfo(fieldGroup){
            var fieldsInfo = [];
            for(var f in fieldGroup){
                fieldsInfo.push({
                    name: fieldGroup[f][0].name,
                    val: $.trim(fieldGroup[f].val())
                })
            }
            return fieldsInfo;
}

function findInCache(key, cache){
    for(var elem in cache)
        if(deepEquals(cache[elem].query,key))
            return cache[elem];
    return null;
}

/*
 get the search input object (not just its value)
 */
function search_query(
    ls,
    queryCaches,
    allow_server_request,
    allow_server_request_singlefield,
    fieldGroup,
    formId,
    fieldName,
    whereToDisplayTheResult,
    url,
    beingTested = false, // when running unit tests
    debug_id = null
    ){
console.log("Penser a desactiver l'autocompletion automatique du navigateur quand on tape dans le champ texte");
            var ind, requestDict, totalLengths, foundInCache,fieldsToSearchOn,totalLengths,
                isPart1Allowed = false,
                isPart2Allowed = false,
                singleField = {},
                responseFromCache = [null,null],
                fieldsInfo = extractFieldsInfo(fieldGroup);

            [fieldsToSearchOn,totalLengths] = getRequestDictFromFieldGroup(fieldsInfo, normalizeWordList, filterWords);
            singleField[fieldName] = fieldsToSearchOn[fieldName];

            foundInCache = findInCache(fieldsToSearchOn, queryCaches.byFieldsToSearchOn);
            if(foundInCache === null)
                isPart1Allowed = allow_server_request(fieldsToSearchOn,totalLengths);//todo: chelou
            else
                responseFromCache[0] = foundInCache;


            foundInCache = findInCache(singleField, queryCaches.bySingleField);
            if(foundInCache === null)
                isPart2Allowed = allow_server_request_singlefield(fieldsToSearchOn[fieldName],totalLengths[fieldName]);//todo: chelou
            else
                responseFromCache[1] = foundInCache;

            construct_and_send_query(
                ls,queryCaches,isPart1Allowed,isPart2Allowed,responseFromCache,fieldsToSearchOn,singleField,fieldName,formId,
                whereToDisplayTheResult,url,beingTested);

            // this return is only used for unit tests
            if(beingTested)
                return [responseFromCache,isPart1Allowed,isPart2Allowed,singleField];
}

function construct_and_send_query(
    ls,
    caches,
    isPart1Allowed,
    isPart2Allowed,
    responseFromCache,
    fieldsToSearchOn,
    singleField,
    fieldName,
    formId,
    whereToDisplayTheResult,
    url,
    beingTested = false // when running unit tests
    ){

    var sent_to_server;

    if(isPart1Allowed || isPart2Allowed){

        var query = {
                'csrfmiddlewaretoken': selectFieldOfForm(formId,'csrfmiddlewaretoken').val(),
                '_page_loaded_at': selectFieldOfForm(formId,'_page_loaded_at').val() //todo: camelcase ?????
            },
            query_raw = {};

        if(isPart1Allowed){
            query['fieldsToSearchOn'] = JSON.stringify(fieldsToSearchOn);
            query_raw['fieldsToSearchOn'] = fieldsToSearchOn;
        }else{
            query['fieldsToSearchOn'] = JSON.stringify(singleField);
            query_raw['fieldsToSearchOn'] = singleField;
        }

        if(isPart2Allowed){
            query['currentField'] = fieldName;
            query_raw['currentField'] = fieldName;
        }

        if(!beingTested)
            send_query_after_timeout(ls,query,query_raw,caches,responseFromCache,formId, whereToDisplayTheResult, url, fieldName);
        sent_to_server = true;

                //if (reset_current_page) {
                    // Reset the current page (label and hidden input)
                //    current_page.val("1");
                //    current_page_lbl.html("1");
                //}
                // Reset selected row if there is any
                //search_object.selected_row = undefined;
                console.log("verifier le comportement ici");
    }else{
        if(!beingTested)
            on_search_success(null,query_raw,responseFromCache,caches,format_result,whereToDisplayTheResult, formId, url,fieldName);
        sent_to_server = false;
    }

    if(beingTested)
        // this return is only used for unit tests
        return [query,sent_to_server];
}

function send_query_after_timeout(ls,query,query_raw,caches,responseFromCache,formId, whereToDisplayTheResult, url, fieldName){
            /*
             If a search is in the queue to be executed while another one is coming,
             prevent the last one
             */
            if (ls.timeoutId !== false) { // using '!==' in case timeoutId = O
                clearTimeout(ls.timeoutId);
            }

            var send_query_wrapper = function(){
                send_query_to_server(formId, query, query_raw, on_search_success, caches, responseFromCache, whereToDisplayTheResult, url, fieldName);
                ls.timeoutId = false;
            }

            // Start search after the type delay
            ls.timeoutId = setTimeout(send_query_wrapper, ls.type_delay);
}

function send_query_to_server(formId, query, query_raw, on_search_success, caches, responseFromCache, whereToDisplayTheResult, url, fieldName) {
                // Sometimes requests with no search value get through, double check the length to avoid it
                //if ($.trim(query.val()).length) {
                    // Display loading icon
                    //query.addClass('ajax_loader');
                    // Send the request
                    $.ajax({
                        type: "post",
                        url: ls[formId].urlLiveSearch,
                        data: query,
                        dataType: "json",
                        success:  function(serverResponse){on_search_success(
                                                            serverResponse,
                                                            query_raw,
                                                            responseFromCache,
                                                            caches,
                                                            format_result,
                                                            report_error_to_server
                                                            //whereToDisplayTheResult,
                                                            //formId,
                                                            //url,
                                                            //fieldName
                                                            )},
                        error:    function(){on_search_error(whereToDisplayTheResult, formId, url)},
                        complete: function(){on_search_complete(whereToDisplayTheResult)}
                    });
}

function on_search_success(response, query, responseFromCache, caches, process_result, report_error, other_args=null){
                        var fields_order = null;
                        var matchAll = null, matchCurField = null;

                        if(response != null){
                            if (response.status === 'success') {
                                fields_order = response.order;

                                if(field_is_present('matchAll',response.result))
                                    matchAll = response.result.matchAll;

                                if(field_is_present('matchCurField',response.result))
                                    matchCurField = response.result.matchCurField;

                                if(field_is_present('common',response.result)){
                                    var elements_in_common = pick_elements_from_ids(response.result.common, matchAll);
                                    if(matchCurField === null)
                                        matchCurField = elements_in_common;
                                    else
                                        matchCurField = matchCurField.concat(elements_in_common)
                                }

                                update_cache(caches,query,matchAll,matchCurField,fields_order);

                            } else {
                                return report_error(response.message);
                            }
                        }

                        var result = build_result(matchAll,matchCurField,responseFromCache)

                        if(fields_order === null)
                            if(responseFromCache[0] != null){
                                fields_order = responseFromCache[0].metadata.order;
                            }else{ if (responseFromCache[1] != null)
                                fields_order = responseFromCache[1].metadata.order;
                            }

                        if(result[0] != null || result[1] != null)
                            process_result(result,fields_order,other_args);

                        return null
                        // ICI // pour tester: /coreforms/dev/alternative // debuggage via QUnit ok!
}

function report_error_to_server(message){
    //todo: report error to server
}

function addToCache(cache, size, query, response, metadata=null){ //todo: to test
    var search = findInCache(query, cache);
    if(search === null){
        cache.push({query: clone(query), response: clone(response), metadata: clone(metadata)});
        // todo: if there is one cache by entity (rather than one cache by formtree, then 'metadata' is the same for all elements in the cache. it shall then be placed at the root of the cache rather than on each element)
        if(cache.length > size)
            cache.shift();
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
                                //show_result(whereToDisplayTheResult);
                                console.log("revoir ici merci");
                            //}
                            //query.removeClass('ajax_loader');
}

function field_is_present(field, object){
    return (field in object) && (object[field].length > 0)
}

function is_not_empty(obj){
    return (obj != null) && (obj.length > 0)
}

function pick_elements_from_ids(id_list, element_list){
                                    var result = [];
                                    for(var id in id_list)
                                        for(var elem in element_list)
                                            if(id_list[id] == element_list[elem].id){
                                                result.push(element_list[elem]);
                                            }
                                    return result
}

// no need to unit-test: it's donc through the test of "on_search_success"
function update_cache(caches,query,matchAll,matchCurField,fields_order){
                                if(is_not_empty(matchAll))
                                    addToCache(caches.byFieldsToSearchOn,
                                        caches.size,
                                        query.fieldsToSearchOn,
                                        matchAll,
                                        {order:fields_order}
                                    );
                                if(is_not_empty(matchCurField))
                                    addToCache(caches.bySingleField,
                                        caches.size,
                                        query.currentField,
                                        matchCurField,
                                        {order:fields_order}
                                    );
}

// no need to unit-test: it's donc through the test of "on_search_success"
function build_result(matchAll,matchCurField,responseFromCache){
                        var result = [null,null];

                        if(matchAll === null){
                            if(responseFromCache[0] != null)
                                result[0] = responseFromCache[0].response;
                        }else{
                            result[0] = matchAll;
                        }

                        if(matchCurField === null){
                            if(responseFromCache[1] != null)
                                result[1] = responseFromCache[1].response;
                        }else{
                            result[1] = matchCurField;
                        }

                        return result
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

function format_result(resultObj, currentField, order){ //todo: secu injections

    console.log("popopo",resultObj,currentField,order);

    var tableTemplate = "<table>{{tcontent}}</table>",
        rowTemplate = "<tr>{{rcontent}}</tr>",
        colTemplate = "<td>{{ccontent}}</td>",
        tcontent = "";

        for(var obj in resultObj){
            var o = resultObj[obj],
                fieldList = [],
                rcontent = "";
            for(var field in order)
                fieldList.push(order[field]);
            if(order.indexOf(currentField) == -1) //attention; maintenant order est obligatoire, contraitrmeent à pk qui ne tl'était pas
                fieldList.push(currentField)

            for(var field in fieldList){
                if(! (fieldList[field] in o)){
                    rcontent += format_template(colTemplate,{ccontent:""});
                }else{
                    var val = o[fieldList[field]] + '';
                    rcontent += format_template(colTemplate,{ccontent:val});
                }
            }
            tcontent += format_template(rowTemplate,{rcontent:rcontent});
        }
        return format_template(tableTemplate,{tcontent:tcontent})
}

function format_template(template,vars){
    for(var varname in vars){
        if(typeof vars[varname] != "string")
            throw Error("vars values must be strings")
        while(-1 != template.search('{{' + varname + '}}')){
            template = template.replace('{{' + varname + '}}',vars[varname])
        }
    }
    return template;
}

function show_result(result) {
    result.slideDown(ls.slide_speed);
}

function hide_result(result) {
    result.slideUp(ls.slide_speed);
}

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

function clone(obj) {
    return $.extend(true, {}, obj)
}

/////// from : http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
function uniqueArray(arr) {
    var o = {}, i, l = arr.length, r = [];
    for(i=0; i<l;i+=1) o[arr[i]] = arr[i];
    for(i in o) r.push(o[i]);
    return r;
};

//////// from : http://altitudelabs.com/blog/javascript-how-equal-are-2-values/
function isPrimitive( value ) {
  return (value === void 0 || value === null || typeof value === "number" || typeof value === "boolean" || typeof value === "string");
}
function deepEquals( first, second ) {
  if ( isPrimitive(first) && isPrimitive(second) )
    return first === second;
  else if ( isPrimitive(first) || isPrimitive(second) )
    return false;
  else {
    var firstKeys = Object.keys( first );
    var secondKeys = Object.keys( second );
    if ( firstKeys.length !== secondKeys.length )
      return false;
    else {
      for ( var prop in first )
        if ( second[prop] === undefined )
          return false;
        else if (!deepEquals(first[prop], second[prop]))
          return false;
      return true;
    }
  }
}

