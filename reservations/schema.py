import graphene
from graphene import ObjectType, relay
from graphene.contrib.django.filter import DjangoFilterConnectionField
from graphene.contrib.django.types import DjangoNode
from graphql_relay import from_global_id
from django_filters import FilterSet, MethodFilter
from django.utils import timezone
from django import forms

from .models import Schedule, Reservation
from .forms import ScheduleFilterForm
from theatre.models import Performance, Place

import logging
log = logging.getLogger(__name__)



class PerformanceNode(DjangoNode):

    class Meta:
        model = Performance

class PlaceNode(DjangoNode):

    class Meta:
        model = Place


class ScheduleNode(DjangoNode):
    """
    DocInfo blah blah
    """

    place = graphene.Field(PlaceNode)
    performance = graphene.Field(PerformanceNode)

    class Meta:
        model = Schedule
        description = "blah blah blah"
        filter_fields = {
            'performance__slug': ['exact'],
            'place__slug': ['exact'],
            'sold_out': ['exact'],
            'showtime': ['gte']
        }
        filter_order_by = ['showtime']


class DjangoFormErrorMessage(graphene.ObjectType):
    field_name = graphene.String()
    error_messages = graphene.String().List


class Query(ObjectType):

    schedule = DjangoFilterConnectionField(ScheduleNode)
    places_by_performance = relay.ConnectionField(
        PlaceNode,
        gid=graphene.String(),
        slug=graphene.String(),
    )
    performances_by_place = relay.ConnectionField(
        PerformanceNode,
        gid=graphene.String(),
        slug=graphene.String(),
    )
    scheduled_performances = relay.ConnectionField(PerformanceNode)
    scheduled_places = relay.ConnectionField(PlaceNode)
    shows = relay.ConnectionField(
        ScheduleNode,
        performance_slug=graphene.String(),
        place_slug=graphene.String(),
        performance_gid=graphene.String(),
        place_gid=graphene.String(),
        showtime_date=graphene.String(),
        showtime_gte=graphene.String()
    )

    def resolve_shows(self, args, info):
        kwargs = {}
        f = ScheduleFilterForm(args)
        f.is_valid()
        if 'performance_gid' in f.cleaned_data:
            kwargs['performance'] = from_global_id(
                f.cleaned_data.pop('performance_gid'))[1]
        if 'place_gid' in f.cleaned_data:
            kwargs['place'] = from_global_id(
                f.cleaned_data.pop('place_gid'))[1]
        kwargs.update(
            {k.replace('_', '__'): f.cleaned_data[k] for k in f.cleaned_data}
        )
        return [
            ScheduleNode(s) for s in
            Schedule.available.filter(**kwargs)
        ]

    def resolve_performances_by_place(self, args, info):
        gid = args.get('gid', None)
        slug = args.get('slug', None)
        pk = None
        if gid is not None:
            _, pk = from_global_id(gid)
        return [PerformanceNode(p) for p in
                Performance.scheduled.by_place_field(slug=slug, pk=pk)]

    def resolve_places_by_performance(self, args, info):
        gid = args.get('gid', None)
        slug = args.get('slug', None)
        pk = None
        if gid is not None:
            _, pk = from_global_id(gid)
        return [PlaceNode(p) for p in
                Place.scheduled.by_performance_field(slug=slug, pk=pk)]

    def resolve_scheduled_performances(self, args, info):
        return [PerformanceNode(p) for p in Performance.scheduled.all()]

    def resolve_scheduled_places(self, args, info):
        return [PlaceNode(p) for p in Place.scheduled.all()]

    class Meta:
        abstract = True
