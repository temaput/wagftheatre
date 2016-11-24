from collections import OrderedDict
from django.test import TestCase
from django import forms
import graphene

from reservations.forms import ReservationForm
from reservations.models import Reservation
from wag_ftheatre.utils.graphql_converters import (
    serialize_form_field, form_2_fieldslist
)

from .mock_data import MockData


import logging
log = logging.getLogger(__name__)

# Create your tests here.


class FormFieldListTest(TestCase):

    def test_serializer(self):
        fieldsSample = [
                {
                    'id': 'show',
                    'type': 'hidden',
                    'required': True,
                    'disabled': False,
                    'error': [],
                    'help_text': '',
                    'label': 'Показ',
                },
                {
                    'id': 'email',
                    'label': "E-mail",
                    'type': "email",
                    'required': True,
                    'disabled': False,
                    'error': [],
                    'help_text': '',
                },
                {
                    'id': 'first_name',
                    'label': "Имя",
                    'disabled': False,
                    'error': [],
                    'help_text': '',
                },
                {
                    'id': 'last_name',
                    'label': "Фамилия",
                    'disabled': False,
                    'error': [],
                    'help_text': '',
                },
        ]
        reservationFormSample = MockData.initialDataSample['ReservationForm']
        fullFieldsSample = reservationFormSample['fields']

        RF = forms.modelform_factory(
            Reservation, form=ReservationForm,
            widgets={'show': forms.HiddenInput},
        )
        reservationFormInstance = RF(auto_id=True)
        fieldsList = [serialize_form_field(f) for f in reservationFormInstance]
        self.assertEqual(len(fieldsList), len(fullFieldsSample),
                         "Field list have length is OK")

        for i, field in enumerate(fieldsSample):
            for attr in field:
                checkField = fieldsList[i]
                self.assertTrue(attr in checkField,
                                "field parameter present")
                self.assertEqual(checkField[attr], field[attr],
                                 "field parameter is OK")

    def test_converter(self):

        from wag_ftheatre.utils.graphql_converters import FormFieldObject

        self.maxDiff = None
        reservationFormSample = MockData.initialDataSample['ReservationForm']
        fullFieldsSample = reservationFormSample['fields']
        initial = {'show': '1', 'email': 'tt@mail.ru'}
        error_messages = {'valueMissing': 'vms', 'typeMismatch': 'tms'}
        options = ((1, 'one'), (2, 'two'))

        RF = forms.modelform_factory(
            Reservation, form=ReservationForm,
            widgets={'show': forms.HiddenInput},
        )

        rf = RF(initial=initial)
        show = rf.fields['show']
        email = rf.fields['email']
        show.choices = options
        show.error_messages = error_messages

        showSample = fullFieldsSample[0]
        emailSample = fullFieldsSample[1]
        emailSample['value'] = initial['email']
        showSample['value'] = initial['show']
        showSample['options'] = [
            OrderedDict([('label', label), ('value', value)])
            for value, label in options
        ]

        fieldsList = form_2_fieldslist(rf)

        self.assertEqual(len(fieldsList), len(fullFieldsSample),
                         "Field list have length is OK")

        class Query(graphene.ObjectType):
            fields = graphene.List(FormFieldObject)

            def resolve_fields(self, *args):
                return fieldsList

        query = """
            {
            fields {
                id type value label helpText disabled required
                customErrorMessages {valueMissing typeMismatch}
                options {label value}
                }
            }
            """
        schema = graphene.Schema(query=Query)
        result = schema.execute(query)

        if len(result.errors):
            log.error(result.errors)

        self.assertEqual(len(result.errors), 0, "query is correct")
        show = dict(result.data['fields'][0])
        email = dict(result.data['fields'][1])
        showErrorMessages = dict(show['customErrorMessages'])
        show['customErrorMessages'] = None
        self.assertDictEqual(show, showSample, "Show field OK")
        self.assertDictEqual(email, emailSample, "Email field OK")
        self.assertDictEqual(
            error_messages, showErrorMessages, "Errors dict OK"
        )
