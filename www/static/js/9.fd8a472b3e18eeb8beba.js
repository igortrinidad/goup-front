webpackJsonp([9],{342:function(t,e,s){s(785);var n=s(3)(s(729),s(817),null,null);t.exports=n.exports},681:function(t,e,s){"use strict";function n(){return{id:"",name:"",last_name:"",full_name:"",slug:"",age:"",city:{name:"",state:"",lat:0,lng:0},avatar:"",photos:[]}}e.a=n},729:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(23),a=s.n(n),r=s(51),o=s.n(r),i=(s(681),s(746)),u=s(19);e.default={name:"general-user-settings",components:{mainHeader:o.a},data:function(){return{interactions:{},user:{}}},computed:a()({},s.i(u.a)(["currentUser","language"]),{translations:function(){return"en"===this.language?i.a:"pt"===this.language?i.b:void 0}}),mounted:function(){},methods:a()({},s.i(u.b)(["setLanguage"]),{bounceLanguage:function(t,e){setTimeout(function(){$(t.target).addClass("bounce")},100),setTimeout(function(){$(t.target).removeClass("bounce")},300),this.setLanguage(e)}})}},746:function(t,e,s){"use strict";s.d(e,"a",function(){return n}),s.d(e,"b",function(){return a});var n={buttons:{about:"About",edit:"Edit profile",add_new_event:"Add new moment",my_events:"My moments",my_favorites:"My favorites",logout:"Log out"},save_success:"Settings saved",save_error:"An error occurred and we were unable to save the settings"},a={buttons:{about:"Sobre",edit:"Editar perfil",add_new_event:"Adicionar novo momento",my_events:"Meus momentos",my_favorites:"Meus favoritos",logout:"Sair"},save_success:"Configurações salvas",save_error:"Ocorreu um erro e não conseguimos salvar as configurações"}},763:function(t,e,s){e=t.exports=s(679)(),e.push([t.i,".container.bg{padding-bottom:30px;border-radius:0 0 20px 20px}.rotate-180{display:inline-block;-webkit-transform:rotate(180deg);transform:rotate(180deg)}","",{version:3,sources:["/Users/igortrindade/Code/goup-front/src/modules/general/user/components/settings.vue"],names:[],mappings:"AACA,cACI,oBAAqB,AACrB,2BAA6B,CAChC,AACD,YACI,qBAAsB,AACtB,iCAAkC,AAC1B,wBAA0B,CACrC",file:"settings.vue",sourcesContent:["\n.container.bg{\n    padding-bottom: 30px;\n    border-radius: 0 0 20px 20px;\n}\n.rotate-180 {\n    display: inline-block;\n    -webkit-transform: rotate(180deg);\n            transform: rotate(180deg);\n}\n\n\n"],sourceRoot:""}])},785:function(t,e,s){var n=s(763);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);s(680)("42b2bd58",n,!0)},817:function(t,e,s){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"first-container"},[n("main-header",{attrs:{title:"settings",type:"main",cursor:!1}}),t._v(" "),n("transition",{attrs:{appear:"",mode:"in-out","enter-active-class":"animated fadeInRight","leave-active-class":"animated fadeOutRight"}},[n("div",{staticClass:"main"},[n("div",{staticClass:"text-right flags m-r-10"},[n("img",{staticClass:"m-r-5 country-flag",class:{"country-selected":"pt"===t.language},attrs:{src:s(121),width:"32px"},on:{click:function(e){t.bounceLanguage(e,"pt")}}}),t._v(" "),n("img",{staticClass:"m-r-5 country-flag",class:{"country-selected":"en"===t.language},attrs:{src:s(122),width:"32px"},on:{click:function(e){t.bounceLanguage(e,"en")}}})]),t._v(" "),n("div",{staticClass:"container bg m-t-0"},[n("router-link",{staticClass:"picture-circle picture-circle-xxl border-picture-eletric-blue",style:{backgroundImage:"url("+t.currentUser.avatar+")"},attrs:{tag:"div",to:{name:"general.user.show",params:{user_slug:t.currentUser.slug}}}}),t._v(" "),n("h4",{staticClass:"f-300 text-center m-t-20"},[t._v(t._s(t.currentUser.full_name))]),t._v(" "),n("div",{staticClass:"row m-t-30 text-center"},[n("div",{staticClass:"col-xs-12 m-t-10"},[n("router-link",{staticClass:"btn btn-primary btn-block",attrs:{to:{name:"general.user.settings.edit"},tag:"button"}},[n("i",{staticClass:"ion-edit m-r-5"}),t._v(" "+t._s(t.translations.buttons.edit)+"\n                        ")])],1),t._v(" "),n("div",{staticClass:"col-xs-12 m-t-20"},[n("router-link",{staticClass:"btn btn-primary btn-block",attrs:{to:{name:"general.events.create"},tag:"button"}},[n("i",{staticClass:"ion-plus-round m-r-5"}),t._v(" "+t._s(t.translations.buttons.add_new_event)+"\n                        ")])],1),t._v(" "),n("div",{staticClass:"col-xs-12 m-t-20"},[n("router-link",{staticClass:"btn btn-primary btn-block",attrs:{to:{name:"general.user.events"},tag:"button"}},[n("i",{staticClass:"ion-ios-list-outline m-r-5"}),t._v(" "+t._s(t.translations.buttons.my_events)+"\n                        ")])],1),t._v(" "),n("div",{staticClass:"col-xs-12 m-t-20"},[n("router-link",{staticClass:"btn btn-primary btn-block",attrs:{to:{name:"general.user.favorites"},tag:"button"}},[n("i",{staticClass:"ion-android-star-outline m-r-5"}),t._v(" "+t._s(t.translations.buttons.my_favorites)+"\n                        ")])],1),t._v(" "),n("div",{staticClass:"col-xs-12 m-t-20"},[n("router-link",{staticClass:"btn btn-primary btn-block",attrs:{to:{name:"general.user.settings.about"},tag:"button"}},[n("i",{staticClass:"ion-help-circled m-r-5"}),t._v(" "+t._s(t.translations.buttons.about)+"\n                        ")])],1),t._v(" "),n("div",{staticClass:"col-xs-12 m-t-20"},[n("router-link",{staticClass:"btn btn-primary btn-block",attrs:{to:{name:"general.auth.logout"},tag:"button"}},[n("i",{staticClass:"ion-log-out rotate-180 m-r-5"}),t._v(" "+t._s(t.translations.buttons.logout)+"\n                        ")])],1)])],1)])])],1)},staticRenderFns:[]}}});
//# sourceMappingURL=9.fd8a472b3e18eeb8beba.js.map