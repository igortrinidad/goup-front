webpackJsonp([50],{1066:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(10),r=n.n(o),u=n(19);e.default={name:"auth-logout",data:function(){return{}},created:function(){this.logout()},methods:r()({},n.i(u.a)(["authSetToken","authSetUser"]),{logout:function(){this.authSetToken(null),this.authSetUser({}),localStorage.clear(),window.cordova&&window.cookies.clear(),this.$router.push("/")}})}},1509:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div")},staticRenderFns:[]}},410:function(t,e,n){var o=n(2)(n(1066),n(1509),null,null);t.exports=o.exports}});
//# sourceMappingURL=50.a6c87ef5e307fe8c115b.js.map