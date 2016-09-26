from django.test import TestCase
from theatre.models import Performance, Place
from reservations.models import Schedule
from reservations.forms import ReservationForm
from reservations.tests_mock_data import MockData
from wag_ftheatre.schema import schema

from django.utils import timezone as tz

import logging
log = logging.getLogger(__name__)

# Create your tests here.


class ScheduleManagersTestCase(TestCase):

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

    def _testFixtureIsThere(self):
        self.assertEqual(
            Place.objects.count(),
            2,
            "There are 2 places"
        )
        self.assertEqual(
            Performance.objects.count(),
            2,
            "There are 2 performances"
        )
        self.assertEqual(
            Schedule.objects.count(),
            4,
            "There are 4 scheduled shows"
        )

        self.assertEqual(
            Schedule.objects.filter(
                sold_out=False,
                showtime__gte=tz.localtime(tz.now()).date()
            ).count(),
            4,
            "Just make sure that we have all schedules set"
        )
        log.debug(
            "Distinct query: %s",
            str(Performance.objects.filter(
                shows_scheduled__sold_out=False
            ).distinct().query)
        )
        log.debug(
            "NonDistinct query: %s",
            str(Performance.objects.filter(
                shows_scheduled__sold_out=False
            ).query)
        )
        self.assertEqual(
            Performance.objects.filter(
                shows_scheduled__sold_out=False
            ).distinct().count(),
            2,
            "Confirm both Performances have scheduled show, not sold_out"
        )

    def testScheduledPerformances(self):

        self.assertEqual(
            Performance.scheduled.count(),
            2,
            "Both performances are scheduled for now"
        )
        p1 = Performance.objects.first()
        p2 = Performance.objects.last()
        Schedule.objects.filter(performance=p1).update(sold_out=True)
        self.assertEqual(
            Performance.scheduled.count(),
            1,
            "Only one is scheduled"
        )
        self.assertEqual(
            Performance.scheduled.first(),
            p2,
            "Its #2"
        )
        # reset sold_out schedules
        Schedule.objects.update(sold_out=False)
        self.assertEqual(
            Performance.scheduled.count(),
            2,
            "Both performances are scheduled again"
        )
        # make schedules obsolete
        yesterday = tz.localtime(tz.now()).date() - tz.timedelta(1)
        Schedule.objects.filter(performance=p2).update(showtime=yesterday)
        self.assertEqual(
            Performance.scheduled.count(),
            1,
            "Only one scheduled left"
        )
        self.assertEqual(
            Performance.scheduled.first(),
            p1,
            "It's #1"
        )

    def testScheduledPlaces(self):

        self.assertEqual(
            Place.scheduled.count(),
            2,
            "Both places are schduled for now"
        )
        p1 = Place.objects.first()
        p2 = Place.objects.last()

        # Make all p1 shows sold
        Schedule.objects.filter(place=p1).update(sold_out=True)
        self.assertEqual(
            Place.scheduled.count(),
            1,
            "Now only one place is scheduled"
        )
        self.assertEqual(
            Place.scheduled.first(),
            p2,
            "And its #2"
        )

        # Reset
        Schedule.objects.update(sold_out=False)
        self.assertEqual(
            Place.scheduled.count(),
            2,
            "Both places are schduled for now"
        )

        # Make all p2 shows obsolete
        yesterday = tz.localtime(tz.now()).date() - tz.timedelta(1)
        Schedule.objects.filter(place=p2).update(showtime=yesterday)

        self.assertEqual(
            Place.scheduled.count(),
            1,
            "Now only one place is scheduled"
        )
        self.assertEqual(
            Place.scheduled.first(),
            p1,
            "And its #1"
        )

    def testPerformanceByPlace(self):

        pla1 = Place.objects.first()
        pla2 = Place.objects.last()
        per1 = Performance.objects.first()
        per2 = Performance.objects.last()
        # both performances scheduled on both places
        self.assertEqual(
            Performance.scheduled.by_place(pla1).count(),
            2,
            "both performances scheduled on both places"
        )
        self.assertEqual(
            Performance.scheduled.by_place(pla2).count(),
            2,
            "both performances scheduled on both places"
        )

        # 1-1 is sold out
        Schedule.objects.filter(place=pla1, performance=per1).update(
            sold_out=True)
        self.assertEqual(
            Performance.scheduled.by_place(pla1).count(),
            1,
            "Now only one Performance was left on place 1"
        )
        self.assertEqual(
            Performance.scheduled.by_place(pla1).first(),
            per2,
            "And its #2"
        )
        self.assertEqual(
            Performance.scheduled.by_place(pla2).count(),
            2,
            "But still both available on place2"
        )

    def testPlaceByPerformance(self):
        per1 = Performance.objects.first()
        per2 = Performance.objects.last()
        pla1 = Place.objects.first()
        pla2 = Place.objects.last()

        # both performances scheduled on both places
        self.assertEqual(
            Place.scheduled.by_performance(per1).count(),
            2,
            "both performances scheduled on both places"
        )
        self.assertEqual(
            Place.scheduled.by_performance(per2).count(),
            2,
            "both performances scheduled on both places"
        )

        # 2-2 is obsolete
        yesterday = tz.localtime(tz.now()).date() - tz.timedelta(1)
        Schedule.objects.filter(performance=per2, place=pla2).update(
            showtime=yesterday
        )

        self.assertEqual(
            Place.scheduled.by_performance(per2).count(),
            1,
            "Now only one Place is showing Performance #2"
        )
        self.assertEqual(
            Place.scheduled.by_performance(per2).first(),
            pla1,
            "And its #1",
        )
        self.assertEqual(
            Place.scheduled.by_performance(per1).count(),
            2,
            "But still both present Performance #1"
        )

    def testPerformanceByPlaceField(self):
        pla1 = Place.objects.first()
        pla2 = Place.objects.last()
        per1 = Performance.objects.first()
        per2 = Performance.objects.last()
        # both performances scheduled on both places
        self.assertEqual(
            Performance.scheduled.by_place_field(
                pk=pla1.pk
            ).count(),
            2,
            "both performances scheduled on both places"
        )
        self.assertEqual(
            Performance.scheduled.by_place_field(
                slug=pla2.slug
            ).count(),
            2,
            "both performances scheduled on both places"
        )

        # 1-1 is sold out
        Schedule.objects.filter(place=pla1, performance=per1).update(
            sold_out=True)
        self.assertEqual(
            Performance.scheduled.by_place_field(pk=pla1.pk).count(),
            1,
            "Now only one Performance was left on place 1"
        )
        self.assertEqual(
            Performance.scheduled.by_place_field(slug=pla1.slug).first(),
            per2,
            "And its #2"
        )
        self.assertEqual(
            Performance.scheduled.by_place_field(slug=pla2.slug).count(),
            2,
            "But still both available on place2"
        )

    def testPlaceByPerformanceField(self):
        per1 = Performance.objects.first()
        per2 = Performance.objects.last()
        pla1 = Place.objects.first()
        pla2 = Place.objects.last()

        # both performances scheduled on both places
        self.assertEqual(
            Place.scheduled.by_performance_field(pk=per1.pk).count(),
            2,
            "both performances scheduled on both places"
        )
        self.assertEqual(
            Place.scheduled.by_performance_field(slug=per2.slug).count(),
            2,
            "both performances scheduled on both places"
        )

        # 2-2 is obsolete
        yesterday = tz.localtime(tz.now()).date() - tz.timedelta(1)
        Schedule.objects.filter(performance=per2, place=pla2).update(
            showtime=yesterday
        )

        self.assertEqual(
            Place.scheduled.by_performance_field(pk=per2.pk).count(),
            1,
            "Now only one Place is showing Performance #2"
        )
        self.assertEqual(
            Place.scheduled.by_performance_field(slug=per2.slug).first(),
            pla1,
            "And its #1",
        )
        self.assertEqual(
            Place.scheduled.by_performance_field(pk=per1.pk).count(),
            2,
            "But still both present Performance #1"
        )


