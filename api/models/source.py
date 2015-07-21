from django.db import models
from altws.api.models.object import Object

class StatusOfTheAutor(Object):
    type = [researcher, journalist, , ]
    other = models.CharField(max_length= 50)
    # 'other' should be filled only if 'type' == 'other'
    related_to = models.ManyToManyField()

class Source(Object):
    parution_date = models.DateField()
    published_in = models.ForeignKey("Journal")
    #todo: URL can be null but we should notice the users that it's HIGHLY recommended to have sources available on the
    #web
    url = models.URLField()
    main_author =


class IntermediateSource(Source):
    pass

class PrimitiveSource(Source):
    pass

class OtherPrimitiveSource(PrimitiveSource):
    pass

class ScientificPaper(Source):
    pass

class WebVideo(Source):
    pass


#todo: terminologie!!!!
#todo: primary keys
#todo: not null keys
#todo: all classes must inherit from object.Object
#todo: Maybe it's better to use design pattern "decorator" rather than inheritance with object.Object?