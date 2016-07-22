from django.conf.urls import url
from core_forms.views import *

urlpatterns = [
    url(r'^postform/(?P<formName>\w*)$', model_post_form),

    #url(r'^source/?$',model_post_form, {'formName': 'source_test', 'formId': 'foo'}),
    #url(r'^js/modelforms.js$',formJs),
    #url(r'^js/livesearch.js$',formJs),

    url(r'^livesearch/process/(?P<formName>\w*)$',process_livesearch),
    url(r'^livesearch/resultdiv/(?P<id>\w*)$',process_livesearch_resultdiv),

    url(r'^getformpart/polymorphicForeignKey/$'                 ,polymorphicForeignKeyWrapper),
    url(r'^getformpart/foreignKey/$'                            ,foreignKeyWrapper),
    url(r'^getformpart/manytomany/$'                            ,manyToManyWrapper),

    url(r'^dev/alternative/?$', model_post_form, {'formName': 'alternative', 'formId': 'foo', 'isRootForm': True}),
    url(r'^dev/ethp/?$', model_post_form, {'formName': 'entityThatHaveProperties', 'formId': 'foo', 'isRootForm': True}),
]