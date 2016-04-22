from django.conf.urls import url
from core_forms.views import *

urlpatterns = [
    url(r'^modelpostform/(?P<formName>\w*)$', model_post_form),

    url(r'^alternative/?$',model_post_form, {'formName': 'alternative_1', 'formId': 'foo'}),
    url(r'^source/?$',model_post_form, {'formName': 'source_test', 'formId': 'foo'}),

    url(r'^formjs/$',formJs),
    url(r'^process_livesearch/(?P<formName>\w*)$',process_livesearch),
    url(r'^process_livesearch_resultdiv/(?P<id>\w*)$',process_livesearch_resultdiv),
    url(r'^polymorphicForeignKey/$',polymorphicForeignKeyWrapper),
    url(r'^foreignKey/$',foreignKeyWrapper),
]

