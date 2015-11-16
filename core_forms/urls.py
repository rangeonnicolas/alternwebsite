from django.conf.urls import patterns, url

urlpatterns = patterns('core_forms.views',
    url(r'^modelpostform/(?P<modelName>\w*)$', 'model_post_form'),
    url(r'^alternative/?$', 'alternative'),
)

