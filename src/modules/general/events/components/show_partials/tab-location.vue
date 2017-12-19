<template>
    <div id="tab-location" class="card" :class="transition">
        <div class="card-body card-padding">
            <div class="m-t-30 text-center">

                <p class="f-20 f-700">
                    {{ event.place.name }}
                </p>

                <p class="">
                    <i class="ion-ios-location m-r-5"></i>
                    {{ `${ event.city.name } - ${ event.city.state }` }}
                </p>

                <div v-if="event.place.formatted_address">
                    <span>{{ event.place.formatted_address }}</span>
                </div>

                <div class="m-t-10">

                    <p class="f-14 f-700 m-b-5" v-if="!event.place.opening_hours">
                        {{translations.open_hours_not_found}}
                    </p>

                    <div v-if="event.place.opening_hours">
                        <p class="f-14 f-700 m-b-5">
                            {{translations.open_now_title}}
                        </p>
                        <button class="btn btn-sm btn-danger" v-if="!event.place.opening_hours.open_now">{{translations.open_now_result_no}}</button>
                        <button class="btn btn-sm btn-secondary" v-if="event.place.opening_hours.open_now">{{translations.open_now_result_yes}}</button>

                        <p class="f-14 f-700 m-t-10">
                            {{translations.open_hours}}
                        </p>

                        <ul class="list-group">
                            <li class="list-group-item f-14" v-for="(dow, indexPeriod) in event.place.opening_hours.weekday_text">
                                {{ dow }}
                            </li>
                        </ul>

                    </div>


                </div>

                <div class="m-t-20">
                    <button class="btn btn-primary" @click="openMapsExternally()">{{ translations.open_maps }}</button>
                </div>

                <div class="row m-t-30">
                    <div class="col-sm-12">
                        <div class="rounded">
                            <GmapMap
                                :center="{ lat: event.place.geometry.location.lat, lng: event.place.geometry.location.lng }"
                                :zoom="map.zoom"
                                :options="map.options"
                                style="width: 100%; height: 300px"
                            >

                                <GmapMarker
                                    :position="{ lat: event.place.geometry.location.lat, lng: event.place.geometry.location.lng }"
                                    :title="event.place.name"
                                    :clickable="true"
                                    :icon="map.icon"
                                >
                                </GmapMarker>

                            </GmapMap>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import moment from 'moment';

    import * as translations from '@/translations/events/show'

    export default {
        name: 'tab-location',

        components: {
        },

        props: {
            event: {
                type: Object,
                required: true
            },
            transition: {
                type: String,
                default: 'transition'
            }
        },

        data () {
            return {
                placeholder: true,
                current_day_of_week: moment().day(),
                map: {
                    mapPlaces: [],
                    enabled: false,
                    zoom: 16,
                    autocomplete: '',
                    icon: 'https://s3.amazonaws.com/goup-assets/img/map_icon.svg',
                    options: {
                        scrollwheel: false,
                        styles: [
                            {
                                featureType: 'poi',
                                stylers: [{visibility: 'off'}]
                            },
                            {
                                featureType: 'transit',
                                elementType: 'labels.icon',
                                stylers: [{visibility: 'off'}]
                            }
                        ]
                    },
                }
            }
        },

        computed: {
            ...mapGetters(['language', 'checkIOS', 'getUserLastGeoLocation']),

            'translations': function() {

                if (this.language === 'en') {
                    return translations.en
                }
                if (this.language === 'pt') {
                    return translations.pt
                }
            },

        },

        mounted(){
            var that = this
            //setTimeout(function() {that.checkOpeningHours()}, 3000);
        },

        watch: {
            'transition': function(value) {
                let that = this
                if (that.transition === 'fadeout') {
                    setTimeout(() => $('#tab-location').css({ display: 'none' }), 300);
                } else {
                    setTimeout(() => $('#tab-location').css({ display: 'block' }), 300);
                }
            }
        },

        methods: {
            openMapsExternally: function(){
                let that = this

                var url = `https://www.google.com/maps/dir/?api=1&origin=` +
                that.getUserLastGeoLocation.lat + ',' +
                that.getUserLastGeoLocation.lng +
                '&destination=' + encodeURI(that.event.place.name) +
                '&destination_place_id=' + that.event.place.place_id +
                '&travelmode=driving';

                window.open(url, '_system');

            },


            checkOpeningHours: function(){
                let that = this

                that.openingHours = [];

                for (var m = moment(); m.isBefore(moment().add(6, 'days')); m.add(1, 'days')) {

                    that.openingHours.push(
                        {
                            dow: m.day(),
                            period: null
                        }
                    );

                }

                that.event.place.opening_hours.periods.forEach( function(period){

                    console.log(that.openingHours)
                    console.log(period);
                    var index = that.openingHours.findFromAttr('dow', period.open.day)

                    console.log(index);
                    that.openingHours[index].period = JSON.parse(JSON.stringify(period));
                })

            },
        }
    }
</script>

<style scoped>
    .rounded {
        border-radius: 6px;
        overflow: hidden !important;
        position: relative;
        z-index: 10;
    }

    .btn-open-now-closed{
        background-color: red;
    }

    .btn-open-now-open{
        background-color: green;
    }
</style>
