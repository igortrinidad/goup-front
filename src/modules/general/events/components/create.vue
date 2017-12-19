<template>
    <div class="first-container">

        <main-header
            :title="translations.title"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main">

                <div class="container bg m-t-20 text-center">

                    <form>
                        <!-- Event Informations -->
                        <div class="border-inside-card default m-b-20">
                            <!-- Name -->
                            <div class="form-group">
                                <label class="f-700 f-primary" for="event-name">{{ translations.form.event_name }}</label>
                                <input
                                    type="text"
                                    id="event-name"
                                    class="form-control"
                                    v-model="event.name"
                                    :placeholder="translations.form.event_name"
                                >
                            </div>
                            <!-- / Name -->

                            <!-- Name -->
                            <div class="form-group">
                                <label class="f-700 f-primary" for="event-description">{{ translations.form.event_description }}</label>
                                <textarea
                                    type="text"
                                    id="event-description"
                                    class="form-control"
                                    v-model="event.description"
                                    :placeholder="translations.form.event_description"
                                >
                                </textarea>
                            </div>
                            <!-- / Name -->

                            <!-- Recurrency types -->
                            <div class="form-group">
                                <label class="f-700 f-primary">{{ translations.form.recurrency_type }}</label>

                                <span class="cursor-pointer" @click="handleDateUninformed">
                                        <i :class="{
                                            'f-20': true,
                                            'ion-ios-circle-filled': event.date_uninformed ,
                                            'ion-ios-circle-outline': !event.date_uninformed
                                        }"></i>
                                        {{translations.form.date_uninformed}}
                                 </span>

                                <ul class="list-group list-rounded m-t-10 m-0 text-left" v-if="!event.date_uninformed">
                                    <li
                                        class="list-group-item transparent"
                                        :class="{ 'active': currentRecurrencyType === recurrency_type }"
                                        @click.prevent="handleCurrencyType(recurrency_type)"
                                        v-for="recurrency_type in recurrency_types"
                                    >
                                        {{ recurrency_type[`label_${language}`] }}
                                        <i
                                            :class="{
                                                'icon-select m-l-10 f-20': true,
                                                'ion-ios-circle-filled': currentRecurrencyType === recurrency_type,
                                                'ion-ios-circle-outline': currentRecurrencyType !== recurrency_type
                                            }"
                                        >
                                        </i>
                                    </li>
                                </ul>
                            </div>
                            <!-- /Recurrency types -->


                            <div class="form-group" v-if="recurrencyTypeSelected != ''">
                                <label class="f-700 f-primary">{{ translations.form.selected_recurrency_type }}</label>
                                <p><strong>{{recurrencyTypeSelected}}</strong></p>
                            </div>

                            <div class="form-group">
                                <label class="f-700 f-primary" for="event-time">{{ translations.form.event_time }}</label>

                                <span class="cursor-pointer" @click="event.time_uninformed = !event.time_uninformed ">
                                        <i :class="{
                                            'f-20': true,
                                            'ion-ios-circle-filled': event.time_uninformed ,
                                            'ion-ios-circle-outline': !event.time_uninformed
                                        }"></i>
                                        {{translations.form.time_uninformed}}
                                 </span>

                                <input
                                    type="tel"
                                    id="event-time"
                                    class="form-control"
                                    v-model="event.time"
                                    :placeholder="translations.form.event_time"
                                    data-mask="00:00"
                                    v-if="!event.time_uninformed"
                                    @blur="validateTime"
                                    ref="event_time"
                                >
                            </div>


                            <div class="form-group">
                                <label class="f-700 f-primary">{{ translations.form.event_value }}</label>

                                 <span class="cursor-pointer" @click="event.value_uninformed = !event.value_uninformed ">
                                        <i :class="{
                                            'f-20': true,
                                            'ion-ios-circle-filled': event.value_uninformed ,
                                            'ion-ios-circle-outline': !event.value_uninformed
                                        }"></i>
                                        {{translations.form.value_uninformed}}
                                 </span>

                                <vue-numeric
                                    type="tel"
                                    id="event-value"
                                    class="form-control m-t-10"
                                     :currency="language == 'en'? '$': 'R$'" :min="0"
                                     :separator="language == 'en'? ',': '.'" :precision="2"
                                     v-model="event.value"
                                     :placeholder="translations.form.event_value"
                                     v-if="!event.value_uninformed"
                                ></vue-numeric>
                            </div>

                        </div>
                        <!-- /Event Informations -->

                        <!-- Categories -->
                        <div class="border-inside-card default m-b-20">
                            <div class="row m-t-20 m-b-20">
                                <div class="col-sm-12 text-center">

                                    <label class="f-700 f-primary">{{ translations.form.categories }}</label>

                                    <button class="btn btn-primary" @click.prevent="openModalCategories()">
                                        {{ translations.form.categories_button }}
                                    </button>

                                    <div class="category-row m-t-30" v-show="event.categories.length">
                                        <button
                                            class="btn btn-default btn-sm m-r-5"
                                            v-for="(category, $index) in getCategories"
                                            v-if="event.categories.indexOf(category.id) > -1"
                                            @click.prevent="toggleCategory(category.id)"
                                        >
                                            {{ language === 'pt' ? category.name_pt : category.name_en }}
                                            <i class="ion-close-round m-l-5"></i>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <!-- / Categories -->

                        <!-- Place Informations -->
                        <div class="border-inside-card default">

                            <!-- Google Place Select -->
                            <div class="form-group m-t-15">
                                <label class="f-700 f-primary" for="place-address">{{ translations.form.google_select }}</label>
                                <GmapAutocomplete
                                    :value="event.place.name"
                                    class="form-control"
                                    :select-first-on-enter="true"
                                    @place_changed="setPlaceAdress"
                                    :placeholder="translations.form.google_select"
                                    :options="{ language: 'pt-BR', componentRestrictions: { country: 'br' } }"
                                >
                                </GmapAutocomplete>

                                <button
                                    type="button"
                                    class="btn btn-sm btn-primary transparent m-t-10"
                                    @click="clearSearchAndPlace()"
                                >
                                    {{ translations.form.clear_search }}
                                </button>
                            </div>


                        </div>

                        <div v-if="interactions.placeSelected" class="border-inside-card default m-t-20">

                            <!-- Name -->
                            <div class="form-group">
                                <label class="f-700 f-primary" for="place-name">{{ translations.form.place_name }}</label>
                                <input
                                    type="text"
                                    id="place-name"
                                    class="form-control"
                                    v-model="event.place.name"
                                    :placeholder="translations.form.place_name"
                                    disabled
                                >
                            </div>
                            <!-- / Name -->

                            <!-- Address -->
                            <div class="form-group">
                                <label class="f-700 f-primary" for="place-address">{{ translations.form.address }}</label>
                                <input
                                    type="text"
                                    id="place-address"
                                    class="form-control"
                                    v-model="event.place.address"
                                    :placeholder="translations.form.address"
                                    disabled
                                >
                            </div>
                            <!-- / Address -->

                            <!-- Phone -->
                            <div class="form-group">
                                <label class="f-700 f-primary" for="place-phone">{{ translations.form.phone }}</label>
                                <input
                                    type="text"
                                    id="place-phone"
                                    class="form-control"
                                    :placeholder="translations.form.phone"
                                    v-model="event.place.phone"
                                    disabled
                                >
                            </div>
                            <!-- / Phone -->

                        </div>
                        <!-- /Place Informations -->

                        <!-- Photos -->
                        <div class="form-group border-inside-card default m-t-20">

                            <label class="f-700 f-primary" for="subcategory">{{ translations.form.photos }}</label>

                            <p class="" for="subcategory">{{ translations.form.photos_subtitle }}</p>

                            <div class="row" v-if="isMobile">
                                <div class="col-sm-12">
                                    <div class="col-sm-6">
                                        <div class="new-image m-t-30 m-b-30 cursor-pointer" @click="getPicture()">
                                            <i class="ion-ios-camera-outline"></i>
                                            <span>{{ translations.form.takePicture }}</span>
                                        </div>

                                    </div>
                                    <div class="col-sm-6">
                                        <div class="new-image m-t-30 m-b-30 cursor-pointer" @click="getCameraRoll()">
                                            <i class="ion-ios-film-outline"></i>
                                            <span>{{ translations.form.openGalery }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="new-image m-t-30 m-b-30 cursor-pointer" @click="showPhotoUploader = true"  v-if="!isMobile">
                                <i class="ion-plus-round"></i>
                                <span>{{ translations.form.upload_image }}</span>
                            </div>

                            <div class="row">
                                <div class="col-md-3 col-xs-6" v-if="interactions.showPhotoPlaceholder">
                                    <div class="card-placeholder placeholder-effect">
                                        <p class="f-default m-t-30" style="vertical-align: middle;">Loading</p>
                                    </div>
                                </div>
                                <p class="f-300" v-if="!event.photos.length">{{translations.form.photo_cover_warning}}</p>

                                <!-- USER PHOTOS -->
                                <div class="col-md-3 col-sm-6" v-for="photo in event.photos">
                                    <span class="cursor-pointer" @click="setAsCover(photo)">
                                        <i :class="{
                                            'f-20': true,
                                            'ion-ios-circle-filled': photo.is_cover,
                                            'ion-ios-circle-outline': !photo.is_cover
                                        }"></i>
                                        {{translations.form.setAsCover}}
                                    </span>

                                    <img  class="img-responsive thumbnail m-t-10 m-b-10" :src="photo.photo_url">

                                    <span class="label label-primary small cursor-pointer" @click.prevent="removeImage(photo.id)">{{translations.form.removeImage}}</span>
                                </div>

                                <!-- GOOGLE PHOTOS -->
                                <div class="col-md-3 col-sm-6" v-for="photo in event.google_photos_selected">
                                    <span class="cursor-pointer" @click="setAsCover(photo)">
                                        <i :class="{
                                            'f-20': true,
                                            'ion-ios-circle-filled': photo.is_cover,
                                            'ion-ios-circle-outline': !photo.is_cover
                                        }"></i>
                                        {{translations.form.setAsCover}}
                                    </span>

                                    <img  class="img-responsive thumbnail m-t-10 m-b-10" :src="photo.photo_url">

                                    <span class="label label-primary small cursor-pointer" @click.prevent="tooglePhotoFromGoogle(photo)">{{translations.form.removeImage}}</span>
                                </div>
                            </div>

                        </div>
                        <!-- / Photos -->

                        <!-- Google Photos -->
                        <div class="form-group border-inside-card default m-t-20">

                            <label class="f-700 f-primary" for="subcategory">{{ translations.form.google_photos_title }}</label>

                            <div class="vertical-row">
                                <div class="photo-google text-center" v-for="photo in google_photos">
                                    <img  class="img-responsive thumbnail m-b-5" :src="photo.photo_url" @click.prevent="tooglePhotoFromGoogle(photo)">
                                    <p class="f-12">{{translations.photo_quality.title}} {{translations.photo_quality[photo.quality]}}</p>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12" v-if="interactions.google_photos_select_photo">
                                    <div class="card-placeholder placeholder-effect">
                                        <p class="f-default m-t-30" style="vertical-align: middle;">Loading</p>
                                    </div>
                                </div>
                                <div class="col-md-12" v-if="!google_photos.length">
                                    <p class="f-300" >{{translations.form.google_photos_empty}}</p>
                                </div>
                            </div>

                        </div>
                        <!-- / Google Photos -->



                        <div class="form-group m-t-20">

                            <button
                                type="button"
                                class="btn btn-primary btn-block transparent"
                                @click="storeEvent()"
                                :disabled="!event.name || !event.description || !event.categories.length || !event.date_uninformed && !event.recurrency_type  || !event.google_place_id || interactions.invalid_time || checkIfHasSomePhoto()"
                            >
                                {{ translations.submit }}
                            </button>

                        </div>

                    </form>

                </div>

                <!-- VUE Picker -->
                <vue-picker
                    ref="dowpicker"
                    :title="translations.form.day_of_week"
                    :cancel-txt="translations.cancel"
                    :confirm-txt="translations.confirm"
                    :data="[weekdays]"
                    @select="selectDow"
                    @cancel="cancelDow"
                />

                <vue-picker
                    ref="monthlypicker"
                    :title="translations.form.monthly"
                    :cancel-txt="translations.cancel"
                    :confirm-txt="translations.confirm"
                    :data="[monthWeeks, weekdays]"
                    @select="selectMonthly"
                    @cancel="cancelMonthly"
                />

                <vue-picker
                    ref="datepicker"
                    :title="translations.form.event_date"
                    :cancel-txt="translations.cancel"
                    :confirm-txt="translations.confirm"
                    :data="[monthDays, months, years]"
                    :selected-index.sync="dateSelectedIndex"
                    @select="selectDate"
                    @cancel="cancelDate"
                    @change="changeDate"
                />
                <!-- /VUE Picker -->

                <!-- MODAL SELECT TYPES -->
                <div id="modal-select-type" class="modal we-fade" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title">{{ translations.form.categories_max }}</h3>
                            </div>
                            <!-- Modal Body -->
                            <div class="modal-body p-10">

                                <div class="col-row">
                                    <div class="col" v-for="category in getCategories">
                                        <div class="card-cat text-center"
                                            @click.prevent="toggleCategory(category.id)"
                                            :class="{
                                                'bounce': event.categories.indexOf(category.id) > -1
                                            }">
                                            <div class="p-5">
                                                <img :src="category.photo_url" width="60%">
                                                <p class="f-default f-12 m-t-10">{{category['name_' + language]}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <!-- / Modal Body -->
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal">{{ translations.close }}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / MODAL SELECT TYPES -->
            </div>
        </transition>

        <photo-uploader
            :isvisible.sync="showPhotoUploader"
            :send-action="storeImage"
            @close-photo-uploader-modal="handleUploaderVisibility"
        ></photo-uploader>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    const moment  = require('moment')

    import mainHeader from '@/components/main-header'

    import * as translations from '@/translations/events/create.js'
    import { cleanEventModel } from '@/models/Event'
    import Vue from 'vue'
    import VueNumeric from 'vue-numeric'
    import photoUploader from '@/components/photo-uploader.vue'
    import {apiUrl} from '@/config/'
    import vuePicker from 'vue-bspicker'

    export default {
        name: 'events-create',

        components: {
            mainHeader,
            VueNumeric,
            photoUploader,
            vuePicker
        },

        data () {
            return {
                isMobile: false,
                showPhotoUploader: false,
                interactions: {
                    placeSelected: false,
                    showPhotoPlaceholder: false,
                    invalid_time: false,
                },
                event: cleanEventModel(),
                categories: [],
                google_photos: [],
                not_valid: [],
                currentRecurrencyType: '',
                newTag: {
                    name: ''
                },
                recurrency_types:[
                    {label_en: 'Daily', label_pt: 'Diário', value: 'daily'},
                    {label_en: 'Weekly', label_pt: 'Semanal', value: 'weekly'},
                    {label_en: 'Monthly', label_pt: 'Mensal', value: 'monthly'},
                    {label_en: 'Date', label_pt: 'Data', value: 'date'}
                ],
                monthDays:[],
                dateSelectedIndex:[],
                recurrencyTypeSelected: ''
            }
        },

        computed: {
            ...mapGetters(['language', 'AuthToken', 'getCategories']),

            'translations': function() {

                if (this.language === 'en') {
                    return translations.en
                }
                if (this.language === 'pt') {
                    return translations.pt
                }
            },

            weekdays(){
                moment.locale(this.language)

                let weekDays = moment.weekdays(true)

                let result = []

                weekDays.map((dayName, dow) =>{
                    result.push({value: dow, text: dayName})
                })

                return result
            },

            months(){
                moment.locale(this.language)

                let months = moment.months()

                let result = []

                months.map((monthName, monthNumber) =>{
                    result.push({value: monthNumber, text: monthName})
                })

                return result
            },

            months(){
                moment.locale(this.language)

                let months = moment.months()

                let result = []

                months.map((monthName, monthNumber) =>{
                    result.push({value: (monthNumber+1).toString().padStart(2, '0'), text: monthName})
                })

                return result
            },

            monthWeeks(){
                let monthWeeks = [
                    {value: 1, text: this.translations.monthWeeks.first},
                    {value: 2, text: this.translations.monthWeeks.second},
                    {value: 3, text: this.translations.monthWeeks.third},
                    {value: 4, text: this.translations.monthWeeks.fourthy},
                    {value: 5, text: this.translations.monthWeeks.fifth},
                ]

                return monthWeeks
            },

            years(){
                let years = []

                const nowYear = (new Date()).getFullYear()

                for (let i = 1991; i <= nowYear+5; i++) {
                    years.push({value: i, text: i})
                }

                return years
            }
        },

        mounted(){
            if(window.cordova){
                this.isMobile = true
            }

            this.handleMonthDays()
        },

        methods: {
            ...mapActions(['setLoading', 'addNewEvent']),

            testePlaceId: function(){
                let that = this

                var service = new google.maps.places.PlacesService(document.getElementById('teste'));

                service.getDetails({
                  placeId: that.place.google_place_id
                }, function(place, status) {
                  if (status === google.maps.places.PlacesServiceStatus.OK) {

                        console.log(place);

                  }
                });

            },

            clearSearchAndPlace: function(){
                let that = this

                that.event.place = {};
                that.interactions.placeSelected = false;

            },

            validField(value, inputName) {
                const index = this.not_valid.indexOf(inputName);
                if (!value) {
                    errorNotify('', this.translations.form.required)
                    if (index < 0) {
                        this.not_valid.push(inputName)
                    }
                } else {
                    if(index > -1){
                        this.not_valid.splice(index, 1)
                    }
                }
            },

            setPlaceAdress(place) {
                let that = this

                that.google_photos = [];

                if (place.geometry !== undefined) {

                    that.interactions.placeSelected = true;
                    that.event.google_place_id = place.place_id;
                    that.event.place.name = place.name;
                    that.event.place.address = place.vicinity;
                    that.event.place.phone = place.formatted_phone_number;

                    that.event.lat = place.geometry.location.lat()
                    that.event.lng = place.geometry.location.lng()

                    place.photos.forEach( function(photo){

                        var x = photo.width;
                        switch(true) {
                            case (x < 600):
                                var quality = 'low';
                                break;
                            case (x > 601 && x < 1200):
                                var quality = 'medium';
                                break;
                            default:
                                var quality = 'high';
                        }

                        that.google_photos.push(
                            {
                                id: photo.getUrl({'maxWidth': 1000, 'maxHeight': 1000}),
                                is_cover: false,
                                event_id: that.event.id,
                                photo_url: photo.getUrl({'maxWidth': 1000, 'maxHeight': 1000}),
                                quality: quality
                            }
                        );
                    });

                    place.address_components.map((current) =>{
                        current.types.map((type) => {
                            if(type == 'administrative_area_level_1'){
                                that.event.city.state = current.short_name
                            }
                            if(type == 'administrative_area_level_2'){
                                that.event.city.name  = current.short_name
                            }
                        })
                    })

                    that.getCityCoordinates()

                }
            },

            getCityCoordinates(){

                let that = this

                let geocoder = new google.maps.Geocoder;

                geocoder.geocode({
                    'address': `${that.event.city.name} - ${that.event.city.state}`
                }, function (results, status) {

                    if (status === google.maps.GeocoderStatus.OK) {

                        if (results) {
                            that.event.city.lat = results[0].geometry.location.lat()
                            that.event.city.lng = results[0].geometry.location.lng()

                        } else {
                            errorNotify('', 'Não foi possivel definir a cidade.');
                        }
                    }
                });

            },

            storeEvent() {
                let that = this

                this.checkAtLeastOneCover();

                that.$http.post('event/store', that.event)
                    .then(function (response) {
                        that.addNewEvent(response.data.event)
                        that.event = cleanEventModel()
                        successNotify('', that.translations.success)
                        that.$router.push({path: '/ranking'})
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            handleUploaderVisibility(visibility){
                let that = this
                that.showPhotoUploader = visibility
            },

            //Get from device camera
            getPicture: function () {
                let that = this

                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 50,
                    destinationType: Camera.DestinationType.FILE_URI
                });

                function onSuccess(imageURI) {

                    that.storeImageMobile(imageURI);

                }

                function onFail(message) {
                    alert('Failed because: ' + message);
                }
            },

            //Camera roll
            getCameraRoll: function(){
                let that = this

                navigator.camera.getPicture(function cameraSuccess(imageURI) {

                        that.storeImageMobile(imageURI);

                    },
                    function (message) {
                        errorNotify('', message)
                    },
                    {
                        quality: 50,
                        destinationType: navigator.camera.DestinationType.FILE_URI,
                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                    }
                )
            },

            storeImageMobile(imageURI) {
                let that = this

                var win = function (response) {

                    let api_response = JSON.parse(response.response)

                    if(!that.event.photos.length){
                        api_response.photo.is_cover = true
                    }

                    that.event.photos.push(api_response.photo)
                    that.interactions.showPhotoPlaceholder = fasle
                    successNotify('', 'Imagem enviada com sucesso')

                }

                var fail = function (error) {

                    that.interactions.showPhotoPlaceholder = false
                    errorNotify('', 'Houve um erro ao enviar a imagem')
                    console.log(error);
                }

                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = "myphoto.jpg";
                options.mimeType = "image/jpeg";
                options.headers = {'Authorization': that.AuthToken};

                var params = new Object();

                params.event_id = that.event.id;

                options.params = params;
                var ft = new FileTransfer();

                that.interactions.showPhotoPlaceholder = true

                ft.upload(imageURI, encodeURI(`${apiUrl}/event/photo/upload`), win, fail, options);
            },

            storeImage: function(imageData){

                let that = this

                that.interactions.showPhotoPlaceholder = true

                let formData = new FormData();
                formData.append('event_id', that.event.id)
                formData.append('file', imageData.file)

                that.$http.post('event/photo/upload', formData , {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(function (response) {

                        if(!that.event.photos.length){
                            response.data.photo.is_cover = true
                        }

                        that.event.photos.push(response.data.photo)

                        that.interactions.showPhotoPlaceholder = false

                    })
                    .catch(function (error) {
                        console.log(error)
                        that.interactions.showPhotoPlaceholder = false
                    });
            },

             setAsCover(photoObj){
                let that = this

                that.event.photos.map((photo) => {
                    photo.is_cover = false

                    if(photo.id == photoObj.id ){
                        photo.is_cover = true
                    }
                });

                that.event.google_photos_selected.map((photo) => {
                    photo.is_cover = false

                    if(photo.id == photoObj.id ){
                        photo.is_cover = true
                    }
                })
            },

            removeImage(photo_id){
                let that = this


                that.$http.get(`event/photo/destroy/${photo_id}`)
                    .then(function (response) {

                        that.event.photos = that.event.photos.filter(function (photo) {
                            return photo.id != photo_id;
                        });

                        that.checkAtLeastOneCover();

                        successNotify('', 'Imagem removida com sucesso')
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            handleCurrencyType(recurrency_type){
                this.recurrencyTypeSelected = ''
                this.currentRecurrencyType = recurrency_type
                this.event.recurrency_type = recurrency_type.value

                if(recurrency_type.value == 'daily'){
                    this.recurrencyTypeSelected = this.translations.daily
                }

                if(recurrency_type.value == 'weekly'){
                    this.$refs.dowpicker.show();
                }

                if(recurrency_type.value == 'monthly'){
                    this.$refs.monthlypicker.show();
                }

                if(recurrency_type.value == 'date'){
                    this.$refs.datepicker.show();
                    this.initSelectedDateIndex()
                }
            },

            toggleCategory(category_id){
                let that = this
                var index = _.indexOf(that.event.categories, category_id);

                if(index !== -1) {
                    that.event.categories.splice(index, 1);
                } else {

                    if(that.event.categories.length >=3){
                        infoNotify('', that.translations.form.categories_max_warning)
                        return false
                    }
                    that.event.categories.push(category_id);
                }
            },


            selectDow(){
                this.event.recurrency_info = this.$refs.dowpicker.pickerSelectedItem[0].value
                this.recurrencyTypeSelected =  this.weekdays[this.event.recurrency_info].text
            },

            cancelDow(){
                this.event.recurrency_info = null
            },


            selectMonthly (){
                this.event.recurrency_info = `${this.$refs.monthlypicker.pickerSelectedItem[0].value}-${this.$refs.monthlypicker.pickerSelectedItem[1].value}`

                let values = this.event.recurrency_info.split('-')
                let month_index = _.findIndex(this.monthWeeks, {value: parseInt(values[0])})

                this.recurrencyTypeSelected =  `${this.monthWeeks[month_index].text} - ${this.weekdays[values[1]].text}`

            },

            cancelMonthly(){
                this.event.recurrency_info = null
            },

            initSelectedDateIndex(){
                let monthIndex = _.findIndex(this.months, {value: moment().format('MM')})
                let yearIndex = _.findIndex(this.years, {value: parseInt(moment().format('YYYY'))})
                let dayIndex = _.findIndex(this.monthDays, {value: moment().format('DD')})

                let indexes =  [dayIndex, monthIndex, yearIndex]

                this.dateSelectedIndex = indexes

                this.$refs.datepicker.pickerSelectedIndex = indexes
            },

            selectDate(){
                this.event.recurrency_info = `${this.$refs.datepicker.pickerSelectedItem[0].value}/${this.$refs.datepicker.pickerSelectedItem[1].value}/${this.$refs.datepicker.pickerSelectedItem[2].value}`

                this.recurrencyTypeSelected =  this.event.recurrency_info

                console.log('selected date: ' + this.event.recurrency_info)
            },

            cancelDate(){
                this.event.recurrency_info = null
            },

            changeDate(index,  value_index){

                let  year = ''
                let  year_index = ''
                let  month = ''
                let  month_index = ''

                //Month change
                if(index == 1) {
                    month = this.months[value_index].value
                    month_index = value_index
                    year = this.years[this.dateSelectedIndex[2]].value
                    year_index =this.dateSelectedIndex[2]
                    this.handleMonthDays(`${month}/${year}`)
                }

                //year change
                if(index == 2) {
                    month = this.months[this.dateSelectedIndex[1]].value
                    month_index = this.dateSelectedIndex[1]
                    year = this.years[value_index].value
                    year_index = value_index
                    this.handleMonthDays(`${month}/${year}`)

                }

                if(index > 0){

                    let new_indexes = [this.dateSelectedIndex[0],month_index, year_index]
                    console.log(new_indexes)

                    this.dateSelectedIndex = new_indexes

                    this.$refs.datepicker.pickerSelectedIndex = new_indexes
                }
            },

            handleMonthDays(month_year){

                var daysInMonth = [];

                month_year = !month_year ? moment().format('MM/YYYY') : month_year

                var monthDate = moment(month_year, 'MM/YYYY').startOf('month');
                _.times(monthDate.daysInMonth(), function (n) {
                    daysInMonth.push({value: monthDate.format('DD'), text: monthDate.format('DD')});
                    monthDate.add(1, 'day');
                });

                this.monthDays = daysInMonth

            },

            handleDateUninformed(){
                this.event.date_uninformed = !this.event.date_uninformed

                if(!this.event.date_uninformed){
                    this.event.recurrency_type = null
                    this.event.recurrency_info = null
                    this.currentRecurrencyType = null
                }
            },

            validateTime(){
                let timeIsValid = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(this.event.time);

                if (!timeIsValid) {
                    warningNotify('', this.translations.validation.time)
                    this.interactions.invalid_time = true
                    return false
                }

                this.interactions.invalid_time = false
            },

            openModalCategories: function(){
                $('#modal-select-type').modal('show');
            },

            tooglePhotoFromGoogle: function(photo){
                let that = this

                var index = that.event.google_photos_selected.indexOf(photo)
                if(index > -1){
                    that.event.google_photos_selected.splice(index, 1)
                    that.google_photos.push(photo)
                } else {
                    that.event.google_photos_selected.push(photo);

                    var index = that.google_photos.indexOf(photo)
                    that.google_photos.splice(index,1);
                }

                that.checkAtLeastOneCover();

            },

            checkIfHasSomePhoto: function(){

                if(!this.event.photos) {
                    return true
                }

                if(!this.event.google_photos_selected) {
                    return true
                }

                return false

            },

            checkAtLeastOneCover: function(){

                if(this.event.photos.length){
                    var photosHasCover = this.event.photos.checkFromAttr('is_cover', true);
                }

                 if(this.event.google_photos_selected.length){
                    var googlePhotosHasCover = this.event.google_photos_selected.checkFromAttr('is_cover', true);
                }

                if(!photosHasCover && !googlePhotosHasCover){

                    if(this.event.photos.length){
                        this.event.photos[0].is_cover = true;
                        return
                    }

                    this.event.google_photos_selected[0].is_cover = true;
                }
            },

        }
    }
</script>

<style scoped>
    .icon-select {
        color: #FFF;
        float: right
    }

    .tag { text-transform: uppercase; }

    .img-responsive.rounded {
        border-radius: 20px;
    }
    new-image {
        position: absolute;
        top: 0; left: 0; bottom: 0; right: 0;
        width: 100%; height: 100%;
        justify-content: center;
        text-align: center;
        padding-top: 80px;
        border-bottom: 2px solid #FF4B89
    }

    .new-image i {
        font-size: 24px;
        display: inline-flex;
        width: 40px; height: 40px;
        border-radius: 10px;
        justify-content: center;
        align-items: center;
        border: 2px solid #FF4B89;
    }
    .new-image span {
        display: block;
        width: 100%;
        font-weight: 700;
        margin-top: 20px;
    }

    .category-row{
        overflow-x: scroll;
        white-space: nowrap;
    }

    ::-webkit-scrollbar {
        display: none;
    }

    .vertical-row { margin: 0 -5px; }
    .photo-google { display: inline-block; margin: 0 5px; }
    .photo-google .thumbnail {
        display: inline-block;
    }

    .thumbnail {
        height: 100px;
        width: auto;
        margin: 0 auto;
    }

    /* Categories */
    .col-row {
        width: 100%;
        column-count: 3;
        column-gap: 0;

    }
    .col {
        width: 100%;
        display: inline-block;
        padding: 5px;
    }
    .card-cat-col{
        padding-right: 10px;
        padding-left: 10px;
        margin-top: 20px;
    }

    .card-cat{
        background-color: #FFFFFF;
        border-radius: 15px;
        cursor: pointer;
    }

    .card-cat.bounce:before {
        content: '';
        position: absolute;
        top: 5px; left: 5px; right: 5px; bottom: 5px;
        border: 2px solid #29F39F;
        border-radius: 15px;
    }

</style>

<style>
    /*override picker styles*/
    .picker--choose .confirm {
        color: #561F9F !important;
        text-align: right;
        font-weight: bold;
        cursor: pointer;
    }

    .picker--choose .cancel {
        font-weight: bold;
        cursor: pointer;
    }

    .picker--choose h4{
        text-align: center
    }
</style>
