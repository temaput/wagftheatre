
class MockData:
    users = {
        'john': dict(
            first_name="John",
            last_name="Doe",
            email="john@mail.tk",
            tel="81234567111",
            children="Blah blah blah"
        ),
        'jane':  dict(
            first_name="Jane",
            last_name="Doe",
            email="jane@mail.tk",
            tel="81234567112",
            children="Blah blah blah bleh"
        )
    }

    initialDataSample = {
        'ScheduleFilter': {
            'fields': [
                {
                    'id': 'performance',
                    'hidden': True,
                    'value': "",
                    'options': None,
                    'label': "Спектакль",
                    'error': None,
                    'helpText': '',
                    'disabled': False,
                    'required': True,
                    'customErrorMessages': None,
                },
                {
                    'id': 'place',
                    'options': [],
                    'value': "",
                    'required': True,
                    'label': 'Площадка',
                    'error': None,
                    'customErrorMessages': {
                        'valueMissing': 'Обязательно выберите площадку'
                    },
                },
            ],
        },
        'ReservationForm': {
            'fields': [
                {
                    'id': 'show',
                    'type': 'hidden',
                    'value': "",
                    'label': "Показ",
                    'options': None,
                    'helpText': '',
                    'disabled': False,
                    'required': True,
                    'customErrorMessages': None,
                },
                {
                    'id': 'email',
                    'label': "E-mail",
                    'type': "email",
                    'required': True,
                    'helpText': '',
                    'disabled': False,
                    'value': "",
                    'customErrorMessages': None,
                    'options': None,
                },
                {
                    'id': 'firstName',
                    'label': "Имя",
                    'value': "",
                },
                {
                    'id': 'lastName',
                    'label': "Фамилия",
                    'value': "",
                },
                {
                    'id': 'tel',
                    'label': "Мобильный телефон",
                    'pattern': "[\d]{5,20}",
                    'value': "",
                },
                {
                    'id': 'childrenSeats',
                    'value': 1,
                    'type': "number",
                    'label': "Дети",
                },
                {
                    'id': 'adultSeats',
                    'value': 1,
                    'type': "number",
                    'label': "Взрослые",
                },
                {
                    'id': 'additionalInfo',
                    'value': "",
                    'type': "text",
                    'label': "Комментарии к бронированию",
                },

            ],
        },
    }
