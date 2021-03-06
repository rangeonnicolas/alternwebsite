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
    },
	'tests': {
		'ENGINE': 'django.db.backends.sqlite3',
		'NAME': os.path.join(BASE_DIR, 'tests.sqlite3'),
	}
}

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# activates analytics when the website is in production
ANALYTICS = True
