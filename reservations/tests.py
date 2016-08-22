from django.test import TestCase
from theatre.models import Performance, Place
from reservations.models import Schedule, Reservation

from django.utils import timezone as tz

import logging
log = logging.getLogger(__name__)

# Create your tests here.


class ReservationsTestCase(TestCase):
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
