(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{19:function(e,t,r){"use strict";r.d(t,"a",function(){return f});var n=r(21),a=r.n(n),i=r(22),s=r.n(i),o=r(20);function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(r,!0).forEach(function(t){a()(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function p(){if(o.a.isServer){var e=s.a.create({headers:u({},o.a.action.req.headers,{accept:"*/*"}),baseURL:o.a.serverOrigin});return e.interceptors.response.use(function(e){var t=e.headers&&e.headers["set-cookie"];if(t){var r=o.a.action.res.getHeader("set-cookie")||[];Array.isArray(t)||(t=[t]),o.a.action.res.setHeader("set-cookie",t.concat(r))}return e},function(e){return Promise.reject(e)}),e}return s.a.create()}function f(e,t){return p().get(e,{params:t})}},20:function(e,t,r){"use strict";(function(e,n){var a=r(23),i=r.n(a),s={isServer:!1,isClient:!0,isProd:!0,isDev:!1,serverOrigin:"",action:{req:{},res:{},next:function(){},params:{}},page:"",query:{},setServerContext:function(e){var t=e.req,r=e.res,n=e.next,a=e.serverOrigin,i=e.params;s.serverOrigin=a,t&&(s.action.req=t,s.query=t.query),r&&(s.action.res=r),n&&(s.action.next=n),i&&(s.action.params=i)},clientInit:function(){var e=i.a.parse(location.href,!0);s.serverOrigin=location.origin,s.query=e.query}};e.process&&e.process.env&&"server"==e.process.env.VUE_ENV?(s.isServer=!0,s.isClient=!1):s.clientInit(),e.process&&n.env,t.a=s}).call(this,r(3),r(9))},25:function(e,t,r){var n=r(60);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);(0,r(8).default)("26deeb44",n,!1,{sourceMap:!1})},59:function(e,t,r){"use strict";var n=r(25);r.n(n).a},60:function(e,t,r){(e.exports=r(7)(!1)).push([e.i,"h1.title{margin:100px 0 50px;color:rgba(0,0,0,.5);text-align:center;font-size:50px;color:red}p.content{margin:20px}.links{margin:.5em 1em}.links>a{margin:0 1em}",""])},66:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h1",{staticClass:"title"},[this._v("\n        demo\n    ")]),t("div",{staticClass:"links"},[t("router-link",{attrs:{to:"/"}},[this._v("\n            Go to Index\n        ")])],1)])};n._withStripped=!0;var a=r(0),i=r.n(a),s=r(1),o=r.n(s),c=r(5),u=r(19),p={name:"App",components:{},createStore:function(){var e,t,r=new c.a.Store({state:{data:{time:""},msg:""},mutations:{setData:function(e,t){e.data=t}},actions:{fetchItem:(e=o()(i.a.mark(function e(t){var r,n,a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.commit,e.next=3,Object(u.a)("/api/demo",{sayhi:"hi server!"});case 3:n=e.sent,a=n.data,r("setData",a.data);case 6:case"end":return e.stop()}},e)})),function(t){return e.apply(this,arguments)})}});return{fetchData:(t=o()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",r.dispatch("fetchItem"));case 1:case"end":return e.stop()}},e)})),function(){return t.apply(this,arguments)}),store:r}},data:function(){return{}},computed:{},methods:{}},f=(r(59),r(6)),l=Object(f.a)(p,n,[],!1,null,null,null);l.options.__file="src/client/pages/demo/app.vue";t.default=l.exports}}]);