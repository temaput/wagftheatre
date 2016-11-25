import graphene
from graphene.utils.str_converters import to_camel_case


def graphene_input_object_from_model_form(cls_name, model_form):
    import types
    import graphene
    from graphene_django.form_converter import convert_form_field
    form_instance = model_form()
    cls_dict = {
        fname: convert_form_field(form_instance.fields[fname])
        for fname in form_instance.fields
    }
    new_cls = types.new_class(
        cls_name, (graphene.InputObjectType,), {},
        lambda ns: ns.update(cls_dict)
    )
    import sys
    new_cls.__module__ = sys._getframe(1).f_globals['__name__']
    return new_cls


def abstract_from_form(form_cls):
    """"
    not used yet
    """
    import types
    import graphene
    from graphene_django.form_converter import convert_form_field
    cls_name = "%sObjectAbstract" % form_cls.__name__
    form_instance = form_cls()

    cls_dict = {
        fname: convert_form_field(form_instance.fields[fname])
        for fname in form_instance.fields
    }

    new_cls = types.new_class(
        cls_name, (graphene.AbstractType,), {},
        lambda ns: ns.update(cls_dict)
    )
    import sys
    new_cls.__module__ = sys._getframe(1).f_globals['__name__']
    return new_cls


class CustomErrorMessageObject(graphene.ObjectType):
    valueMissing = graphene.String()
    typeMismatch = graphene.String()
    patternMismatch = graphene.String()


class SelectOptionObject(graphene.ObjectType):
    label = graphene.String()
    value = graphene.String()


class FormFieldObject(graphene.ObjectType):
    id = graphene.String()
    type = graphene.String()
    value = graphene.String()
    label = graphene.String()
    error = graphene.String()
    help_text = graphene.String()
    disabled = graphene.Boolean()
    required = graphene.Boolean()
    maxlength = graphene.Int()
    min = graphene.String()
    max = graphene.String()
    cols = graphene.Int()
    rows = graphene.Int()
    options = graphene.List(SelectOptionObject)
    custom_error_messages = graphene.Field(CustomErrorMessageObject)

    def resolve_options(self, *args):
        if hasattr(self, 'options'):
            return [
                SelectOptionObject(label=label, value=value)
                for value, label in self.options
            ]

    def resolve_custom_error_messages(self, *args):
        customErrorMessagesDict = {
            error_key: self.custom_error_messages[error_key]
            for error_key in self.custom_error_messages
            if error_key in CustomErrorMessageObject._meta.fields
        }
        if len(customErrorMessagesDict):
            return CustomErrorMessageObject(**customErrorMessagesDict)

    def resolve_error(self, *args):
        if len(self.error):
            return " ".join(self.error)

    def resolve_value(self, *args):
        return self.value()

    def resolve_id(self, *args):
        return to_camel_case(self.id)


class FormInterface(graphene.Interface):
    fields = graphene.List(FormFieldObject)


def serialize_form_field(bfield):

    transform_keys = {
        'html_name': 'id',
        'input_type': 'type',
        'choices': 'options',
        'errors': 'error',
        'error_messages': 'custom_error_messages'
    }

    def get_key(attr):
        return transform_keys.get(attr, attr)

    def get_val(field, attr):
        return getattr(field, attr)

    attrs_structure = (
        (bfield, (
            'html_name',
            'help_text',
            'label',
            'value',
            'errors',
        )),
        (bfield.field, (
            'required',
            'disabled',
            'choices',
            'error_messages',
        )),
        (bfield.field.widget, (
            'input_type',
        )),
    )
    return {**{
        get_key(attr): get_val(field, attr)
        for field, attrs in attrs_structure
        for attr in attrs if hasattr(field, attr)
    }, **bfield.field.widget.attrs}


def form_2_fieldslist(form_instance, field_object_cls=FormFieldObject):
    return [field_object_cls(**serialize_form_field(f))
            for f in form_instance]
