from django import forms
from reservations.models import Reservation, Schedule
from theatre.models import Performance, Place
from wag_ftheatre.utils.graphql_converters import form_2_fieldslist


class ScheduleFilterForm(forms.Form):
    performance_pk = forms.CharField()
    performance_slug = forms.CharField()
    place_pk = forms.CharField()
    place_slug = forms.CharField()
    showtime_date = forms.DateField()
    showtime_gte = forms.DateField()


class ScheduleFilterFormNew(forms.Form):
    performance = forms.ModelChoiceField(
        label="Выберите спектакль",
        required=False,
        queryset=Performance.scheduled,
        empty_label=None,
    )
    place = forms.ModelChoiceField(
        label="Выберите площадку",
        required=False,
        queryset=Place.scheduled,
        empty_label=None,
    )

    class FormModes:
        performanceFirst = {
            'stepByStep': True,
            'performanceFirst': True,
            'dateFilter': None,
        }
        placeFirst = {
            'stepByStep': True,
            'performanceFirst': False,
            'dateFilter': None,
        }
        fullOptions = {
            'stepByStep': False,
            'performanceFirst': False,
            'dateFilter': None,
        }

    def get_filled_data(self):
        if self.is_bound and self.is_valid():
            return {
                k: self.cleaned_data[k]
                for k in self.cleaned_data
                if self.cleaned_data[k]
            }

    def get_shows(self):
        filled_data = self.get_filled_data()
        if filled_data is not None:
            return Schedule.available.filter(**filled_data)

    def adjust_filter(self, mode, exclude):
        filled_data = self.get_filled_data()
        if filled_data and mode['stepByStep']:
            performance_field = self.fields['performance']
            place_field = self.fields['place']
            if 'performance' in filled_data and 'place' in filled_data:
                if mode['performanceFirst']:
                    place_field.queryset = Place.scheduled.by_performance(
                        filled_data['performance']
                    )
                else:
                    performance_field.queryset = \
                        Performance.scheduled.by_place(filled_data['place'])
            elif 'performance' in filled_data:
                place_field.queryset = Place.scheduled.by_performance(
                    filled_data['performance']
                )
            elif 'place' in filled_data:
                performance_field.queryset = Performance.scheduled.by_place(
                    filled_data['place']
                )

        for fname in exclude:
            self.fields.pop(fname)

    def get_graphql_representation(self, mode=FormModes.performanceFirst,
                                   exclude=[]):

        self.adjust_filter(mode, exclude)
        return form_2_fieldslist(self)


class ReservationForm(forms.ModelForm):
    class Meta:
        model = Reservation
        exclude = [
            'reservation_date',
            'settled',
            'cancelled',
        ]
