webpackJsonp([0],{248:function(t,e,s){s(525);var r=s(1)(s(511),s(531),null,null);t.exports=r.exports},503:function(t,e,s){"use strict";e.a={id:"123123",name:"John",last_name:"Doe",full_name:"John Doe",slug:"john-doe",age:"23",avatar:"https://maisbartenders.com.br/img/portfolio/My_garden_Mais_Bartenders.png",photos:[{photo_url:"https://maisbartenders.com.br/img/portfolio/My_garden_Mais_Bartenders.png"},{photo_url:"https://maisbartenders.com.br/img/portfolio/My_garden_Mais_Bartenders.png"},{photo_url:"https://maisbartenders.com.br/img/portfolio/My_garden_Mais_Bartenders.png"}]}},511:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s(15),a=s.n(r),n=s(503),i=s(515);e.default={name:"general-user-settings",components:{mainHeader:a.a},data:function(){return{interactions:{},user:{}}},computed:{translations:function(){var t=localStorage.getItem("language");return"en"!==t&&t?"pt"===t?i.b:void 0:i.a}},mounted:function(){this.getUser(),this.$route.params.settings_saved&&successNotify("",this.translations.save_success)},methods:{getUser:function(){this.user=n.a}}}},515:function(t,e,s){"use strict";s.d(e,"a",function(){return r}),s.d(e,"b",function(){return a});var r={buttons:{config:"Settings",edit:"Edit profile"},save_success:"Settings saved",save_error:"An error occurred and we were unable to save the settings"},a={buttons:{config:"Configurações",edit:"Editar perfil"},save_success:"Configurações salvas",save_error:"Ocorreu um erro e não conseguimos salvar as configurações"}},519:function(t,e,s){e=t.exports=s(501)(),e.push([t.i,".border-picture-eletric-blue{border:2px solid #8bf3fb}.container.bg{padding-bottom:30px;border-radius:0 0 20px 20px}","",{version:3,sources:["/Users/igortrindade/Code/goup-front/src/modules/general/user/components/settings.vue"],names:[],mappings:"AACA,6BACI,wBAA0B,CAC7B,AACD,cACI,oBAAqB,AACrB,2BAA6B,CAChC",file:"settings.vue",sourcesContent:["\n.border-picture-eletric-blue{\n    border: 2px solid #8BF3FB;\n}\n.container.bg{\n    padding-bottom: 30px;\n    border-radius: 0 0 20px 20px;\n}\n\n"],sourceRoot:""}])},525:function(t,e,s){var r=s(519);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);s(502)("42b2bd58",r,!0)},531:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"first-container"},[s("main-header",{attrs:{title:"settings",type:"main",cursor:!1}}),t._v(" "),s("transition",{attrs:{appear:"",mode:"in-out","enter-active-class":"animated fadeInRight","leave-active-class":"animated fadeOutRight"}},[s("div",{staticClass:"main"},[s("div",{staticClass:"container bg m-t-20"},[s("router-link",{staticClass:"picture-circle picture-circle-xxl border-picture-eletric-blue",style:{backgroundImage:"url("+t.user.avatar+")"},attrs:{tag:"div",to:{name:"general.user.settings.edit"}}}),t._v(" "),s("h4",{staticClass:"f-300 text-center m-t-20"},[t._v(t._s(t.user.full_name))]),t._v(" "),s("div",{staticClass:"row m-t-30 text-center"},[s("div",{staticClass:"col-xs-12 m-t-10"},[s("router-link",{staticClass:"btn btn-primary btn-block transparent",attrs:{to:{name:"general.user.settings.edit"},tag:"button"}},[s("i",{staticClass:"ion-edit m-r-5"}),t._v(" "+t._s(t.translations.buttons.edit)+"\n                        ")])],1),t._v(" "),s("div",{staticClass:"col-xs-12 m-t-20"},[s("router-link",{staticClass:"btn btn-primary btn-block transparent",attrs:{to:{name:"general.user.settings.configs"},tag:"button"}},[s("i",{staticClass:"ion-ios-gear m-r-5"}),t._v(" "+t._s(t.translations.buttons.config)+"\n                        ")])],1)])],1),t._v(" "),s("div",{staticClass:"container m-t-15"},[s("div",{staticClass:"card card-rounded"},[s("div",{staticClass:"card-body"},[s("h1",[t._v("Teste de lugares")]),t._v(" "),s("h1",[t._v("Teste de lugares")]),t._v(" "),s("h1",[t._v("Teste de lugares")]),t._v(" "),s("h1",[t._v("Teste de lugares")])])])])])])],1)},staticRenderFns:[]}}});
//# sourceMappingURL=0.b1c84f2c1f8bd5613c7c.js.map