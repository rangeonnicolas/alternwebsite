from django.test import TestCase
from django.core.urlresolvers import reverse

class ArticleTests(TestCase):

    def setUp(self):
        pass

    def test_nom_du_test(self):
        """Voila voila"""
        data = {
            'url': 'http://www.siteduzero.com',
            'pseudo': u'Un zéro',
        }
        reponse = self.client.post(
            reverse('core_forms.views.process_livesearch',kwargs={'formName': 'topic'}),
            data)
        self.assertEqual(reponse.__dict__, {'z':3})  # Le retour doit


# process:
# save fixture of 1 (or more) model : python3 manange.py dumpdata APPNAME.MODELNAME --database tests --o FILENAME.json
# delete tests.sqlite3
# run : python3 manage.py migrate --database tests
# run : python3 manage.py loaddata lastTestFixture.json --database tests
# run : python3 manage.py loaddata FILENAME.json --database tests
# run : python3 manage.py dumpdata -o lastTestFixture.json
