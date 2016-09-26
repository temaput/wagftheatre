class Bunch:
    def __init__(self, **kwargs):
        self.__dict__.update(kwargs)


def graphene_input_object_from_model_form(cls_name, model_form):
    import graphene
    import types
    from django.db.models import AutoField
    from .graphql_converter import convert_django_field

    model = model_form._meta.model
    field_names = model_form._meta.fields
    exclude_fields = [f.name for f in model._meta.fields
                      if isinstance(f, AutoField)] + model_form._meta.exclude
    if field_names is None:
        field_names = [f.name for f in model._meta.fields]

    if field_names:
        cls_dict = {
                f.name: convert_django_field(f) for f in model._meta.fields
                if f.name in field_names
                and f.name not in exclude_fields
        }
        new_cls = types.new_class(
            cls_name, (graphene.InputObjectType,), {},
            lambda ns: ns.update(cls_dict)
        )
        import sys
        new_cls.__module__ = sys._getframe(1).f_globals['__name__']
        return new_cls
