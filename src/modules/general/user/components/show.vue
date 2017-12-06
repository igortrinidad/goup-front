<template>
    <div class="first-container">

        <main-header
            :title="''"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main">
                <div class="container bg m-t-20">
                    <div
                        class="picture-circle picture-circle-l border-picture-eletric-blue"
                        :style="{ backgroundImage: `url(${ user.avatar })` }"
                    >
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="card">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import * as translations from '@/translations/user/show'

    import mainHeader from '@/components/main-header'
    import UserModel from '@/models/User'

    export default {
        name: 'general-user-show',

        components: {
            mainHeader,
        },

        data () {
            return {
                interactions: {},
                user: {}
            }
        },

        computed: {
            ...mapGetters(['currentUser', 'language']),

            'translations': function() {

                if (this.language === 'en') {
                    return translations.en
                }
                if (this.language === 'pt') {
                    return translations.pt
                }
            }
        },

        mounted(){
            $('.navbar.navbar-default').addClass('transparent')

            this.getUser()
        },

        beforeDestroy() {
            $('.navbar.navbar-default').removeClass('transparent')
            $('body').removeClass('user-bg')
        },

        methods: {
            getUser() {
                let that = this

                console.log(that.$route.params);
                that.user = UserModel
            }
        }
    }
</script>

<style scoped>
    .picture-circle {
        position: fixed;
        top: 10px;
        left: calc(50% - 50px);
    }
</style>
