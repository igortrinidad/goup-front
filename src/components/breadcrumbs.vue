<template>
    <ul class="breadcrumb" :style="`background-color: ${theme} !important`">
        <li v-for="(crumb, index) in $breadcrumbs" :key="crumb.name" :class="{'active': crumb.name== $route.name || index == $breadcrumbs.length -1}">
            <template v-if="crumb.name == $route.name">
                {{ crumb.meta.breadcrumb }}
            </template>
            <template v-else>
                <template v-if="index == $breadcrumbs.length -1">
                    {{ crumb.meta.breadcrumb }}
                </template>
                <template v-else>
                    <router-link :to="handleLink(crumb)">{{ crumb.meta.breadcrumb }}</router-link>
                </template>
            </template>
        </li>
    </ul>
</template>

<script>
    export default{
        name: 'breadcrumbs',
        props: {
            theme: {
                type: String,
                required: true
            }
        },
        data(){
            return {}
        },
        mounted(){

        },
        methods: {

            handleLink: function (crumb) {

                if (crumb.name || (crumb.handler && crumb.handler.name)) {
                    return {
                        name: crumb.name || crumb.handler.name,
                        params: this.$route.params
                    }
                }
                return {
                    path: (crumb.handler && crumb.handler.fullPath)
                        ? crumb.handler.fullPath
                        : crumb.path,
                    params: this.$route.params
                }
            }
        }
    }
</script>

<style>
    .breadcrumb{
        margin-top: 0 !important;
        border-radius: 0;
    }
    .breadcrumb li.active:before {
        content: '>';
    }
    .breadcrumb li a {
        color: #fff !important
    }
    .breadcrumb li.active {
        color: rgba(255, 255, 255, .5);
    }
</style>
