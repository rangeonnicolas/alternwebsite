from altws.settings import *

DATABASES = {
    'default': {
	'ENGINE': 'django.db.backends.postgresql_psycopg2',
	'NAME': 'django',
	'USER': 'django',
	'PASSWORD': 'mypassword2',
	'HOST': 'localhost',
	'PORT': '5432',
    }
}
