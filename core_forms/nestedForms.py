from core_forms.views import CoreFormConf
from core_forms.forms import *

class HabitConf(CoreFormConf):
    form_conf = {
        'livesearch': {
            'searchOn': ['label_en']
        }
    }
    #form = HabitForm

class UseAKindOfEntityConf(CoreFormConf):
    form_conf = {
        'fields': {
            'entity_with_properties': {
                'type': 'foreignKey',
                'formName': 'entityThatHaveProperties'#todo: change the name of this field?
            }
        }
    }
    #form = UseAKindOfEntityForm

class EntityThatHavePropertiesConf(CoreFormConf):
    form_conf = {
        'fields':{
            'target_entity':{
                'type': 'polymorphicForeignKey',
                'classes': [
                    ['product','Un produit'],
                    ['company','Une marque'],
                    #['company', 'Une Banque'],
                    #['company', 'Un magasin'],
                    #['company', 'Un organisme'],
                    ['association','Une association']
                ]
            },
        }
    }

class AlternativeConf(CoreFormConf):
    form_conf = \
        {
            'fields': {
                'to_behaviour': {
                    'type': 'polymorphicForeignKey',
                    'classes': [
                        ['habit', 'Une habitude de vie'],
                        ['useAKindOfEntity', 'Utiliser...'],
                        ['otherBehaviour', 'Autre:']
                    ]
                },
                'topics': {
                    'type': 'manyToMany',
                    'formName' : 'topic'
                }
            }
        }
    #form = AlternativeForm

class ProductConf(CoreFormConf):
    #form_conf = {}
    #form = ProductForm
    pass

class CompanyConf(CoreFormConf):
    pass

class AssociationConf(CoreFormConf):
    pass

class BehaviourConf(CoreFormConf):
    pass

class OtherBehaviourConf(CoreFormConf):
    pass

class TopicConf(CoreFormConf):
    form_conf = {
        'livesearch': {
            'searchOn': ['name','description_en'],
        }
    }


formNames = {
    'alternative':              {'class': AlternativeConf},
    'entityThatHaveProperties': {'class': EntityThatHavePropertiesConf},
    'habit':                    {'class': HabitConf},
    'useAKindOfEntity':         {'class': UseAKindOfEntityConf},
    'product':                  {'class': ProductConf},
    'company':                  {'class': CompanyConf},
    'association':              {'class': AssociationConf},
    'behaviour':                {'class': BehaviourConf},
    'otherBehaviour':           {'class': OtherBehaviourConf},
    'topic':                    {'class': TopicConf},
}

