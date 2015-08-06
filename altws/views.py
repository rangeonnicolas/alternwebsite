from django.shortcuts import render
from altws.forms import ContactForm

import smtplib
import datetime

def home(request):

    if request.method == 'POST':  # S'il s'agit d'une requête POST
        form = ContactForm(request.POST)  # Nous reprenons les données

        if form.is_valid(): # Nous vérifions que les données envoyées sont valides

            # Ici nous pouvons traiter les données du formulaire
            form.save()

            # Nous pourrions ici envoyer l'e-mail grâce aux données que nous venons de récupérer

            ok = True






            #sender = 'ubuntu@ec2-54-187-124-250.us-west-2.compute.amazonaws.com'
            sender = 'ubuntu@openalternativa.com'
            receivers = ['nicapps23@gmail.com']


            message = "[00001] Nouveau mail: " + form.cleaned_data['email'] + " " + str(datetime.datetime.now())

            try:
               smtpObj = smtplib.SMTP('localhost')
               smtpObj.sendmail(sender, receivers, message)
               print("Successfully sent email")
            except smtplib.SMTPException:
               print("Error: unable to send email")








    else: # Si ce n'est pas du POST, c'est probablement une requête GET
        form = ContactForm()  # Nous créons un formulaire vide


    return render(request, 'home.html', locals())

def maquette(request):

    return render(request,"maquette.html", locals())
