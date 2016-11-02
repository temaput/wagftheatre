
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
