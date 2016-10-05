'use strict'
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
    formTree: '[{"form_id":"foo","form_name":"alternative","children":{"foo_topics_0":{"form_id":"foo_topics_0","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_to_behaviour_habit":{"form_id":"foo_to_behaviour_habit","form_name":"habit","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_useAKindOfEntity":{"form_id":"foo_to_behaviour_useAKindOfEntity","form_name":"useAKindOfEntity","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties","form_name":"entityThatHaveProperties","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product","form_name":"product","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company","form_name":"company","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association","form_name":"association","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"entity_with_properties","parentFormId":"foo_to_behaviour_useAKindOfEntity"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_otherBehaviour":{"form_id":"foo_to_behaviour_otherBehaviour","form_name":"otherBehaviour","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_topics_1":{"form_id":"foo_topics_1","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_topics_2":{"form_id":"foo_topics_2","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_topics_3":{"form_id":"foo_topics_3","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"}},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"parentFormId":null,"fieldOfParentForm":null}]',
    formTreePtrs: '{"foo":{"form_id":"foo","form_name":"alternative","children":{"foo_topics_0":{"form_id":"foo_topics_0","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_to_behaviour_habit":{"form_id":"foo_to_behaviour_habit","form_name":"habit","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_useAKindOfEntity":{"form_id":"foo_to_behaviour_useAKindOfEntity","form_name":"useAKindOfEntity","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties","form_name":"entityThatHaveProperties","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product","form_name":"product","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company","form_name":"company","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association","form_name":"association","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"entity_with_properties","parentFormId":"foo_to_behaviour_useAKindOfEntity"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_otherBehaviour":{"form_id":"foo_to_behaviour_otherBehaviour","form_name":"otherBehaviour","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_topics_1":{"form_id":"foo_topics_1","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_topics_2":{"form_id":"foo_topics_2","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_topics_3":{"form_id":"foo_topics_3","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"}},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"parentFormId":null,"fieldOfParentForm":null},"foo_topics_0":{"form_id":"foo_topics_0","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_to_behaviour_habit":{"form_id":"foo_to_behaviour_habit","form_name":"habit","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_useAKindOfEntity":{"form_id":"foo_to_behaviour_useAKindOfEntity","form_name":"useAKindOfEntity","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties","form_name":"entityThatHaveProperties","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product","form_name":"product","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company","form_name":"company","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association","form_name":"association","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"entity_with_properties","parentFormId":"foo_to_behaviour_useAKindOfEntity"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_otherBehaviour":{"form_id":"foo_to_behaviour_otherBehaviour","form_name":"otherBehaviour","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties","form_name":"entityThatHaveProperties","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product","form_name":"product","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company","form_name":"company","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association","form_name":"association","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"entity_with_properties","parentFormId":"foo_to_behaviour_useAKindOfEntity"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product","form_name":"product","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company","form_name":"company","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association","form_name":"association","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_topics_1":{"form_id":"foo_topics_1","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_topics_2":{"form_id":"foo_topics_2","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_topics_3":{"form_id":"foo_topics_3","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"}}'
}, {
    useAKindOfEntity: '{"form_id":"foo_to_behaviour_useAKindOfEntity","form_name":"useAKindOfEntity","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties","form_name":"entityThatHaveProperties","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product","form_name":"product","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company","form_name":"company","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association","form_name":"association","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"entity_with_properties","parentFormId":"foo_to_behaviour_useAKindOfEntity"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"}',
    habit: '{"form_id":"foo_to_behaviour_habit","form_name":"habit","children":{},"submissionStatus":"uneditable_inbase_object","is_visible":true,"validatedValue":65,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"}',
    otherBehaviour: '{"form_id":"foo_to_behaviour_otherBehaviour","form_name":"otherBehaviour","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"}'
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
                })
            },{
                query: {name:["good","morning"],description_en:["hello","world","and",'others']},
                response: JSON.stringify({
                    totalMatch: [{id:39, label:"Ciao tutti!"} , {id:290, label: "-"}],
                    singleMatch: []
                })
            },{
                query: {name:["good","morning"],description_en:[]},
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
                query: {name:["lk","llml"],description_en:["pp"]},
                response: JSON.stringify({
                    totalMatch: [],
                    singleMatch: []
                })
            },{
                query: {name:[],description_en:["hhhhhhhhhhhhh"]},
                response: JSON.stringify({
                    totalMatch: [],
                    singleMatch: []
                })
            }
        ],
    bySingleField:[
            {
                query: {name:["1"]},
                response: JSON.stringify({
                    totalMatch: [{id:34, label:"Bonjour à tous!"} , {id:0, label: "Ciao!"}],
                    singleMatch: [{id:10, label:"Poumpoumpow"}]
                })
            },{
                query: {name:["lk","llml"]},
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
                query: {a:["lk","ljlk","2"]},
                response: JSON.stringify({
                    totalMatch: [],
                    singleMatch: []
                })
            }
    ]
}
;




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
    for (var e in errors) {
        assert.equal(constructErrorList(errors[e].field, errors[e].errors),
            errors[e].expected);
    }
});

