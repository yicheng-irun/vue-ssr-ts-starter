(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{19:function(e,t,r){"use strict";r.d(t,"a",function(){return f});var n=r(21),i=r.n(n),a=r(22),s=r.n(a),c=r(20);function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(r,!0).forEach(function(t){i()(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function p(){if(c.a.isServer){var e=s.a.create({headers:u({},c.a.action.req.headers,{accept:"*/*"}),baseURL:c.a.serverOrigin});return e.interceptors.response.use(function(e){var t=e.headers&&e.headers["set-cookie"];if(t){var r=c.a.action.res.getHeader("set-cookie")||[];Array.isArray(t)||(t=[t]),c.a.action.res.setHeader("set-cookie",t.concat(r))}return e},function(e){return Promise.reject(e)}),e}return s.a.create()}function f(e,t){return p().get(e,{params:t})}},20:function(e,t,r){"use strict";(function(e,n){var i=r(23),a=r.n(i),s={isServer:!1,isClient:!0,isProd:!0,isDev:!1,serverOrigin:"",action:{req:{},res:{},next:function(){},params:{}},page:"",query:{},setServerContext:function(e){var t=e.req,r=e.res,n=e.next,i=e.serverOrigin,a=e.params;s.serverOrigin=i,t&&(s.action.req=t,s.query=t.query),r&&(s.action.res=r),n&&(s.action.next=n),a&&(s.action.params=a)},clientInit:function(){var e=a.a.parse(location.href,!0);s.serverOrigin=location.origin,s.query=e.query}};e.process&&e.process.env&&"server"==e.process.env.VUE_ENV?(s.isServer=!0,s.isClient=!1):s.clientInit(),e.process&&n.env,t.a=s}).call(this,r(3),r(9))},64:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h1",{staticClass:"title"},[this._v("子路由2")]),t("div",[this._v("msg: "+this._s(this.$store.state.msg))])])};n._withStripped=!0;var i=r(0),a=r.n(i),s=r(1),c=r.n(s),o=r(5),u=r(19),p={name:"App",components:{},data:function(){return{}},store:function(){var e;return new o.a.Store({state:{data:{time:""},msg:"child2"},mutations:{setData:function(e,t){e.data=t}},actions:{fetchItem:(e=c()(a.a.mark(function e(t){var r,n,i;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.commit,e.next=3,Object(u.a)("/api/demo",{sayhi:"hi server!"});case 3:n=e.sent,i=n.data,r("setData",i.data);case 6:case"end":return e.stop()}},e)})),function(t){return e.apply(this,arguments)})}})},asyncData:function(){},computed:{},methods:{}},f=r(6),v=Object(f.a)(p,n,[],!1,null,null,null);v.options.__file="src/client/pages/demo2/child2/app.vue";t.default=v.exports}}]);