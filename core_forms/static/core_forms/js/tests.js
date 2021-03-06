'use strict'
// Url to run these tests : /coreforms/tests/


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////  VARIABLES   //////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var control_ajax_query;
var nodes = [{
    form: null,
    form_id: 'foo',
    form_name: 'name',
    children: [],
    submissionStatus: "being_edited",
    is_visible: false,
    validatedValue: '',
    parentFormId: '',
    fieldOfParentForm: ''
}, {
    form: null,
    form_id: 'foo',
    form_name: 'name',
    children: [],
    submissionStatus: "being_edited",
    is_visible: true,
    validatedValue: '',
    parentFormId: '',
    fieldOfParentForm: ''
}, {
    form: null,
    form_id: 'foo',
    form_name: 'name',
    children: [],
    submissionStatus: "uneditable_inbase_object",
    is_visible: true,
    validatedValue: '',
    parentFormId: '',
    fieldOfParentForm: ''
}, {
    form: null,
    form_id: 'foo',
    form_name: 'name',
    children: [],
    submissionStatus: "uneditable_inbase_object",
    is_visible: false,
    validatedValue: '',
    parentFormId: '',
    fieldOfParentForm: ''
}]

,formTrees = [{
    formTree: '[{"form_id":"foo","form_name":"alternative","children":{"foo_topics_0":{"form_id":"foo_topics_0","form'
        +'_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"obj'
        +'ectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_to_behaviour_habit":{"form_i'
        +'d":"foo_to_behaviour_habit","form_name":"habit","children":{},"submissionStatus":"being_edited","is_visible'
        +'":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":'
        +'"foo"},"foo_to_behaviour_useAKindOfEntity":{"form_id":"foo_to_behaviour_useAKindOfEntity","form_name":"useA'
        +'KindOfEntity","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties":{"form_id":"foo_to_beh'
        +'aviour_useAKindOfEntity_entity_with_properties","form_name":"entityThatHaveProperties","children":{"foo_to_'
        +'behaviour_useAKindOfEntity_entity_with_properties_target_entity_product":{"form_id":"foo_to_behaviour_useAK'
        +'indOfEntity_entity_with_properties_target_entity_product","form_name":"product","children":{},"submissionSt'
        +'atus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm'
        +'":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behavi'
        +'our_useAKindOfEntity_entity_with_properties_target_entity_company":{"form_id":"foo_to_behaviour_useAKindOfE'
        +'ntity_entity_with_properties_target_entity_company","form_name":"company","children":{},"submissionStatus":'
        +'"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"tar'
        +'get_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_us'
        +'eAKindOfEntity_entity_with_properties_target_entity_association":{"form_id":"foo_to_behaviour_useAKindOfEnt'
        +'ity_entity_with_properties_target_entity_association","form_name":"association","children":{},"submissionSt'
        +'atus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm'
        +'":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"}},"submissionSt'
        +'atus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm'
        +'":"entity_with_properties","parentFormId":"foo_to_behaviour_useAKindOfEntity"}},"submissionStatus":"being_e'
        +'dited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviou'
        +'r","parentFormId":"foo"},"foo_to_behaviour_otherBehaviour":{"form_id":"foo_to_behaviour_otherBehaviour","fo'
        +'rm_name":"otherBehaviour","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValu'
        +'e":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_topics_1":'
        +'{"form_id":"foo_topics_1","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":'
        +'true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"f'
        +'oo_topics_2":{"form_id":"foo_topics_2","form_name":"topic","children":{},"submissionStatus":"being_edited",'
        +'"is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentForm'
        +'Id":"foo"},"foo_topics_3":{"form_id":"foo_topics_3","form_name":"topic","children":{},"submissionStatus":"b'
        +'eing_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics'
        +'","parentFormId":"foo"}},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectB'
        +'eingModified":null,"parentFormId":null,"fieldOfParentForm":null}]',
    formTreePtrs: '{"foo":{"form_id":"foo","form_name":"alternative","children":{"foo_topics_0":{"form_id":"foo_topic'
        +'s_0","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue"'
        +':null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_to_behaviour_habit'
        +'":{"form_id":"foo_to_behaviour_habit","form_name":"habit","children":{},"submissionStatus":"being_edited","'
        +'is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","pare'
        +'ntFormId":"foo"},"foo_to_behaviour_useAKindOfEntity":{"form_id":"foo_to_behaviour_useAKindOfEntity","form_n'
        +'ame":"useAKindOfEntity","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties":{"form_id":"'
        +'foo_to_behaviour_useAKindOfEntity_entity_with_properties","form_name":"entityThatHaveProperties","children"'
        +':{"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product":{"form_id":"foo_to_behav'
        +'iour_useAKindOfEntity_entity_with_properties_target_entity_product","form_name":"product","children":{},"su'
        +'bmissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOf'
        +'ParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo'
        +'_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company":{"form_id":"foo_to_behaviour_u'
        +'seAKindOfEntity_entity_with_properties_target_entity_company","form_name":"company","children":{},"submissi'
        +'onStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParent'
        +'Form":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_be'
        +'haviour_useAKindOfEntity_entity_with_properties_target_entity_association":{"form_id":"foo_to_behaviour_use'
        +'AKindOfEntity_entity_with_properties_target_entity_association","form_name":"association","children":{},"su'
        +'bmissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOf'
        +'ParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"}},"su'
        +'bmissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOf'
        +'ParentForm":"entity_with_properties","parentFormId":"foo_to_behaviour_useAKindOfEntity"}},"submissionStatus'
        +'":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"t'
        +'o_behaviour","parentFormId":"foo"},"foo_to_behaviour_otherBehaviour":{"form_id":"foo_to_behaviour_otherBeha'
        +'viour","form_name":"otherBehaviour","children":{},"submissionStatus":"being_edited","is_visible":false,"val'
        +'idatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_'
        +'topics_1":{"form_id":"foo_topics_1","form_name":"topic","children":{},"submissionStatus":"being_edited","is'
        +'_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId"'
        +':"foo"},"foo_topics_2":{"form_id":"foo_topics_2","form_name":"topic","children":{},"submissionStatus":"bein'
        +'g_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","'
        +'parentFormId":"foo"},"foo_topics_3":{"form_id":"foo_topics_3","form_name":"topic","children":{},"submission'
        +'Status":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentFor'
        +'m":"topics","parentFormId":"foo"}},"submissionStatus":"being_edited","is_visible":true,"validatedValue":nul'
        +'l,"objectBeingModified":null,"parentFormId":null,"fieldOfParentForm":null},"foo_topics_0":{"form_id":"foo_t'
        +'opics_0","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedVa'
        +'lue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_to_behaviour_h'
        +'abit":{"form_id":"foo_to_behaviour_habit","form_name":"habit","children":{},"submissionStatus":"being_edite'
        +'d","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","'
        +'parentFormId":"foo"},"foo_to_behaviour_useAKindOfEntity":{"form_id":"foo_to_behaviour_useAKindOfEntity","fo'
        +'rm_name":"useAKindOfEntity","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties":{"form_i'
        +'d":"foo_to_behaviour_useAKindOfEntity_entity_with_properties","form_name":"entityThatHaveProperties","child'
        +'ren":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product":{"form_id":"foo_to_b'
        +'ehaviour_useAKindOfEntity_entity_with_properties_target_entity_product","form_name":"product","children":{}'
        +',"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fie'
        +'ldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},'
        +'"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company":{"form_id":"foo_to_behavio'
        +'ur_useAKindOfEntity_entity_with_properties_target_entity_company","form_name":"company","children":{},"subm'
        +'issionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfPa'
        +'rentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_t'
        +'o_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association":{"form_id":"foo_to_behaviour'
        +'_useAKindOfEntity_entity_with_properties_target_entity_association","form_name":"association","children":{}'
        +',"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fie'
        +'ldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"}}'
        +',"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fie'
        +'ldOfParentForm":"entity_with_properties","parentFormId":"foo_to_behaviour_useAKindOfEntity"}},"submissionSt'
        +'atus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm'
        +'":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_otherBehaviour":{"form_id":"foo_to_behaviour_other'
        +'Behaviour","form_name":"otherBehaviour","children":{},"submissionStatus":"being_edited","is_visible":false,'
        +'"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"'
        +'foo_to_behaviour_useAKindOfEntity_entity_with_properties":{"form_id":"foo_to_behaviour_useAKindOfEntity_ent'
        +'ity_with_properties","form_name":"entityThatHaveProperties","children":{"foo_to_behaviour_useAKindOfEntity_'
        +'entity_with_properties_target_entity_product":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_pro'
        +'perties_target_entity_product","form_name":"product","children":{},"submissionStatus":"being_edited","is_vi'
        +'sible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFo'
        +'rmId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity'
        +'_with_properties_target_entity_company":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_propertie'
        +'s_target_entity_company","form_name":"company","children":{},"submissionStatus":"being_edited","is_visible"'
        +':false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":'
        +'"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_'
        +'properties_target_entity_association":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_'
        +'target_entity_association","form_name":"association","children":{},"submissionStatus":"being_edited","is_vi'
        +'sible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFo'
        +'rmId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"}},"submissionStatus":"being_edited","is_vi'
        +'sible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"entity_with_properties",'
        +'"parentFormId":"foo_to_behaviour_useAKindOfEntity"},"foo_to_behaviour_useAKindOfEntity_entity_with_properti'
        +'es_target_entity_product":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entit'
        +'y_product","form_name":"product","children":{},"submissionStatus":"being_edited","is_visible":false,"valida'
        +'tedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behavi'
        +'our_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_tar'
        +'get_entity_company":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_comp'
        +'any","form_name":"company","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedVal'
        +'ue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_us'
        +'eAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_en'
        +'tity_association":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_associ'
        +'ation","form_name":"association","children":{},"submissionStatus":"being_edited","is_visible":false,"valida'
        +'tedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behavi'
        +'our_useAKindOfEntity_entity_with_properties"},"foo_topics_1":{"form_id":"foo_topics_1","form_name":"topic",'
        +'"children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModifie'
        +'d":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_topics_2":{"form_id":"foo_topics_2","form_n'
        +'ame":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objec'
        +'tBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_topics_3":{"form_id":"foo_topi'
        +'cs_3","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue'
        +'":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"}}'
}, {
    useAKindOfEntity: '{"form_id":"foo_to_behaviour_useAKindOfEntity","form_name":"useAKindOfEntity","children":{"foo'
        +'_to_behaviour_useAKindOfEntity_entity_with_properties":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity'
        +'_with_properties","form_name":"entityThatHaveProperties","children":{"foo_to_behaviour_useAKindOfEntity_ent'
        +'ity_with_properties_target_entity_product":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_proper'
        +'ties_target_entity_product","form_name":"product","children":{},"submissionStatus":"being_edited","is_visib'
        +'le":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormI'
        +'d":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_wi'
        +'th_properties_target_entity_company":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_t'
        +'arget_entity_company","form_name":"company","children":{},"submissionStatus":"being_edited","is_visible":fa'
        +'lse,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"fo'
        +'o_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_pro'
        +'perties_target_entity_association":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_tar'
        +'get_entity_association","form_name":"association","children":{},"submissionStatus":"being_edited","is_visib'
        +'le":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormI'
        +'d":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"}},"submissionStatus":"being_edited","is_visib'
        +'le":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"entity_with_properties","pa'
        +'rentFormId":"foo_to_behaviour_useAKindOfEntity"}},"submissionStatus":"being_edited","is_visible":false,"val'
        +'idatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"}',
    habit: '{"form_id":"foo_to_behaviour_habit","form_name":"habit","children":{},"submissionStatus":"uneditable_inba'
        +'se_object","is_visible":true,"validatedValue":65,"objectBeingModified":null,"fieldOfParentForm":"to_behavio'
        +'ur","parentFormId":"foo"}',
    otherBehaviour: '{"form_id":"foo_to_behaviour_otherBehaviour","form_name":"otherBehaviour","children":{},"submiss'
        +'ionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParen'
        +'tForm":"to_behaviour","parentFormId":"foo"}'
}]

