#!/usr/bin/env python
# vi:fileencoding=utf-8
from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals
from __future__ import print_function


from django.db import models
from modelcluster.fields import ParentalKey, ClusterableModel

from wagtail.wagtailcore.models import Page, Orderable
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from wagtail.wagtailadmin.edit_handlers import (FieldPanel,  # noqa
                                                RichTextFieldPanel,
                                                PageChooserPanel,
                                                InlinePanel,
                                                MultiFieldPanel,
                                                )

from wagtail.wagtailsearch import index

from wagtail.wagtailsnippets.models import register_snippet


class AbstractPerformance(models.Model):
    """
    Critical performance fields and routines here. From old ftheatre
    """
    pass


class AbstractPlace(models.Model):
    """
    Critical place fields and routines from old ftheatre project
    """
    pass


class Performance(Page):
    subtitle = models.CharField("Подзаголовок", blank=True, max_length=255)
    top_image = models.ForeignKey(
        "wagtailimages.Image",
        verbose_name="Заглавная картинка",
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name="+",

    )
    description = RichTextField("Описание", blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('subtitle', classname='full'),
        ImageChooserPanel('top_image'),
        FieldPanel('description'),
        InlinePanel('gallery_items', label="Фотогалерея"),
    ]

    search_fields = Page.search_fields + (
        index.SearchField('descritpion'),
    )


class Place(Page):
    description = RichTextField("Описание", blank=True)
    brief = RichTextField("Как добраться", blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('description'),
        FieldPanel('brief'),
    ]

    search_fields = Page.search_fields + (
        index.SearchField('descritpion'),
    )


class PerformanceIndex(Page):
    """
    Индекная страница: перечислние спектаклей
    """
    intro = models.CharField("Подзаголовок", max_length=255)

    content_panels = Page.content_panels + [
        FieldPanel('intro'),
    ]

    @property
    def performance_list(self):
        perf_list = Performance.objects.child_of(self).live().order_by(
            "-latest_revision_created_at")
        return perf_list

    def get_context(self, *args, **kwargs):
        ctx = super(PerformanceIndex, self).get_context(*args, **kwargs)
        ctx['performance_list'] = self.performance_list
        return ctx


class PlaceIndex(Page):
    """
    Индекная страница: перечислние площадок
    """
    intro = models.CharField("Подзаголовок", max_length=255)

    content_panels = Page.content_panels + [
        FieldPanel('intro'),
    ]


class GalleryItem(Orderable):
    image = models.ForeignKey(
        "wagtailimages.Image",
        related_name="+",
        on_delete=models.CASCADE,
    )

    panels = [
        ImageChooserPanel('image')
    ]

    class Meta:
        abstract = True


class PerformanceGalleryItem(GalleryItem):
    page = ParentalKey('Performance', related_name="gallery_items")


class SocialButton(Orderable):
    slug = models.SlugField(
        "Вид соцсети",
        max_length=25,
        unique=True,
    )

    link = models.URLField(
        "Адрес сообщества",
        blank=True,
    )

    panels = [
        FieldPanel('slug'),
        FieldPanel('link'),
    ]

    class Meta:
        abstract = True


# ----------------------------------------
# --------------[SNIPPETS]----------------
# ----------------------------------------

@register_snippet
class FooterSnippet(ClusterableModel):
    """
    Футер
    """
    slug = models.SlugField("Код", max_length=10, unique=True)
    copyright = models.CharField(
        'Текст копирайта',
        max_length=1024,
        blank=True,
    )
    telephone = models.CharField(
        'Телефон',
        max_length=20,
        blank=True,
    )
    email = models.EmailField(
        'Электропочта',
        blank=True,
    )

    panels = [
        FieldPanel('copyright', classname='full'),
        FieldPanel('telephone'),
        FieldPanel('email'),
        FieldPanel('slug'),
        InlinePanel('social_buttons', label="Социальные группы"),
    ]

    def __str__(self):
        return " | ".join([self.copyright, self.telephone, self.email])

    class Meta:
        verbose_name = 'Футер'
        verbose_name_plural = 'Футеры'


class FooterSnippenSocialButton(SocialButton):
    snippet = ParentalKey('FooterSnippet', related_name='social_buttons')
