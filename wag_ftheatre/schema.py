import reservations.schema
import graphene

class Query(reservations.schema.Query):
    pass

schema = graphene.Schema(name='Reservations Schema')
schema.query = Query
