webpackJsonp([5],{250:function(e,t,n){n(533);var a=n(1)(n(500),n(553),"data-v-e82e28fc",null);e.exports=a.exports},485:function(e,t,n){"use strict";t.a={id:"123123",name:"John",last_name:"Doe",full_name:"John Doe",slug:"john-doe",age:"23",avatar:"https://maisbartenders.com.br/img/portfolio/My_garden_Mais_Bartenders.png",photos:[{photo_url:"https://maisbartenders.com.br/img/portfolio/My_garden_Mais_Bartenders.png"},{photo_url:"https://maisbartenders.com.br/img/portfolio/My_garden_Mais_Bartenders.png"},{photo_url:"https://maisbartenders.com.br/img/portfolio/My_garden_Mais_Bartenders.png"}]}},500:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(25),i=n.n(a),s=n(485),o=n(508);t.default={name:"general-user-settings-edit-profile",components:{mainHeader:i.a},data:function(){return{interactions:{},user:{},languages:{pt:!1,en:!1}}},computed:{translations:function(){var e=localStorage.getItem("language");return"en"!==e&&e?"pt"===e?(this.languages.en=!1,this.languages.pt=!0,o.b):void 0:(this.languages.en=!0,this.languages.pt=!1,o.a)}},mounted:function(){this.getUser()},methods:{saveSettings:function(){this.setLanguage(),this.$router.push({name:"general.user.settings",params:{settings_saved:!0}})},toggleLang:function(e){"en"===e&&(this.languages.en=!0,this.languages.pt=!1),"pt"===e&&(this.languages.en=!1,this.languages.pt=!0)},setLanguage:function(){localStorage.getItem("language")&&localStorage.removeItem("language"),localStorage.setItem("language",this.languages.en?"en":"pt")},getUser:function(){this.user=s.a,console.log(this.user),this.initSwiper()},initSwiper:function(){var e=this;setTimeout(function(){e.swiperGalleryPhotos=new Swiper(e.$refs.galleryPhotos,{spaceBetween:0,slidesPerView:1,nextButton:".swiper-button-next",prevButton:".swiper-button-prev",scrollbar:".swiper-scrollbar"})},200)}}}},508:function(e,t,n){"use strict";n.d(t,"a",function(){return a}),n.d(t,"b",function(){return i});var a={title:"Edit profile",upload_image:"Upload a new image",save:"Save settings",logout:"Logout",language:{title:"Language",portuguese:"Portuguese",english:"English"}},i={title:"Editar perfil",upload_image:"Faça o upload de uma nova imagem",save:"Salvar configurações",logout:"Fazer logout",language:{title:"Idioma",portuguese:"Português",english:"Inglês"}}},521:function(e,t,n){t=e.exports=n(481)(),t.push([e.i,".swiper-pagination[data-v-e82e28fc]{width:100%}.icon-select[data-v-e82e28fc]{color:#fff;float:right}.new-image[data-v-e82e28fc]{position:absolute;top:0;left:0;bottom:0;right:0;width:100%;height:100%;text-align:center;padding-top:80px;border-bottom:2px solid #ff4b89}.new-image[data-v-e82e28fc],.new-image i[data-v-e82e28fc]{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.new-image i[data-v-e82e28fc]{font-size:24px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;width:40px;height:40px;border-radius:10px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border:2px solid #ff4b89}.new-image span[data-v-e82e28fc]{display:block;width:100%;font-weight:700;margin-top:20px}","",{version:3,sources:["/Users/igortrindade/Code/goup-front/src/modules/general/user/components/dashboard/edit-profile.vue"],names:[],mappings:"AACA,oCAAsC,UAAY,CACjD,AACD,8BACI,WAAY,AACZ,WAAY,CACf,AAGD,4BACI,kBAAmB,AACnB,MAAO,AAAC,OAAQ,AAAC,SAAU,AAAC,QAAS,AACrC,WAAY,AAAC,YAAa,AAI1B,kBAAmB,AACnB,iBAAkB,AAClB,+BAAgC,CACnC,AACD,0DAPI,wBAAyB,AACrB,qBAAsB,AAClB,sBAAwB,CAmBnC,AAdD,8BACI,eAAgB,AAChB,2BAA4B,AAC5B,2BAA4B,AAC5B,oBAAqB,AACrB,WAAY,AAAC,YAAa,AAC1B,mBAAoB,AAIpB,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,wBAA0B,CAC7B,AACD,iCACI,cAAe,AACf,WAAY,AACZ,gBAAiB,AACjB,eAAiB,CACpB",file:"edit-profile.vue",sourcesContent:["\n.swiper-pagination[data-v-e82e28fc] { width: 100%;\n}\n.icon-select[data-v-e82e28fc] {\n    color: #FFF;\n    float: right\n}\n\n/* New Image */\n.new-image[data-v-e82e28fc] {\n    position: absolute;\n    top: 0; left: 0; bottom: 0; right: 0;\n    width: 100%; height: 100%;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    text-align: center;\n    padding-top: 80px;\n    border-bottom: 2px solid #FF4B89\n}\n.new-image i[data-v-e82e28fc] {\n    font-size: 24px;\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    width: 40px; height: 40px;\n    border-radius: 10px;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    border: 2px solid #FF4B89;\n}\n.new-image span[data-v-e82e28fc] {\n    display: block;\n    width: 100%;\n    font-weight: 700;\n    margin-top: 20px;\n}\n\n"],sourceRoot:""}])},533:function(e,t,n){var a=n(521);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n(482)("5859cd97",a,!0)},553:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"first-container"},[n("main-header",{attrs:{title:e.translations.title,type:"back",cursor:!1}}),e._v(" "),n("transition",{attrs:{appear:"",mode:"in-out","enter-active-class":"animated fadeInRight","leave-active-class":"animated fadeOutRight"}},[n("div",{staticClass:"main container"},[n("div",{staticClass:"p-relative"},[n("div",{ref:"galleryPhotos",staticClass:"swiper-container swiper-gallery"},[n("div",{staticClass:"swiper-wrapper"},[n("div",{staticClass:"swiper-slide"},[n("div",{staticClass:"new-image"},[n("i",{staticClass:"ion-plus-round"}),e._v(" "),n("span",[e._v(e._s(e.translations.upload_image))])])]),e._v(" "),e._l(e.user.photos,function(e,t){return n("div",{key:t,staticClass:"swiper-slide",style:{backgroundImage:"url("+e.photo_url+")"}})})],2),e._v(" "),n("div",{staticClass:"swiper-button-prev"}),e._v(" "),n("div",{staticClass:"swiper-button-next"}),e._v(" "),n("div",{staticClass:"swiper-scrollbar"})])]),e._v(" "),n("div",{staticClass:"container m-t-30 text-center"},[n("p",{staticClass:" f-22 f-400"},[e._v(e._s(e.translations.language.title))]),e._v(" "),n("ul",{staticClass:"list-group list-rounded m-t-10 m-0 text-left"},[n("li",{staticClass:"list-group-item transparent",on:{click:function(t){e.toggleLang("en")}}},[e._v("\n                        English\n                        "),n("i",{class:{"icon-select m-l-10 f-20":!0,"ion-ios-circle-filled":e.languages.en,"ion-ios-circle-outline":!e.languages.en}})]),e._v(" "),n("li",{staticClass:"list-group-item transparent",on:{click:function(t){e.toggleLang("pt")}}},[e._v("\n                        Português\n                        "),n("i",{class:{"icon-select m-l-10 f-20":!0,"ion-ios-circle-filled":e.languages.pt,"ion-ios-circle-outline":!e.languages.pt}})])]),e._v(" "),n("button",{staticClass:"btn btn-primary btn-block transparent m-t-30",attrs:{type:"button"},on:{click:function(t){e.saveSettings()}}},[e._v("\n                    "+e._s(e.translations.save)+"\n                ")]),e._v(" "),n("button",{staticClass:"btn btn-info btn-block transparent m-t-30",attrs:{type:"button"},on:{click:function(t){e.saveSettings()}}},[e._v("\n                    "+e._s(e.translations.logout)+"\n                ")])])])])],1)},staticRenderFns:[]}}});
//# sourceMappingURL=5.538a1cd59303798c636c.js.map