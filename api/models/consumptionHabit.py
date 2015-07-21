from django.db import models
from api.models.products import Product

class ConsumptionHabit(Alternative):
    type = ["consume_a_product", "being_client_of", "other_habit"]
    consume_a_product = models.ForeignKey(Product)
    being_client_of = models.ForeignKey(Institution)
    other_habit = models.TextField()