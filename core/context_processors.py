from django.conf import settings

def analytics(request):

    analytics = settings.ANALYTICS

    vars = {
        "analytics": analytics
    }

    return vars