,livesearchConf = [
    '{"urlLiveSearch":"/coreforms/livesearch/topic","formName":"topic","slide_speed":"fast"}',
]

,queryCaches = {
    byFieldsToSearchOn:[
            {
                query: {a:[1]},
                response: JSON.stringify({
                    totalMatch: [{id:34, label:"Bonjour à tous!"} , {id:0, label: "Ciao!"}],
                    singleMatch: [{id:10, label:"Poumpoumpow"}]
                }),
                metadata: {order: ['label','id']}
            },{
                query: {name:["good","morning"],description_en:["and","hello",'others',"world"]},
                response: JSON.stringify({
                    totalMatch: [{id:39, label:"Ciao tutti!"} , {id:290, label: "-"}],
                    singleMatch: []
                }),
                metadata: {order: ['label','id']}
            },{
                query: {name:["good","morning"],description_en:[]},
                response: JSON.stringify({
                    totalMatch: [{id:39, label:"Ciao tutti!"} , {id:290, label: "-"}],
                    singleMatch: []
                }),
                metadata: {order: ['label','id']}
            },{
                query: {},
                response: JSON.stringify({
                    totalMatch: [],
                    singleMatch: [{id:10, label:"Poumpoumpow"}]
                }),
                metadata: {order: ['label','id']}
            },{
                query: {name:["lk","llml"],description_en:["pp"]},
                response: JSON.stringify({
                    totalMatch: [],
                    singleMatch: []
                }),
                metadata: {order: ['label','id']}
            },{
                query: {name:[],description_en:["hhhhhhhhhhhhh"]},
                response: JSON.stringify({
                    totalMatch: [],
                    singleMatch: []
                }),
                metadata: {order: ['label','id']}
            }
        ],
    bySingleField:[
            {
                query: {name:["1"]},
                response: JSON.stringify({
                    totalMatch: [{id:34, label:"Bonjour à tous!"} , {id:0, label: "Ciao!"}],
                    singleMatch: [{id:10, label:"Poumpoumpow"}]
                }),
                metadata: {order: ['label','id']}
            },{
                query: {name:["lk","llml"]},
                response: JSON.stringify({
                    totalMatch: [{id:39, label:"Ciao tutti!"} , {id:290, label: "-"}],
                    singleMatch: []
                }),
                metadata: {order: ['label','id']}
            },{
                query: {},
                response: JSON.stringify({
                    totalMatch: [],
                    singleMatch: [{id:10, label:"Poumpoumpow"}]
                }),
                metadata: {order: ['label','id']}
            },{
                query: {a:["2","ljlk","lk"]},
                response: JSON.stringify({
                    totalMatch: [],
                    singleMatch: []
                }),
                metadata: {order: ['label','id']}
            }
    ]
}
;

clone = get_clone();/////////////////////////////////todo!! il semble que sans cet appel, clone est bien là mais ne fait pas reference a la meme fonction...








/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////  UNIT TESTS FOR modelform.js  /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

QUnit.module( "modelform.js unit tests" );

QUnit.test("constructErrorList", function(assert) {
    var errors = [{
        field: 'name',
        errors: ["Compulsory field"],
        expected: "<ul class='errorlist'><li>Compulsory field</li></ul>"
    }, {
        field: '__all__',
        errors: ["Compulsory field"],
        expected: "<ul class='errorlist nonfield'><li>Compulsory field</li></ul>"
    }, {
        field: 'name',
        errors: ["Not correct", "second error"],
        expected: "<ul class='errorlist'><li>Not correct</li><li>second error</li></ul>"
    }];

    var data = [];
    var expected_results = [];

    for (var e in errors){
        data.push(constructErrorList(errors[e].field, errors[e].errors));
        expected_results.push(errors[e].expected);
    }

    launch_tests(data,expected_results,assert);

});

