from django.shortcuts import render
from home.forms import ContactForm
from api2.models import Topic
from django.conf import settings
import datetime
import smtplib

def home(request):
    '''Homepage'''

    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():

            form.save()


            # send a notification email to the administrator
            sender = 'ubuntu@openalternativa.com'
            receivers = [mail for (_,mail) in settings.ADMINS]

            message = "[00001] New mail: " + form.cleaned_data['email'] + " " + str(datetime.datetime.now())

            try:
               smtpObj = smtplib.SMTP('localhost')
               smtpObj.sendmail(sender, receivers, message)
               print("Successfully sent email")
            except (smtplib.SMTPException, smtplib.ConnectionRefusedError):
               print("Error: unable to send email")

    else:
        form = ContactForm()

    # Topic list to display in the navgation bar
    topics = Topic.objects.all()

    return render(request, 'home/home.html', locals())
