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

    topics = Topic.objects.all()

    return render(request, 'home.html', locals())

from api2.models import *
def maquette(request):

    # products = Product.objects.all()

    description = """ La banque à laquelle nous prétons notre argent investit cet agent dans des projets. Quels sont ces
                                projets? Nous ne le savons pas toujours. Parfois, nous finançons sans le savoir des projets extrêmement
                                polluants!"""

    topics = Topic.objects.all()

    consumeaproduct = ConsumeAProduct.objects.all()
    title = "Banque"

    return render(request,"maquette.html", locals())


def maquette2(request):

    # products = Product.objects.all()

    consumeaproduct = ConsumeAProduct.objects.all()
    main_impacts = MainImpact.objects.all()
    title = "Maquette"

    topics = Topic.objects.all()


    return render(request,"maquette2.html", locals())


def topic_id(request, topic_id):

    topic_id = int(topic_id)

    topics = Topic.objects.all()

    try:
        topic = Topic.objects.get(id=topic_id)
    except:
        return render(request,"home.html",locals())#todo: mettre une 404

    consumeaproduct = []
    all_consumeaproduct = ConsumeAProduct.objects.all() #todo: inclure les habit.....
    for c in all_consumeaproduct: #todo: faire plutot avec un queryset
        tpcs = c.topic.all()
        #print([topic_id == tt.id for tt in tpcs])
        if sum([topic_id == tt.id for tt in tpcs]):
            consumeaproduct = consumeaproduct + [c]


    main_impacts = []
    all_main_impacts = MainImpact.objects.all()
    for mi in all_main_impacts: #todo: faire plutot avec un queryset
        tpcs = mi.topics.all()
        if sum([topic_id == tt.id for tt in tpcs]):
            main_impacts = main_impacts + [mi]

    title = topic.name
    description = topic.description_en

    #
    # import random;
    # col = [
    #     [64,96,-1],
    #     [96,64,-1],
    #     [64,-1,96],
    #     [96,-1,64],
    #     [-1,64,96],
    #     [-1,96,64]
    # ][random.randrange(0,6)]
    # col[col.index(-1)] = random.randrange(64,97)
    # colStr = " rgba(" +str(col[0])+ "," +str(col[1])+ "," +str(col[2])+ ",1)"
    # impactCategs = ImpactCateg.objects.all()
    # colDict = {ic.name:colStr for ic in impactCategs}
    # print(colDict)

    return render(request,"maquette.html",locals())
























