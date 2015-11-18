    $(document).ready(function() {
        $('#form1').submit(function() { // catch the form's submit event
            $.ajax({ // create an AJAX call...
                data: $(this).serialize(), // get the form data
                type: $(this).attr('method'), // GET or POST
                url: $(this).attr('action'), // the file to call
                success: function(response) { // on success..
                    $('#form1').html(response); // update the DIV
                }
            });
            return false;
        });

        var field = form_conf[formId][fieldId];
        if(field['type'] == 'polymorphicForeignKey'){

            var objectToReplace = getFormField(formId,fieldId);
            var childFormIdToBeComputed = [] // this will be returned by the function 'constructRadioBoxesForm'
            objectToReplace.replaceWith(constructRadioBoxesForm(field['classes'],formId,fieldId,'','','',childFormIdToBeComputed));
            var childFormId = childFormIdToBeComputed[0]

            $('input[name=' + childFormId + '_radiogroup]:radio')
            .each(function(){
                var radioButtonValue = $(this).val();
                $.ajax({
                    type: 'GET', // GET or POST
                    url: modelFormUrl + radioButtonValue + '?formId=' + childFormId + '_' + radioButtonValue,
                    success: function(response) {
                        $('#' + childFormId + '_content')
                        .append(response)
                        var children = $('#' + childFormId + '_content').children();
                        children.hide();
                        $('input[name=' + childFormId + '_radiogroup][value=' + field['classes'][0][0] + ']:radio')
                        .trigger('click');
                    }
                });
            })
            .click(function() {
                    var radioButtonValue = $(this).val();
                    var children = $('#' + childFormId + '_content').children();
                    children.hide();
                    console.log(children);
                    $('#' + childFormId + '_' + radioButtonValue).show();
            });



        }

    });

        function constructRadioBoxesForm(boxList, parentFormId, fieldId, formClass, divId, divClass, childFormIdToBeComputed){

            childFormId = parentFormId + '_' + fieldId;
            childFormIdToBeComputed.push(childFormId);

            var str = "<div id='" + divId + "' class='" + divClass + "'><form id='" + childFormId + "' class='" + formClass + "'>";
            var i;
            for(i=0; i<boxList.length;i++){
                str += '<INPUT type="radio" name="'+ childFormId + '_radiogroup" value="'+ boxList[i][0] +'" checked>'
                str += boxList[i][1] + '<br/>';
            }
            str += "</form>(nico: ne pas oublier de mettre un cache pour la requete)";
            str += "<div id='" + childFormId + "_content'></div>"
            str += "</div>";

            return str;
        }

        function getFormField(formId, fieldId){
            return $('#' + formId + ' #id_' + fieldId)
        }

        var formId = 'form1',
            fieldId = 'to_rel';