QUnit.test("needsToBeSubmited", function(assert) {
    var expected = [false, true, false, false];
    var clone = get_clone();
    for (var n in clone(nodes)) {
        assert.equal(needsToBeSubmited(nodes[n]), expected[n]);
    }
});


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
            cnt_validated_urls_for_current_step);
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
            cnt_validated_urls_for_current_step);
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
/////////////////////////////////////////////// LIVESEARCH //////////////////////////////////////////////////
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
                'title': ['les','heros','du','75'],
                'text_content': ['il','etait','1','fois','3petits','cochons','pieds'],
                'type': [],
                'position': ['2']
            },
            expectedLengths = {
                'title': [3,5,2,2],
                'text_content': [2,5,1,4,7,7,5],
                'type': [],
                'position': [1]
            };

        assert.deepEqual(getRequestDictFromFieldGroup(fieldsInfo,filterWords)[0],expectedQuery);
        assert.deepEqual(getRequestDictFromFieldGroup(fieldsInfo,filterWords)[1],expectedLengths);

    });


QUnit.test("Test arraySum",
    function(assert) {
        assert.deepEqual(arraySum([1,2,2]),5);
        assert.deepEqual(arraySum([]),0);
        assert.deepEqual(arraySum([0,0,0]),0);
        assert.deepEqual(arraySum([0,0,0,-5]),-5);
        assert.deepEqual(arraySum([0,70,0,-5,0,0]),65);
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
                query: {a:1},
                response: JSON.stringify({
                    totalMatch: [{id:34, label:"Bonjour à tous!"} , {id:0, label: "Ciao!"}],
                    singleMatch: [{id:10, label:"Poumpoumpow"}]
                })
            },{
                query: {a:"hello",b:"world",c:"!"},
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
                query: {a:"l"},
                response: JSON.stringify({
                    totalMatch: [],
                    singleMatch: []
                })
            }
        ];

        var toFindInCache = [
            {a:1},
            {a:"hello",b:"world",c:"!"},
            {},
            {a:"l"},
            {a:34},
            {b:"world",c:"!"},
            {a:"hello",b:"world"},
            {c:"!",b:"world",a:"hello"},
            null
        ];

        var expectedResponses = [
            cache[0].response,
            cache[1].response,
            cache[2].response,
            cache[3].response,
            null,null,null,
            cache[1].response,
            null
        ]

        for(var i in toFindInCache){
            assert.equal(findInCache(toFindInCache[i], cache), expectedResponses[i]);
            assert.equal(findInCache(toFindInCache[i], []   ), null);
        }
    });





























QUnit.module( "livesearch.js unit tests (with server queries)" );

