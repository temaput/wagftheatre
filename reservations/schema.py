from functools import partial
import graphene
from graphene import ObjectType, relay
from graphene.contrib.django.filter import DjangoFilterConnectionField
from graphene.contrib.django.types import DjangoNode
from graphql_relay import from_global_id
from django_filters import FilterSet, MethodFilter
from django.utils import timezone

from .models import Schedule, Reservation
from theatre.models import Performance, Place
from wag_ftheatre.utils import Bunch

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


def resolve_p2p(pkey, root, args, info):
    model, node = {
        'performance': (Place, PlaceNode),
        'place': (Performance, PerformanceNode)
    }[pkey]
    kwargs = {
        'shows_scheduled__showtime__gte': timezone.now(),
        'shows_scheduled__sold_out': False,
    }
    p_id = args.get('%s_id' % pkey, None)
    p_slug = args.get('%s_slug' % pkey, None)
    if p_id is not None:
        _, p_id = from_global_id(p_id)
        kwargs['shows_scheduled__%s' % pkey] = p_id
    else:
        kwargs['shows_scheduled__%s__slug' % pkey] = p_slug
    log.debug("resolce_p2p kwargs: %s", kwargs)
    return [node(p) for p in model.objects.filter(**kwargs).distinct()]

class QueryIdType(graphene.Enum):
    SLUG = 'SLUG'
    GLOBAL_ID = 'GLOBAL_ID'

class Query(ObjectType):
    schedule = DjangoFilterConnectionField(ScheduleNode)
    places_by_performance = relay.ConnectionField(
        PlaceNode,
        performance_id=graphene.String(),
        performance_slug=graphene.String(),
    )
    performances_by_place = relay.ConnectionField(
        PerformanceNode,
        place_id=graphene.String(),
        place_slug=graphene.String(),
    )
    scheduled_performances = relay.ConnectionField(PerformanceNode)

    def resolve_performances_by_place(self, args, info):
        p_id = args.get('place_id', None)
        p_slug = args.get('place_slug', None)
        if p_id is not None:
            _, p_id = from_global_id(p_id)
        return [PerformanceNode(p) for p in 
                Performance.scheduled.by_place(p_slug=p_slug, p_id=p_id)]

    def resolve_scheduled_performances(self, args, info):
        return [PerformanceNode(p) for p in Performance.scheduled.all()]


    class Meta:
        abstract = True
