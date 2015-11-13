from django.conf.urls import patterns, url

urlpatterns = patterns('core_forms.views',
    url(r'^author/?$', 'author'),
    url(r'^source/?$', 'source'),
)

