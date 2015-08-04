from django.shortcuts import render

def home(request):

    return render(request, 'home.html', locals())

def maquette(request):

    return render(request,"maquette.html", locals())