webpackJsonp([5],{338:function(t,e,n){n(795);var a=n(3)(n(728),n(830),"data-v-e82e28fc",null);t.exports=a.exports},685:function(t,e,n){"use strict";function a(){return{id:"",name:"",last_name:"",full_name:"",slug:"",age:"",city:{name:"",state:"",lat:0,lng:0},avatar:"",photos:[]}}e.a=a},690:function(t,e){function n(){}function a(t,e){return Math.floor(Math.random()*(e-t+1))+t}n.maxFromBits=function(t){return Math.pow(2,t)},n.limitUI04=n.maxFromBits(4),n.limitUI06=n.maxFromBits(6),n.limitUI08=n.maxFromBits(8),n.limitUI12=n.maxFromBits(12),n.limitUI14=n.maxFromBits(14),n.limitUI16=n.maxFromBits(16),n.limitUI32=n.maxFromBits(32),n.limitUI40=n.maxFromBits(40),n.limitUI48=n.maxFromBits(48),n.randomUI04=function(){return a(0,n.limitUI04-1)},n.randomUI06=function(){return a(0,n.limitUI06-1)},n.randomUI08=function(){return a(0,n.limitUI08-1)},n.randomUI12=function(){return a(0,n.limitUI12-1)},n.randomUI14=function(){return a(0,n.limitUI14-1)},n.randomUI16=function(){return a(0,n.limitUI16-1)},n.randomUI32=function(){return a(0,n.limitUI32-1)},n.randomUI40=function(){return(0|Math.random()*(1<<30))+(0|1024*Math.random())*(1<<30)},n.randomUI48=function(){return(0|Math.random()*(1<<30))+(0|Math.random()*(1<<18))*(1<<30)},n.paddedString=function(t,e,n){t=String(t),n=n||"0";for(var a=e-t.length;a>0;a>>>=1,n+=n)1&a&&(t=n+t);return t},n.prototype.fromParts=function(t,e,a,o,i,s){return this.version=a>>12&15,this.hex=n.paddedString(t.toString(16),8)+"-"+n.paddedString(e.toString(16),4)+"-"+n.paddedString(a.toString(16),4)+"-"+n.paddedString(o.toString(16),2)+n.paddedString(i.toString(16),2)+"-"+n.paddedString(s.toString(16),12),this},n.prototype.toString=function(){return this.hex},n.prototype.toURN=function(){return"urn:uuid:"+this.hex},n.prototype.toBytes=function(){for(var t=this.hex.split("-"),e=[],n=0,a=0;a<t.length;a++)for(var o=0;o<t[a].length;o+=2)e[n++]=parseInt(t[a].substr(o,2),16);return e},n.prototype.equals=function(t){return t instanceof UUID&&this.hex===t.hex},n.getTimeFieldValues=function(t){var e=t-Date.UTC(1582,9,15),n=e/4294967296*1e4&268435455;return{low:1e4*(268435455&e)%4294967296,mid:65535&n,hi:n>>>16,timestamp:e}},n._create4=function(){return(new n).fromParts(n.randomUI32(),n.randomUI16(),16384|n.randomUI12(),128|n.randomUI06(),n.randomUI08(),n.randomUI48())},n._create1=function(){var t=(new Date).getTime(),e=n.randomUI14(),a=1099511627776*(1|n.randomUI08())+n.randomUI40(),o=n.randomUI04(),i=0;t!=i?(t<i&&e++,i=t,o=n.randomUI04()):Math.random()<.25&&o<9984?o+=1+n.randomUI04():e++;var s=n.getTimeFieldValues(i),r=s.low+o,l=4095&s.hi|4096;e&=16383;var c=e>>>8|128,u=255&e;return(new n).fromParts(r,s.mid,l,c,u,a)},n.create=function(t){return t=t||4,this["_create"+t]()},n.fromTime=function(t,e){e=e||!1;var a=n.getTimeFieldValues(t),o=a.low,i=4095&a.hi|4096;return!1===e?(new n).fromParts(o,a.mid,i,0,0,0):(new n).fromParts(o,a.mid,i,128|n.limitUI06,n.limitUI08-1,n.limitUI48-1)},n.firstFromTime=function(t){return n.fromTime(t,!1)},n.lastFromTime=function(t){return n.fromTime(t,!0)},n.fromURN=function(t){var e;return(e=/^(?:urn:uuid:|\{)?([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{2})([0-9a-f]{2})-([0-9a-f]{12})(?:\})?$/i.exec(t))?(new n).fromParts(parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16),parseInt(e[4],16),parseInt(e[5],16),parseInt(e[6],16)):null},n.fromBytes=function(t){if(t.length<5)return null;for(var e="",a=0,o=[4,2,2,2,6],i=0;i<o.length;i++){for(var s=0;s<o[i];s++){var r=t[a++].toString(16);1==r.length&&(r="0"+r),e+=r}6!==o[i]&&(e+="-")}return n.fromURN(e)},n.fromBinary=function(t){for(var e=[],a=0;a<t.length;a++)if(e[a]=t.charCodeAt(a),e[a]>255||e[a]<0)throw new Error("Unexpected byte in binary data.");return n.fromBytes(e)},n.new=function(){return this.create(4)},n.newTS=function(){return this.create(1)},t.exports=n},693:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(23),o=n.n(a),i=n(697),s=n(19);n(690);e.default={props:{recordId:String,sendAction:Function,isvisible:{required:!0,twoWay:!0}},data:function(){return{}},computed:o()({},n.i(s.a)(["language"]),{translations:function(){var t=this.language;return"en"!==t&&t?"pt"===t?i.b:void 0:i.a}}),mounted:function(){},methods:{loadFile:function(t){var e=this,n=t.target,a=(new FileReader,new Image);a.src=window.URL.createObjectURL(n.files[0]),a.onload=function(){e.close(),this.width<1400&&e.$swal({title:e.translations.sizeWarning.title,text:e.translations.sizeWarning.message,type:"info",showCancelButton:!0,confirmButtonText:e.translations.sizeWarning.continue,confirmButtonColor:"#583694",cancelButtonText:e.translations.sizeWarning.cancel,cancelButtonColor:"#48C3D1",reverseButtons:!0}).then(function(){e.sendAction({file:n.files[0]})}).catch(function(){}),this.width>=1400&&e.sendAction({file:n.files[0]})}},close:function(){this.$emit("close-photo-uploader-modal",!1)}}}},697:function(t,e,n){"use strict";n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o});var a={title:"Image upload",buttons:{filePick:"Select a file",cancel:"Cancel"},sizeWarning:{title:"Image size",message:"For better visualization we recommend that the images have at least 1400 pixels wide",cancel:"Cancel",continue:"Continue"}},o={title:"Enviar imagem",buttons:{filePick:"Selecione um arquivo",cancel:"Cancelar"},sizeWarning:{title:"Tamanho da imagem",message:"Para uma melhor visualização, recomendamos que as imagens tenham pelo menos 1400 pixels de largura.",cancel:"Cancelar",continue:"Continuar"}}},698:function(t,e,n){e=t.exports=n(683)(),e.push([t.i,".file-btn[data-v-10b828b5]{position:relative}.file-btn input[type=file][data-v-10b828b5]{position:absolute;width:100%;height:100%;top:0;left:0;opacity:0}input[type=file][data-v-10b828b5]{cursor:pointer}.upload-box[data-v-10b828b5]{min-height:300px;text-align:center}.upload-box a[data-v-10b828b5]{margin-top:130px}.btn-block-50[data-v-10b828b5]{width:48%}.croppie-modal[data-v-10b828b5]{z-index:10}","",{version:3,sources:["/Users/igortrindade/Code/goup-front/src/components/photo-uploader.vue"],names:[],mappings:"AACA,2BACI,iBAAmB,CACtB,AACD,4CACI,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,MAAO,AACP,OAAQ,AACR,SAAW,CACd,AACD,kCACI,cAAgB,CACnB,AACD,6BACI,iBAAkB,AAClB,iBAAmB,CACtB,AACD,+BACI,gBAAkB,CACrB,AACD,+BACI,SAAW,CACd,AACD,gCACI,UAAY,CACf",file:"photo-uploader.vue",sourcesContent:['\n.file-btn[data-v-10b828b5] {\n    position: relative;\n}\n.file-btn input[type="file"][data-v-10b828b5] {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    opacity: 0;\n}\ninput[type="file"][data-v-10b828b5] {\n    cursor: pointer;\n}\n.upload-box[data-v-10b828b5] {\n    min-height: 300px;\n    text-align: center;\n}\n.upload-box a[data-v-10b828b5] {\n    margin-top: 130px;\n}\n.btn-block-50[data-v-10b828b5] {\n    width: 48%;\n}\n.croppie-modal[data-v-10b828b5] {\n    z-index: 10;\n}\n\n'],sourceRoot:""}])},699:function(t,e,n){var a=n(698);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(684)("27fcd5a2",a,!0)},700:function(t,e,n){n(699);var a=n(3)(n(693),n(701),"data-v-10b828b5",null);t.exports=a.exports},701:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.isvisible?n("div",{staticClass:"modal-wp-wrapper"},[n("div",{staticClass:"wp-overlay"}),t._v(" "),n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12 "},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isvisible,expression:"isvisible"}],staticClass:"modal-wp"},[n("div",{staticClass:"modal-wp-dialog"},[n("div",{staticClass:"modal-wp-header"},[n("h2",{staticClass:"modal-title",attrs:{id:"modalLabel"}},[n("span",{staticClass:"f-primary"},[t._v(t._s(t.translations.title))]),t._v(" "),n("button",{staticClass:"close",attrs:{type:"button","aria-label":"Close"},on:{click:function(e){t.close()}}},[t._m(0)])])]),t._v(" "),n("div",{staticClass:"modal-wp-body"},[n("div",{staticClass:"upload-box",attrs:{id:"upload-box"}},[n("a",{staticClass:"btn btn-primary file-btn btn-lg"},[t._v("\n                                "+t._s(t.translations.buttons.filePick)+"\n                                "),n("input",{attrs:{type:"file",value:"Select a file",accept:"image/*"},on:{change:function(e){t.loadFile(e)}}})])])]),t._v(" "),n("div",{staticClass:"modal-footer"},[n("button",{staticClass:"btn btn-success",attrs:{type:"button"},on:{click:function(e){t.close()}}},[t._v(t._s(t.translations.buttons.cancel))])])])])])])]):t._e()},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{attrs:{"aria-hidden":"true"}},[n("i",{staticClass:"ion-close"})])}]}},728:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(23),o=n.n(a),i=n(51),s=n.n(i),r=(n(685),n(700)),l=n.n(r),c=n(746),u=n(19);e.default={name:"general-user-settings-edit-profile",components:{mainHeader:s.a,photoUploader:l.a},data:function(){return{isMobile:!1,showPhotoUploader:!1,interactions:{changePassword:!1},user:{},languages:{pt:!1,en:!1}}},computed:o()({},n.i(u.a)(["language"]),{translations:function(){return"en"===this.language?c.a:"pt"===this.language?c.b:void 0}}),mounted:function(){window.cordova&&(this.isMobile=!0),this.getUser()},methods:o()({},n.i(u.b)(["authSetUser"]),{saveSettings:function(){var t=this;t.$http.post("user/update",t.user).then(function(e){t.authSetUser(e.data.user),successNotify("",t.translations.save_success),t.$router.push("/settings")}).catch(function(t){console.log(t)})},getUser:function(){var t=this;t.$http.get("user/profile").then(function(e){t.user=e.data.user,t.initSwiper()}).catch(function(t){console.log(t)})},initSwiper:function(){var t=this;setTimeout(function(){t.swiperGalleryPhotos=new Swiper(t.$refs.galleryPhotos,{spaceBetween:0,slidesPerView:1,nextButton:".swiper-button-next",prevButton:".swiper-button-prev",scrollbar:".swiper-scrollbar"})},200)},cancelChangePassword:function(){this.user.password="",this.user.password_confirmation="",this.interactions.changePassword=!1},handleUploaderVisibility:function(t){this.showPhotoUploader=t},getPicture:function(){function t(t){n.storeImageMobile(t)}function e(t){alert("Failed because: "+t)}var n=this;navigator.camera.getPicture(t,e,{quality:50,destinationType:Camera.DestinationType.FILE_URI})},getCameraRoll:function(){var t=this;navigator.camera.getPicture(function(e){t.storeImageMobile(e)},function(t){errorNotify("",t)},{quality:50,destinationType:navigator.camera.DestinationType.FILE_URI,sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY})},storeImageMobile:function(t){var e=this,n=function(t){var n=JSON.parse(t.response);e.event.photos.length||(n.photo.is_cover=!0),e.event.photos.push(n.photo),e.interactions.showPhotoPlaceholder=fasle,successNotify("","Imagem enviada com sucesso")},a=function(t){e.interactions.showPhotoPlaceholder=!1,errorNotify("","Houve um erro ao enviar a imagem"),console.log(t)},o=new FileUploadOptions;o.fileKey="file",o.fileName="myphoto.jpg",o.mimeType="image/jpeg",o.headers={Authorization:e.AuthToken};var i=new Object;i.event_id=e.event.id,o.params=i;var s=new FileTransfer;e.interactions.showPhotoPlaceholder=!0,s.upload(t,encodeURI(apiUrl+"/event/photo/upload"),n,a,o)},storeImage:function(t){var e=this;e.interactions.showPhotoPlaceholder=!0;var n=new FormData;n.append("event_id",e.event.id),n.append("file",t.file),e.$http.post("event/photo/upload",n,{headers:{"Content-Type":"multipart/form-data"}}).then(function(t){e.event.photos.length||(t.data.photo.is_cover=!0),e.event.photos.push(t.data.photo),e.interactions.showPhotoPlaceholder=!1}).catch(function(t){console.log(t),e.interactions.showPhotoPlaceholder=!1})}})}},746:function(t,e,n){"use strict";n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o});var a={title:"Edit profile",upload_image:"Upload a new image",save:"Save settings",save_success:"Profile updated",logout:"Logout",takePicture:"Take a picture",openGalery:"Open camera roll",language:{title:"Language",portuguese:"Portuguese",english:"English"},account:{title:"Profile"},password:{title:"Password",button:"Change password",buttonCancel:"Cancel"},placeholders:{name:"Your first name",last_name:"Your last name",password:"Your new password",password_confirmation:"Confirm your password",email:"Your e-mail",bday:"Birth date"}},o={title:"Editar perfil",upload_image:"Faça o upload de uma nova imagem",save:"Salvar configurações",save_success:"Configurações atualizadas.",logout:"Fazer logout",takePicture:"Tirar foto",openGalery:"Abrir galeria",language:{title:"Idioma",portuguese:"Português",english:"Inglês"},account:{title:"Perfil"},password:{title:"Senha",button:"Alterar senha",buttonCancel:"Cancelar"},placeholders:{name:"Seu nome",last_name:"Seu sobrenome",password:"Sua nova senha",password_confirmation:"Confirme sua senha",email:"Seu e-mail",bday:"Data de nascimento"}}},772:function(t,e,n){e=t.exports=n(683)(),e.push([t.i,".swiper-pagination[data-v-e82e28fc]{width:100%}.icon-select[data-v-e82e28fc]{color:#fff;float:right}.new-image[data-v-e82e28fc]{width:100%;text-align:center;border-bottom:2px solid #ff4b89;padding:30px 0}.new-image[data-v-e82e28fc],.new-image i[data-v-e82e28fc]{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.new-image i[data-v-e82e28fc]{font-size:24px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;width:40px;height:40px;border-radius:10px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border:2px solid #ff4b89}.new-image span[data-v-e82e28fc]{display:block;width:100%;font-weight:700;margin-top:20px}","",{version:3,sources:["/Users/igortrindade/Code/goup-front/src/modules/general/user/components/dashboard/edit-profile.vue"],names:[],mappings:"AACA,oCAAsC,UAAY,CACjD,AACD,8BACI,WAAY,AACZ,WAAY,CACf,AAGD,4BACI,WAAY,AAIZ,kBAAmB,AACnB,gCAAiC,AACjC,cAAgB,CACnB,AACD,0DAPI,wBAAyB,AACrB,qBAAsB,AAClB,sBAAwB,CAmBnC,AAdD,8BACI,eAAgB,AAChB,2BAA4B,AAC5B,2BAA4B,AAC5B,oBAAqB,AACrB,WAAY,AAAC,YAAa,AAC1B,mBAAoB,AAIpB,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,wBAA0B,CAC7B,AACD,iCACI,cAAe,AACf,WAAY,AACZ,gBAAiB,AACjB,eAAiB,CACpB",file:"edit-profile.vue",sourcesContent:["\n.swiper-pagination[data-v-e82e28fc] { width: 100%;\n}\n.icon-select[data-v-e82e28fc] {\n    color: #FFF;\n    float: right\n}\n\n/* New Image */\n.new-image[data-v-e82e28fc] {\n    width: 100%;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    text-align: center;\n    border-bottom: 2px solid #FF4B89;\n    padding: 30px 0;\n}\n.new-image i[data-v-e82e28fc] {\n    font-size: 24px;\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    width: 40px; height: 40px;\n    border-radius: 10px;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    border: 2px solid #FF4B89;\n}\n.new-image span[data-v-e82e28fc] {\n    display: block;\n    width: 100%;\n    font-weight: 700;\n    margin-top: 20px;\n}\n\n"],sourceRoot:""}])},795:function(t,e,n){var a=n(772);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(684)("5859cd97",a,!0)},830:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"first-container"},[n("main-header",{attrs:{title:t.translations.title,type:"back",cursor:!1}}),t._v(" "),n("transition",{attrs:{appear:"",mode:"in-out","enter-active-class":"animated fadeInRight","leave-active-class":"animated fadeOutRight"}},[n("div",{staticClass:"main container"},[t.isMobile?n("div",{staticClass:"row"},[n("div",{staticClass:"col-sm-12"},[n("div",{staticClass:"col-xs-6"},[n("div",{staticClass:"new-image m-b-30 cursor-pointer",on:{click:function(e){t.getPicture()}}},[n("i",{staticClass:"ion-ios-camera-outline"}),t._v(" "),n("span",[t._v(t._s(t.translations.takePicture))])])]),t._v(" "),n("div",{staticClass:"col-xs-6"},[n("div",{staticClass:"new-image m-b-30 cursor-pointer",on:{click:function(e){t.getCameraRoll()}}},[n("i",{staticClass:"ion-ios-film-outline"}),t._v(" "),n("span",[t._v(t._s(t.translations.openGalery))])])])])]):t._e(),t._v(" "),t.isMobile?t._e():n("div",{staticClass:"new-image m-b-30 cursor-pointer",on:{click:function(e){t.showPhotoUploader=!0}}},[n("i",{staticClass:"ion-plus-round"}),t._v(" "),n("span",[t._v(t._s(t.translations.upload_image))])]),t._v(" "),n("div",{staticClass:"container text-center"},[n("p",{staticClass:" f-22 f-400"},[t._v(t._s(t.translations.account.title))]),t._v(" "),n("div",{staticClass:"form-group"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.user.name,expression:"user.name"}],staticClass:"form-control",attrs:{type:"text",placeholder:t.translations.placeholders.name},domProps:{value:t.user.name},on:{input:function(e){e.target.composing||(t.user.name=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"form-group"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.user.last_name,expression:"user.last_name"}],staticClass:"form-control",attrs:{type:"text",placeholder:t.translations.placeholders.last_name},domProps:{value:t.user.last_name},on:{input:function(e){e.target.composing||(t.user.last_name=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"form-group"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.user.email,expression:"user.email"}],staticClass:"form-control",attrs:{type:"email",placeholder:t.translations.placeholders.email},domProps:{value:t.user.email},on:{input:function(e){e.target.composing||(t.user.email=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"form-group"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.user.bday,expression:"user.bday"}],staticClass:"form-control",attrs:{type:"tel",placeholder:t.translations.placeholders.bday,"data-mask":"00/00/0000"},domProps:{value:t.user.bday},on:{input:function(e){e.target.composing||(t.user.bday=e.target.value)}}})]),t._v(" "),n("p",{staticClass:" f-22 f-400"},[t._v(t._s(t.translations.password.title))]),t._v(" "),t.interactions.changePassword?t._e():n("button",{staticClass:"btn btn-info btn-block transparent m-t-30",attrs:{type:"button"},on:{click:function(e){t.interactions.changePassword=!0}}},[t._v("\n                    "+t._s(t.translations.password.button)+"\n                ")]),t._v(" "),t.interactions.changePassword?n("div",[n("div",{staticClass:"form-group"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password,expression:"user.password"}],staticClass:"form-control",attrs:{type:"password",placeholder:t.translations.placeholders.password},domProps:{value:t.user.password},on:{input:function(e){e.target.composing||(t.user.password=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"form-group"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password_confirmation,expression:"user.password_confirmation"}],staticClass:"form-control",attrs:{type:"password",placeholder:t.translations.placeholders.password_confirmation},domProps:{value:t.user.password_confirmation},on:{input:function(e){e.target.composing||(t.user.password_confirmation=e.target.value)}}})]),t._v(" "),n("button",{staticClass:"btn btn-info btn-block transparent m-t-30",attrs:{type:"button"},on:{click:function(e){t.cancelChangePassword()}}},[t._v("\n                        "+t._s(t.translations.password.buttonCancel)+"\n                    ")])]):t._e(),t._v(" "),n("button",{staticClass:"btn btn-primary btn-block transparent m-t-30",attrs:{type:"button"},on:{click:function(e){t.saveSettings()}}},[t._v("\n                    "+t._s(t.translations.save)+"\n                ")])])])]),t._v(" "),n("photo-uploader",{attrs:{isvisible:t.showPhotoUploader,"send-action":t.storeImage},on:{"update:isvisible":function(e){t.showPhotoUploader=e},"close-photo-uploader-modal":t.handleUploaderVisibility}})],1)},staticRenderFns:[]}}});
//# sourceMappingURL=5.00ef937c8fbca19c262d.js.map