class ScheduleSchemaTestCase(TestCase):

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

    def testQueryScheduledPerformances(self):
        query = """
            query {
            response:scheduledPerformances {
                title
            }
            }
        """
        result = schema.execute(query)
        self.assertEqual(
            len(result.errors),
            0,
            "Query is valid"
        )
        self.assertIsNotNone(
            result.data,
            "Data is not empty"
        )
        self.assertEqual(
            len(result.data['response']),
            2,
            "Two Performances are scheduled"
        )

        p1 = Performance.objects.first()
        p2 = Performance.objects.last()

        # First performance is sold
        Schedule.objects.filter(performance=p1).update(sold_out=True)
        self.assertEqual(
            Performance.scheduled.count(),
            1,
            "Confirm we have only one Performance in qs"
        )

        result = schema.execute(query)
        self.assertEqual(
            len(result.data['response']),
            1,
            "Only one performance scheduled now"
        )
        self.assertEqual(
            result.data['response'][0]['title'],
            p2.title,
            "Its #2"
        )

    def testQueryScheduledPlaces(self):
        query = """
            query {
            response:scheduledPlaces {
                        title
            }
            }
        """
        result = schema.execute(query)
        self.assertEqual(
            len(result.errors),
            0,
            "Query is valid"
        )
        self.assertIsNotNone(
            result.data,
            "Data is not empty"
        )
        self.assertEqual(
            len(result.data['response']),
            2,
            "Two Places are running"
        )

        p1 = Place.objects.first()
        p2 = Place.objects.last()

        # First performance is sold
        Schedule.objects.filter(place=p1).update(sold_out=True)

        result = schema.execute(query)
        self.assertEqual(
            len(result.data['response']),
            1,
            "Only one performance scheduled now"
        )
        self.assertEqual(
            result.data['response'][0]['title'],
            p2.title,
            "Its #2"
        )

    def testQueryPerformancesByPlace(self):
        query = """
            query QueryPerformancesByPlace ($slug:String, $pk:String){
                response_id:performancesByPlace(pk: $pk) {
                            title
                }
                response_slug:performancesByPlace(slug: $slug) {
                            title
                }
            }
        """
        pla1 = Place.objects.first()
        p1 = Performance.objects.first()
        p2 = Performance.objects.last()

        variable_values = {
            'pk': pla1.pk,
            'slug': pla1.slug,
        }
        result = schema.execute(
            query,
            variable_values=variable_values
        )
        if result.errors:
            log.info(
                "Errors: %s",
                result.errors
            )
        self.assertEqual(
            len(result.errors),
            0,
            "Query is valid"
        )
        self.assertIsNotNone(
            result.data,
            "Data is not empty"
        )
        self.assertEqual(
            len(result.data['response_slug']),
            2,
            "Two Performances are scheduled on place #1"
        )
        self.assertEqual(
            len(result.data['response_id']),
            2,
            "Two Performances are scheduled on place #1"
        )

        # First performance is sold

        Schedule.objects.filter(
            place=pla1, performance=p1).update(sold_out=True)
        self.assertEqual(
            Performance.scheduled.by_place(pla1).count(),
            1,
            "Confirm we have only one Performance in qs"
        )

        result = schema.execute(query, variable_values=variable_values)
        self.assertEqual(
            len(result.data['response_id']),
            1,
            "Only one performance scheduled now"
        )
        self.assertEqual(
            len(result.data['response_slug']),
            1,
            "Only one performance scheduled now"
        )
        self.assertEqual(
            result.data['response_slug'][0]['title'],
            p2.title,
            "Its #2"
        )

    def testQueryPlacesByPerformance(self):
        query = """
            query QueryPlacesByPerformance($slug:String, $pk:String){
                response_id:placesByPerformance(pk: $pk) {
                            title
                }
                response_slug:placesByPerformance(slug: $slug) {
                            title
                }
            }
        """
        p1 = Place.objects.first()
        p2 = Place.objects.last()

        per1 = Performance.objects.first()

        variable_values = {
            'pk': per1.pk,
            'slug': per1.slug,
        }
        result = schema.execute(
            query,
            variable_values=variable_values
        )
        if result.errors:
            log.info(
                "Errors: %s",
                result.errors
            )
        self.assertEqual(
            len(result.errors),
            0,
            "Query is valid"
        )
        self.assertIsNotNone(
            result.data,
            "Data is not empty"
        )
        self.assertEqual(
            len(result.data['response_slug']),
            2,
            "Two Places run performance #1"
        )
        self.assertEqual(
            len(result.data['response_id']),
            2,
            "Two Places run performance #1"
        )

        # First performance is sold

        Schedule.objects.filter(
            place=p1, performance=per1).update(sold_out=True)
        self.assertEqual(
            Place.scheduled.by_performance(per1).count(),
            1,
            "Confirm we have only one Place in qs"
        )

        result = schema.execute(query, variable_values=variable_values)
        self.assertEqual(
            len(result.data['response_id']),
            1,
            "Only one performance scheduled now"
        )
        self.assertEqual(
            len(result.data['response_slug']),
            1,
            "Only one performance scheduled now"
        )
        self.assertEqual(
            result.data['response_slug'][0]['title'],
            p2.title,
            "Its #2"
        )

    def testQueryShows(self):
        query = """
        query QueryShows(
            $performance_slug: String,
            $performance_pk: String,
            $place_slug: String,
            $place_pk: String,
            $showtime_date: String,
            $showtime_gte: String
            ) {
            shows_by_pp_slug:shows(
            performanceSlug: $performance_slug,
            placeSlug: $place_slug
            ) {
                        id
            }
            shows_by_pp_id:shows(
            performancePk: $performance_pk,
            placePk: $place_pk
            ) {
                        id
            }
            shows_by_showtime_date:shows(
            showtimeDate: $showtime_date
            ){
                        id
            }
            shows_by_showtime_gte:shows(
            showtimeGte: $showtime_gte
            ){
                        id
            }
            shows_available:shows {
                        id
            }
        }
        """
        per1 = Performance.objects.first()
        per2 = Performance.objects.last()
        pla1 = Place.objects.first()
        pla2 = Place.objects.last()
        show = Schedule.available.filter(
            performance=per1,
            place=pla1
        ).first()
        today = tz.localtime(tz.now()).date()
        yesterday = tz.localtime(tz.now()) - tz.timedelta(1)
        variable_values = {
            "performance_pk": per1.pk,
            "place_pk": pla1.pk,
            "performance_slug": per1.slug,
            "place_slug": pla1.slug,
            "showtime_date": today,
            "showtime_gte": today,
        }

        result = schema.execute(
            query,
            variable_values=variable_values
        )
        if result.errors:
            log.error(result.errors)
        self.assertEqual(
            len(result.errors),
            0,
            "Result is valid"
        )
        # get by slug and by id should return the same
        self.assertEqual(
            result.data['shows_by_pp_slug'],
            result.data['shows_by_pp_id'],
            "Shows by id or by slug should provide equal results"
        )
        self.assertEqual(
            len(result.data['shows_by_pp_id']),
            1,
            "They both should bring up 1 show"
        )
        self.assertEqual(
            result.data['shows_by_pp_id'][0]['id'],
            str(show.id),
            "It should be show with this id"
        )

        # make 1 show run today, 1 obsolete
        self.assertEqual(
            Schedule.objects.filter(performance=per1, place=pla1).update(
                showtime=today
            ),
            1,
            "Make sure only 1 show affected"
        )
        self.assertEqual(
            Schedule.objects.filter(performance=per2, place=pla2).update(
                showtime=yesterday
            ),
            1,
            "Make sure only 1 show affected"
        )
        self.assertEqual(
            Schedule.available.count(),
            3,
            "Confirm that we have 3 show available"
        )
        self.assertEqual(
            Schedule.available.filter(showtime__date=today).count(),
            1,
            "Confirm that we have 1 show today"
        )
        result = schema.execute(
            query,
            variable_values=variable_values
        )
        if result.errors:
            log.error(result.errors)
        self.assertEqual(
            len(result.errors),
            0,
            "Result is valid"
        )
        self.assertEqual(
            len(result.data['shows_by_showtime_gte']),
            3,
            "3 shows are scheduled and available"
        )
        self.assertEqual(
            len(result.data['shows_by_showtime_date']),
            1,
            "Only 1 show is scheduled for today"
        )
        self.assertEqual(
            result.data['shows_by_showtime_gte'],
            result.data['shows_available'],
            "Available shows should equal to gte today"
        )


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
