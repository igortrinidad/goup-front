webpackJsonp([3],{246:function(t,e,s){s(528);var a=s(1)(s(508),s(534),"data-v-7e1e353f",null);t.exports=a.exports},508:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(75),i=s.n(a),n=s(30),o=s(15),r=s.n(o),c=s(514),l=s(240);e.default={name:"general-places-show",components:{mainHeader:r.a},data:function(){return{placeholder:!0,place:{}}},computed:i()({},s.i(n.a)(["checkLanguage"]),{translations:function(){var t=localStorage.getItem("language");return"en"!==t&&t?"pt"===t?c.b:void 0:c.a}}),mounted:function(){this.getPlace()},methods:{initSwiper:function(){var t=this;setTimeout(function(){t.swiperGalleryPhotos=new Swiper(t.$refs.galleryPhotos,{spaceBetween:0,slidesPerView:1,nextButton:".swiper-button-next",prevButton:".swiper-button-prev",scrollbar:".swiper-scrollbar"}),t.swiperComments=new Swiper(t.$refs.swipperComments,{spaceBetween:15,slidesPerView:1,pagination:".swiper-pagination",paginationClickable:!0})},200)},getPlace:function(){this.place=l.a,this.initSwiper()}}}},514:function(t,e,s){"use strict";s.d(e,"a",function(){return a}),s.d(e,"b",function(){return i});var a={back:"Back",about:{title:"About",description:"Description"},comments:{title:"Comments"}},i={back:"Voltar",about:{title:"Sobre",description:"Descrição"},comments:{title:"Comentários"}}},522:function(t,e,s){e=t.exports=s(502)(),e.push([t.i,".swiper-comments .ion-quote[data-v-7e1e353f]{position:absolute;top:-10px;left:10px;font-size:60px;opacity:.2;-webkit-transform:rotate(0);transform:rotate(0)}","",{version:3,sources:["/Users/igortrindade/Code/goup-front/src/modules/general/places/components/show.vue"],names:[],mappings:"AACA,6CACI,kBAAmB,AACnB,UAAW,AACX,UAAW,AACX,eAAgB,AAChB,WAAY,AACZ,4BAA6B,AACrB,mBAAqB,CAChC",file:"show.vue",sourcesContent:["\n.swiper-comments .ion-quote[data-v-7e1e353f] {\n    position: absolute;\n    top: -10px;\n    left: 10px;\n    font-size: 60px;\n    opacity: .2;\n    -webkit-transform: rotate(0);\n            transform: rotate(0);\n}\n\n"],sourceRoot:""}])},528:function(t,e,s){var a=s(522);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s(503)("41380d09",a,!0)},534:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"first-container"},[s("main-header",{attrs:{title:t.place.id?t.place.name:"Voltar",type:"back",cursor:!1}}),t._v(" "),s("transition",{attrs:{appear:"",mode:"in-out","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[t.place.id?s("div",{staticClass:"main"},[s("div",{staticClass:"p-relative"},[s("div",{ref:"galleryPhotos",staticClass:"swiper-container swiper-gallery"},[s("div",{staticClass:"swiper-wrapper"},t._l(t.place.photos,function(t,e){return s("div",{key:e,staticClass:"swiper-slide",style:{backgroundImage:"url("+t.photo_url+")"}})})),t._v(" "),s("div",{staticClass:"swiper-button-prev"}),t._v(" "),s("div",{staticClass:"swiper-button-next"}),t._v(" "),s("div",{staticClass:"swiper-scrollbar"})])]),t._v(" "),s("div",{staticClass:"m-t-30 text-center"},[s("div",{staticClass:"container"},[s("h3",{staticClass:"m-t-0"},[t._v(t._s(t.translations.about.title))]),t._v(" "),s("p",[t._v(t._s(t.place.description))])])]),t._v(" "),s("div",{staticClass:"actions"},[s("span",{staticClass:"action xl",on:{click:function(e){t.goDown()}}},[s("span",{staticClass:"ion-chevron-down f-red "})]),t._v(" "),s("span",{staticClass:"action xl",on:{click:function(e){t.goUp()}}},[s("span",{staticClass:"ion-chevron-up f-green"})])]),t._v(" "),s("div",{staticClass:"m-t-30 text-center"},[s("div",{staticClass:"container"},[s("h3",{staticClass:"m-t-0 m-b-30"},[t._v(t._s(t.translations.comments.title))]),t._v(" "),s("div",{ref:"swipperComments",staticClass:"swiper-container swiper-comments"},[s("div",{staticClass:"swiper-wrapper"},t._l(t.place.comments,function(e){return s("div",{key:e.id,staticClass:"swiper-slide"},[s("div",{staticClass:"card card-rounded"},[s("div",{staticClass:"card-header"},[s("i",{staticClass:"ion-quote"}),t._v(" "),s("div",{staticClass:"picture-circle picture-circle-m",style:{backgroundImage:"url("+t.place.avatar+")"}}),t._v(" "),s("h5",{staticClass:"f-default"},[t._v(t._s(e.from.full_name))])]),t._v(" "),s("div",{staticClass:"card-body card-padding"},[s("p",[t._v(t._s(e.content))])])])])})),t._v(" "),s("div",{staticClass:"swiper-pagination"})])])])]):t._e()])],1)},staticRenderFns:[]}}});
//# sourceMappingURL=3.a15b4d4d09c15b8cfc36.js.map