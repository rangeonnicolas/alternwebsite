from django.shortcuts import render
from core_forms.forms import *

# Create your views here.

def author(request):

    if request.method == 'POST':
        form = AuthorForm(request.POST)  # Nous reprenons les données

        if form.is_valid(): # Nous vérifions que les données envoyées sont valides
            1
            # Ici nous pouvons traiter les données du formulaire

            # Nous pourrions ici envoyer l'e-mail grâce aux données que nous venons de récupérer

    else: # Si ce n'est pas du POST, c'est probablement une requête GET
        form = AuthorForm()  # Nous créons un formulaire vide

    return render(request, 'core_forms/author.html', locals())



def source(request):

    if request.method == 'POST':
        form = SourceForm(request.POST)  # Nous reprenons les données

        if form.is_valid(): # Nous vérifions que les données envoyées sont valides
            form.save()
            # Ici nous pouvons traiter les données du formulaire

            # Nous pourrions ici envoyer l'e-mail grâce aux données que nous venons de récupérer

    else: # Si ce n'est pas du POST, c'est probablement une requête GET
        form = SourceForm()  # Nous créons un formulaire vide

    return render(request, 'core_forms/source.html', locals())
