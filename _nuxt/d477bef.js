(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{412:function(e,t,r){var content=r(485);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(81).default)("3586838c",content,!0,{sourceMap:!1})},484:function(e,t,r){"use strict";r(412)},485:function(e,t,r){var n=r(80)(!1);n.push([e.i,"@import url(https://fonts.googleapis.com/css2?family=Kanit:wght@100;300;400;500;600;700&display=swap);"]),n.push([e.i,".staff__container[data-v-5be72240]{padding:16px;background-color:#fefefe}",""]),e.exports=n},509:function(e,t,r){"use strict";r.r(t);var n=r(418),o=r(406),c=r(408),l=r(409),d=r(503),f=r(368),m=r(507),v=r(504),h=r(410),w=r(366),x=r(417),_=r(505),y=(r(23),r(45),r(30),r(46),r(9)),k=r(12),O=(r(50),r(55),r(24),r(29),r(4),r(172),r(31),r(396)),j=r.n(O);function R(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function C(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?R(Object(source),!0).forEach((function(t){Object(k.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):R(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var $={name:"StaffPage",data:function(){return{stageRef:null,stage:"wait",winner:{},rewardId:null,reward:{id:-1,name:""},items:[],logs:[],headers:[{text:"No.",align:"start",sortable:!1,value:"no"},{text:"Code",value:"code",sortable:!1},{text:"Name",value:"name",sortable:!1},{text:"Reward",value:"reward_name",sortable:!1},{text:"Status",value:"status",sortable:!1},{text:"Timestamp",value:"timestamp",sortable:!1},{text:"",value:"tools",sortable:!1,align:"end"}],options:{},valid:!0}},computed:{stageColor:function(){return"wait"===this.stage?"warning":"spin"===this.stage?"error":"ready"===this.stage?"success":"grey"}},mounted:function(){this.initEvent(),this.getReward()},methods:{initEvent:function(){var e=this;try{this.stageRef=this.$fire.database.ref("game/stage"),this.stageRef.on("value",(function(t){var r=t.val();e.stage=r.status,console.log(e.stage)})),this.$fire.database.ref("logs").on("value",(function(t){var r=t.val()||{},n=Object.keys(r).map((function(e){return C(C({},r[e]),{},{ref:e})}));console.log(n),e.logs=n}))}catch(e){console.error(e)}},getReward:function(){var e=this;this.$fire.database.ref("rewards").once("value",(function(t){e.items=(t.val()||[]).filter((function(e){return!!e.id}))})),this.$fire.database.ref("game/reward").once("value",(function(t){var r=t.val();r&&(e.rewardId=r.id)}))},handleNextRandom:function(){var e=this;return Object(y.a)(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log("check reward"),e.$refs.form.validate()){t.next=3;break}return t.abrupt("return");case 3:if(r=e.items.find((function(t){return t.id===e.rewardId}))){t.next=6;break}return t.abrupt("return");case 6:return n=e.$fire.database.ref("game/reward"),t.next=9,n.update({id:r.id,name:r.name});case 9:return t.next=11,e.$fire.database.ref("game/stage").update({status:"ready"});case 11:case"end":return t.stop()}}),t)})))()},handleReset:function(){var e=this;return Object(y.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$fire.database.ref("game/reward").update({id:-1,name:""});case 2:return t.next=4,e.$fire.database.ref("game/stage").update({status:"wait"});case 4:e.$refs.form.reset();case 5:case"end":return t.stop()}}),t)})))()},getStatusColor:function(e){return"confirmed"===e?"success":"rejected"===e?"error":"warning"},handleConfirm:function(e){var t=this;return Object(y.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.$fire.database.ref("logs/"+e.ref).update({status:"confirmed",updated_at:j()().format("YYYY-MM-DD HH:mm:ss")});case 2:case"end":return r.stop()}}),r)})))()},handleReject:function(e){var t=this;return Object(y.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.$fire.database.ref("logs/"+e.ref).update({status:"rejected",updated_at:j()().format("YYYY-MM-DD HH:mm:ss")});case 2:case"end":return r.stop()}}),r)})))()}}},P=(r(484),r(67)),component=Object(P.a)($,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"staff__container fill-height"},[t(f.a,{staticStyle:{"max-width":"960px"}},[t(w.a,[t(d.a,[t(o.a,{staticClass:"mb-4"},[t(c.a,[t(v.a,{ref:"form",on:{submit:function(e){e.preventDefault()}},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t("div",{staticClass:"d-flex"},[t(_.a),e._v(" "),t(l.a,{attrs:{color:e.stageColor,small:"",outlined:""}},[e._v("\n                  "+e._s(e.stage)+"\n                ")])],1),e._v(" "),t("div",{staticClass:"pb-1"},[e._v("Reward")]),e._v(" "),t(x.a,{attrs:{items:e.items,rules:[function(e){return!!e||"Must be selected reward"}],"item-text":"name","item-value":"id",dense:"","single-line":"",outlined:""},model:{value:e.rewardId,callback:function(t){e.rewardId=t},expression:"rewardId"}}),e._v(" "),t(w.a,[t(d.a,{attrs:{md:"6"}},[t(n.a,{attrs:{color:"primary",block:""},on:{click:e.handleNextRandom}},[e._v("Next Spin")])],1),e._v(" "),t(d.a,{attrs:{md:"6"}},[t(n.a,{attrs:{color:"error",block:""},on:{click:e.handleReset}},[e._v("Reset")])],1)],1)],1)],1)],1)],1)],1),e._v(" "),t(w.a,[t(d.a,[t("div",{staticClass:"text-subtitle-1 pb-2"},[e._v("History")]),e._v(" "),t(m.a,{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.logs,"items-per-page":5,options:e.options,"sort-by":"timestamp","sort-desc":!0,height:"290","fixed-header":""},on:{"update:options":function(t){e.options=t}},scopedSlots:e._u([{key:"item.no",fn:function(t){var r=t.index;return[e._v("\n            "+e._s(r+1+(e.options.page-1)*e.options.itemsPerPage)+"\n          ")]}},{key:"item.status",fn:function(r){var n=r.item;return[t(l.a,{attrs:{color:e.getStatusColor(n.status),small:"",outlined:""}},[e._v("\n              "+e._s(n.status||"wait")+"\n            ")])]}},{key:"item.tools",fn:function(r){var o=r.item;return["wait"===o.status?t("div",[t(n.a,{attrs:{color:"success",icon:""},on:{click:function(t){return e.handleConfirm(o)}}},[t(h.a,[e._v("mdi-check")])],1),e._v(" "),t(n.a,{attrs:{color:"error",icon:""},on:{click:function(t){return e.handleReject(o)}}},[t(h.a,[e._v("mdi-close")])],1)],1):e._e()]}}],null,!0)})],1)],1)],1)],1)}),[],!1,null,"5be72240",null);t.default=component.exports}}]);