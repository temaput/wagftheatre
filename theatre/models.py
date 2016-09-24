#!/usr/bin/env python
# vi:fileencoding=utf-8
from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals
from __future__ import print_function

import json

from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

from modelcluster.fields import ParentalKey, ClusterableModel

from wagtail.wagtailcore.models import Page, Orderable, PageManager
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from wagtail.wagtailadmin.edit_handlers import (FieldPanel,  # noqa
                                                RichTextFieldPanel,
                                                PageChooserPanel,
                                                InlinePanel,
                                                MultiFieldPanel,
                                                )
from wagtail.wagtailsnippets.edit_handlers import SnippetChooserPanel

from wagtail.wagtailsearch import index

from wagtail.wagtailsnippets.models import register_snippet

import logging
log = logging.getLogger(__name__)


class ScheduledPManager(PageManager):

    def available_filter(self):
        return {
            'shows_scheduled__showtime__gte': timezone.localtime(
                timezone.now()).date(),
            'shows_scheduled__sold_out': False,
        }

    def get_queryset(self):
        return super(ScheduledPManager, self).get_queryset().filter(
            **self.available_filter()
        ).distinct()

    def resolve_p2p(self, qs, pkey, pk=None, slug=None):
        kwargs = self.available_filter()
        if pk is not None:
            kwargs['shows_scheduled__%s' % pkey] = pk
        else:
            kwargs['shows_scheduled__%s__slug' % pkey] = slug
        log.debug("resolve_p2p kwargs: %s", kwargs)
        return qs.filter(**kwargs).distinct()


class ScheduledPerformanceManager(ScheduledPManager):

    def by_place_field(self, **kwargs):
        qs = self.get_queryset()
        return self.resolve_p2p(qs, 'place', **kwargs)

    def by_place(self, place):
        qs = self.get_queryset()
        return self.resolve_p2p(qs, 'place', pk=place)


class ScheduledPlaceManager(ScheduledPManager):

    def by_performance_field(self, **kwargs):
        qs = self.get_queryset()
        return self.resolve_p2p(qs, 'performance', **kwargs)

    def by_performance(self, performance):
        qs = self.get_queryset()
        return self.resolve_p2p(qs, 'performance', pk=performance)


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
    video = models.ForeignKey(
        'theatre.YouTubeEmbedSnippet',
        verbose_name="Видео с YouTube",
        null=True,
        blank=True,
        related_name='+',
        on_delete=models.SET_NULL
    )
    description = RichTextField("Описание", blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('subtitle', classname='full'),
        ImageChooserPanel('top_image'),
        FieldPanel('description'),
        InlinePanel('gallery_items', label="Фотогалерея"),
        SnippetChooserPanel('video'),
    ]

    search_fields = Page.search_fields + [
        index.SearchField('description'),
    ]

    objects = PageManager()
    scheduled = ScheduledPerformanceManager()

    class Meta:
        ordering = ["title"]
        verbose_name = "Спектакль"
        verbose_name_plural = "Спектакли"


class PlaceAdministrator(models.Model):
    """
    Менеджер площадки
    - привязан к пользователю
    - телефон
    """
    user = models.OneToOneField(
            User,
            verbose_name="Зарегистрирован в системе как",
            help_text="Менеджер должен быть зарегистирован как персонал сайта"
            )
    tel = models.CharField("Мобильный телефон", max_length=50,
            blank=True)

    def first_name(self):
        return self.user.first_name
    first_name.short_description = "Имя"
    def last_name(self):
        return self.user.last_name
    last_name.short_description = "Фамилия"
    def email(self):
        return self.user.email
    first_name = property(first_name)
    last_name = property(last_name)
    email = property(email)

    def __str__(self):
        return "%s %s" % (self.user.first_name,
                self.user.last_name)
    class Meta:
        verbose_name = "Менеджер"
        verbose_name_plural = "Менеджеры площадок"


