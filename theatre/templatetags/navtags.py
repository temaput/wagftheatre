
from django import template

register = template.Library()

@register.inclusion_tag("tags/topmenu.html", takes_context=True)
def topmenu(context, parent, current_page=None):
    menuitems = parent.objects.in_menu().live()
    return {
        'menuitems': menuitems,
    }
