from django.shortcuts import render, get_object_or_404
from django.template.loader import render_to_string
from django.http import Http404, HttpResponse
from api2.models import Topic, AlternativeToMainImpact, ConsumeAProduct, ConsumeAtACompany, Bank

def search_product(request, topic_id):
    '''Ajax Query when a product is searched'''

    topic_id = int(topic_id)

    consumeaproduct = ConsumeAProduct.objects.filter(topic=topic_id)
    consumeatacompany = ConsumeAtACompany.objects.filter(topic=topic_id)

    #todo: review model because it's awful
    consumeatabank = []
    if Topic.objects.get(name="Bank").id == topic_id:
        consumeatabank = Bank.objects.all()

    return render(request, "core/search_product.html", locals())

def get_topic_by_id(request, topic_id):
    '''Returns the page related to a topic'''

    topic_id = int(topic_id)
    topic = get_object_or_404(Topic, id=topic_id)

    return get_topic(request, topic, topic_id)


def get_topic_by_name_and_id(request, topic_id, slug):
    '''Returns the page related to a topic'''

    topic_id = int(topic_id)
    topic = get_object_or_404(Topic, id=topic_id)

    if topic.slug != slug:
        raise Http404

    return get_topic(request, topic, topic_id)

def get_topic(request, topic, topic_id):

    # topic list to display in the navigation bar
    topics = Topic.objects.order_by('position_in_nav_bar')

    title = topic.name
    description = topic.description_en

    behaviours = {}
    for alt in AlternativeToMainImpact.objects.all():
        if alt.to_rel.habit.topic.all()[0].id == topic_id: #todo: moche le [0] !!
            behaviour_id = alt.to_rel_id
            for impact_lev2 in alt.impact_on.all():
                impact_l2_name = impact_lev2.label
                for impact_lev1 in impact_lev2.parents.all():
                    impact_l1_name = impact_lev1.label
                    if behaviour_id not in behaviours:
                        behaviours[behaviour_id] = {'behaviour': alt.to_rel, 'impacts': {impact_l1_name: [impact_l2_name]}}
                    else:
                        if impact_l1_name not in behaviours[behaviour_id]['impacts']:
                            behaviours[behaviour_id]['impacts'][impact_l1_name] = [impact_l2_name]
                        else:
                            behaviours[behaviour_id]['impacts'][impact_l1_name] += [impact_l2_name]


    return render(request,"core/maquette.html",locals())

def get_logo(request):
    """Temporary.
    returns the website SVG logo with customised color"""

    color2 = '1a7e3a'
    color1 = '254679'

    image = render_to_string('core/logo.svg',locals(), request=request)


    return HttpResponse(image, content_type="image/svg+xml")