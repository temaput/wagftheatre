# !/usr/bin/env python
# vi:fileencoding=utf-8
from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

from django.utils.encoding import python_2_unicode_compatible
from django.db import models
from django.utils import timezone as tz
from django.core.urlresolvers import reverse
from django.conf import settings


from logging import getLogger
log = getLogger("reservations.models")
# Create your models here.


class AvailableScheduleManager(models.Manager):
    """
    Manager that returns only rows that are not outdated and not sold
    """

    def get_queryset(self):
        return super(AvailableScheduleManager, self).get_queryset().filter(
            showtime__gte=tz.localtime(tz.now()).date(),
            sold_out=False,
        )


@python_2_unicode_compatible
class Schedule(models.Model):
    """
    Расписание показов
    - Спектакль
    - Площадка
    - Дата и время показа
    - Стоимость билета
    - Мест нет
    """
    performance = models.ForeignKey('theatre.Performance',
                                    verbose_name="Спектакль",
                                    related_name="shows_scheduled")
    place = models.ForeignKey('theatre.Place',
                              verbose_name="Площадка",
                              related_name="shows_scheduled",
                              limit_choices_to={'hide': False})
    showtime = models.DateTimeField(
        "Время представления",
        help_text="Когда и во сколько состоится данный показ")
    price = models.DecimalField(
        "Стоимость основного билета",
        max_digits=8, decimal_places=2, blank=True, null=True,
    )
    price_adult = models.DecimalField(
        "Стоимость доп. билета (взр)",
        max_digits=8, decimal_places=2, blank=True, null=True,
    )
    price_child = models.DecimalField(
        "Стоимость доп. билета (детск)",
        max_digits=8, decimal_places=2, blank=True, null=True,
    )
    sold_out = models.BooleanField(
        "Мест нет", default=False,
        help_text="Поставить галочку, когда все билеты будут"
        " забронированы")
    external_booking_url = models.URLField(
        "Ссылка внешнего бронирования",
        blank=True,
        help_text="Заполнять только если бронирование производитеся на другом"
        " сайте (например, ЦИМ)"
    )
    objects = models.Manager()
    available = AvailableScheduleManager()

    @property
    def has_external_booking(self):
        return len(self.external_booking_url) > 0

    @property
    def is_available(self):
        return not self.sold_out and self.showtime >= tz.now()

    def reservations_made(self):
        """
        first tickets = 1 adult + 1 child
        + additional tickets
        """
        first_tickets = self.reservations.filter(cancelled=False).count() * 2
        additional_tickets = \
            self.reservations.filter(cancelled=False).aggregate(
                models.Sum('seating_adult'), models.Sum('seating_child'))
        return first_tickets + \
            (additional_tickets['seating_adult__sum'] or 0) + \
            (additional_tickets['seating_child__sum'] or 0)

    reservations_made.short_description = "Забронировано билетов"
    reservations_made = property(reservations_made)

    def get_absolute_url(self):
        return reverse(
            'booking_show',
            kwargs={'show_pk': self.pk},
        )

    def __str__(self):
        return ("Показ спектакля %s на площадке %s, время проведения: %s" %
                (self.performance.title, self.place.title,
                 self.showtime))

    class Meta:
        ordering = ["showtime"]
        get_latest_by = "showtime"
        verbose_name = "Расписание"
        verbose_name_plural = "Расписание (управление)"


@python_2_unicode_compatible
class Reservation(models.Model):
    """
    Зритель
    - ФИО
    - моб. тел.
    - мэйл*
    - дата регистрации
    Бронь
    - Дата бронирования (авто)
    - Показ
    - Дополнительно взрослых мест* (0)
    - Дополнительно детских мест* (0)
    """
    show = models.ForeignKey(
        Schedule, verbose_name="Показ",
        related_name="reservations")
    email = models.EmailField("E-mail", max_length=256)
    first_name = models.CharField("Имя", max_length=50,
                                  blank=True)
    last_name = models.CharField("Фамилия", max_length=50,
                                 blank=True)
    tel = models.CharField("Мобильный телефон", max_length=50,
                           blank=True)
    seating_adult = models.PositiveSmallIntegerField(
        "Дополнительные места (взр)",
        default=0)
    reservation_date = models.DateTimeField(
        "Дата бронирования", auto_now_add=True)
    seating_child = models.PositiveSmallIntegerField(
        "Дополнительные места (детск)", default=0)
    settled = models.BooleanField("Бронь выкуплена", default=False)
    cancelled = models.BooleanField(
        "Бронь отменена", default=False,
        help_text=("Установите галочку, чтобы отменить просроченную бронь"
                   "и отправить автоматическое уведомление"),
    )
    additional_info = models.TextField(
        "Комментарии к бронированию",
        blank=True,
        help_text="Дополнительные сведения, пожелания...")

    def expired(self):
        return (not self.settled) and tz.localtime(tz.now()) >= self.expires
    expired.short_description = "Бронь просрочена"
    expired.boolean = True
    expired = property(expired)

    def expires(self):
        return self.show.showtime - tz.timedelta(
            getattr(settings, "RESERVATIONS_EXPIRES_BEFORE", 0)
        )
    expires.short_description = "Выкуп брони до"
    expires = property(expires)

    def reference_number(self):
        return 1000000 + int(self.pk)
    reference_number.short_description = "Номер брони"
    reference_number = property(reference_number)

    def total_cost(self):
        return (
            self.show.price + self.show.price_adult * self.seating_adult +
            self.show.price_child * self.seating_child
        )
    total_cost.short_description = "Общая стоимость билетов"
    total_cost = property(total_cost)

    def __str__(self):
        return ("Бронь на показ спектакля %s, на площадке %s %s" % (
            self.show.performance.title,
            self.show.place.title,
            self.show.showtime,
        ))

    class Meta:
        ordering = ["-reservation_date"]
        get_latest_by = "reservation_date"
        verbose_name = "Бронь"
        verbose_name_plural = "Брони"
