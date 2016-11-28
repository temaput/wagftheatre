from collections import OrderedDict
from django.test import TestCase
from django import forms
import graphene

from wag_ftheatre.utils.graphql_converters import (
    form_2_fieldslist, form_2_fieldsdict, object_type_from_form
)

from wag_ftheatre.utils.graphql_converters import FormFieldObject

import logging
log = logging.getLogger(__name__)

# Create your tests here.


class MockData:
    showChoices = (('1', 'one'), ('2', 'two'))
    showErrorMessages = {'valueMissing': 'vms', 'typeMismatch': 'tms'}
    fieldsSample = (
        {
            'id': 'show',
            'type': 'hidden',
            'value': "",
            'label': "Показ",
            'options': [
                OrderedDict([('label', label), ('value', value)])
                for value, label in showChoices
            ],
            'helpText': '',
            'disabled': False,
            'required': True,
            'customErrorMessages': showErrorMessages.copy(),
        },
        {
            'id': 'email',
            'label': "E-mail",
            'type': "email",
            'required': True,
            'helpText': '',
            'disabled': False,
            'value': "",
            'customErrorMessages': None,
            'options': None,
        },
    )

    showField, emailField = fieldsSample


class RF(forms.Form):
    show = forms.ChoiceField(
        choices=MockData.showChoices,
        widget=forms.HiddenInput,
        label=MockData.showField['label'],
        initial=MockData.showField['value'],
        error_messages=MockData.showErrorMessages
    )

    email = forms.EmailField(
        label=MockData.emailField['label'],
        initial=MockData.emailField['value']
    )


class FormFieldListTest(TestCase):

    def test_list_converter(self):

        self.maxDiff = None
        rf = RF()
        fieldsList = form_2_fieldslist(rf)

        query = """
            {
            fields {
                id type value label helpText disabled required
                customErrorMessages {valueMissing typeMismatch}
                options {label value}
                }
            }
            """

        class Query(graphene.ObjectType):
            fields = graphene.List(FormFieldObject)

            def resolve_fields(self, *args):
                return fieldsList

        schema = graphene.Schema(query=Query)
        result = schema.execute(query)
        if len(result.errors):
            log.error(result.errors)

        self.assertEqual(len(result.errors), 0, "query is correct")
        result_show = dict(result.data['fields'][0])
        result_email = dict(result.data['fields'][1])
        self.assertDictEqual(result_show, MockData.showField)
        self.assertDictEqual(result_email, MockData.emailField)

    def test_object_converter(self):
        self.maxDiff = None
        rf = RF()
        FormObjectType = object_type_from_form(rf)

        query = """
            {
                form {
                    email {
                        ...field
                    }
                    show {
                        ...field
                    }
                }
            }

            fragment field on FormFieldObject {
                id type value label helpText disabled required
                customErrorMessages {valueMissing typeMismatch}
                options {label value}
            }
            """

        class Query(graphene.ObjectType):
            form = graphene.Field(FormObjectType)

            def resolve_form(self, *args):
                return FormObjectType(**form_2_fieldsdict(rf))

        schema = graphene.Schema(query=Query)
        result = schema.execute(query)
        if len(result.errors):
            log.error(result.errors)

        self.assertEqual(len(result.errors), 0, "query is correct")
        result_show = dict(result.data['form']['show'])
        result_email = dict(result.data['form']['email'])
        self.assertDictEqual(result_show, MockData.showField)
        self.assertDictEqual(result_email, MockData.emailField)
