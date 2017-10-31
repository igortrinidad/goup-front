<template lang="html">
    <div>

    </div>

</template>

<script>
    export default {
        name: 'primary-menu',
        components: {
        },
        props: {
            isOpened: { type: Boolean, required: true },
        },
        data() {
            return {
            }
        },

        computed: {
        },

        mounted() {
            //this.checkAppVersion();

            if(window.cordova){
                this.isMobile = true
                this.isIOS = this.checkIOS;
            }
        },

        mounted() {
        },
        methods: {
        }
    }
</script>

<style scoped>

    /* User Notification */
    .user-notification {
        position: absolute;
        top: 20px;
        left: 20px;
        font-size: 34px;
        color: #88C657;
        z-index: 99999;
    }

    .user-notification-count {
        position: absolute;
        top: 6px;
        right: -10px;
        font-weight: 700;
        background-color: #fff !important;
        color: #88C657 !important;
        border: 1px solid #88C657;
        padding: 1px 7px;
    }

    /* User  */
    .user-pic {
        border-radius: 50%;
        display: block;
        margin: 0 auto;
    }

    .user-lastbadge {
        display: flex;
        position: absolute;
        width: 30px;
        height: 30px;
        color: #fff;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        bottom: -10px;
        right: 50%;
        margin-right: -40px;
    }

    /* Menu */
    .menu-items{
        max-height: 80vh;
        overflow-y: auto;
        padding-bottom: 100px;
        margin-bottom: 200px;
    }
    strong { color: #88C657; font-weight: 300; }
    .side-menu {
        position: fixed;
        top: -100vh;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #fff;
        z-index: 8888;
        transition: ease .4s;
        padding: 0;
        overflow-y: hidden;
    }

    .side-menu.active + .side-menu-bg { display: block; }
    .side-menu.active {
        transform: translateY(100vh);
        transition: ease .4s;
    }

    /* Menu Header */
    .side-menu .header {
        padding: 11px 40px;
        width: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        flex-flow: row wrap;
    }
    .side-menu .header .avatar {
        margin: 20px auto;
        border-radius: 50%;
        max-width: 80px;
    }

    .side-menu .header .logo {
        margin: 20px auto;
        max-width: 140px;
    }

    .side-menu .header .name { color: #FFF; }

    .main-menu {
        list-style: none;
        padding-left: 0;
    }

    .main-menu > li {
        padding: 0;
        display: block;
        font-weight: 500;
        position: relative;
        margin: 0;
        background: #fff;
        border-top: 1px solid #f4f5f5;
    }

    .main-menu.sub {
        position: relative;
        background-color: #f4f5f5;
    }
    .main-menu > li:first-child { border-top: none; }
    .main-menu.sub > li {
        background-color: #f4f5f4;
        position: relative;
        border-color: rgba(56, 57, 56, .3);
    }

    .main-menu.sub > li > a { color: rgba(56, 57, 56, .8) !important; }
    .main-menu.sub > li > a:hover,
    .main-menu.sub > li > a:active { color: rgba(56, 57, 56, 1) !important; }

    .main-menu.sub > li .arrow {
        position: absolute;
        top: 50%;
        margin-top: -17.5px;
        left: 17px;
        font-size: 25px;
        color: rgba(56, 57, 56, .8);
        display: none;
    }
    @media (max-width: 768px) {
        .main-menu.sub > li .arrow { display: block; }
        .main-menu.sub > li { padding-left: 30px; }
    }

    .main-menu > li:last-child { border-bottom: 1px solid #f4f5f5; }
    .main-menu > li > a {
        padding: 15px 10px;
        display: block;
        color: #383938 !important;
        font-weight: 300;
        position: relative;
        margin: 0 auto;
        max-width: 768px;
    }

    .sub-menu > a:before,
    .sub-menu > a:after {
        -webkit-transition: all;
        -o-transition: all;
        transition: all;
        -webkit-transition-duration: 250ms;
        transition-duration: 250ms;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .sub-menu ul {
        list-style: none;
        display: none;
        padding: 0;

    }

    .sub-menu.active > ul {
        display: block;
    }


    .sub-menu a:hover a,
    .sub-menu a:active a { background-color: transparent; color: #88C657 !important;}

    .main-menu > li > a > i {
        left: 16px;
        font-size: 20px;
        top: 0;
        width: 25px;
        text-align: center;
        padding: 13px 0;
    }

    .main-menu > li > a.active {
        color: #383938;
        background-color: transparent;
    }

    /* Credits */
    .credits {
        color: #383938;
        font-weight: 300;
        display: block;
        width: 100%;
        text-align: center;
        position: absolute;
        padding: 20px;
        bottom: 0px;
        left: 0;
        right: 0;
        background: #fff;
        z-index: 100
    }

    .side-menu .header{
        border-bottom: 1px solid RGBA(56, 57, 56, 0.15);
    }

    .main-menu{
        margin-top: 0px;
        margin-bottom: 0px;
    }

    .profile-tip{
        display:block;
        opacity: 0;
        position: absolute;
        left: 0px;
        top: 5px;
        padding: 5px;
        width: auto;
        height: auto;
        background-color: white;
        border-radius: 3px;
    }
    .avatar-hover:hover + .profile-tip, .avatar-hover:active + .profile-tip {
        opacity: 0.8;
    }

    .to-close{
        top: 10px;
    }

.sub-menu > a:after {
    content: "\f107";
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    text-decoration: inherit;
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    -o-transform: scale(0);
    transform: scale(0);
}


.sub-menu.toggled > a:after {
  content: "\f106";
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    text-decoration: inherit;
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
}


.sub-menu ul > li > a {
    padding: 15px 10px 10px 40px;
    display: block;
    color: #383938 !important;
    font-weight: 300;
    position: relative;
    margin: 0 auto;
    max-width: 768px;
    cursor: pointer;
}

.main-menu > li > a.active, .main-menu > li > a:hover{
        background-color: #F2F2F5;
}

.sub-menu ul > li > a.active,
.sub-menu ul > li > a:hover {
    color: #000;
    background-color: #F2F2F5;
}

.sub-menu ul > li:first-child > a {
    padding-top: 14px;
}

.sub-menu ul > li:last-child > a {
    padding-bottom: 16px;
}

.sub-menu ul > li ul {
    font-size: 12px;
    margin: 10px 0;
    padding-left: 20px;
}

.sub-menu.active > ul {
    display: block;

}

a{
    text-decoration: none;
}









</style>
