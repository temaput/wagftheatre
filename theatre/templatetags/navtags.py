
from django import template

register = template.Library()

@register.inclusion_tag("theatre/tags/topmenu.html", takes_context=True)
def topmenu(context, parent, currentpage=None):
    menuitems = parent.get_children().in_menu().live()
    return {
        'menuitems': menuitems,
        'request': context['request']
    }
