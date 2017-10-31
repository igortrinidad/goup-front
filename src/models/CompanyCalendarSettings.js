export default {
    calendar_is_public: false,
    calendar_is_active: false,
    workday_is_active: false,
    advance_schedule: '24', //VALOR EM HORAS DE ANTECEDENCIA QUE UM HORARIO PODE SER AGENDADO PELO CLIENTE
    advance_reschedule: '3', //VALOR EM HORAS ED ANTECEDENCIA QUE UM HORARIO PODE SER REMARCADO OU CANCELADO PELO CLIENTE
    points_to_earn_bonus: '500',
    available_dates_range: [],
    available_days_config: [
        {
            name: 'monday',
            label: 'Segunda-feira',
            day_of_week: 1,
            hour: null,
            allday: true,
            unavailable: false
        },
        {
            name: 'tuesday',
            label: 'Terça-feira',
            day_of_week: 2,
            hour: null,
            allday: true,
            unavailable: false
        },
        {
            name: 'wednesday',
            label: 'Quarta-feira',
            day_of_week: 3,
            hour: null,
            allday: true,
            unavailable: false
        },
        {
            name: 'thursday',
            label: 'Quinta-feira',
            day_of_week: 4,
            hour: null,
            allday: true,
            unavailable: false
        },
        {
            name: 'friday',
            label: 'Sexta-feira',
            day_of_week: 5,
            hour: null,
            allday: true,
            unavailable: false
        },
        {
            name: 'saturday',
            label: 'Sábado',
            day_of_week: 6,
            hour: null,
            allday: true,
            unavailable: false
        },
        {
            name: 'sunday',
            label: 'Domingo',
            day_of_week: 7,
            hour: null,
            allday: true,
            unavailable: false
        }
    ]
}

export function clearPlaceCalendarSettingsObject() {
    return {
        calendar_is_public: false,
        calendar_is_active: false,
        workday_is_active: false,
        advance_schedule: '24', //VALOR EM HORAS DE ANTECEDENCIA QUE UM HORARIO PODE SER AGENDADO PELO CLIENTE
        advance_reschedule: '3', //VALOR EM HORAS ED ANTECEDENCIA QUE UM HORARIO PODE SER REMARCADO OU CANCELADO PELO CLIENTE
        points_to_earn_bonus: '500',
        available_dates_range: [],
        available_days_config: [
            {
                name: 'sunday',
                label: 'Domingo',
                day_of_week: 0,
                hour: null,
                allday: true,
                unavailable: false
            },
            {
                name: 'monday',
                label: 'Segunda-feira',
                day_of_week: 1,
                hour: null,
                allday: true,
                unavailable: false
            },
            {
                name: 'tuesday',
                label: 'Terça-feira',
                day_of_week: 2,
                hour: null,
                allday: true,
                unavailable: false
            },
            {
                name: 'wednesday',
                label: 'Quarta-feira',
                day_of_week: 3,
                hour: null,
                allday: true,
                unavailable: false
            },
            {
                name: 'thursday',
                label: 'Quinta-feira',
                day_of_week: 4,
                hour: null,
                allday: true,
                unavailable: false
            },
            {
                name: 'friday',
                label: 'Sexta-feira',
                day_of_week: 5,
                hour: null,
                allday: true,
                unavailable: false
            },
            {
                name: 'saturday',
                label: 'Sábado',
                day_of_week: 6,
                hour: null,
                allday: true,
                unavailable: false
            }
        ]
    }
}
