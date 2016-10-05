"""
Django settings for altws project.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.7/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.7/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'u^8jbesbxnk52&m&(so9bnjzi)e^g2b!(lz-#h%t=c9w1ek@2m'
print('Hm hm... SECURITY WARNING: keep the secret key used in production secret!')
# todo: hide this key from the github repo

ALLOWED_HOSTS = ['openalternativa.com','www.openalternativa.com']

# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
	'django.contrib.postgres',
	'api2',
	'maquette',
	'core_forms',
	'core_model',
    'rest_framework',
	'core',
	'home'
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
	'django.middleware.locale.LocaleMiddleware',
	'django.middleware.common.BrokenLinkEmailsMiddleware'
)

ROOT_URLCONF = 'altws.urls'

WSGI_APPLICATION = 'altws.wsgi.application'

DATABASE_ROUTERS = ['core_model.routers.routers.TestsRouter']

# Database
# https://docs.djangoproject.com/en/1.7/ref/settings/#databases

# moved to settingsDEV.py and settingsPROD.py

# Internationalization
# https://docs.djangoproject.com/en/1.7/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/

STATIC_URL = '/static/'

STATIC_ROOT = 'static/'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'APP_DIRS': True,
		'OPTIONS': {
			'context_processors': [
				"django.contrib.auth.context_processors.auth",
				"django.template.context_processors.debug",
				"django.template.context_processors.i18n",
				"django.template.context_processors.media",
				"django.template.context_processors.static",
				"django.template.context_processors.tz",
				"django.contrib.messages.context_processors.messages",
				"core.context_processors.analytics",],
			'debug': True
		},
		'DIRS': (os.path.join(BASE_DIR, 'templates'),)
    },
]

# Administrators
ADMINS = (
    ('admin', 'nicapps23@gmail.com'),
)

# Email notification when 404 errors occur
MANAGERS = ADMINS
SEND_BROKEN_LINK_EMAILS = True
SERVER_EMAIL = 'no-reply@openalternativa.com'

# Makes the difference between prod and dev environments
if ~( 'USE_DEFAULT_SETTINGS' in locals() or 'USE_DEFAULT_SETTINGS' in globals()) :
        USE_DEFAULT_SETTINGS = True

if USE_DEFAULT_SETTINGS:
	DATABASES = {
	    'default': {
			'ENGINE': 'django.db.backends.postgresql_psycopg2',
			'NAME': 'django',
			'USER': 'django',
			'PASSWORD': 'mypassword2', #todo : hide from the git repo
			'HOST': 'localhost',
			'PORT': '',
	    },
		'tests': {
			'ENGINE': 'django.db.backends.sqlite3',
			'NAME': os.path.join(BASE_DIR, 'tests.sqlite3'),
		}

	}

	# SECURITY WARNING: don't run with debug turned on in production!
	DEBUG = True

	# activates analytics when the website is in production
	ANALYTICS = False