from django import template
from theatre.models import FooterSnippet

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
    request = context['request']
    rootpage = request.site.root_page
    full_menu = [
        {'item_data': i, 'subitems': i.get_children().in_menu().live()}
        for i in rootpage.get_children().in_menu().live()
    ]
    snippet = FooterSnippet.objects.filter(slug='default').first()
    return {
        'full_menu': full_menu,
        'has_middle': len(full_menu) > 0,
        'has_top': snippet is not None,
        'footer_data': snippet,
        'has_bottom': snippet is not None and snippet.copyright
    }
