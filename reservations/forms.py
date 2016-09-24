from django import forms

from .models import Spectator


class ScheduleFilterForm(forms.Form):
    performance_gid = forms.CharField()
    performance_slug = forms.CharField()
    place_gid = forms.CharField()
    place_slug = forms.CharField()
    showtime_date = forms.DateField()
    showtime_gte = forms.DateField()


class SpectatorModelForm(forms.ModelForm):

    class Meta:
        model = Spectator
        exclude = ['registered']
