from django.test import TestCase
from django.core.urlresolvers import reverse

class ViewTests(TestCase):

    def test_each_topic(self):

        reponse = self.client.get(reverse('core.views.get_topic_by_id',kwargs={'topic_id':3}))

        self.assertEqual(reponse.status_code, 200)