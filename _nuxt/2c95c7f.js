(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{500:function(e,t,r){var content=r(561);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(81).default)("b46d0808",content,!0,{sourceMap:!1})},559:function(e,t,r){e.exports=r.p+"img/stage-logo.dcb02f3.png"},560:function(e,t,r){"use strict";r(500)},561:function(e,t,r){var n=r(80),o=r(562),c=r(563),d=r(564),l=n(!1);l.push([e.i,"@import url(https://fonts.googleapis.com/css2?family=Kanit:wght@100;300;400;500;600;700&display=swap);"]);var m=o(c),h=o(d);l.push([e.i,".stage__container[data-v-35172c48]{background-color:#555;background-image:url("+m+");background-position:50%;background-repeat:no-repeat;background-size:cover;flex-direction:column}.stage__container[data-v-35172c48],.stage__item[data-v-35172c48]{display:flex;align-items:center;justify-content:center}.stage__item[data-v-35172c48]{width:100%;overflow:hidden}.stage-btn[data-v-35172c48]{width:200px;height:200px;background-image:url("+h+");background-position:50%;background-repeat:no-repeat;background-size:contain;box-sizing:border-box;cursor:pointer;-webkit-user-select:none;-webkit-touch-callout:none;-moz-user-select:none;user-select:none}.stage-reward__count[data-v-35172c48],.stage-reward__name[data-v-35172c48]{font-size:2.5rem;font-weight:400;line-height:4rem;text-align:center}@media only screen and (max-width:800px){.stage-reward__count[data-v-35172c48],.stage-reward__name[data-v-35172c48]{font-size:1.2rem;line-height:2.5rem}}@media only screen and (max-width:1024px){.stage-reward__count[data-v-35172c48],.stage-reward__name[data-v-35172c48]{font-size:2rem;line-height:3rem}}",""]),e.exports=l},563:function(e,t,r){e.exports=r.p+"img/stage-bg.23452cd.jpg"},564:function(e,t,r){e.exports=r.p+"img/stage-btn.5961cfb.png"},584:function(e,t,r){"use strict";r.r(t);var n=r(476),o=r(505),c=r(464),d=r(376),l=(r(31),r(63),r(8)),m=(r(47),r(407)),h=r.n(m),v={name:"StagePage",data:function(){return{status:"wait",reward:{},rewardCount:0,itemHeight:0,tempWinner:{},registerTypes:[]}},mounted:function(){this.initEvent()},methods:{onResize:function(){var e=window.innerHeight;this.itemHeight=e/3},initEvent:function(){var e=this;try{this.$fire.database.ref("game/stage").on("value",function(){var t=Object(l.a)(regeneratorRuntime.mark((function t(r){var n,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.val(),e.registerTypes=n.types,console.log(n),!["break","spined"].includes(n.status)||!e.tempWinner.code){t.next=14;break}return console.log("insert log",e.tempWinner),t.next=7,e.$fire.database.ref("logs").push(e.tempWinner);case 7:return e.tempWinner={},o=n.count+("break"===n.status?0:1),t.next=11,e.$fire.database.ref("game/stage").update({count:o});case 11:e.status=n.status,t.next=17;break;case 14:e.status=n.status,e.rewardCount=n.count,console.log("upate status",n,e.status);case 17:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),this.$fire.database.ref("game/reward").on("value",(function(t){var r=t.val();e.reward=r,console.log("update reward",r)}))}catch(e){console.error(e)}},handleOnRandom:function(){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){var data,r,n,o,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,data={types:e.registerTypes},t.next=4,e.$axios.$post("https://monothaiseries.mono29.com/api/v1/rewards/random",data);case 4:return r=t.sent,t.next=7,e.$fire.database.ref("rewards").child(e.reward.ref).once("value");case 7:return n=t.sent,o=n.val(),c=o.draws+1,t.next=12,e.$fire.database.ref("game/stage").update({code:r.code,status:"spinning"});case 12:return t.next=14,e.$fire.database.ref("rewards").child(e.reward.ref).update({draws:c});case 14:e.tempWinner={code:r.code,name:r.name,reward_id:o.id,reward_name:o.name,reward_ref:e.reward.ref,status:"confirmed",timestamp:h()().format("YYYY-MM-DD HH:mm:ss")},t.next=20;break;case 17:t.prev=17,t.t0=t.catch(0),console.error(t.t0);case 20:case"end":return t.stop()}}),t,null,[[0,17]])})))()}}},f=v,w=(r(560),r(65)),component=Object(w.a)(f,(function(){var e=this,t=e._self._c;return t("div",{directives:[{def:d.a,name:"resize",rawName:"v-resize",value:e.onResize,expression:"onResize"}],staticClass:"stage__container fill-height"},[t("div",{staticClass:"stage__item",style:{height:.8*e.itemHeight+"px"}},[t(o.a,{attrs:{src:r(559),"max-width":"70%","max-height":.8*e.itemHeight,contain:""}})],1),e._v(" "),t("div",{staticClass:"stage__item",style:{height:1.4*e.itemHeight+"px"}},[t("div",{staticClass:"stage-reward"},[t(o.a,{attrs:{src:e.reward.image_url,"max-height":.9*e.itemHeight,contain:""}}),e._v(" "),t("div",{staticClass:"stage-reward__name"},[e._v(e._s(e.reward.name))]),e._v(" "),t("div",{staticClass:"stage-reward__count"},[e._v("รางวัลลำดับที่ "+e._s(e.rewardCount+1))])],1)]),e._v(" "),t("div",{staticClass:"stage__item",style:{height:.8*e.itemHeight+"px"}},[t("button",{staticClass:"stage-btn",style:{height:.8*e.itemHeight-48+"px",width:e.itemHeight-48+"px"},on:{click:e.handleOnRandom}})]),e._v(" "),t(c.a,{attrs:{value:"spinning"===e.status}}),e._v(" "),t(c.a,{attrs:{value:["break","wait"].includes(e.status),opacity:"0.7"}},[t("div",{staticClass:"white-color text-center"},[t(n.a,{attrs:{size:"48"}},[e._v("mdi-emoticon-excited-outline")]),e._v(" "),t("div",{staticClass:"text-h4 pt-3"},[e._v("รอออกรางวัล...")])],1)])],1)}),[],!1,null,"35172c48",null);t.default=component.exports}}]);