import reservations.schema
import graphene


class Query(reservations.schema.Query, graphene.ObjectType):
    pass


class Mutation(reservations.schema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
