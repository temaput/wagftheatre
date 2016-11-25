from django.test import TestCase
from theatre.models import Performance, Place
from reservations.models import Schedule
from reservations.forms import ReservationForm, ScheduleFilterFormNew
from .mock_data import MockData

from django.utils import timezone as tz
import graphene
from wag_ftheatre.utils.graphql_converters import (
    FormFieldObject
)

import logging
log = logging.getLogger(__name__)

# Create your tests here.


def make_graphql_query(query, fieldsList):

    class Query(graphene.ObjectType):
        fields = graphene.List(FormFieldObject)

        def resolve_fields(self, *args):
            return fieldsList
    schema = graphene.Schema(query=Query)
    result = schema.execute(query)
    if len(result.errors):
        log.error(result.errors)
    return result


class ReservationFormTestCase(TestCase):

    fixtures = ['fixture1.xml']

    def setUp(self):
        """
        - ensure all schedules are in future
        - none of them sold_out
        """

        per = Performance.objects.all()
        pla = Place.objects.all()

        for i in range(1, 3):
            Schedule.objects.create(
                performance=per[i % 2],
                place=pla[(i+1) % 2],
                showtime=tz.localtime(tz.now()) + tz.timedelta(i)
            )
        for i in range(1, 3):
            Schedule.objects.create(
                performance=per[i % 2],
                place=pla[i % 2],
                showtime=tz.localtime(tz.now()) + tz.timedelta(i)
            )

    def testFormCreatesReservation(self):
        jane = MockData.users['jane']
        show = Schedule.objects.first()
        seatings = {
            'seating_adult': 0,
            'seating_child': 0,
        }
        form = ReservationForm(
            {**jane, **{'show': show.pk}, **seatings},
        )
        form.show = show
        if not form.is_valid():
            log.debug(form.errors.as_data())
        self.assertTrue(
            form.is_valid(),
            "Form is valid"
        )
        reservation = form.save()
        self.assertEqual(
            reservation.show,
            show,
            "Show set right",
        )
        self.assertEqual(
            reservation.first_name,
            jane['first_name'],
            "User name set right"
        )

    def testGraphQLRepresentation(self):
        show = Schedule.available.first()
        frm = ReservationForm(initial={'show': show})
        fieldsList = frm.get_graphql_fields_representation()
        query = """
            {
            fields {
                id type value label helpText disabled required
                customErrorMessages {valueMissing typeMismatch}
                options {label value}
                }
            }
        """
        result = make_graphql_query(query, fieldsList)
        log.debug(result.data)
        self.assertEqual(len(result.errors), 0, "Query is successfull")


class ScheduleFilterFormNewTestCase(TestCase):

    fixtures = ['fixture1.xml']

    def setUp(self):
        """
        - ensure all schedules are in future
        - none of them sold_out
        """

        per = Performance.objects.all()
        pla = Place.objects.all()
        from itertools import product

        for i, ii in product((0, 1), (0, 1)):
            Schedule.objects.create(
                performance=per[i],
                place=pla[ii],
                showtime=tz.localtime(tz.now()) + tz.timedelta(i)
            )

    def testCorrectInput(self):
        per1 = Performance.objects.first()
        pla1 = Place.objects.first()

        fullData = {
            'place': pla1.pk,
            'performance': per1.pk,
        }

        placeOnly = {
            'place': pla1.pk,
        }

        performanceOnly = {
            'performance': per1.pk
        }

        fullFilter = ScheduleFilterFormNew(fullData).get_shows()
        perFilter = ScheduleFilterFormNew(performanceOnly).get_shows()
        plaFilter = ScheduleFilterFormNew(placeOnly).get_shows()

        self.assertIsNotNone(fullFilter)
        self.assertIsNotNone(perFilter)
        self.assertIsNotNone(plaFilter)

        self.assertEqual(len(fullFilter), 1, "Only one show 1/1")
        self.assertEqual(fullFilter[0].place, pla1)
        self.assertEqual(fullFilter[0].performance, per1)

        self.assertEqual(len(plaFilter), 2, "2 shows ?/1")
        for s in plaFilter:
            self.assertEqual(s.place, pla1, "Only 1st place in ?/1")

        self.assertEqual(len(perFilter), 2, "2 shows 1/?")
        for s in perFilter:
            self.assertEqual(
                s.performance, per1, "Only 1st performance in 1/?"
            )

    def testFilterModes(self):
        per1 = Performance.objects.first()
        pla1 = Place.objects.first()

        fullData = {
            'place': pla1.pk,
            'performance': per1.pk,
            'mode': ScheduleFilterFormNew.FormModes.performanceFirst,
        }

        placeOnly = {
            'place': pla1.pk,
            'mode': ScheduleFilterFormNew.FormModes.placeFirst,
        }

        performanceOnly = {
            'performance': per1.pk,
            'mode': ScheduleFilterFormNew.FormModes.fullOptions,
        }

        places_by_performance = Place.scheduled.by_performance(per1.pk)
        performances_by_place = Performance.scheduled.by_place(pla1.pk)

        fullFilter = ScheduleFilterFormNew(fullData)
        perFilter = ScheduleFilterFormNew(performanceOnly)
        plaFilter = ScheduleFilterFormNew(placeOnly)

        # test full filter:
        # both fields present
        # perfromance first --> places choices conform to places_by_performance
        fullFilter.adjust_filter(['show'])

        self.assertEqual(len(fullFilter.fields), 2, "Both fields present")
        place_field = fullFilter.fields['place']
        self.assertListEqual(
            [val for val, label in place_field.choices],
            [p.pk for p in places_by_performance],
            "Place choice conforms to current performance"
        )
        performance_field = fullFilter.fields['performance']
        self.assertListEqual(
            [val for val, label in performance_field.choices],
            [p.pk for p in Performance.scheduled.all()],
            "Performance choice is complete"
        )

        # test place filter
        # only performance field present
        # performance choice conforms to performances by place
        plaFilter.adjust_filter(['place', 'show'])
        self.assertEqual(len(plaFilter.fields), 1, "Only 1 field left")
        performance_field = plaFilter.fields['performance']
        self.assertListEqual(
            [val for val, label in performance_field.choices],
            [p.pk for p in performances_by_place],
            "Performance choice conforms to current place"
        )

        # test performance filter
        # both field present and full choices available
        perFilter.adjust_filter(['show'])
        self.assertEqual(len(fullFilter.fields), 2, "Both fields present")
        performance_field = perFilter.fields['performance']
        place_field = perFilter.fields['place']
        self.assertListEqual(
            [val for val, label in place_field.choices],
            [p.pk for p in Place.scheduled.all()],
            "Places choice is complete"
        )
        self.assertListEqual(
            [val for val, label in performance_field.choices],
            [p.pk for p in Performance.scheduled.all()],
            "Performance choice is complete"
        )

    def testGraphQLRepresentation(self):
        per1 = Performance.objects.first()
        pla1 = Place.objects.first()

        fullData = {
            'place': pla1.pk,
            'performance': per1.pk,
            'mode': ScheduleFilterFormNew.FormModes.performanceFirst
        }

        fieldsList = ScheduleFilterFormNew(
            fullData).get_graphql_fields_representation()

        query = """
            {
            fields {
                id type value label helpText disabled required
                customErrorMessages {valueMissing typeMismatch}
                options {label value}
                }
            }
            """
        result = make_graphql_query(query, fieldsList)

        self.assertEqual(len(result.errors), 0, "query is correct")
