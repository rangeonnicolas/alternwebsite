from altws.settings import *

#import os
#if 'SESSION_MANAGER' in os.environ and 'ThinkPad' in os.environ['SESSION_MANAGER']:

DATABASES = {
    'default': {
	'ENGINE': 'django.db.backends.sqlite3',
	'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    },
}


