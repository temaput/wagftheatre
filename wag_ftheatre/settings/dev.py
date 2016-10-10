from .base import *


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

for template_engine in TEMPLATES:
    template_engine['OPTIONS']['debug'] = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '-_eke9u#g!d712zgfnb1)v9a42yno6)!y6pfm6%1j-!95%#7u('


EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
        'django.request': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
        'django.server': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
        'django.db.backends': {
            'level': 'ERROR',
            'handlers': ['console'],
        },
        'reservations.tests': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
        'reservations.schema': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    },
}

DATABASES['default']['TEST'] = {
    'NAME': 'mytestdb'
}

try:
    from .local import *
except ImportError:
    pass
