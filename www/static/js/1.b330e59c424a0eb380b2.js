webpackJsonp([1],{245:function(t,a,s){var e=s(1)(s(505),s(510),null,null);t.exports=e.exports},499:function(t,a,s){"use strict";a.a={id:"user01",name:"Davidson",last_name:"Da Silva",slug:"davidson-da-silva",age:"23",avatar:"https://maisbartenders.com.br/img/portfolio/My_garden_Mais_Bartenders.png"}},500:function(t,a,s){"use strict";s.d(a,"a",function(){return e}),s.d(a,"b",function(){return n});var e={buttons:{config:"Settings",edit:"Edit profile"}},n={buttons:{config:"Configurações",edit:"Editar perfil"}}},505:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s(14),n=s.n(e),i=s(499),r=s(500);a.default={name:"general-user-settings",components:{mainHeader:n.a},data:function(){return{language:"pt",interactions:{},user:{}}},computed:{translations:function(){return"en"===this.language?r.a:"pt"===this.language?r.b:void 0}},mounted:function(){this.getUser()},methods:{getUser:function(){this.user=i.a}}}},510:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{},[s("main-header",{attrs:{title:"settings",type:"main",cursor:!1}}),t._v(" "),s("transition",{staticClass:"main m-t-30",attrs:{appear:"",mode:"in-out","enter-active-class":"animated fadeInRight","leave-active-class":"animated fadeOutRight"}},[s("div",{staticClass:"main"},[s("div",{staticClass:"container"},[s("div",{staticClass:"picture-circle picture-circle-xl",style:{backgroundImage:"url("+t.user.avatar+")"}}),t._v(" "),s("h4",{staticClass:"f-700 text-center"},[t._v(t._s(t.user.name))]),t._v(" "),s("div",{staticClass:"row m-t-30 text-center"},[s("div",{staticClass:"col-xs-6"},[s("router-link",{staticClass:"btn btn-primary",attrs:{to:{name:"general.user.settings.configs"},tag:"button"}},[s("i",{staticClass:"ion-ios-gear m-r-5"}),t._v(" "+t._s(t.translations.buttons.config)+"\n                        ")])],1),t._v(" "),s("div",{staticClass:"col-xs-6"},[s("router-link",{staticClass:"btn btn-primary",attrs:{to:{name:"general.user.settings.edit"},tag:"button"}},[s("i",{staticClass:"ion-edit m-r-5"}),t._v(" "+t._s(t.translations.buttons.edit)+"\n                        ")])],1)])])])])],1)},staticRenderFns:[]}}});
//# sourceMappingURL=1.b330e59c424a0eb380b2.js.map