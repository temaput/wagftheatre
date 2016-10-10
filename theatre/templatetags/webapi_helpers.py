from django import template
from django.utils.safestring import mark_safe
import json
register = template.Library()


@register.simple_tag
def prescribed_data(instance):
    prescribed_data = {
        'currents': {
            instance._meta.model_name: instance.pk
        }
    }
    return mark_safe(json.dumps(prescribed_data, ensure_ascii=False))
