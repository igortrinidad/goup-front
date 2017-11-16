webpackJsonp([5],{242:function(t,a,s){s(538);var i=s(1)(s(507),s(551),"data-v-615303bb",null);t.exports=i.exports},507:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=s(519);a.default={name:"login",data:function(){return{interactions:{loginWithEmail:!1}}},computed:{translations:function(){var t=localStorage.getItem("language");return"en"!==t&&t?"pt"===t?i.b:void 0:i.a}},mounted:function(){this.initSwiper()},methods:{initSwiper:function(){var t=this;setTimeout(function(){t.swiperTour=new Swiper(t.$refs.swiperTour,{spaceBetween:15,slidesPerView:1,paginationClickable:!0,pagination:".swiper-pagination"})},200)}}}},519:function(t,a,s){"use strict";s.d(a,"a",function(){return i}),s.d(a,"b",function(){return n});var i={login:"Login",loginEmail:"Login with Email",loginFacebook:"Login with Facebook",inputEmail:"Enter your e-mail",inputPassword:"Enter your password",acceptTerms:"Continuing you agree to our",terms:"Security terms",privacy:"Privacy policy",tourTitle:"Discover new places near you",likeLocal:"Slide up to enjoy and mark as a favorite",unlikeLocal:"Swipe down to skip location",friends:"Find peoples who also favored the same places as you"},n={login:"Entrar",loginEmail:"Entrar com E-mail",loginFacebook:"Entrar com Facebook",inputEmail:"Informe seu email",inputPassword:"Informe sua senha",acceptTerms:"Ao continuar você concorda com nossos",terms:"Termos de segurança",privacy:"Política de privadede",tourTitle:"Descubra locais novos perto de você",likeLocal:"Deslize para cima para curtir e favoritar o local",unlikeLocal:"Deslize para baixo para ignorar o local",friends:"Encontre pessoas que também preferiram os mesmos lugares que você"}},528:function(t,a,s){a=t.exports=s(503)(),a.push([t.i,".logo[data-v-615303bb]{max-width:150px;margin:0 auto;display:block}.tour-title[data-v-615303bb]{height:65px}.main.login[data-v-615303bb]{background:#561f9f;height:100vh;overflow:scroll}","",{version:3,sources:["/Users/igortrindade/Code/goup-front/src/modules/general/auth/components/login.vue"],names:[],mappings:"AACA,uBACI,gBAAiB,AACjB,cAAe,AACf,aAAc,CACjB,AACD,6BACI,WAAa,CAChB,AACD,6BACI,mBAAoB,AACpB,aAAc,AACd,eAAiB,CACpB",file:"login.vue",sourcesContent:["\n.logo[data-v-615303bb] {\n    max-width: 150px;\n    margin: 0 auto;\n    display: block\n}\n.tour-title[data-v-615303bb] {\n    height: 65px;\n}\n.main.login[data-v-615303bb] {\n    background: #561F9F;\n    height: 100vh;\n    overflow: scroll;\n}\n"],sourceRoot:""}])},538:function(t,a,s){var i=s(528);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);s(504)("766161c0",i,!0)},551:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"main login"},[s("div",{staticClass:"container"},[s("div",{ref:"swiperTour",staticClass:"swiper-container text-center"},[s("div",{staticClass:"swiper-wrapper m-b-10"},[s("div",{staticClass:"swiper-slide"},[s("h4",{staticClass:"tour-title"},[t._v(t._s(t.translations.tourTitle))]),t._v(" "),t._m(0)]),t._v(" "),s("div",{staticClass:"swiper-slide"},[s("h4",{staticClass:"tour-title"},[t._v(t._s(t.translations.likeLocal))]),t._v(" "),t._m(1)]),t._v(" "),s("div",{staticClass:"swiper-slide"},[s("h4",{staticClass:"tour-title"},[t._v(t._s(t.translations.unlikeLocal))]),t._v(" "),t._m(2)]),t._v(" "),s("div",{staticClass:"swiper-slide"},[s("h4",{staticClass:"tour-title"},[t._v(t._s(t.translations.friends))]),t._v(" "),t._m(3)])]),t._v(" "),s("div",{staticClass:"swiper-pagination"})])]),t._v(" "),s("div",{staticClass:"container"},[t.interactions.loginWithEmail?t._e():s("div",[s("button",{staticClass:"btn btn-block btn-primary m-t-10",attrs:{type:"button"},on:{click:function(a){t.interactions.loginWithEmail=!0}}},[t._v("\n                "+t._s(t.translations.loginEmail)+"\n            ")]),t._v(" "),s("button",{staticClass:"btn btn-block btn-facebook m-t-10",attrs:{type:"button"}},[s("i",{staticClass:"ion-social-facebook m-r-10"}),t._v(t._s(t.translations.loginFacebook)+"\n            ")])]),t._v(" "),t.interactions.loginWithEmail?s("div",[s("form",{staticClass:"m-t-30 text-center"},[s("div",{staticClass:"form-group"},[s("input",{staticClass:"form-control",attrs:{type:"text",placeholder:t.translations.inputEmail}})]),t._v(" "),s("div",{staticClass:"form-group"},[s("input",{staticClass:"form-control",attrs:{type:"text",placeholder:t.translations.inputPassword}})]),t._v(" "),s("button",{staticClass:"btn btn-block btn-primary",attrs:{type:"button"}},[t._v(t._s(t.translations.login))]),t._v(" "),s("button",{staticClass:"btn btn-block btn-facebook m-t-10",attrs:{type:"button"}},[s("i",{staticClass:"ion-social-facebook m-r-10"}),t._v(t._s(t.translations.loginFacebook)+"\n                ")])])]):t._e()]),t._v(" "),s("div",{staticClass:"container text-center"},[s("div",{staticClass:"m-t-30"},[s("small",{staticClass:"f-300"},[t._v("\n                "+t._s(t.translations.acceptTerms)+"\n                "),s("a",{staticClass:"f-primary",attrs:{href:"#"}},[t._v(t._s(t.translations.terms))]),t._v("\n                &\n                "),s("a",{staticClass:"f-primary",attrs:{href:"#"}},[t._v(t._s(t.translations.privacy))])])])])])},staticRenderFns:[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"card"},[s("div",{staticClass:"card-header cover",staticStyle:{background:"url('https://serranatural.com/landing/img/produtos/decor1.jpg')"}})])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"card"},[s("div",{staticClass:"card-header cover",staticStyle:{background:"url('https://serranatural.com/landing/img/produtos/decor1.jpg')"}})])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"card"},[s("div",{staticClass:"card-header cover",staticStyle:{background:"url('https://serranatural.com/landing/img/produtos/decor1.jpg')"}})])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"card"},[s("div",{staticClass:"card-header cover",staticStyle:{background:"url('https://serranatural.com/landing/img/produtos/decor1.jpg')"}})])}]}}});
//# sourceMappingURL=5.59a6338d4601ef3b79b7.js.map