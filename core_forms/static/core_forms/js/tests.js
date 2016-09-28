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
}];

formTrees = [{
    formTree: '[{"form_id":"foo","form_name":"alternative","children":{"foo_topics_0":{"form_id":"foo_topics_0","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_to_behaviour_habit":{"form_id":"foo_to_behaviour_habit","form_name":"habit","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_useAKindOfEntity":{"form_id":"foo_to_behaviour_useAKindOfEntity","form_name":"useAKindOfEntity","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties","form_name":"entityThatHaveProperties","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product","form_name":"product","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company","form_name":"company","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association","form_name":"association","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"entity_with_properties","parentFormId":"foo_to_behaviour_useAKindOfEntity"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_otherBehaviour":{"form_id":"foo_to_behaviour_otherBehaviour","form_name":"otherBehaviour","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_topics_1":{"form_id":"foo_topics_1","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_topics_2":{"form_id":"foo_topics_2","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_topics_3":{"form_id":"foo_topics_3","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"}},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"parentFormId":null,"fieldOfParentForm":null}]',
    formTreePtrs: '{"foo":{"form_id":"foo","form_name":"alternative","children":{"foo_topics_0":{"form_id":"foo_topics_0","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_to_behaviour_habit":{"form_id":"foo_to_behaviour_habit","form_name":"habit","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_useAKindOfEntity":{"form_id":"foo_to_behaviour_useAKindOfEntity","form_name":"useAKindOfEntity","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties","form_name":"entityThatHaveProperties","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product","form_name":"product","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company","form_name":"company","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association","form_name":"association","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"entity_with_properties","parentFormId":"foo_to_behaviour_useAKindOfEntity"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_otherBehaviour":{"form_id":"foo_to_behaviour_otherBehaviour","form_name":"otherBehaviour","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_topics_1":{"form_id":"foo_topics_1","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_topics_2":{"form_id":"foo_topics_2","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_topics_3":{"form_id":"foo_topics_3","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"}},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"parentFormId":null,"fieldOfParentForm":null},"foo_topics_0":{"form_id":"foo_topics_0","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_to_behaviour_habit":{"form_id":"foo_to_behaviour_habit","form_name":"habit","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_useAKindOfEntity":{"form_id":"foo_to_behaviour_useAKindOfEntity","form_name":"useAKindOfEntity","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties","form_name":"entityThatHaveProperties","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product","form_name":"product","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company","form_name":"company","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association","form_name":"association","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"entity_with_properties","parentFormId":"foo_to_behaviour_useAKindOfEntity"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_otherBehaviour":{"form_id":"foo_to_behaviour_otherBehaviour","form_name":"otherBehaviour","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties","form_name":"entityThatHaveProperties","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product","form_name":"product","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company","form_name":"company","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association","form_name":"association","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"entity_with_properties","parentFormId":"foo_to_behaviour_useAKindOfEntity"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product","form_name":"product","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company","form_name":"company","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association","form_name":"association","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_topics_1":{"form_id":"foo_topics_1","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_topics_2":{"form_id":"foo_topics_2","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"},"foo_topics_3":{"form_id":"foo_topics_3","form_name":"topic","children":{},"submissionStatus":"being_edited","is_visible":true,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"topics","parentFormId":"foo"}}'
}, {
    useAKindOfEntity: '{"form_id":"foo_to_behaviour_useAKindOfEntity","form_name":"useAKindOfEntity","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties","form_name":"entityThatHaveProperties","children":{"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_product","form_name":"product","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_company","form_name":"company","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"},"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association":{"form_id":"foo_to_behaviour_useAKindOfEntity_entity_with_properties_target_entity_association","form_name":"association","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"target_entity","parentFormId":"foo_to_behaviour_useAKindOfEntity_entity_with_properties"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"entity_with_properties","parentFormId":"foo_to_behaviour_useAKindOfEntity"}},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"}',
    habit: '{"form_id":"foo_to_behaviour_habit","form_name":"habit","children":{},"submissionStatus":"uneditable_inbase_object","is_visible":true,"validatedValue":65,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"}',
    otherBehaviour: '{"form_id":"foo_to_behaviour_otherBehaviour","form_name":"otherBehaviour","children":{},"submissionStatus":"being_edited","is_visible":false,"validatedValue":null,"objectBeingModified":null,"fieldOfParentForm":"to_behaviour","parentFormId":"foo"}'
}]

livesearchConf = [
    '{"urlLiveSearch":"/coreforms/livesearch/topic","formName":"topic","slide_speed":"fast"}',
]

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

