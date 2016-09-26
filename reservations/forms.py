from django import forms
from reservations.models import Reservation


class ScheduleFilterForm(forms.Form):
    performance_pk = forms.CharField()
    performance_slug = forms.CharField()
    place_pk = forms.CharField()
    place_slug = forms.CharField()
    showtime_date = forms.DateField()
    showtime_gte = forms.DateField()


class ReservationForm(forms.ModelForm):
    class Meta:
        model = Reservation
        exclude = [
            'reservation_date',
            'settled',
            'cancelled',
        ]
