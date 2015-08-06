from django.shortcuts import render
from altws.forms import ContactForm

def home(request):

    if request.method == 'POST':  # S'il s'agit d'une requête POST
        form = ContactForm(request.POST)  # Nous reprenons les données

        if form.is_valid(): # Nous vérifions que les données envoyées sont valides

            # Ici nous pouvons traiter les données du formulaire
            form.save()

            # Nous pourrions ici envoyer l'e-mail grâce aux données que nous venons de récupérer

            ok = True

    else: # Si ce n'est pas du POST, c'est probablement une requête GET
        form = ContactForm()  # Nous créons un formulaire vide


    return render(request, 'home.html', locals())

def maquette(request):

    return render(request,"maquette.html", locals())