export function defaultBar(data) {
    return {
        type: 'bar',
        data: data,
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },

                }],
            }
        }
    }
}

export function horizontalBar(data) {
    return {
        type: 'horizontalBar',
        data: data,
        options: {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    label: {
                        display: false
                    },
                }],
                yAxes: [{
                    display: false,
                    stacked: true,
                }]
            }

        }
    }
}

export function pie(data) {
    return {
        type: 'pie',
        data: data,
        options: {
        }
    }
}

export function cleanInsightsByWeek() {
    return {
        labels: ['Semana: 1', 'Semana: 2', 'Semana: 3', 'Semana: 4', 'Semana: 5'],
        datasets: [
            {
                label: 'Confirmado',
                data: [0, 0, 0, 0, 0],
                backgroundColor: 'rgba(0, 163, 105, .7)',
                borderColor: '#00A369',
                borderWidth: 0
            },
            {
                label: 'Pendente',
                data: [0, 0, 0, 0, 0],
                backgroundColor: 'rgba(204, 204, 204, .7)',
                borderColor: '#CCCCCC',
                borderWidth: 0
            },
            {
                label: 'Cancelado',
                data: [0, 0, 0, 0, 0],
                backgroundColor: 'rgba(255, 204, 95, .7)',
                borderColor: '#FFCC5F',
                borderWidth: 0
            },
            {
                label: 'Atrasado',
                data: [0, 0, 0, 0, 0],
                backgroundColor: 'rgba(225, 74, 69, .7)',
                borderColor: '#E14A45',
                borderWidth: 0
            }
        ]
    }
}
export function cleanInsightsByCategory() {
    return {
        labels: [],
        datasets: [
            {
                label: '',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 0
            }
        ]
    }
}
export function cleanInsightsByStatus() {
    return {
        labels: ['Confirmadas', 'Pendentes', 'canceladas', 'atrasadas'],
        datasets: [
            {
                label: '',
                data: [],
                backgroundColor: ['rgba(0, 163, 105, .7)', 'rgba(204, 204, 204, .7)', 'rgba(255, 204, 95, .7)', 'rgba(225, 74, 69, .7)'],
                borderColor: ['#00A369', '#CCCCCC', '#FFCC5F', '#E14A45'],
                borderWidth: 2
            }
        ]
    }
}
