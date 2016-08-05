
from django import template

register = template.Library()

@register.inclusion_tag("tags/topmenu.html", takes_context=True)
def topmenu(context, parent, currentpage=None):
    menuitems = parent.get_children().in_menu().live()
    return {
        'menuitems': menuitems,
        'request': context['request']
    }

@register.inclusion_tag("tags/footer.html", takes_context=True)
def footer(context, currentpage=None):
    return {}
