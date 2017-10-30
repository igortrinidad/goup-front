<template>

    <div>

        <div class="row text-center m-t-10">
            <div class="col-md-12 col-xs-12 col-lg-12">
                <div v-for="(day, $index) in week_days" class="col-wp-calendar-header col-xs-12">
                    <span class="">{{ day.label}}</span>
                </div>
            </div>
        </div>
        <div class="row text-center">
            <div class="teste">
                <div class="col-md-12 col-xs-12 col-lg-12">
                    <div v-for="(day, indexDay) in week_days" class="col-wp-calendar col-xs-12">
                        <span v-for="(slot, indexSlot) in day.slots">
                            <div class="row">
                                <div class="col-xs-12">
                                    <span class="label label-success full m-b-5 t-overflow">
                                        <span class="slot-text">
                                            <span v-show="slot.is_limited">{{slot.quantity}}</span>
                                            <span v-show="!slot.is_limited"><i class="ion-ios-infinite f-14"></i></span>
                                        </span>
                                        <span class="slot-text">{{slot.init}}</span>
                                        <span class="slot-text">{{slot.end}}</span>
                                    </span>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>

    import Moment from 'moment'
    import {extendMoment} from 'moment-range'
    const moment = extendMoment(Moment)

    export default{
        name: 'calendar-workdays-just-show',
        components:{
        },
        props: ['workdays'],
        data(){
            return{
            }
        },

        computed: {
            week_days: function(){
                
                let that = this

                var week_days = [
                    {label: 'Dom',dow: 0, slots: []},
                    {label: 'Seg',dow: 1, slots: []},
                    {label: 'Ter',dow: 2, slots: []},
                    {label: 'Qua',dow: 3, slots: []},
                    {label: 'Qui',dow: 4, slots: []},
                    {label: 'Sex',dow: 5, slots: []},
                    {label: 'Sab',dow: 6, slots: []},
                ]

                var workdays = _.orderBy(that.workdays, ['dow', 'init'], ['asc', 'asc']);

                week_days.forEach(function(day){

                    day.slots = [];
                    workdays.forEach(function(workday){
                        if(workday.dow == day.dow){
                            day.slots.push(workday);
                        }
                    })
                })

                return week_days;
            },
        },


        mounted(){
        },
        methods:{
        },

    }
</script>

<style scoped>


    /* NEW CALENDAR WE PLACES */

    .slot-text{
        display: block;
        height: 12px;
        font-weight: 400;
    }

    .teste{
        overflow-y: auto;
        max-height: 400px;
    }

    .col-wp-calendar-header {
        width: 14.2857%;
        background-color: #E2E2E2;
        padding: 13px 1px 1px 1px;
        border: 1px solid white;
        text-align: center;
        vertical-align: center;
        height: 50px;
        font-weight: 600;
    }

    .col-wp-calendar {
        width: 14.2857%;
        background-color: #F2F2F2;
        padding: 4px 1px 1px 1px;
        border: 1px solid white;
        text-align: center;
        vertical-align: center;
        color: #2C3E54;
    }

    .col-wp-calendar-month {
        width: 33.332%;
        background-color: #F2F2F2;
        padding: 13px 1px 1px 1px;
        border: 1px solid white;
        text-align: center;
        vertical-align: center;
        color: #2C3E54;
        cursor: pointer;
    }

    .calendar-header {
        background: #FA8A3D;
        display: flex;
        align-items: center;
        border-radius: 4px 4px 0 0;
    }

    .cal-legend-helper {
        display: inline-block;
        width: 12px;
        height: 12px;
    }

    .today {
        border: 1px solid #7BCCC6;
    }

    .default {
        background-color: #F2F2F2;
        cursor: not-allowed;
    }

    .default-but-has-reservation{
        cursor: pointer;
    }

    .reservation {
        background-color: #82CB7D;
    }

    .reservation:hover {
        background-color: #1ABC9C;
        cursor: pointer;
    }

    .pre-reservation {
        background-color: #69A7BE;
    }

    .pre-reservation:hover {
        background-color: #1ABC9C;
        cursor: pointer;
    }

    .unavailable {
        background-color: #ED5553;
        cursor: pointer;
    }

    .unavailable:hover {
        background-color: #ED5553;
    }

    .btn.available {
        background-color: #1ABC9C !important;
        font-weight: 900;
    }

    .btn .unavailable {
        background-color: #ED5553;
    }

    .legend-item {
        position: relative;
        float: right;
    }

    .badge-calendar-wp {
        display: block;
        width: 18px;
        height: 17px;
        position: absolute;
        top: 2px;
        right: 5px;
        color: white;
        padding: 3px;
        background-color: #4A5464;
        font-size: 9px;
        border-radius: 50%;
    }



</style>
