USE_DEFAULT_SETTINGS = False
from altws.settings import *

#import os
#if 'SESSION_MANAGER' in os.environ and 'ThinkPad' in os.environ['SESSION_MANAGER']:

#DATABASES = {
#    'default': {
#	'ENGINE': 'django.db.backends.sqlite3',
#	'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#    },
#}

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
