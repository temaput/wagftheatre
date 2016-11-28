from django import forms
from django.template import Template, Context
from reservations.models import Reservation, Schedule
from theatre.models import Performance, Place
from wag_ftheatre.utils.graphql_converters import (
    form_2_fieldslist, form_2_fieldsdict, object_type_from_form
)


class ScheduleFilterForm(forms.Form):
    performance_pk = forms.CharField()
    performance_slug = forms.CharField()
    place_pk = forms.CharField()
    place_slug = forms.CharField()
    showtime_date = forms.DateField()
    showtime_gte = forms.DateField()


class ScheduleFilterFormNew(forms.Form):

    class FormModes:
        performanceFirst = 'performanceFirst'
        placeFirst = 'placeFirst'
        fullOptions = 'fullOptions'
        default = fullOptions

        FORM_MODES_SETTINGS = {
            performanceFirst: {
                'stepByStep': True,
                'performanceFirst': True,
                'dateFilter': None,
                'selectShow': True,
            },
            placeFirst: {
                'stepByStep': True,
                'performanceFirst': False,
                'dateFilter': None,
                'selectShow': True,
            },
            fullOptions: {
                'stepByStep': False,
                'performanceFirst': False,
                'dateFilter': None,
                'selectShow': False,
            },
        }

        @classmethod
        def get_settings(cls, mode):
            return cls.FORM_MODES_SETTINGS[mode]

        @classmethod
        def get_choices(cls):
            return (
                (k, k) for k in cls.FORM_MODES_SETTINGS.keys()
            )

    class ShowChoiceField(forms.ModelChoiceField):
        def label_from_instance(self, obj):
            t = Template(
                "{{obj.showtime|date:'j E H:i'}} "
                "(стоимость: {{obj.price|floatformat:2}} р.)"
            )
            if obj.price is None:
                obj.price = 0
            return t.render(Context({'obj': obj}))

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
    show = ShowChoiceField(
        label="Выберите показ",
        required=False,
        queryset=Schedule.available,
        empty_label=None,
    )
    mode = forms.ChoiceField(
        choices=FormModes.get_choices(),
        required=False
    )

    def get_settings(self):
        if self.is_bound:
            self.is_valid()
            mode = self.cleaned_data.pop('mode', '') or self.FormModes.default
            settings = self.FormModes.get_settings(mode)
        else:
            settings = self.FormModes.get_settings(self.FormModes.default)
        return settings

    def get_filled_data(self):
        if self.is_bound and self.is_valid():
            return {
                k: self.cleaned_data[k]
                for k in self.cleaned_data
                if self.cleaned_data[k] and k != 'mode'
            }

    def get_shows(self):
        filled_data = self.get_filled_data()
        if filled_data is not None:
            return Schedule.available.filter(**filled_data)

    def adjust_filter(self, exclude):
        settings = self.get_settings()
        filled_data = self.get_filled_data()
        if filled_data:
            show_field = self.fields['show']
            show_field.queryset = Schedule.available.filter(**filled_data)
            if settings['stepByStep']:
                performance_field = self.fields['performance']
                place_field = self.fields['place']
                if 'performance' in filled_data and 'place' in filled_data:
                    if settings['performanceFirst']:
                        place_field.queryset = Place.scheduled.by_performance(
                            filled_data['performance']
                        )
                    else:
                        performance_field.queryset = \
                            Performance.scheduled.by_place(
                                filled_data['place']
                            )
                elif 'performance' in filled_data:
                    place_field.queryset = Place.scheduled.by_performance(
                        filled_data['performance']
                    )
                elif 'place' in filled_data:
                    performance_field.queryset = \
                        Performance.scheduled.by_place(
                            filled_data['place']
                        )

        for fname in exclude:
            self.fields.pop(fname, None)

        if not settings['selectShow']:
            self.fields.pop('show', None)

        self.fields.pop('mode', None)

    def get_graphql_fields_representation(self, exclude=[]):
        self.adjust_filter(exclude)
        return form_2_fieldslist(self)

    def get_graphql_formobject(self, exclude=[]):
        self.adjust_filter(exclude)
        return ScheduleFilterFormObject(**form_2_fieldsdict(self))


class ReservationForm(forms.ModelForm):
    class Meta:
        model = Reservation
        exclude = [
            'reservation_date',
            'settled',
            'cancelled',
        ]
        widgets = {
            'show': forms.HiddenInput,
        }

    def get_graphql_fields_representation(self, exclude=[]):

        for fname in exclude:
            self.fields.pop(fname, None)
        return form_2_fieldslist(self)

    def get_graphql_formobject(self, exclude=[]):
        for fname in exclude:
            self.fields.pop(fname, None)
        return ReservationFormObject(**form_2_fieldsdict(self))


ScheduleFilterFormObject = object_type_from_form(ScheduleFilterFormNew())

ReservationFormObject = object_type_from_form(ReservationForm())