QUnit.test("Temp. ", function(assert) {

    afterStep1 = function(urls_of_this_step) {
        $('[name=foo_to_behaviour_radiogroup][value=habit]').trigger(
            "click");
        selectFieldOfForm('foo_to_behaviour_habit', 'label_en').val(
            'test from qunit');
        $('#submit').trigger('click');
    }

    afterStep2 = function(urls_of_this_step) {
        $('#submit').trigger('click');
    }

    controlStep2 = function(url, urls_of_this_step, response, status,
        ajaxObject) {
        if (urls_of_this_step.indexOf(url) >= 0) {
            assert.ok(true);
        } else
            assert.ok(false);
        done();
    }

    controlStep3 = function(url, urls_of_this_step, response, status,
        ajaxObject) {
        if (urls_of_this_step.indexOf(url) >= 0) {
            assert.ok(true);
        } else
            assert.ok(false);

        set_deparam();
        params = $.deparam(ajaxObject.data);
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

    afterStep1 = function(url, urls_of_this_step, response, status,
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

    afterStep1 = function(urls_of_this_step) {

        $(
            '#foo_to_behaviour_radioboxes [name=foo_to_behaviour_radiogroup][value=habit]'
        ).trigger('click');
        $('#foo_to_behaviour_habit #id_label_en').val(new Date());
        $('#submit').trigger('click');

    }

    controlStep2 = function(url, urls_of_this_step, response, status,ajaxObject){
            set_deparam();
            var params = $.deparam(ajaxObject.data);

            if (url == "/coreforms/postform/habit")
                created_objects_ids.habit = response.inbase_object;
    }


    afterStep2 = function(urls_of_this_step) {
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

        afterStep1 = function(urls_of_this_step) {

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

        controlStep2 = function(url, urls_of_this_step, response, status,ajaxObject){
            set_deparam();
            var params = $.deparam(ajaxObject.data);

            if (url == "/coreforms/postform/habit")
                created_objects_ids.habit = response.inbase_object;

        }

        afterStep2 = function(urls_of_this_step) {

            $(
                '#foo_to_behaviour_radioboxes [name=foo_to_behaviour_radiogroup][value=otherBehaviour]'
            ).trigger('click');
            $('#foo_to_behaviour_otherBehaviour #id_title_en').val(new Date());
            $('#foo_to_behaviour_otherBehaviour #id_description_en').val(new Date());
            $('#submit').trigger('click');
        }

        controlStep3 = function(url, urls_of_this_step, response, status,ajaxObject) {
            set_deparam();
            var params = $.deparam(ajaxObject.data);

            if (url == "/coreforms/postform/otherBehaviour")
                created_objects_ids.otherBehaviour = response.inbase_object;

            if (url == "/coreforms/postform/alternative"){
                assert.equal(params['to_behaviour'],created_objects_ids.otherBehaviour);
                done();
            }
        }

        afterStep3 = function(urls_of_this_step){
            $('#foo_to_behaviour_radioboxes [name=foo_to_behaviour_radiogroup][value=habit]'
            ).trigger('click');
            $('#submit').trigger('click');
        }

        controlStep4 = function(url, urls_of_this_step, response, status,ajaxObject) {
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

    afterStep1 = function(urls_of_this_step) {

        $(
            '#foo_to_behaviour_radioboxes [name=foo_to_behaviour_radiogroup][value=habit]'
        ).trigger('click');
        $('#foo_to_behaviour_habit #id_label_en').val(new Date());
        $('#submit').trigger('click');

    }

    controlStep2 = function(url, urls_of_this_step, response, status,
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

    afterStep2 = function(urls_of_this_step) {
        $('#foo_to_behaviour_habit_container .update_formtree').remove()
        htmlBefore = trimSpaces($('html').html());
        $('#foo_to_behaviour_habit_modify').trigger('click');

    }

    afterStep3 = function(urls_of_this_step) {

        $('#foo_to_behaviour_habit_cancel').trigger('click');

    }

    afterStep4 = function(urls_of_this_step) {

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



QUnit.test("Control livesearch", function(assert) {

    afterStep1 = function(urls_of_this_step) {
        assert.equal(ls.foo_topics_0, JSON.parse(livesearchConf[0]))
        console.log(JSON.stringify(ls.foo_topics_0));
    }

    /*controlStep1 = function(url, urls_of_this_step, response, status, ajaxObject) {

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



// controler aussi après ajout d'un manytomany, ou apres suppression puis reajout d'une foreign key



/////////////////////////////////////////////////////////////////////////////////////////////////




QUnit.test(
    "Control that objectId=0 works (checks backend errors such as 'if objectId:' )",
    function(assert) {
        //checker que http://localhost:8000/coreforms/dev/alternative?objectId=0 renvoie l'objet non modifiable plutot qu'un formulaire vierge ou une 500
    });




QUnit.test("PATTERN", function(
    assert) {

    afterStep1 = function(urls_of_this_step) {

    }

    controlStep1 = function(url, urls_of_this_step, response, status, ajaxObject) {

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