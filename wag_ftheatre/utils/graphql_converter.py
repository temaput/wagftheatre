from functools import singledispatch

from django.db import models

from graphene import (ID, Boolean, Float, Int,
                      String)
from graphene.types.datetime import DateTime


@singledispatch
def convert_django_field(field, registry=None):
    raise Exception(
        "Don't know how to convert the Django field %s (%s)" %
        (field, field.__class__))


@convert_django_field.register(models.CharField)
@convert_django_field.register(models.TextField)
@convert_django_field.register(models.EmailField)
@convert_django_field.register(models.SlugField)
@convert_django_field.register(models.URLField)
@convert_django_field.register(models.GenericIPAddressField)
@convert_django_field.register(models.FileField)
def convert_field_to_string(field, registry=None):
    return String(description=field.help_text, required=not field.blank)


@convert_django_field.register(models.AutoField)
def convert_field_to_id(field, registry=None):
    return ID(description=field.help_text, required=not field.blank)


@convert_django_field.register(models.PositiveIntegerField)
@convert_django_field.register(models.PositiveSmallIntegerField)
@convert_django_field.register(models.SmallIntegerField)
@convert_django_field.register(models.BigIntegerField)
@convert_django_field.register(models.IntegerField)
def convert_field_to_int(field, registry=None):
    return Int(description=field.help_text, required=not field.blank)


@convert_django_field.register(models.BooleanField)
def convert_field_to_boolean(field, registry=None):
    return Boolean(description=field.help_text, required=not field.blank)


@convert_django_field.register(models.NullBooleanField)
def convert_field_to_nullboolean(field, registry=None):
    return Boolean(description=field.help_text, required=not field.blank)


@convert_django_field.register(models.DecimalField)
@convert_django_field.register(models.FloatField)
def convert_field_to_float(field, registry=None):
    return Float(description=field.help_text, required=not field.blank)


@convert_django_field.register(models.DateField)
def convert_date_to_string(field, registry=None):
    return DateTime(description=field.help_text, required=not field.blank)


@convert_django_field.register(models.ForeignKey)
@convert_django_field.register(models.OneToOneField)
def convert_foreign_field(field, registry=None):
    return ID(description=field.help_text, required=not field.blank)
