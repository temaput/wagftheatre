import graphene
from graphene_django import DjangoObjectType

from .models import Schedule, Reservation
from .forms import ScheduleFilterForm, ScheduleFilterFormNew, ReservationForm
from wag_ftheatre.utils import graphql_converters
from theatre.models import Performance, Place

import logging
log = logging.getLogger(__name__)


class PerformanceNode(DjangoObjectType):

    class Meta:
        model = Performance


class PlaceNode(DjangoObjectType):

    class Meta:
        model = Place


class ScheduleNode(DjangoObjectType):

    """
    Shedule model serializer
    """

    place = graphene.Field(PlaceNode)
    performance = graphene.Field(PerformanceNode)
    # to be sure about javascript interpretation of showtime we use timestamp
    showtime_stamp = graphene.Float()

    def resolve_showtime_stamp(self, *args):
        return self.showtime.timestamp()

    class Meta:
        model = Schedule


class ReservationNode(DjangoObjectType):

    class Meta:
        model = Reservation

ReservationInput = graphql_converters.graphene_input_object_from_model_form(
    'ReservationInput', ReservationForm)


class ScheduleFilterFormObject(graphene.ObjectType):

    class Meta:
        interfaces = (graphql_converters.FormInterface,)


class ReservationFormObject(graphene.ObjectType):

    class Meta:
        interfaces = (graphql_converters.FormInterface,)


class DjangoFormErrorMessage(graphene.ObjectType):

    field_name = graphene.String()
    error_messages = graphene.List(graphene.String)


class MakeReservation(graphene.Mutation):

    class Input:
        reservation = graphene.Argument(ReservationInput)

    errors = graphene.List(DjangoFormErrorMessage)
    ok = graphene.Boolean()

    @classmethod
    def mutate(cls, instance, args, context, info):
        form = ReservationForm(args.get('reservation', None))
        ok = form.is_valid()
        errors = [
            DjangoFormErrorMessage(
                field_name=k,
                error_messages=form.errors[k]
            ) for k in form.errors
        ]
        if ok:
            form.save()
        return cls(ok=ok, errors=errors)


class Query(graphene.AbstractType):

    schedule_filter = graphene.Field(
        ScheduleFilterFormObject,
        place=graphene.String(),
        performance=graphene.String(),
        mode=graphene.String()
    )
    reservation_form = graphene.Field(
        ReservationFormObject,
        place=graphene.String(),
        performance=graphene.String(),
        show=graphene.String()
    )
    places_by_performance = graphene.List(
        PlaceNode,
        slug=graphene.String(),
        pk=graphene.String()
    )
    performances_by_place = graphene.List(
        PerformanceNode,
        slug=graphene.String(),
        pk=graphene.String()
    )
    scheduled_performances = graphene.List(PerformanceNode)
    scheduled_places = graphene.List(PlaceNode)
    shows = graphene.List(
        ScheduleNode,
        performance_pk=graphene.String(),
        place_pk=graphene.String(),
        performance_slug=graphene.String(),
        place_slug=graphene.String(),
        showtime_date=graphene.String(),
        showtime_gte=graphene.String()
    )

    def resolve_reservation_form(self, args, context, info):
        check = ScheduleFilterFormNew(args)
        if check.is_valid():
            show = check.cleaned_data.get('show')
            f = ReservationForm(initial={'show': show})
            return ReservationFormObject(
                fields=f.get_graphql_fields_representation()
            )

    def resolve_schedule_filter(self, args, context, info):
        f = ScheduleFilterFormNew(args)
        return ScheduleFilterFormObject(
            fields=f.get_graphql_fields_representation()
        )

    def resolve_shows(self, args, context, info):
        kwargs = {}
        f = ScheduleFilterForm(args)
        f.is_valid()
        kwargs.update(
            {k.replace('_', '__'): f.cleaned_data[k] for k in f.cleaned_data}
        )
        return Schedule.available.filter(**kwargs)

    def resolve_performances_by_place(self, args, context, info):
        return Performance.scheduled.by_place_field(**args)

    def resolve_places_by_performance(self, args, context, info):
        return Place.scheduled.by_performance_field(**args)

    def resolve_scheduled_performances(self, args, context, info):
        return Performance.scheduled.all()

    def resolve_scheduled_places(self, args, context, info):
        return Place.scheduled.all()


class Mutation(graphene.AbstractType):
    make_reservation = MakeReservation.Field()
