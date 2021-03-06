# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-19 14:43
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import modelcluster.fields
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('wagtailcore', '0029_unicode_slugfield_dj19'),
        ('wagtailimages', '0013_make_rendition_upload_callable'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='FooterSnippenSocialButton',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_order', models.IntegerField(blank=True, editable=False, null=True)),
                ('slug', models.SlugField(max_length=25, unique=True, verbose_name='Вид соцсети')),
                ('link', models.URLField(blank=True, verbose_name='Адрес сообщества')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='FooterSnippet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.SlugField(max_length=10, unique=True, verbose_name='Код')),
                ('copyright', models.CharField(blank=True, max_length=1024, verbose_name='Текст копирайта')),
                ('telephone', models.CharField(blank=True, max_length=20, verbose_name='Телефон')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='Электропочта')),
            ],
            options={
                'verbose_name_plural': 'Футеры',
                'verbose_name': 'Футер',
            },
        ),
        migrations.CreateModel(
            name='Performance',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.Page')),
                ('subtitle', models.CharField(blank=True, max_length=255, verbose_name='Подзаголовок')),
                ('description', wagtail.wagtailcore.fields.RichTextField(blank=True, verbose_name='Описание')),
                ('top_image', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='wagtailimages.Image', verbose_name='Заглавная картинка')),
            ],
            options={
                'verbose_name_plural': 'Спектакли',
                'verbose_name': 'Спектакль',
                'ordering': ['title'],
            },
            bases=('wagtailcore.page',),
        ),
        migrations.CreateModel(
            name='PerformanceGalleryItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_order', models.IntegerField(blank=True, editable=False, null=True)),
                ('image', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='wagtailimages.Image')),
                ('page', modelcluster.fields.ParentalKey(on_delete=django.db.models.deletion.CASCADE, related_name='gallery_items', to='theatre.Performance')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='PerformanceIndex',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.Page')),
                ('intro', models.CharField(max_length=255, verbose_name='Подзаголовок')),
            ],
            options={
                'abstract': False,
            },
            bases=('wagtailcore.page',),
        ),
        migrations.CreateModel(
            name='Place',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.Page')),
                ('description', wagtail.wagtailcore.fields.RichTextField(blank=True, verbose_name='Описание')),
                ('address', models.CharField(blank=True, max_length=256, verbose_name='Адрес')),
                ('tel', models.CharField(blank=True, max_length=15, verbose_name='Телефон')),
            ],
            options={
                'verbose_name_plural': 'Площадки',
                'verbose_name': 'Площадка',
                'ordering': ['title'],
            },
            bases=('wagtailcore.page',),
        ),
        migrations.CreateModel(
            name='PlaceAdministrator',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tel', models.CharField(blank=True, max_length=50, verbose_name='Мобильный телефон')),
                ('user', models.OneToOneField(help_text='Менеджер должен быть зарегистирован как персонал сайта', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Зарегистрирован в системе как')),
            ],
            options={
                'verbose_name_plural': 'Менеджеры площадок',
                'verbose_name': 'Менеджер',
            },
        ),
        migrations.CreateModel(
            name='PlaceIndex',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.Page')),
                ('intro', models.CharField(max_length=255, verbose_name='Подзаголовок')),
            ],
            options={
                'abstract': False,
            },
            bases=('wagtailcore.page',),
        ),
        migrations.CreateModel(
            name='YouTubeEmbedSnippet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=512, verbose_name='Название видео')),
                ('video_id', models.CharField(max_length=32, verbose_name='Код видео')),
                ('is_widescreen', models.BooleanField(default=True, help_text='Если включено - 16:9, если нет - 4:3', verbose_name='Широкоформатное видео')),
                ('autoplay', models.BooleanField(default=False, verbose_name='Автовоспроизведение')),
                ('loop', models.BooleanField(default=False, verbose_name='Зациклить видео')),
                ('fs', models.BooleanField(default=True, verbose_name='Разрешить показывать на весь экран')),
                ('rel', models.BooleanField(default=False, verbose_name='Показывать связанные видео')),
                ('player_end', models.PositiveIntegerField(blank=True, help_text='Воспроизведение остановится на указанной секунде. Оставьте пустым, чтобы воспроизвести видео целиком', null=True, verbose_name='Остановиться на')),
                ('player_start', models.PositiveIntegerField(blank=True, help_text='Воспроизведение начнется на указанной секунде. Оставьте пустым, чтобы воспроизвести видео целиком', null=True, verbose_name='Начать с')),
                ('player_playlist', models.CharField(blank=True, help_text='Дополнительные коды через запятую. Будут воспроизведены после основного видео', max_length=1024, verbose_name='Дополнительные видео')),
                ('player_listType', models.CharField(blank=True, choices=[('playlist', 'Плей-лист'), ('search', 'Поисковый запрос'), ('user_uploads', 'Все видео пользователя')], help_text='Выбрать, если используется плей-лист', max_length=12, verbose_name='Тип плейлиста')),
                ('player_list', models.CharField(blank=True, help_text='Указать, если используется плей-лист YouTube', max_length=32, verbose_name='Код плейлиста')),
            ],
            options={
                'verbose_name': 'Видео с YouTube',
            },
        ),
        migrations.AddField(
            model_name='place',
            name='administrator',
            field=models.ForeignKey(blank=True, help_text='Человек, отвечающий за бронирование билетов для данной площадки (должен быть зарегистрирован на сайте)', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='theatre.PlaceAdministrator', verbose_name='Менеджер'),
        ),
        migrations.AddField(
            model_name='place',
            name='top_image',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='wagtailimages.Image', verbose_name='Заглавная картинка'),
        ),
        migrations.AddField(
            model_name='performance',
            name='video',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='theatre.YouTubeEmbedSnippet', verbose_name='Видео с YouTube'),
        ),
        migrations.AddField(
            model_name='footersnippensocialbutton',
            name='snippet',
            field=modelcluster.fields.ParentalKey(on_delete=django.db.models.deletion.CASCADE, related_name='social_buttons', to='theatre.FooterSnippet'),
        ),
    ]