QUnit.test("Test construct_and_send_query",
    function(assert) {

        var done = assert.async(1)

        var run_tests = function() { // redefinition of global function so that control_steps can access local variable such as current_step, etc.

            var results = [
                construct_and_send_query({},true,false,null,{a:"hello",b:"world",c:"!"},{a:"hello"},"ff","foo",null,null,true),
                construct_and_send_query({},true,false,null,{a:"hello"}                ,{a:"hello"},"ff","foo",null,null,true),
                construct_and_send_query({},true,false,null,{}                         ,{}         ,"ff","foo",null,null,true),
                construct_and_send_query({},true,false,null,null                       ,null       ,"ff","foo",null,null,true),
                construct_and_send_query({},true,true ,null,{a:"hello",b:"world",c:"!"},{a:"hello"},"ff","foo",null,null,true),
                construct_and_send_query({},false,true,null,{a:"hello",b:"world",c:"!"},{a:"hello"},"ff","foo",null,null,true),
                construct_and_send_query({},false,false,null,{a:"hello",b:"world",c:"!"},{a:"hello"},"ff","foo",null,null,true),
            ];

            var csrfmiddlewaretoken = selectFieldOfForm('foo','csrfmiddlewaretoken').val(),
                _page_loaded_at = selectFieldOfForm('foo','_page_loaded_at').val();

            var expected = [
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

            for(var i in expected){
                if(typeof(expected[i][0]) !== 'undefined'){
                    expected[i][0]['csrfmiddlewaretoken'] = csrfmiddlewaretoken;
                    expected[i][0]['_page_loaded_at'] = _page_loaded_at;
                }
            }

            for(var i in results)
                assert.deepEqual(results[i],expected[i]);

            done();
        }

        control_ajax_query = function control_ajax_query(){};

        $(document).ready(function() {
            getHtmlFixtureFromServer("/coreforms/dev/alternative?qunitTesting=1&callbackQunitFunction=control_ajax_query",run_tests);
        });


    });




QUnit.test("Test search_query", function(assert) {

    var afterStep1 = function(urls_of_this_step) {

        var fieldGroup = getFieldGroup('foo_topics_0', 'name', ['name','description_en']);
        var results = [];

        var search_query_wrapper = function(){
            return search_query({},queryCaches,filterLengths,filterLengths2,fieldGroup,'foo_topics_0',
                'name',null,null,true)
        }

        $('#foo_topics_0 #id_name').val('t');
        $('#foo_topics_0 #id_description_en').val('t');
        results.push(search_query_wrapper());

        $('#foo_topics_0 #id_name').val('t');
        $('#foo_topics_0 #id_description_en').val('that\'s the description');
        results.push(search_query_wrapper());

        $('#foo_topics_0 #id_name').val('this is the name');
        $('#foo_topics_0 #id_description_en').val('that\'s the description');
        results.push(search_query_wrapper());

        $('#foo_topics_0 #id_name').val('g');
        $('#foo_topics_0 #id_description_en').val('Hhhhhhhhhhhhh');
        results.push(search_query_wrapper());

        $('#foo_topics_0 #id_name').val('good Morning!!');
        $('#foo_topics_0 #id_description_en').val('Hello world (and others)');
        results.push(search_query_wrapper());

        $('#foo_topics_0 #id_name').val('   1   ');
        $('#foo_topics_0 #id_description_en').val('Hello world (and others)');
        results.push(search_query_wrapper());

        $('#foo_topics_0 #id_name').val('  lk  llml ');
        $('#foo_topics_0 #id_description_en').val('pp!');
        results.push(search_query_wrapper());


        var c = [
            queryCaches.byFieldsToSearchOn[4].response,
            queryCaches.byFieldsToSearchOn[1].response,
            queryCaches.bySingleField[0].response,
            queryCaches.byFieldsToSearchOn[4].response,
            queryCaches.bySingleField[1].response,
        ];

        var expected = [
            [[null,null],false,false,{name:[]}],
            [[null,null],true ,false,{name:[]}],
            [[null,null],true ,true ,{name:['this','is','the','name']}],
            [[c[0],null],false,false,{name:[]}],
            [[c[1],null],false,true ,{name:['good','morning']}],
            [[null,c[2]],true ,false,{name:['1']}],
            [[c[3],c[4]],false,false,{name:['lk','llml']}]
        ];

        for(var i in results)
            assert.deepEqual(results[i],expected[i]);

        done();

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






QUnit.test("Control livesearch (THE NAME OF THIS TEST IS NOT SO GOOD)", function(assert) {

    var afterStep1 = function(urls_of_this_step) {
        assert.equal(ls.foo_topics_0, JSON.parse(livesearchConf[0]))
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