    function clone(obj){
        return $.extend(true, {}, obj)
    }

    var nodes = [
        {
                form: null,
                form_id: 'foo',
                form_name: 'name',
                children: [],
                submissionStatus : "being_edited",
                is_visible: false,
                validatedValue: '',
                parentFormId: '',
                fieldOfParentForm: ''
            },{
                form: null,
                form_id: 'foo',
                form_name: 'name',
                children: [],
                submissionStatus : "being_edited",
                is_visible: true,
                validatedValue: '',
                parentFormId: '',
                fieldOfParentForm: ''
                            },{
                form: null,
                form_id: 'foo',
                form_name: 'name',
                children: [],
                submissionStatus : "uneditable_inbase_object",
                is_visible: true,
                validatedValue: '',
                parentFormId: '',
                fieldOfParentForm: ''
                                            },{
                form: null,
                form_id: 'foo',
                form_name: 'name',
                children: [],
                submissionStatus : "uneditable_inbase_object",
                is_visible: false,
                validatedValue: '',
                parentFormId: '',
                fieldOfParentForm: ''
      }];

      formTrees = [
        {formTree: '[{"form_id":"foo","form_name":"alternative","children":{"foo_topics_0":{"form_id":"foo_topics_0","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_to_behaviour_habit":{"form_id":"foo_to_behaviour_habit","form_name":"habit","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_useAKindOfEntity":{"form_id":"foo_to_behaviour_useAKindOfEntity","form_name":"useAKindOfEntity","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties","form_name":"entityThatHaveProperties","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product","form_name":"product","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company","form_name":"company","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association","form_name":"association","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"entity_with_properties","parentFormId":"foo_to_behaviour_useAKindOfEntity"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_otherBehaviour":{"form_id":"foo_to_behaviour_otherBehaviour","form_name":"otherBehaviour","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_topics_1":{"form_id":"foo_topics_1","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_topics_2":{"form_id":"foo_topics_2","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_topics_3":{"form_id":"foo_topics_3","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"fieldOfParentForm":"topics","parentFormId":"foo"}},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"parentFormId":null,"fieldOfParentForm":null}]'
         ,formTreePtrs: '{"foo":{"form_id":"foo","form_name":"alternative","children":{"foo_topics_0":{"form_id":"foo_topics_0","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_to_behaviour_habit":{"form_id":"foo_to_behaviour_habit","form_name":"habit","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_useAKindOfEntity":{"form_id":"foo_to_behaviour_useAKindOfEntity","form_name":"useAKindOfEntity","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties","form_name":"entityThatHaveProperties","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product","form_name":"product","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company","form_name":"company","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association","form_name":"association","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"entity_with_properties","parentFormId":"foo_to_behaviour_useAKindOfEntity"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_otherBehaviour":{"form_id":"foo_to_behaviour_otherBehaviour","form_name":"otherBehaviour","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_topics_1":{"form_id":"foo_topics_1","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_topics_2":{"form_id":"foo_topics_2","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_topics_3":{"form_id":"foo_topics_3","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"fieldOfParentForm":"topics","parentFormId":"foo"}},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"parentFormId":null,"fieldOfParentForm":null},"foo_topics_0":{"form_id":"foo_topics_0","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_to_behaviour_habit":{"form_id":"foo_to_behaviour_habit","form_name":"habit","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_useAKindOfEntity":{"form_id":"foo_to_behaviour_useAKindOfEntity","form_name":"useAKindOfEntity","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties","form_name":"entityThatHaveProperties","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product","form_name":"product","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company","form_name":"company","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association","form_name":"association","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"entity_with_properties","parentFormId":"foo_to_behaviour_useAKindOfEntity"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_otherBehaviour":{"form_id":"foo_to_behaviour_otherBehaviour","form_name":"otherBehaviour","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties","form_name":"entityThatHaveProperties","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product","form_name":"product","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company","form_name":"company","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association","form_name":"association","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"entity_with_properties","parentFormId":"foo_to_behaviour_useAKindOfEntity"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product","form_name":"product","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company","form_name":"company","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association","form_name":"association","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_topics_1":{"form_id":"foo_topics_1","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_topics_2":{"form_id":"foo_topics_2","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_topics_3":{"form_id":"foo_topics_3","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"fieldOfParentForm":"topics","parentFormId":"foo"}}'
        }
      ]


   QUnit.test("constructErrorList", function( assert ) {
      var errors = [
          {field: 'name',   errors:["Compulsory field"]           ,expected: "<ul class='errorlist'><li>Compulsory field</li></ul>"},
          {field: '__all__',errors:["Compulsory field"]           ,expected: "<ul class='errorlist nonfield'><li>Compulsory field</li></ul>"},
          {field: 'name',   errors:["Not correct","second error"] ,expected: "<ul class='errorlist'><li>Not correct</li><li>second error</li></ul>"}];
      for(var e in errors){
        assert.equal(constructErrorList(errors[e].field, errors[e].errors), errors[e].expected);
      }
    });
    QUnit.test("needsToBeSubmited", function( assert ) {
       var expected = [false,true,false,false];
      for(var n in clone(nodes)){
        assert.equal(needsToBeSubmited(nodes[n]), expected[n]);
      }
    });

        QUnit.test("Temp. ", function( assert ) {

            afterStep1 = function(url,urls_of_this_step,response,status,ajaxObject){
                        $('[name=foo_to_behaviour_radiogroup][value=habit]').trigger("click");
                        getFormField('foo_to_behaviour_habit','label_en').val('test from qunit');
                        $('#submit').trigger('click');
            }

            afterStep2 = function(url,urls_of_this_step,response,status,ajaxObject){
                        $('#submit').trigger('click');
            }

            controlStep2 = function(url,urls_of_this_step,response,status,ajaxObject){
                        if(urls_of_this_step.indexOf(url) >= 0){
                            assert.ok(true);
                        }else
                            assert.ok(false);
                        done();
            }

            controlStep3 = function(url,urls_of_this_step,response,status,ajaxObject){
                        if(urls_of_this_step.indexOf(url) >= 0){
                            assert.ok(true);
                        }else
                            assert.ok(false);


                        params = $.deparam(ajaxObject.data);
                        assert.equal(params['name'],'');
                        assert.equal(params['description_en'],'');
                        assert.equal(params['position_in_nav_bar'],'');
                        assert.equal(params['_slug'],'');
                        assert.equal(params['formId'],'foo_topics_0');
                        assert.equal(params['parentFormId'],'foo');
                        assert.equal(params['fieldOfParentForm'],'topics');

                        done();
            }

            var done = assert.async(3),
                current_step = 1,
                cnt_validated_urls_for_current_step = 0;
                steps = [
                {
                    'urls':[
                                    "/coreforms/getformpart/manytomany/?formId=foo_topics&parentFormId=foo&fieldOfParentForm=topics&formName=topic&contentId=foo_topics_pool&initVal=null&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                                    "/coreforms/getformpart/polymorphicForeignKey/?nbBoxes=3&boxList%5B0%5D%5Bid%5D=habit&boxList%5B0%5D%5Blabel%5D=Une+habitude+de+vie&boxList%5B1%5D%5Bid%5D=useAKindOfEntity&boxList%5B1%5D%5Blabel%5D=Utiliser...&boxList%5B2%5D%5Bid%5D=otherBehaviour&boxList%5B2%5D%5Blabel%5D=Autre%3A&formId=foo_to_behaviour&parentFormId=foo&fieldOfParentForm=to_behaviour&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                                    "/coreforms/getformpart/foreignKey/?formId=foo_to_behaviour_useAKindOfEntity_entity_with_properties&formName=entityThatHaveProperties&parentFormId=foo_to_behaviour_useAKindOfEntity&fieldOfParentForm=entity_with_properties&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                                    "/coreforms/getformpart/polymorphicForeignKey/?nbBoxes=6&boxList%5B0%5D%5Bid%5D=product&boxList%5B0%5D%5Blabel%5D=Un+produit&boxList%5B1%5D%5Bid%5D=company&boxList%5B1%5D%5Blabel%5D=Une+marque&boxList%5B2%5D%5Bid%5D=company&boxList%5B2%5D%5Blabel%5D=Une+Banque&boxList%5B3%5D%5Bid%5D=company&boxList%5B3%5D%5Blabel%5D=Un+magasin&boxList%5B4%5D%5Bid%5D=company&boxList%5B4%5D%5Blabel%5D=Un+organisme&boxList%5B5%5D%5Bid%5D=association&boxList%5B5%5D%5Blabel%5D=Une+association&formId=foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity&parentFormId=foo_to_behaviour_useAKindOfEntity_entity_with_properties&fieldOfParentForm=target_entity&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                        ],
                    'control': null,
                    'whenFinished': afterStep1
                },{
                    'urls':[
                                    "/coreforms/postform/habit",
                                    "/coreforms/postform/topic",
                        ],
                    'control': controlStep2,
                    'whenFinished': afterStep1
                },{
                    'urls':[
                                    "/coreforms/postform/topic"
                           ],
                    'control': controlStep3,
                }
            ];



            $(document).ready(function() {

                control_ajax_query = function control_ajax_query(response,status,ajaxObject){

                    if(current_step > steps.length)
                        throw Error('We are currently in step '+current_step+', but this step in not configured in variable "steps"');

                    var urls_of_this_step = steps[current_step-1].urls,
                        control_function = steps[current_step-1].control,
                        after_step_function = steps[current_step-1].whenFinished,
                        url = ajaxObject.url;

                            if(urls_of_this_step.indexOf(url) >= 0){

                                cnt_validated_urls_for_current_step ++;

                                if(control_function)
                                    control_function(url,urls_of_this_step,response,status,ajaxObject);

                                if(cnt_validated_urls_for_current_step == urls_of_this_step.length){
                                    if(after_step_function)
                                        after_step_function(url,urls_of_this_step,response,status,ajaxObject);
                                    current_step ++;
                                    cnt_validated_urls_for_current_step = 0;
                                }

                            }else{
                                console.log("Becarreful, in step " + current_step + ", this url was called without being expected by the test: " + url);
                            }
                };

                applyFormConfiguration(
                    'foo',
                    'alternative',
                    "/coreforms/postform/",
                    "/coreforms/getform/",
                    "/coreforms/livesearch/resultdiv/foo",
                    control_ajax_query
                );

            });

    });










        QUnit.test("Add a form to a ManyToManyField. ", function( assert ) {

            afterStep1 = function(url,urls_of_this_step,response,status,ajaxObject){
                        $("#foo_topics_control_add").trigger("click");
                        $("#foo_topics_control_add").trigger("click");
                        $("#foo_topics_control_add").trigger("click");
                        assert.equal($('#foo_topics_0_container').size(),1);
                        assert.equal($('#foo_topics_0').size(),1);
                        assert.ok($('#foo_topics_0').is(":visible"));
                        assert.equal($('#foo_topics_1_container').size(),1);
                        assert.equal($('#foo_topics_1').size(),1);
                        assert.ok($('#foo_topics_1').is(":visible"));
                        assert.equal($('#foo_topics_2_container').size(),1);
                        assert.equal($('#foo_topics_2').size(),1);
                        assert.ok($('#foo_topics_2').is(":visible"));
                        assert.equal($('#foo_topics_3_container').size(),1);
                        assert.equal($('#foo_topics_3').size(),1);
                        assert.ok($('#foo_topics_3').is(":visible"));

                        assert.deepEqual(JSON.parse(formTrees[0].formTree), formTree);
                        assert.deepEqual(JSON.parse(formTrees[0].formTreePtrs), formTreePtrs);

                        done();
            }

            var done = assert.async(1),
                current_step = 1,
                cnt_validated_urls_for_current_step = 0;
                steps = [
                {
                    'urls':[
                                    "/coreforms/getformpart/manytomany/?formId=foo_topics&parentFormId=foo&fieldOfParentForm=topics&formName=topic&contentId=foo_topics_pool&initVal=null&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                                    "/coreforms/getformpart/polymorphicForeignKey/?nbBoxes=3&boxList%5B0%5D%5Bid%5D=habit&boxList%5B0%5D%5Blabel%5D=Une+habitude+de+vie&boxList%5B1%5D%5Bid%5D=useAKindOfEntity&boxList%5B1%5D%5Blabel%5D=Utiliser...&boxList%5B2%5D%5Bid%5D=otherBehaviour&boxList%5B2%5D%5Blabel%5D=Autre%3A&formId=foo_to_behaviour&parentFormId=foo&fieldOfParentForm=to_behaviour&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                                    "/coreforms/getformpart/foreignKey/?formId=foo_to_behaviour_useAKindOfEntity_entity_with_properties&formName=entityThatHaveProperties&parentFormId=foo_to_behaviour_useAKindOfEntity&fieldOfParentForm=entity_with_properties&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                                    "/coreforms/getformpart/polymorphicForeignKey/?nbBoxes=6&boxList%5B0%5D%5Bid%5D=product&boxList%5B0%5D%5Blabel%5D=Un+produit&boxList%5B1%5D%5Bid%5D=company&boxList%5B1%5D%5Blabel%5D=Une+marque&boxList%5B2%5D%5Bid%5D=company&boxList%5B2%5D%5Blabel%5D=Une+Banque&boxList%5B3%5D%5Bid%5D=company&boxList%5B3%5D%5Blabel%5D=Un+magasin&boxList%5B4%5D%5Bid%5D=company&boxList%5B4%5D%5Blabel%5D=Un+organisme&boxList%5B5%5D%5Bid%5D=association&boxList%5B5%5D%5Blabel%5D=Une+association&formId=foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity&parentFormId=foo_to_behaviour_useAKindOfEntity_entity_with_properties&fieldOfParentForm=target_entity&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                        ],
                    'control': null,
                    'whenFinished': afterStep1
                }];

            $(document).ready(function() {

                control_ajax_query = function control_ajax_query(response,status,ajaxObject){

                    if(current_step > steps.length)
                        throw Error('We are currently in step '+current_step+', but this step in not configured in variable "steps"');

                    var urls_of_this_step = steps[current_step-1].urls,
                        control_function = steps[current_step-1].control,
                        after_step_function = steps[current_step-1].whenFinished,
                        url = ajaxObject.url;

                            if(urls_of_this_step.indexOf(url) >= 0){

                                cnt_validated_urls_for_current_step ++;

                                if(control_function)
                                    control_function(url,urls_of_this_step,response,status,ajaxObject);

                                if(cnt_validated_urls_for_current_step == urls_of_this_step.length){
                                    if(after_step_function)
                                        after_step_function(url,urls_of_this_step,response,status,ajaxObject);
                                    current_step ++;
                                    cnt_validated_urls_for_current_step = 0;
                                }

                            }else{
                                console.log("Becarreful, in step " + current_step + ", this url was called without being expected by the test: " + url);
                            }
                };

                applyFormConfiguration(
                    'foo',
                    'alternative',
                    "/coreforms/postform/",
                    "/coreforms/getform/",
                    "/coreforms/livesearch/resultdiv/foo",
                    control_ajax_query
                );


            });

    });