class Place(Page):
    description = RichTextField("Описание", blank=True)

    top_image = models.ForeignKey(
        "wagtailimages.Image",
        verbose_name="Заглавная картинка",
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    address = models.CharField("Адрес", max_length=256, blank=True)
    tel = models.CharField("Телефон", max_length=15, blank=True)
    administrator = models.ForeignKey(
        "PlaceAdministrator", blank=True, null=True,
        on_delete=models.SET_NULL, related_name='+',
        verbose_name="Менеджер",
        help_text="Человек, отвечающий за бронирование билетов для"
        " данной площадки (должен быть зарегистрирован на сайте)"
    )
    content_panels = Page.content_panels + [
        FieldPanel('description'),
        FieldPanel('address'),
        FieldPanel('tel'),
        FieldPanel('administrator'),
        ImageChooserPanel('top_image'),
    ]

    search_fields = Page.search_fields + [
        index.SearchField('description'),
    ]

    objects = PageManager()
    scheduled = ScheduledPlaceManager()

    class Meta:
        ordering=["title"]
        verbose_name = "Площадка"
        verbose_name_plural = "Площадки"

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

    @property
    def has_top(self):
        return self.social_buttons.count() or self.email

    @property
    def has_bottom(self):
        return self.copyright

    def __str__(self):
        return " | ".join([self.copyright, self.telephone, self.email])

    class Meta:
        verbose_name = 'Футер'
        verbose_name_plural = 'Футеры'


class FooterSnippenSocialButton(SocialButton):
    snippet = ParentalKey('FooterSnippet', related_name='social_buttons')

YOUTUBE_PARAMS = (
    'autoplay',
    'loop',
    'fs',
    'rel',
    'end',
    'start',
    'list',
    'playlist',
    'listType',
)


@register_snippet
class YouTubeEmbedSnippet(models.Model):
    title = models.CharField(
        "Название видео",
        blank=True,
        max_length=512
    )
    video_id = models.CharField(
        "Код видео",
        max_length=32
    )
    is_widescreen = models.BooleanField(
        "Широкоформатное видео",
        default=True,
        help_text="Если включено - 16:9, если нет - 4:3"
    )
    autoplay = models.BooleanField(
        "Автовоспроизведение",
        default=False
    )
    loop = models.BooleanField(
        "Зациклить видео",
        default=False
    )
    fs = models.BooleanField(
        "Разрешить показывать на весь экран",
        default=True
    )
    rel = models.BooleanField(
        "Показывать связанные видео",
        default=False
    )
    player_end = models.PositiveIntegerField(
        "Остановиться на",
        help_text=("Воспроизведение остановится на указанной секунде. "
                   "Оставьте пустым, чтобы воспроизвести видео целиком"),
        blank=True,
        null=True
    )
    player_start = models.PositiveIntegerField(
        "Начать с",
        help_text=("Воспроизведение начнется на указанной секунде. "
                   "Оставьте пустым, чтобы воспроизвести видео целиком"),
        blank=True,
        null=True
    )
    player_playlist = models.CharField(
        "Дополнительные видео",
        help_text=("Дополнительные коды через запятую. "
                   "Будут воспроизведены после основного видео"
                   ),
        max_length=1024,
        blank=True
    )
    player_listType = models.CharField(
        "Тип плейлиста",
        help_text="Выбрать, если используется плей-лист",
        max_length=12,
        choices=(
            ('playlist', 'Плей-лист'),
            ('search', 'Поисковый запрос'),
            ('user_uploads', 'Все видео пользователя'),
        ),
        blank=True
    )
    player_list = models.CharField(
        "Код плейлиста",
        help_text="Указать, если используется плей-лист YouTube",
        max_length=32,
        blank=True
    )

    def get_player_parameters(self):
        return json.dumps({
            'playerVars': {k: getattr(self, 'player_%s' % k)
                           for k in YOUTUBE_PARAMS},
            'videoId': self.video_id,
        }, ensure_ascii=False)

    @property
    def player_autoplay(self):
        return 1 if self.autoplay else 0

    @property
    def player_loop(self):
        return 1 if self.loop else 0

    @property
    def player_rel(self):
        return 1 if self.rel else 0

    @property
    def player_fs(self):
        return 1 if self.fs else 0

    @property
    def has_additional_videos(self):
        return self.player_playlist != ''

    @property
    def has_end(self):
        return self.player_end is not None

    @property
    def has_start(self):
        return self.player_start is not None

    @property
    def has_listType(self):
        return self.player_listType != ''

    def __str__(self):
        return "Видео с YouTube %s (%s)" % (self.title or '__', self.video_id)

    class Meta:
        verbose_name = "Видео с YouTube"
