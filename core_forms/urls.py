from django.conf.urls import url
from core_forms.views import *
from django.views.generic import TemplateView
from django.views.static import serve
from altws.settings import STATIC_ROOT

urlpatterns = [
    url(r'^postform/(?P<formName>\w*)$', post_form, name="postform"),
    url(r'^getform/(?P<formName>\w*)$', get_form, name="getform"),

    #url(r'^source/?$',model_post_form, {'formName': 'source_test', 'formId': 'foo'},name='modelpostform'),
    #url(r'^js/modelforms.js$',formJs,name="formJS"),
    #url(r'^js/livesearch.js$',formJs),

    url(r'^livesearch/(?P<formName>\w*)$',process_livesearch,name='processlivesearch'),
    #url(r'^livesearch/resultdiv/(?P<formId>\w*)$',process_livesearch_resultdiv,name='processlivesearchresultdiv'),

    url(r'^getformpart/polymorphicForeignKey/$'                 ,polymorphicForeignKeyWrapper),
    url(r'^getformpart/foreignKey/$'                            ,foreignKeyWrapper),
    url(r'^getformpart/manytomany/$'                            ,manyToManyWrapper),

    url(r'^dev/alternative/?$', get_form, {'formName': 'alternative',              'formId': 'foo', 'isRootForm': True, 'firstRootFormCall': True}),
    url(r'^dev/ethp/?$',        get_form, {'formName': 'entityThatHaveProperties', 'formId': 'foo', 'isRootForm': True, 'firstRootFormCall': True}),

    url(r'^tests/$', TemplateView.as_view(template_name='core_forms/tests/tests.html')),
    url(r'^tests/savefixture$', save_fixture),
    url(r'^tests/loadfixture$', load_fixture),
]