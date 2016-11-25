from django import template
from django.utils.safestring import mark_safe
import json
register = template.Library()


@register.simple_tag
def predefined_data(instance, mode):
    predefined_data = {
        'mode': mode,
        'filledData': {
            instance._meta.model_name: instance.pk
        }
    }
    return mark_safe(json.dumps(predefined_data, ensure_ascii=False))
