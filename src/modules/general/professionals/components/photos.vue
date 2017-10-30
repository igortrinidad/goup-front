<template>
    <div class="m-t-30">
        <div class="container">
            <div class="text-center">
                <img class="img-icon" src="../../../../assets/icons/camera.png" alt="">
                <h4 class="f-300">Fotos</h4>
            </div>
        </div>

        <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="card">
                            <div class="card-body">
                                <div id="gallery" style="display:none;">
                                    <img :alt="photo.created | moment('DD/MM/YYYY')" :src="photo.photo_url" v-for="(photo, photoIndex) in professional.photos"
                                        :data-image="photo.photo_ur"
                                        :data-description="professional.full_name">
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default{
        name: 'landing-professional-photos',
        props: {
            professional: {
                type: Object
            }
        },
        data(){
            return {}
        },
        mounted(){
            this.initGallery();
        },
        methods: {


            initGallery: function(){
                let that = this
            
                $("#gallery").unitegallery({
                    tiles_type:"justified"
                });
            },
        }
    }
</script>

<style scoped>


</style>
