class Author(Object):
    firstName = models.CharField(max_length= 100)
    lastName = models.CharField(max_length= 100)
    otherNames = models.CharField(max_length= 200)
    #todo: "title" is probably not the right word. In this field should appear words like "Doctor", "Professor", etc.
    title = models.CharField(max_length= 50)
