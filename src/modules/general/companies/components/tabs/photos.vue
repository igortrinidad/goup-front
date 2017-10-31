<template>
       <div>
   		<div class="container m-t-30">
            <div class="text-center">
                <img class="img-icon" src="../../../../../assets/icons/camera.png" alt="">
                <h3 class="f-300 m-b-30">Fotos</h3>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-body">
                            <div id="gallery" style="display:none;">
                                <img
                                    v-for="(photo, photoIndex) in company.photos"
                                    :alt="photo.created_at | moment('DD/MM/YYYY')"
                                    :src="photo.photo_url"
                                    :data-image="photo.photo_ur"
                                    :data-description="company.name"
                                >
                            </div>
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
        name: 'landing-company-photos',
        props: {
        	company: {
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
