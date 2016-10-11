class TestsRouter(object):
    """
    A router to control all database operations on models used for tests
    """
    def common_test(self,app_label,model_name):
        if model_name is not None:
            if app_label == 'core_model' and model_name.lower().startswith("test"):
                return 'tests'
        return None

    def db_for_read(self, model, ** hints):
        """
        Redirects all models starting with 'Test...' to the test db.
        """
        return self.common_test(model._meta.app_label,model._meta.model_name)

    def db_for_write(self, model, ** hints):
        """
        Redirects all models starting with 'Test...' to the test db.
        """
        return self.common_test(model._meta.app_label,model._meta.model_name)

    def allow_relation(self, obj1,obj2, ** hints):
        """
        Relations between objects are allowed if both objects are
        in the test db.
        """
        if obj1._state.db == 'tests' and obj2._state.db == 'tests':
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, ** hints):
        """
        Make sure the auth app only appears in the 'auth_db'
        database.
        """
        return db == self.common_test(app_label,model_name)


class DefaultRouter(object):

    def db_for_read(self, model, ** hints):
        return 'default'

    def db_for_write(self, model, ** hints):
        return 'default'

    def allow_relation(self, obj1,obj2, ** hints):
        return True

    def allow_migrate(self, db, app_label, model_name=None, ** hints):
        return True
