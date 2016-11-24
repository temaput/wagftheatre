from django.test import TestCase
from theatre.models import Performance, Place
from reservations.models import Schedule

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
