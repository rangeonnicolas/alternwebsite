USE_DEFAULT_SETTINGS = False
from altws.settings import *

DATABASES = {
    'default': {
	'ENGINE': 'django.db.backends.postgresql_psycopg2',
	'NAME': 'django',
	'USER': 'django',
	'PASSWORD': 'mypassword2',
	'HOST': 'localhost',
	'PORT': '',
    }
}

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# activates analytics when the website is in production
ANALYTICS = False
