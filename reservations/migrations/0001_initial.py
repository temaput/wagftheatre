# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-19 14:43
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reservation_date', models.DateTimeField(auto_now_add=True, verbose_name='Дата бронирования')),
                ('seating_adult', models.PositiveSmallIntegerField(default=0, verbose_name='Дополнительные места (взр)')),
                ('seating_child', models.PositiveSmallIntegerField(default=0, verbose_name='Дополнительные места (детск)')),
                ('settled', models.BooleanField(default=False, verbose_name='Бронь выкуплена')),
                ('cancelled', models.BooleanField(default=False, help_text='Установите галочку, чтобы отменить просроченную броньи отправить автоматическое уведомление', verbose_name='Бронь отменена')),
                ('additional_info', models.TextField(blank=True, help_text='Дополнительные сведения, пожелания...', verbose_name='Комментарии к бронированию')),
            ],
            options={
                'get_latest_by': 'reservation_date',
                'verbose_name_plural': 'Брони',
                'verbose_name': 'Бронь',
                'ordering': ['-reservation_date'],
            },
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('showtime', models.DateTimeField(help_text='Когда и во сколько состоится данный показ', verbose_name='Время представления')),
                ('price', models.DecimalField(blank=True, decimal_places=2, help_text='если не заполнить, будет использована стоимость по-умолчанию', max_digits=8, null=True, verbose_name='Стоимость основного билета')),
                ('price_adult', models.DecimalField(blank=True, decimal_places=2, help_text='если не заполнить, будет использована стоимость по-умолчанию', max_digits=8, null=True, verbose_name='Стоимость доп. билета (взр)')),
                ('price_child', models.DecimalField(blank=True, decimal_places=2, help_text='если не заполнить, будет использована стоимость по-умолчанию', max_digits=8, null=True, verbose_name='Стоимость доп. билета (детск)')),
                ('sold_out', models.BooleanField(default=False, help_text='Поставить галочку, когда все билеты будут забронированы', verbose_name='Мест нет')),
                ('external_booking_url', models.URLField(blank=True, help_text='Заполнять только если бронирование производитеся на другом сайте (например, ЦИМ)', verbose_name='Ссылка внешнего бронирования')),
            ],
            options={
                'get_latest_by': 'showtime',
                'verbose_name_plural': 'Расписание (управление)',
                'verbose_name': 'Расписание',
                'ordering': ['showtime'],
            },
        ),
        migrations.CreateModel(
            name='Spectator',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, max_length=50, verbose_name='Имя')),
                ('last_name', models.CharField(blank=True, max_length=50, verbose_name='Фамилия')),
                ('email', models.EmailField(max_length=256, unique=True, verbose_name='E-mail')),
                ('tel', models.CharField(blank=True, max_length=50, verbose_name='Мобильный телефон')),
                ('registered', models.DateField(auto_now_add=True, verbose_name='Дата регистрации')),
                ('children', models.TextField(blank=True, help_text='Укажите возраст и имена детей', verbose_name='Дополнительные сведения')),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Зритель зарегистрирован как')),
            ],
            options={
                'get_latest_by': 'registered',
                'verbose_name_plural': 'Зрители',
                'verbose_name': 'Зритель',
                'ordering': ['-registered'],
            },
        ),
    ]
