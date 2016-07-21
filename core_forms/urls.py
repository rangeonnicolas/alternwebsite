from django.conf.urls import url
from core_forms.views import *

urlpatterns = [
    url(r'^postform/(?P<formName>\w*)$', model_post_form),

    #url(r'^source/?$',model_post_form, {'formName': 'source_test', 'formId': 'foo'}),
    #url(r'^js/modelforms.js$',formJs),
    #url(r'^js/livesearch.js$',formJs),

    url(r'^livesearch/process/(?P<formName>\w*)$',process_livesearch),
    url(r'^livesearch/resultdiv/(?P<id>\w*)$',process_livesearch_resultdiv),

    url(r'^getform/polymorphicForeignKey/$'                 ,polymorphicForeignKeyWrapper),
    #url(r'^getform/polymorphicForeignKey/updateformtree$'   ,polymorphicForeignKeyWrapper), #not implemented
    url(r'^getform/foreignKey/$'                            ,foreignKeyWrapper),
    #url(r'^getform/foreignKey/updateformtree$'              ,foreignKeyWrapper),#not implemented
    url(r'^getform/manytomany/$'                            ,manyToManyWrapper),
    #url(r'^getform/manytomany/updateformtree$'              ,manyToManyWrapper),#not implemented

    url(r'^dev/alternative/?$', model_post_form, {'formName': 'alternative', 'formId': 'foo', 'isRootForm': True}),
    url(r'^dev/ethp/?$', model_post_form, {'formName': 'entityThatHaveProperties', 'formId': 'foo', 'isRootForm': True}),
]