QUnit.test("needsToBeSubmited", function(assert) {
    var expected_results = [false, true, false, false];
    var data = [];
    for(var i in nodes)
        data.push(needsToBeSubmited(nodes[i]));

    launch_tests(data,expected_results,assert);
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////  FUNCTIONAL TESTS FOR modelform.js  ///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

QUnit.module( "modelform.js functional tests (with server queries)" );

QUnit.test("Temp. ", function(assert) {

    var afterStep1 = function(urls_of_this_step) {
        $('[name=foo_to_behaviour_radiogroup][value=habit]').trigger(
            "click");
        selectFieldOfForm('foo_to_behaviour_habit', 'label_en').val(
            'test from qunit');
        $('#submit').trigger('click');
    }

    var afterStep2 = function(urls_of_this_step) {
        $('#submit').trigger('click');
    }

    var controlStep2 = function(url, urls_of_this_step, response, status,
        ajaxObject) {
        if (urls_of_this_step.indexOf(url) >= 0) {
            assert.ok(true);
        } else
            assert.ok(false);
        done();
    }

    var controlStep3 = function(url, urls_of_this_step, response, status,
        ajaxObject) {
        if (urls_of_this_step.indexOf(url) >= 0) {
            assert.ok(true);
        } else
            assert.ok(false);

        set_deparam();
        var params = $.deparam(ajaxObject.data);
        assert.equal(params['name'], '');
        assert.equal(params['description_en'], '');
        assert.equal(params['position_in_nav_bar'], '');
        assert.equal(params['_slug'], '');
        assert.equal(params['formId'], 'foo_topics_0');
        assert.equal(params['parentFormId'], 'foo');
        assert.equal(params['fieldOfParentForm'], 'topics');

        done();
    }

    var done = assert.async(3),
        current_step = {
            val: 1
        },
        cnt_validated_urls_for_current_step = {
            val: 0
        },
        steps = [{
            'urls': [
                "/coreforms/getformpart/manytomany/?formId=foo_topics&parentFormId=foo&fieldOfParentForm=topics&formName=topic&contentId=foo_topics_pool&initVal=null&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                "/coreforms/getformpart/polymorphicForeignKey/?nbBoxes=3&boxList%5B0%5D%5Bid%5D=habit&boxList%5B0%5D%5Blabel%5D=Une+habitude+de+vie&boxList%5B1%5D%5Bid%5D=useAKindOfEntity&boxList%5B1%5D%5Blabel%5D=Utiliser...&boxList%5B2%5D%5Bid%5D=otherBehaviour&boxList%5B2%5D%5Blabel%5D=Autre%3A&formId=foo_to_behaviour&parentFormId=foo&fieldOfParentForm=to_behaviour&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                "/coreforms/getformpart/foreignKey/?formId=foo_to_behaviour_useAKindOfEntity_entity_with_properties&formName=entityThatHaveProperties&parentFormId=foo_to_behaviour_useAKindOfEntity&fieldOfParentForm=entity_with_properties&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                "/coreforms/getformpart/polymorphicForeignKey/?nbBoxes=3&boxList%5B0%5D%5Bid%5D=product&boxList%5B0%5D%5Blabel%5D=Un+produit&boxList%5B1%5D%5Bid%5D=company&boxList%5B1%5D%5Blabel%5D=Une+marque&boxList%5B2%5D%5Bid%5D=association&boxList%5B2%5D%5Blabel%5D=Une+association&formId=foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity&parentFormId=foo_to_behaviour_useAKindOfEntity_entity_with_properties&fieldOfParentForm=target_entity&callbackQunitFunction=control_ajax_query&qunitTesting=true",
            ],
            'control': null,
            'whenFinished': afterStep1
        }, {
            'urls': [
                "/coreforms/postform/habit",
                "/coreforms/postform/topic",
            ],
            'control': controlStep2,
            'whenFinished': afterStep1
        }, {
            'urls': [
                "/coreforms/postform/topic"
            ],
            'control': controlStep3,
        }];

    control_ajax_query = function control_ajax_query(a, b, c) { // redefinition of global function so that control_steps can access local variable such as current_step, etc.
        control_steps(a, b, c, current_step, steps,
            cnt_validated_urls_for_current_step,assert);
    }

        $(document).ready(function() {
            getHtmlFixtureFromServer("/coreforms/dev/alternative?qunitTesting=1&callbackQunitFunction=control_ajax_query");
        });

});

QUnit.test("Add a form to a ManyToManyField. ", function(assert) {

    var afterStep1 = function(url, urls_of_this_step, response, status,
        ajaxObject) {
        $("#foo_topics_control_add").trigger("click");
        $("#foo_topics_control_add").trigger("click");
        $("#foo_topics_control_add").trigger("click");
        assert.equal($('#foo_topics_0_container').size(), 1);
        assert.equal($('#foo_topics_0').size(), 1);
        assert.ok($('#foo_topics_0').is(":visible"));
        assert.equal($('#foo_topics_1_container').size(), 1);
        assert.equal($('#foo_topics_1').size(), 1);
        assert.ok($('#foo_topics_1').is(":visible"));
        assert.equal($('#foo_topics_2_container').size(), 1);
        assert.equal($('#foo_topics_2').size(), 1);
        assert.ok($('#foo_topics_2').is(":visible"));
        assert.equal($('#foo_topics_3_container').size(), 1);
        assert.equal($('#foo_topics_3').size(), 1);
        assert.ok($('#foo_topics_3').is(":visible"));

        assert.deepEqual(JSON.parse(formTrees[0].formTree),
            formTree);
        //console.log('formTrees[0].formTree= ' + JSON.stringify(formTree));
        assert.deepEqual(JSON.parse(formTrees[0].formTreePtrs),
            formTreePtrs);
        //console.log('formTrees[0].formTreePtrs= ' + JSON.stringify(formTreePtrs));

        done();
    }

    var done = assert.async(1),
        current_step = {
            val: 1
        },
        cnt_validated_urls_for_current_step = {
            val: 0
        },
        steps = [{
            'urls': [
                "/coreforms/getformpart/manytomany/?formId=foo_topics&parentFormId=foo&fieldOfParentForm=topics&formName=topic&contentId=foo_topics_pool&initVal=null&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                "/coreforms/getformpart/polymorphicForeignKey/?nbBoxes=3&boxList%5B0%5D%5Bid%5D=habit&boxList%5B0%5D%5Blabel%5D=Une+habitude+de+vie&boxList%5B1%5D%5Bid%5D=useAKindOfEntity&boxList%5B1%5D%5Blabel%5D=Utiliser...&boxList%5B2%5D%5Bid%5D=otherBehaviour&boxList%5B2%5D%5Blabel%5D=Autre%3A&formId=foo_to_behaviour&parentFormId=foo&fieldOfParentForm=to_behaviour&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                "/coreforms/getformpart/foreignKey/?formId=foo_to_behaviour_useAKindOfEntity_entity_with_properties&formName=entityThatHaveProperties&parentFormId=foo_to_behaviour_useAKindOfEntity&fieldOfParentForm=entity_with_properties&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                "/coreforms/getformpart/polymorphicForeignKey/?nbBoxes=3&boxList%5B0%5D%5Bid%5D=product&boxList%5B0%5D%5Blabel%5D=Un+produit&boxList%5B1%5D%5Bid%5D=company&boxList%5B1%5D%5Blabel%5D=Une+marque&boxList%5B2%5D%5Bid%5D=association&boxList%5B2%5D%5Blabel%5D=Une+association&formId=foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity&parentFormId=foo_to_behaviour_useAKindOfEntity_entity_with_properties&fieldOfParentForm=target_entity&callbackQunitFunction=control_ajax_query&qunitTesting=true",
            ],
            'control': null,
            'whenFinished': afterStep1
        }];

    control_ajax_query = function control_ajax_query(a, b, c) { // redefinition of global function so that control_steps can access local variable such as current_step, etc.
        control_steps(a, b, c, current_step, steps,
            cnt_validated_urls_for_current_step);
    }

    $(document).ready(function() {

            getHtmlFixtureFromServer("/coreforms/dev/alternative?qunitTesting=1&callbackQunitFunction=control_ajax_query");

    });

});

QUnit.test("Control formTree for polymorphic foreign key. ", function(assert) {

    var created_objects_ids = {habit:-1}

    var afterStep1 = function(urls_of_this_step) {

        $(
            '#foo_to_behaviour_radioboxes [name=foo_to_behaviour_radiogroup][value=habit]'
        ).trigger('click');
        $('#foo_to_behaviour_habit #id_label_en').val(new Date());
        $('#submit').trigger('click');

    }

    var controlStep2 = function(url, urls_of_this_step, response, status,ajaxObject){
            set_deparam();
            var params = $.deparam(ajaxObject.data);

            if (url == "/coreforms/postform/habit")
                created_objects_ids.habit = response.inbase_object;
    }

    var afterStep2 = function(urls_of_this_step) {
        var t1 = JSON.parse(formTrees[1].useAKindOfEntity),
            t2 = JSON.parse(formTrees[1].habit),
            t3 = JSON.parse(formTrees[1].otherBehaviour);

        t2.validatedValue = created_objects_ids.habit;

        assert.deepEqual(t1, formTree[0].children.foo_to_behaviour_useAKindOfEntity);
        assert.deepEqual(t2, formTree[0].children.foo_to_behaviour_habit);
        assert.deepEqual(t3, formTree[0].children.foo_to_behaviour_otherBehaviour);
        //console.log('formTrees[1].useAKindOfEntity= ' + JSON.stringify(formTree[0].children.foo_to_behaviour_useAKindOfEntity));
        //console.log('formTrees[1].habit= ' + JSON.stringify(formTree[0].children.foo_to_behaviour_habit));
        //console.log('formTrees[1].otherBehaviour= ' + JSON.stringify(formTree[0].children.foo_to_behaviour_otherBehaviour));

        done();
    }

    var done = assert.async(1),
        current_step = {
            val: 1
        },
        cnt_validated_urls_for_current_step = {
            val: 0
        },
        steps = [{
            'urls': [
                "/coreforms/getformpart/manytomany/?formId=foo_topics&parentFormId=foo&fieldOfParentForm=topics&formName=topic&contentId=foo_topics_pool&initVal=null&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                "/coreforms/getformpart/polymorphicForeignKey/?nbBoxes=3&boxList%5B0%5D%5Bid%5D=habit&boxList%5B0%5D%5Blabel%5D=Une+habitude+de+vie&boxList%5B1%5D%5Bid%5D=useAKindOfEntity&boxList%5B1%5D%5Blabel%5D=Utiliser...&boxList%5B2%5D%5Bid%5D=otherBehaviour&boxList%5B2%5D%5Blabel%5D=Autre%3A&formId=foo_to_behaviour&parentFormId=foo&fieldOfParentForm=to_behaviour&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                "/coreforms/getformpart/foreignKey/?formId=foo_to_behaviour_useAKindOfEntity_entity_with_properties&formName=entityThatHaveProperties&parentFormId=foo_to_behaviour_useAKindOfEntity&fieldOfParentForm=entity_with_properties&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                "/coreforms/getformpart/polymorphicForeignKey/?nbBoxes=3&boxList%5B0%5D%5Bid%5D=product&boxList%5B0%5D%5Blabel%5D=Un+produit&boxList%5B1%5D%5Bid%5D=company&boxList%5B1%5D%5Blabel%5D=Une+marque&boxList%5B2%5D%5Bid%5D=association&boxList%5B2%5D%5Blabel%5D=Une+association&formId=foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity&parentFormId=foo_to_behaviour_useAKindOfEntity_entity_with_properties&fieldOfParentForm=target_entity&callbackQunitFunction=control_ajax_query&qunitTesting=true",
            ],
            'control': null,
            'whenFinished': afterStep1
        }, {
            'urls': [
                "/coreforms/postform/habit",
                "/coreforms/postform/topic",
            ],
            'control': controlStep2,
            'whenFinished': afterStep2
        }];

    control_ajax_query = function control_ajax_query(a, b, c) { // redefinition of global function so that control_steps can access local variable such as current_step, etc.
        control_steps(a, b, c, current_step, steps,
            cnt_validated_urls_for_current_step,assert);
    }

    $(document).ready(function() {
        getHtmlFixtureFromServer("/coreforms/dev/alternative?qunitTesting=1&callbackQunitFunction=control_ajax_query");
    });
});

QUnit.test(
    "Control sent query when several objects of a polymorphicForeignKey are provided",
    function(assert) {

        var created_objects_ids = {habit:-1,otherBehaviour:-1};

        var afterStep1 = function(urls_of_this_step) {

            $(
                '#foo_to_behaviour_radioboxes [name=foo_to_behaviour_radiogroup][value=habit]'
            ).trigger('click');
            $('#foo_to_behaviour_habit #id_label_en').val(new Date());

            $('#foo_topics_0 #id_name').val(new Date());
            $('#foo_topics_0 #id_description_en').val(new Date());
            $('#foo_topics_0 #id_position_in_nav_bar').val(69);
            $('#foo_topics_0 #id_name').val(new Date());
            $('#foo_topics_0 #id__slug').val('nothing');

            //$('#id_from_behaviours [value=1]').attr('selected', true)

            //$('[maxLength="100"][id="id_name"]').val(new Date());

            $('#submit').trigger('click');

        }

        var controlStep2 = function(url, urls_of_this_step, response, status,ajaxObject){
            set_deparam();
            var params = $.deparam(ajaxObject.data);

            if (url == "/coreforms/postform/habit")
                created_objects_ids.habit = response.inbase_object;

        }

        var afterStep2 = function(urls_of_this_step) {

            $(
                '#foo_to_behaviour_radioboxes [name=foo_to_behaviour_radiogroup][value=otherBehaviour]'
            ).trigger('click');
            $('#foo_to_behaviour_otherBehaviour #id_title_en').val(new Date());
            $('#foo_to_behaviour_otherBehaviour #id_description_en').val(new Date());
            $('#submit').trigger('click');
        }

        var controlStep3 = function(url, urls_of_this_step, response, status,ajaxObject) {
            set_deparam();
            var params = $.deparam(ajaxObject.data);

            if (url == "/coreforms/postform/otherBehaviour")
                created_objects_ids.otherBehaviour = response.inbase_object;

            if (url == "/coreforms/postform/alternative"){
                assert.equal(params['to_behaviour'],created_objects_ids.otherBehaviour);
                done();
            }
        }

        var afterStep3 = function(urls_of_this_step){
            $('#foo_to_behaviour_radioboxes [name=foo_to_behaviour_radiogroup][value=habit]'
            ).trigger('click');
            $('#submit').trigger('click');
        }

        var controlStep4 = function(url, urls_of_this_step, response, status,ajaxObject) {
            set_deparam();
            var params = $.deparam(ajaxObject.data);

            if (url == "/coreforms/postform/alternative"){
                assert.equal(params['to_behaviour'],created_objects_ids.habit);
                done();
            }
        }



        var done = assert.async(2),
            current_step = {
                val: 1
            },
            cnt_validated_urls_for_current_step = {
                val: 0
            },
            steps = [{
                'urls': [
                    "/coreforms/getformpart/manytomany/?formId=foo_topics&parentFormId=foo&fieldOfParentForm=topics&formName=topic&contentId=foo_topics_pool&initVal=null&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                    "/coreforms/getformpart/polymorphicForeignKey/?nbBoxes=3&boxList%5B0%5D%5Bid%5D=habit&boxList%5B0%5D%5Blabel%5D=Une+habitude+de+vie&boxList%5B1%5D%5Bid%5D=useAKindOfEntity&boxList%5B1%5D%5Blabel%5D=Utiliser...&boxList%5B2%5D%5Bid%5D=otherBehaviour&boxList%5B2%5D%5Blabel%5D=Autre%3A&formId=foo_to_behaviour&parentFormId=foo&fieldOfParentForm=to_behaviour&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                    "/coreforms/getformpart/foreignKey/?formId=foo_to_behaviour_useAKindOfEntity_entity_with_properties&formName=entityThatHaveProperties&parentFormId=foo_to_behaviour_useAKindOfEntity&fieldOfParentForm=entity_with_properties&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                    "/coreforms/getformpart/polymorphicForeignKey/?nbBoxes=3&boxList%5B0%5D%5Bid%5D=product&boxList%5B0%5D%5Blabel%5D=Un+produit&boxList%5B1%5D%5Bid%5D=company&boxList%5B1%5D%5Blabel%5D=Une+marque&boxList%5B2%5D%5Bid%5D=association&boxList%5B2%5D%5Blabel%5D=Une+association&formId=foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity&parentFormId=foo_to_behaviour_useAKindOfEntity_entity_with_properties&fieldOfParentForm=target_entity&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                ],
                'control': null,
                'whenFinished': afterStep1
            }, {
                'urls': [
                    "/coreforms/postform/habit",
                    "/coreforms/postform/topic",
                    "/coreforms/postform/alternative",
                ],
                'control': controlStep2,
                'whenFinished': afterStep2
            }, {
                'urls': [
                    "/coreforms/postform/otherBehaviour",
                    "/coreforms/postform/alternative",
                ],
                'control': controlStep3,
                'whenFinished': afterStep3
            }, {
                'urls': [
                    "/coreforms/postform/alternative",
                ],
                'control': controlStep4,
                'whenFinished': null
            }];

        control_ajax_query = function control_ajax_query(a, b, c) { // redefinition of global function so that control_steps can access local variable such as current_step, etc.
            control_steps(a, b, c, current_step, steps,
                cnt_validated_urls_for_current_step);
        }

        $(document).ready(function() {
            getHtmlFixtureFromServer("/coreforms/dev/alternative?qunitTesting=1&callbackQunitFunction=control_ajax_query");
        });
    });

QUnit.test("Control 'Modify object' and then 'cancel modifying'", function(
    assert) {

    var htmlBefore, htmlAfter, createdObject

    var afterStep1 = function(urls_of_this_step) {

        $(
            '#foo_to_behaviour_radioboxes [name=foo_to_behaviour_radiogroup][value=habit]'
        ).trigger('click');
        $('#foo_to_behaviour_habit #id_label_en').val(new Date());
        $('#submit').trigger('click');

    }

    var controlStep2 = function(url, urls_of_this_step, response, status,
        ajaxObject) {
        if (url == '/coreforms/postform/habit') {
            createdObject = response.inbase_object;
            steps[2]['urls'] = [
                "/coreforms/getform/habit?formId=foo_to_behaviour_habit&objectId=" +
                createdObject +
                "&modifiable=true&parentFormId=foo&fieldOfParentForm=to_behaviour&objectMayNotExist=false&callbackQunitFunction=control_ajax_query&qunitTesting=true",
            ];
            steps[3]['urls'] = [
                "/coreforms/getform/habit?formId=foo_to_behaviour_habit&objectId=" +
                createdObject +
                "&modifiable=false&parentFormId=foo&fieldOfParentForm=to_behaviour&objectMayNotExist=false&callbackQunitFunction=control_ajax_query&qunitTesting=true"
            ]
        }

    }

    var afterStep2 = function(urls_of_this_step) {
        $('#foo_to_behaviour_habit_container .update_formtree').remove()
        htmlBefore = trimSpaces($('html').html());
        $('#foo_to_behaviour_habit_modify').trigger('click');

    }

    var afterStep3 = function(urls_of_this_step) {

        $('#foo_to_behaviour_habit_cancel').trigger('click');

    }

    var afterStep4 = function(urls_of_this_step) {

        //$('#foo_to_behaviour_habit_cancel').trigger('click');
        $('#foo_to_behaviour_habit_container .update_formtree').remove()
        htmlAfter = trimSpaces($('html').html());

        assert.equal(htmlAfter, htmlBefore);
        done();

    }

    var done = assert.async(1),
        current_step = {
            val: 1
        },
        cnt_validated_urls_for_current_step = {
            val: 0
        },
        steps = [{
            'urls': [
                "/coreforms/getformpart/manytomany/?formId=foo_topics&parentFormId=foo&fieldOfParentForm=topics&formName=topic&contentId=foo_topics_pool&initVal=null&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                "/coreforms/getformpart/polymorphicForeignKey/?nbBoxes=3&boxList%5B0%5D%5Bid%5D=habit&boxList%5B0%5D%5Blabel%5D=Une+habitude+de+vie&boxList%5B1%5D%5Bid%5D=useAKindOfEntity&boxList%5B1%5D%5Blabel%5D=Utiliser...&boxList%5B2%5D%5Bid%5D=otherBehaviour&boxList%5B2%5D%5Blabel%5D=Autre%3A&formId=foo_to_behaviour&parentFormId=foo&fieldOfParentForm=to_behaviour&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                "/coreforms/getformpart/foreignKey/?formId=foo_to_behaviour_useAKindOfEntity_entity_with_properties&formName=entityThatHaveProperties&parentFormId=foo_to_behaviour_useAKindOfEntity&fieldOfParentForm=entity_with_properties&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                "/coreforms/getformpart/polymorphicForeignKey/?nbBoxes=3&boxList%5B0%5D%5Bid%5D=product&boxList%5B0%5D%5Blabel%5D=Un+produit&boxList%5B1%5D%5Bid%5D=company&boxList%5B1%5D%5Blabel%5D=Une+marque&boxList%5B2%5D%5Bid%5D=association&boxList%5B2%5D%5Blabel%5D=Une+association&formId=foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity&parentFormId=foo_to_behaviour_useAKindOfEntity_entity_with_properties&fieldOfParentForm=target_entity&callbackQunitFunction=control_ajax_query&qunitTesting=true",
            ],
            'control': null,
            'whenFinished': afterStep1
        }, {
            'urls': [
                "/coreforms/postform/habit",
                "/coreforms/postform/topic",
            ],
            'control': controlStep2,
            'whenFinished': afterStep2
        }, {
            'whenFinished': afterStep3
        }, {
            'whenFinished': afterStep4
        }];

    control_ajax_query = function control_ajax_query(a, b, c) { // redefinition of global function so that control_steps can access local variable such as current_step, etc.
        control_steps(a, b, c, current_step, steps,
            cnt_validated_urls_for_current_step);
    }

        $(document).ready(function() {
            getHtmlFixtureFromServer("/coreforms/dev/alternative?qunitTesting=1&callbackQunitFunction=control_ajax_query");
        });

});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////  UNIT TESTS FOR livesearch.js WITHOUT SERVER QUERIES //////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

QUnit.module( "livesearch.js unit tests" );

QUnit.test("Test normalizeAndSplit function",
    function(assert) {
        assert.deepEqual(normalizeAndSplit('   hello  world '),     ['hello','world']);
        assert.deepEqual(normalizeAndSplit('   Hello,  world ! '),  ['hello','world']);
        assert.deepEqual(normalizeAndSplit('   héLLô,  wörld ! '),  ['hello','world']);
        assert.deepEqual(normalizeAndSplit('   héllô, \n wörld ! '),['hello','world']);
        assert.deepEqual(normalizeAndSplit('90 héllô,2\n wörld0! '),['90','hello','2','world0']);
        assert.deepEqual(normalizeAndSplit('903héllô12002wörld00 '),['903hello12002world00']);
    });

QUnit.test("Test getRequestDictFromFieldGroup",
    function(assert) {

        var fieldsInfo = [{
                    name:'title',
                    val: 'Les Héros du 75!'
                },{
                    name: 'text_content',
                    val: 'Il était 1 fois, 3petits cochons à pieds'
                },{
                    name: 'type',
                    val: 'p'
                },{
                    name: 'position',
                    val: '2'
                }],
            expectedQuery = {
                'title': ['75','du','heros','les'],
                'text_content': ['1','3petits','cochons','etait','fois','il','pieds'],
                'type': [],
                'position': ['2']
            },
            expectedLengths = {
                'title': [2,2,5,3],
                'text_content': [1,7,7,5,4,2,5],
                'type': [],
                'position': [1]
            };

        assert.deepEqual(getRequestDictFromFieldGroup(fieldsInfo,normalizeWordList,filterWords)[0],expectedQuery);
        assert.deepEqual(getRequestDictFromFieldGroup(fieldsInfo,normalizeWordList,filterWords)[1],expectedLengths);

    });


QUnit.test("Test arraySum",
    function(assert) {
        assert.deepEqual(arraySum([1,2,2]),5);
        assert.deepEqual(arraySum([]),0);
        assert.deepEqual(arraySum([0,0,0]),0);
        assert.deepEqual(arraySum([0,0,0,-5]),-5);
        assert.deepEqual(arraySum([0,70,0,-5,0,0]),65);
    });


QUnit.test("Test normalizeWordList",
    function(assert) {
        var strings = [
            "Good Bye, Good bYE , hello Hello HéLLo",
            "All the words of these sentence are not in alphabetical order!"
        ];

        var expected_results = [
            [ "bye", "good", "hello" ],
            [ "all", "alphabetical", "are", "in", "not", "of", "order", "sentence", "the", "these", "words" ]
        ]

        var data = [];
        for(var i in strings)
            data.push(normalizeWordList(strings[i],filterWords));

        launch_tests(data,expected_results,assert,"deepEqual");

    });



QUnit.test("Test filter_by_length",
    function(assert) {

        var lengths1 = {
                'title': [3,5,2,2],
                'title2': [1,1,1],
                'title3': [2,1],
                'text_content': [0,1,0,0,0,0],
                'type': [1,1],
                'type2': [0],
                'type3': [],
                'position': [1]
            },
            lengths2 = {
                'text_content': [0,1,0,0,0,0],
                'type': [1,1],
                'type2': [0],
                'title': [],
                'position': [1],
                'position2': [2]
            },
            lengths3 = {
                'title': [3,5,2,2],
                'title2': [1,1,1],
                'title3': [2,1],
            },
            lengths4 = {
                'title': [3,5,2,2],
            },
            lengths5 = {
                'title': [],
            },
            lengths6 = {
                'title': [2],
            },
            lengths7 = {
                'title': [3],
            };

        assert.deepEqual(filterLengths(null,lengths1),true);
        assert.deepEqual(filterLengths(null,lengths2),false);
        assert.deepEqual(filterLengths(null,lengths3),true);
        assert.deepEqual(filterLengths(null,lengths4),true);
        assert.deepEqual(filterLengths(null,lengths5),false);
        assert.deepEqual(filterLengths(null,lengths6),false);
        assert.deepEqual(filterLengths(null,lengths7),true);

        assert.deepEqual(filterLengths2(null,lengths1.title),true);
        assert.deepEqual(filterLengths2(null,lengths2.title),false);
        assert.deepEqual(filterLengths2(null,lengths3.title),true);
        assert.deepEqual(filterLengths2(null,lengths4.title),true);
        assert.deepEqual(filterLengths2(null,lengths5.title),false);
        assert.deepEqual(filterLengths2(null,lengths6.title),false);
        assert.deepEqual(filterLengths2(null,lengths7.title),true);

    });

QUnit.test("Test findInCache",
    function(assert) {

        var cache=[
            {
                query: {a:[1]},
                response: JSON.stringify({
                    totalMatch: [{id:34, label:"Bonjour à tous!"} , {id:0, label: "Ciao!"}],
                    singleMatch: [{id:10, label:"Poumpoumpow"}]
                })
            },{
                query: {a:["hello","world"],b:["worlds"],c:["!","%"]},
                response: JSON.stringify({
                    totalMatch: [{id:39, label:"Ciao tutti!"} , {id:290, label: "-"}],
                    singleMatch: []
                })
            },{
                query: {},
                response: JSON.stringify({
                    totalMatch: [],
                    singleMatch: [{id:10, label:"Poumpoumpow"}]
                })
            },{
                query: {a:["l",'m']},
                response: JSON.stringify({
                    totalMatch: [],
                    singleMatch: []
                })
            }
        ];

        var toFindInCache = [
            {a:[1]},
            {a:["hello","world"],b:["worlds"],c:["!","%"]},
            {},
            {a:["l",'m']},
            {a:[34]},
            {b:["world"],c:["!"]},
            {a:["hello"],b:["world"]},
            {c:["!","%"],a:["hello","world"],b:["worlds"]},
            null
        ];

        var expected_results = [
            cache[0],null,
            cache[1],null,
            cache[2],null,
            cache[3],null,
            null,null,null,null,null,null,
            cache[1],null,
            null,null
        ]

        var data = [];
        for(var i in toFindInCache){
            data.push(findInCache(toFindInCache[i], cache));
            data.push(findInCache(toFindInCache[i], []));
        }

        launch_tests(data,expected_results,assert);
    });


QUnit.test("Test format_template",
    function(assert) {
        var templates = [
            "Hello {{var1}}, how are you today {{var1}}??",
            "I'm {{var2}}, thank you {{var3}}\n" +
            "What about you {{var3}}?"
        ]
        var vars = {
            var1: "Mike",
            var2: "fine",
            'var3': "Hanna"
        }
        var expected_results = [
            'Hello Mike, how are you today Mike??',
            'I\'m fine, thank you Hanna\nWhat about you Hanna?'
        ]

        var data = [];
        for(var i in templates)
            data.push(format_template(templates[i], vars))

        launch_tests(data,expected_results,assert);
    });

QUnit.test("Test format_result",
    function(assert) {
        var obj = [
            {a:1,b:"bb",c:null},
            {a:3,c:45,d:"hello"}
        ];
        var html_controls=[
            {tag:"table",
             children:[
                {tag:"tr",
                 children:[
                    {tag:"td"},
                    {tag:"td"},
                    {tag:"td"}
                 ]
                },
                {tag:"tr",
                 children:[
                    {tag:"td"},
                    {tag:"td"},
                    {tag:"td"}
                 ]
                }
             ]
            }
        ]
        //assert.ok();
        console.log(check_html([html_controls[0]],undefined,false,format_result(obj, 'c', ['a','b'])));
        assert.equal(format_result(obj, 'c', ['c','b']), "");
        assert.equal(format_result(obj, 'f', ['l','b']), "");
        console.log("REFAIRE ICI!!!"); //todo
    });

QUnit.test("Test field_is_present",
    function(assert){
        var obj = {
            HELLO : [1,2,3],
            GOODBYE : []
        }
        var inputs = [
            {field: 'HELLO'  , object: obj},
            {field: 'GOODBYE', object: obj},
            {field: 'NOTHING', object: obj},
        ];
        var expected = [true,false,false];
        for(var i in inputs)
            assert.equal(field_is_present(inputs[i].field, inputs[i].object), expected[i]);
    }
)

QUnit.test("Test is_not_empty",
    function(assert){
        var inputs = [
            {obj: null},
            {obj: []},
            {obj: [1]},
        ];
        var expected = [false,false,true];
        for(var i in inputs)
            assert.equal(is_not_empty(inputs[i].obj), expected[i]);
    }
)

QUnit.test("Test pick_elements_from_ids",
    function(assert){
        var el = [{id:1, field1:4},{id:2, field1: 3},{id:3, field1:49}];
        var inputs = [
            {id_list: [],    element_list: el},
            {id_list: [2,1], element_list: el},
        ];
        var expected = [
            [],
            [{id:2, field1: 3},{id:1, field1:4}]
        ];
        for(var i in inputs)
            assert.deepEqual(pick_elements_from_ids(inputs[i].id_list,inputs[i].element_list), expected[i]);
    }
)





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////  UNIT TESTS FOR livesearch.js WITH SERVER QUERIES /////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
QUnit.module( "livesearch.js unit tests (with server queries)" );

QUnit.test("Test construct_and_send_query",
    function(assert) {

        var done = assert.async(1)

        var run_tests = function() { // redefinition of global function so that control_steps can access local variable such as current_step, etc.

            var data = [
                construct_and_send_query({},null,true,false,null,{a:"hello",b:"world",c:"!"},{a:"hello"},"ff","foo",null,null,true),
                construct_and_send_query({},null,true,false,null,{a:"hello"}                ,{a:"hello"},"ff","foo",null,null,true),
                construct_and_send_query({},null,true,false,null,{}                         ,{}         ,"ff","foo",null,null,true),
                construct_and_send_query({},null,true,false,null,null                       ,null       ,"ff","foo",null,null,true),
                construct_and_send_query({},null,true,true ,null,{a:"hello",b:"world",c:"!"},{a:"hello"},"ff","foo",null,null,true),
                construct_and_send_query({},null,false,true,null,{a:"hello",b:"world",c:"!"},{a:"hello"},"ff","foo",null,null,true),
                construct_and_send_query({},null,false,false,null,{a:"hello",b:"world",c:"!"},{a:"hello"},"ff","foo",null,null,true),
            ];

            var csrfmiddlewaretoken = selectFieldOfForm('foo','csrfmiddlewaretoken').val(),
                _page_loaded_at = selectFieldOfForm('foo','_page_loaded_at').val();

            var expected_results = [
                [
                    {
                        fieldsToSearchOn: JSON.stringify({a:"hello",b:"world",c:"!"}),
                    },
                    true
                ],[
                    {
                        fieldsToSearchOn: JSON.stringify({a:"hello"}),
                    },
                    true
                ],[
                    {
                        fieldsToSearchOn: JSON.stringify({}),
                    },
                    true
                ],[
                    {
                        fieldsToSearchOn: JSON.stringify(null),
                    },
                    true
                ],[
                    {
                        fieldsToSearchOn: JSON.stringify({a:"hello",b:"world",c:"!"}),
                        currentField: 'ff',
                    },
                    true
                ],[
                    {
                        fieldsToSearchOn: JSON.stringify({a:"hello"}),
                        currentField: 'ff',
                    },
                    true
                ],[
                    undefined,
                    false
                ],
            ];

            for(var i in expected_results){
                if(typeof(expected_results[i][0]) !== 'undefined'){
                    expected_results[i][0]['csrfmiddlewaretoken'] = csrfmiddlewaretoken;
                    expected_results[i][0]['_page_loaded_at'] = _page_loaded_at;
                }
            }

            launch_tests(data,expected_results,assert,"deepEqual",done);

        }

        control_ajax_query = function control_ajax_query(){};

        $(document).ready(function() {
            getHtmlFixtureFromServer("/coreforms/dev/alternative?qunitTesting=1&callbackQunitFunction=control_ajax_query",run_tests);
        });


    });


QUnit.test("Test search_query", function(assert) {

    var afterStep1 = function(urls_of_this_step) {

        var fieldGroup = getFieldGroup('foo_topics_0', ['name','description_en']);
        var data = [];

        var search_query_wrapper = function(debug_id){
            return search_query({},clone(queryCaches),filterLengths,filterLengths2,fieldGroup,'foo_topics_0',
                'name',null,null,true,debug_id)
        }

        $('#foo_topics_0 #id_name').val('t');
        $('#foo_topics_0 #id_description_en').val('t');
        data.push(search_query_wrapper());

        $('#foo_topics_0 #id_name').val('t');
        $('#foo_topics_0 #id_description_en').val('that\'s the description');
        data.push(search_query_wrapper());

        $('#foo_topics_0 #id_name').val('this is the name');
        $('#foo_topics_0 #id_description_en').val('that\'s the description');
        data.push(search_query_wrapper());

        $('#foo_topics_0 #id_name').val('g');
        $('#foo_topics_0 #id_description_en').val('Hhhhhhhhhhhhh');
        data.push(search_query_wrapper());

        $('#foo_topics_0 #id_name').val('Morning good !!');
        $('#foo_topics_0 #id_description_en').val('Hello world (and others)');
        data.push(search_query_wrapper(1));

        $('#foo_topics_0 #id_name').val('   1   ');
        $('#foo_topics_0 #id_description_en').val('Hello world (and others)');
        data.push(search_query_wrapper());

        $('#foo_topics_0 #id_name').val('llml  lk   ');
        $('#foo_topics_0 #id_description_en').val('pp!');
        data.push(search_query_wrapper());

        var c = [
            queryCaches.byFieldsToSearchOn[5],
            queryCaches.byFieldsToSearchOn[1],
            queryCaches.bySingleField[0],
            queryCaches.byFieldsToSearchOn[4],
            queryCaches.bySingleField[1],
        ];

        var expected_results = [
            [[null,null],false,false,{name:[]}],
            [[null,null],true ,false,{name:[]}],
            [[null,null],true ,true ,{name:['is','name','the','this']}],
            [[c[0],null],false,false,{name:[]}],
            [[c[1],null],false,true ,{name:['good','morning']}],
            [[null,c[2]],true ,false,{name:['1']}],
            [[c[3],c[4]],false,false,{name:['lk','llml']}]
        ];

        launch_tests(data,expected_results,assert,'deepEqual',done);
    }

    /*var controlStep1 = function(url, urls_of_this_step, response, status, ajaxObject) {

    }*/

    var done = assert.async(1),
        current_step = {
            val: 1
        },
        cnt_validated_urls_for_current_step = {
            val: 0
        },
        steps = [{
            'urls': [
                "/coreforms/getformpart/manytomany/?formId=foo_topics&parentFormId=foo&fieldOfParentForm=topics&formName=topic&contentId=foo_topics_pool&initVal=null&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                "/coreforms/getformpart/polymorphicForeignKey/?nbBoxes=3&boxList%5B0%5D%5Bid%5D=habit&boxList%5B0%5D%5Blabel%5D=Une+habitude+de+vie&boxList%5B1%5D%5Bid%5D=useAKindOfEntity&boxList%5B1%5D%5Blabel%5D=Utiliser...&boxList%5B2%5D%5Bid%5D=otherBehaviour&boxList%5B2%5D%5Blabel%5D=Autre%3A&formId=foo_to_behaviour&parentFormId=foo&fieldOfParentForm=to_behaviour&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                "/coreforms/getformpart/foreignKey/?formId=foo_to_behaviour_useAKindOfEntity_entity_with_properties&formName=entityThatHaveProperties&parentFormId=foo_to_behaviour_useAKindOfEntity&fieldOfParentForm=entity_with_properties&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                "/coreforms/getformpart/polymorphicForeignKey/?nbBoxes=3&boxList%5B0%5D%5Bid%5D=product&boxList%5B0%5D%5Blabel%5D=Un+produit&boxList%5B1%5D%5Bid%5D=company&boxList%5B1%5D%5Blabel%5D=Une+marque&boxList%5B2%5D%5Bid%5D=association&boxList%5B2%5D%5Blabel%5D=Une+association&formId=foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity&parentFormId=foo_to_behaviour_useAKindOfEntity_entity_with_properties&fieldOfParentForm=target_entity&callbackQunitFunction=control_ajax_query&qunitTesting=true",
            ],
            'control': null,
            'whenFinished': afterStep1
        },];

    control_ajax_query = function control_ajax_query(a, b, c) { // redefinition of global function so that control_steps can access local variable such as current_step, etc.
        control_steps(a, b, c, current_step, steps,
            cnt_validated_urls_for_current_step);
    }

    $(document).ready(function() {
        getHtmlFixtureFromServer("/coreforms/dev/alternative?qunitTesting=1&callbackQunitFunction=control_ajax_query");
    });

});


QUnit.test("Test send_query_to_server",
    function(assert) {

        var done = assert.async(1)

        var control_result = function(response){
            console.log(response);
        }

        var run_tests = function() { // redefinition of global function so that control_steps can access local variable such as current_step, etc.

            var csrfmiddlewaretoken = selectFieldOfForm('foo','csrfmiddlewaretoken').val(),
                _page_loaded_at = selectFieldOfForm('foo','_page_loaded_at').val();

            var request = {csrfmiddlewaretoken:csrfmiddlewaretoken,_page_loaded_at:_page_loaded_at};

            request['fieldsToSearchOn'] = JSON.stringify({"name":[],"description_en":["ever"]});
            request['currentField'] = "description_en";

            send_query_to_server("foo_topics_0", request, null, control_result, null, null, null, null);
            // ===>> controler qu'il recoit le message "too fast!"

            setTimeout(function(){send_query_to_server("foo_topics_0", request, null, control_result, null, null, null, null)}, 3000);

            done();
        }

        control_ajax_query = function control_ajax_query(a,b,c){
            if(c.url.indexOf("formId=foo_topics") != -1){
                run_tests();
            }
        };

        $(document).ready(function() {
            getHtmlFixtureFromServer("/coreforms/dev/alternative?qunitTesting=1&callbackQunitFunction=control_ajax_query",function(){});
        });


    });



QUnit.test("Test on_search_success",
    function(assert) {

        var control1 = function(result,order,other_args){
            other_args = other_args.expected;
            assert.deepEqual(result,other_args.result  ,"t_"+other_args.test_id+"-test of result");
            assert.deepEqual(order,other_args.order    ,"t_"+other_args.test_id+"-test of order");
            assert.deepEqual(caches,other_args.caches  ,"t_"+other_args.test_id+"-test of caches");
        }

        var control2 = function(error_message){
            assert.ok(true,"the error was correctly handeled!");
        }

        var a = {a:"l",b:"kkm",label:"lab"};
        var b = [{id:1,label:'L'},{id:2,label:'L2'}];
        var c = [{id:10,label:'L10'},{id:20,label:'L20'},{id:30,label:'L30'}];
        var d = [{id:3,label:'L3'},{id:1,label:'L'},{id:10,label:'L10'},{id:30,label:'L30'}];
        var e = [{id:10,label:'L10'},{id:30,label:'L30'}];
        var f = {order:['label']};
        var g = [{id:10,label:'L10'},{id:20,label:'L20'}];
        var h = [{id:3,label:'L3'},{id:1,label:'L'},{id:2,label:'L2'}];
        var orig_caches = {byFieldsToSearchOn:[],bySingleField:[],size:2};
        var caches = clone(orig_caches);

        var data_raw = [{
            'response': null,
            'query': null,
            'responseFromCache': [queryCaches.byFieldsToSearchOn[0],queryCaches.bySingleField[1]],
        },{
            'response': {status:'success', order:['label'], result:{matchAll:clone(b)}},
            'query': {fieldsToSearchOn:clone(a)},
            'responseFromCache': [null,queryCaches.bySingleField[1]],
        },{
            'response': {status:'success', order:['label'], result:{matchCurField:clone(b)}},
            'query': {fieldsToSearchOn:clone(a),currentField:"label"},
            'responseFromCache': [queryCaches.bySingleField[0],null],
        },{
            'response': {status:'success', order:['label'], result:{matchAll:clone(c),common:[10,30],matchCurField:[{id:3,label:'L3'},{id:1,label:'L'}]}},
            'query': {fieldsToSearchOn:clone(a),currentField:"label"},
            'responseFromCache': [null,null],
        },{
            'response': {status:'success', order:['label'], result:{matchAll:clone(c),common:[10,30]}},
            'query': {fieldsToSearchOn:clone(a),currentField:"label"},
            'responseFromCache': [null,null],
        },{
            'response': {status:'success', order:['label'], result:{matchAll: clone(g),matchCurField:clone(h)}},
            'query': {fieldsToSearchOn:clone(a),currentField:"label"},
            'responseFromCache': [null,null],
        },{
            'response': {status:'error',message:'failed!'},
            'query': null,
            'responseFromCache': null,
        }];

        var expected_results_raw = [{
            'result': [queryCaches.byFieldsToSearchOn[0].response, queryCaches.bySingleField[1].response],
            'order': ['label','id'],
            'caches': clone(caches),
            'test_id': 0
        },{
            'result': [clone(b), queryCaches.bySingleField[1].response],
            'order': ['label'],
            'test_id': 1,
            'caches': {byFieldsToSearchOn:[{query:clone(a),response:clone(b),metadata:clone(f)}],bySingleField:[],size:2}
        },{
            'result': [queryCaches.byFieldsToSearchOn[0].response, clone(b)],
            'order': ['label'],
            'test_id': 2,
            'caches': {byFieldsToSearchOn:[],bySingleField:[{query:'label',response:b,metadata:clone(f)}],size:2}
        },{
            'result': [c , d],
            'order': ['label'],
            'test_id': 3,
            'caches': {byFieldsToSearchOn:[{query:clone(a),response:clone(c),metadata:clone(f)}],bySingleField:[{query:'label',response: clone(d),metadata:clone(f)}],size:2}
        },{
            'result': [clone(c) , clone(e)],
            'order': ['label'],
            'test_id': 4,
            'caches': {byFieldsToSearchOn:[{query:clone(a),response:clone(c),metadata:clone(f)}],bySingleField:[{query:'label',response: clone(e),metadata:clone(f)}],size:2}
        },{
            'result': [[{id:10,label:'L10'},{id:20,label:'L20'}] , [{id:3,label:'L3'},{id:1,label:'L'},{id:2,label:'L2'}]],
            'order': ['label'],
            'test_id': 5,
            'caches': {byFieldsToSearchOn:[{query:clone(a),response:clone(g),metadata:clone(f)}],bySingleField:[{query:'label',response: clone(h),metadata:clone(f)}],size:2}
        },{
            'result': null,
            'order': null,
            'caches': clone(caches),
            'test_id': 6
        },];

        var wrapper = function(d,ind){
            caches = clone(orig_caches);
            return on_search_success(
                d.response,
                d.query,
                d.responseFromCache,
                caches,
                control1,
                control2,
                {expected:expected_results_raw[ind]})
        }

        assert.expect(3*6+1);
        var foo = format_data(wrapper,data_raw)

    });


QUnit.test("Control livesearch (THE NAME OF THIS TEST IS NOT SO GOOD)", function(assert) {

    var afterStep1 = function(urls_of_this_step) {
        //assert.equal(ls.foo_topics_0, JSON.parse(livesearchConf[0]))
    }

    /*var controlStep1 = function(url, urls_of_this_step, response, status, ajaxObject) {

    }*/

    var done = assert.async(1),
        current_step = {
            val: 1
        },
        cnt_validated_urls_for_current_step = {
            val: 0
        },
        steps = [{
            'urls': [
                "/coreforms/getformpart/manytomany/?formId=foo_topics&parentFormId=foo&fieldOfParentForm=topics&formName=topic&contentId=foo_topics_pool&initVal=null&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                "/coreforms/getformpart/polymorphicForeignKey/?nbBoxes=3&boxList%5B0%5D%5Bid%5D=habit&boxList%5B0%5D%5Blabel%5D=Une+habitude+de+vie&boxList%5B1%5D%5Bid%5D=useAKindOfEntity&boxList%5B1%5D%5Blabel%5D=Utiliser...&boxList%5B2%5D%5Bid%5D=otherBehaviour&boxList%5B2%5D%5Blabel%5D=Autre%3A&formId=foo_to_behaviour&parentFormId=foo&fieldOfParentForm=to_behaviour&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                "/coreforms/getformpart/foreignKey/?formId=foo_to_behaviour_useAKindOfEntity_entity_with_properties&formName=entityThatHaveProperties&parentFormId=foo_to_behaviour_useAKindOfEntity&fieldOfParentForm=entity_with_properties&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                "/coreforms/getformpart/polymorphicForeignKey/?nbBoxes=3&boxList%5B0%5D%5Bid%5D=product&boxList%5B0%5D%5Blabel%5D=Un+produit&boxList%5B1%5D%5Bid%5D=company&boxList%5B1%5D%5Blabel%5D=Une+marque&boxList%5B2%5D%5Bid%5D=association&boxList%5B2%5D%5Blabel%5D=Une+association&formId=foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity&parentFormId=foo_to_behaviour_useAKindOfEntity_entity_with_properties&fieldOfParentForm=target_entity&callbackQunitFunction=control_ajax_query&qunitTesting=true",
            ],
            'control': null,
            'whenFinished': afterStep1
        },];

    control_ajax_query = function control_ajax_query(a, b, c) { // redefinition of global function so that control_steps can access local variable such as current_step, etc.
        control_steps(a, b, c, current_step, steps,
            cnt_validated_urls_for_current_step);
    }

    $(document).ready(function() {
        getHtmlFixtureFromServer("/coreforms/dev/alternative?qunitTesting=1&callbackQunitFunction=control_ajax_query");
    });

});


































QUnit.module( "livesearch.js functionnal tests" );

// controler aussi après ajout d'un manytomany, ou apres suppression puis reajout d'une foreign key



/////////////////////////////////////////////////////////////////////////////////////////////////




QUnit.test(
    "Control that objectId=0 works (checks backend errors such as 'if objectId:' )",
    function(assert) {
        //checker que http://localhost:8000/coreforms/dev/alternative?objectId=0 renvoie l'objet non modifiable plutot qu'un formulaire vierge ou une 500
    });




QUnit.test("PATTERN", function(
    assert) {

    var afterStep1 = function(urls_of_this_step) {

    }

    var controlStep1 = function(url, urls_of_this_step, response, status, ajaxObject) {

    }

    var done = assert.async(1),
        current_step = {
            val: 1
        },
        cnt_validated_urls_for_current_step = {
            val: 0
        },
        steps = [{
            'urls': [
                "/coreforms/getformpart/manytomany/?formId=foo_topics&parentFormId=foo&fieldOfParentForm=topics&formName=topic&contentId=foo_topics_pool&initVal=null&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                "/coreforms/getformpart/polymorphicForeignKey/?nbBoxes=3&boxList%5B0%5D%5Bid%5D=habit&boxList%5B0%5D%5Blabel%5D=Une+habitude+de+vie&boxList%5B1%5D%5Bid%5D=useAKindOfEntity&boxList%5B1%5D%5Blabel%5D=Utiliser...&boxList%5B2%5D%5Bid%5D=otherBehaviour&boxList%5B2%5D%5Blabel%5D=Autre%3A&formId=foo_to_behaviour&parentFormId=foo&fieldOfParentForm=to_behaviour&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                "/coreforms/getformpart/foreignKey/?formId=foo_to_behaviour_useAKindOfEntity_entity_with_properties&formName=entityThatHaveProperties&parentFormId=foo_to_behaviour_useAKindOfEntity&fieldOfParentForm=entity_with_properties&callbackQunitFunction=control_ajax_query&qunitTesting=true",
                "/coreforms/getformpart/polymorphicForeignKey/?nbBoxes=3&boxList%5B0%5D%5Bid%5D=product&boxList%5B0%5D%5Blabel%5D=Un+produit&boxList%5B1%5D%5Bid%5D=company&boxList%5B1%5D%5Blabel%5D=Une+marque&boxList%5B2%5D%5Bid%5D=association&boxList%5B2%5D%5Blabel%5D=Une+association&formId=foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity&parentFormId=foo_to_behaviour_useAKindOfEntity_entity_with_properties&fieldOfParentForm=target_entity&callbackQunitFunction=control_ajax_query&qunitTesting=true",
            ],
            'control': controlStep1,
            'whenFinished': afterStep1
        },];

    control_ajax_query = function control_ajax_query(a, b, c) { // redefinition of global function so that control_steps can access local variable such as current_step, etc.
        control_steps(a, b, c, current_step, steps,
            cnt_validated_urls_for_current_step);
    }

    $(document).ready(function() {
        getHtmlFixtureFromServer("/coreforms/dev/alternative?qunitTesting=1&callbackQunitFunction=control_ajax_query");
    });

});

// refaire tous les tests dans le cas d'un manytomany dont les elements ont eux meme des foreign key ou des manytomany
// refaire tous les tests dans le cas où un formulaire a des enfants dont l'un des champs a le même nom que le 1er formulaire