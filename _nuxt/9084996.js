(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{371:function(t,e,r){"use strict";r(26),r(25),r(29),r(45),r(30),r(46);var n=r(14),o=r(12),c=(r(115),r(4),r(82),r(0)),l=r(50),d=r(71);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=c.a.extend({name:"colorable",props:{color:String},methods:{setBackgroundColor:function(t){var data=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return"string"==typeof data.style?(Object(l.b)("style must be an object",this),data):"string"==typeof data.class?(Object(l.b)("class must be an object",this),data):(Object(d.d)(t)?data.style=h(h({},data.style),{},{"background-color":"".concat(t),"border-color":"".concat(t)}):t&&(data.class=h(h({},data.class),{},Object(o.a)({},t,!0))),data)},setTextColor:function(t){var data=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("string"==typeof data.style)return Object(l.b)("style must be an object",this),data;if("string"==typeof data.class)return Object(l.b)("class must be an object",this),data;if(Object(d.d)(t))data.style=h(h({},data.style),{},{color:"".concat(t),"caret-color":"".concat(t)});else if(t){var e=t.toString().trim().split(" ",2),r=Object(n.a)(e,2),c=r[0],f=r[1];data.class=h(h({},data.class),{},Object(o.a)({},c+"--text",!0)),f&&(data.class["text--"+f]=!0)}return data}}})},374:function(t,e,r){"use strict";r.d(e,"b",(function(){return c}));var n=r(12),o=r(0);function c(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"value",r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"input";return o.a.extend({name:"toggleable",model:{prop:e,event:r},props:Object(n.a)({},e,{required:!1}),data:function(){return{isActive:!!this[e]}},watch:(t={},Object(n.a)(t,e,(function(t){this.isActive=!!t})),Object(n.a)(t,"isActive",(function(t){!!t!==this[e]&&this.$emit(r,t)})),t)})}var l=c();e.a=l},376:function(t,e,r){"use strict";var n={inserted:function(t,e,r){var n=e.value,o=e.options||{passive:!0};window.addEventListener("resize",n,o),t._onResize=Object(t._onResize),t._onResize[r.context._uid]={callback:n,options:o},e.modifiers&&e.modifiers.quiet||n()},unbind:function(t,e,r){var n;if(null===(n=t._onResize)||void 0===n?void 0:n[r.context._uid]){var o=t._onResize[r.context._uid],c=o.callback,l=o.options;window.removeEventListener("resize",c,l),delete t._onResize[r.context._uid]}}};e.a=n},386:function(t,e,r){"use strict";var n=r(15);r(4);function o(t,e,r){var n,o=null===(n=t._observe)||void 0===n?void 0:n[r.context._uid];o&&(o.observer.unobserve(t),delete t._observe[r.context._uid])}var c={inserted:function(t,e,r){if("undefined"!=typeof window&&"IntersectionObserver"in window){var c=e.modifiers||{},l=e.value,d="object"===Object(n.a)(l)?l:{handler:l,options:{}},f=d.handler,h=d.options,v=new IntersectionObserver((function(){var n,l=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],d=arguments.length>1?arguments[1]:void 0,h=null===(n=t._observe)||void 0===n?void 0:n[r.context._uid];if(h){var v=l.some((function(t){return t.isIntersecting}));!f||c.quiet&&!h.init||c.once&&!v&&!h.init||f(l,d,v),v&&c.once?o(t,e,r):h.init=!0}}),h);t._observe=Object(t._observe),t._observe[r.context._uid]={init:!1,observer:v},v.observe(t)}},unbind:o};e.a=c},407:function(t,e,r){t.exports=function(){"use strict";var t=1e3,e=6e4,r=36e5,n="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",l="quarter",d="year",f="date",h="Invalid Date",v=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,y={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],r=t%100;return"["+t+(e[(r-20)%10]||e[r]||e[0])+"]"}},w=function(t,e,r){var n=String(t);return!n||n.length>=e?t:""+Array(e+1-n.length).join(r)+t},x={s:w,z:function(t){var e=-t.utcOffset(),r=Math.abs(e),n=Math.floor(r/60),i=r%60;return(e<=0?"+":"-")+w(n,2,"0")+":"+w(i,2,"0")},m:function t(e,r){if(e.date()<r.date())return-t(r,e);var n=12*(r.year()-e.year())+(r.month()-e.month()),i=e.clone().add(n,c),s=r-i<0,u=e.clone().add(n+(s?-1:1),c);return+(-(n+(r-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:d,w:o,d:a,D:f,h:u,m:s,s:i,ms:n,Q:l}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",O={};O[g]=y;var p=function(t){return t instanceof j},$=function t(e,r,n){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();O[s]&&(i=s),r&&(O[s]=r,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;O[a]=e,i=a}return!n&&i&&(g=i),i||!n&&g},_=function(t,e){if(p(t))return t.clone();var r="object"==typeof e?e:{};return r.date=t,r.args=arguments,new j(r)},S=x;S.l=$,S.i=p,S.w=function(t,e){return _(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var j=function(){function y(t){this.$L=$(t.locale,null,!0),this.parse(t)}var w=y.prototype;return w.parse=function(t){this.$d=function(t){var e=t.date,r=t.utc;if(null===e)return new Date(NaN);if(S.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var n=e.match(v);if(n){var i=n[2]-1||0,s=(n[7]||"0").substring(0,3);return r?new Date(Date.UTC(n[1],i,n[3]||1,n[4]||0,n[5]||0,n[6]||0,s)):new Date(n[1],i,n[3]||1,n[4]||0,n[5]||0,n[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},w.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},w.$utils=function(){return S},w.isValid=function(){return!(this.$d.toString()===h)},w.isSame=function(t,e){var r=_(t);return this.startOf(e)<=r&&r<=this.endOf(e)},w.isAfter=function(t,e){return _(t)<this.startOf(e)},w.isBefore=function(t,e){return this.endOf(e)<_(t)},w.$g=function(t,e,r){return S.u(t)?this[e]:this.set(r,t)},w.unix=function(){return Math.floor(this.valueOf()/1e3)},w.valueOf=function(){return this.$d.getTime()},w.startOf=function(t,e){var r=this,n=!!S.u(e)||e,l=S.p(t),h=function(t,e){var i=S.w(r.$u?Date.UTC(r.$y,e,t):new Date(r.$y,e,t),r);return n?i:i.endOf(a)},v=function(t,e){return S.w(r.toDate()[t].apply(r.toDate("s"),(n?[0,0,0,0]:[23,59,59,999]).slice(e)),r)},m=this.$W,y=this.$M,w=this.$D,x="set"+(this.$u?"UTC":"");switch(l){case d:return n?h(1,0):h(31,11);case c:return n?h(1,y):h(0,y+1);case o:var g=this.$locale().weekStart||0,O=(m<g?m+7:m)-g;return h(n?w-O:w+(6-O),y);case a:case f:return v(x+"Hours",0);case u:return v(x+"Minutes",1);case s:return v(x+"Seconds",2);case i:return v(x+"Milliseconds",3);default:return this.clone()}},w.endOf=function(t){return this.startOf(t,!1)},w.$set=function(t,e){var r,o=S.p(t),l="set"+(this.$u?"UTC":""),h=(r={},r[a]=l+"Date",r[f]=l+"Date",r[c]=l+"Month",r[d]=l+"FullYear",r[u]=l+"Hours",r[s]=l+"Minutes",r[i]=l+"Seconds",r[n]=l+"Milliseconds",r)[o],v=o===a?this.$D+(e-this.$W):e;if(o===c||o===d){var m=this.clone().set(f,1);m.$d[h](v),m.init(),this.$d=m.set(f,Math.min(this.$D,m.daysInMonth())).$d}else h&&this.$d[h](v);return this.init(),this},w.set=function(t,e){return this.clone().$set(t,e)},w.get=function(t){return this[S.p(t)]()},w.add=function(n,l){var f,h=this;n=Number(n);var v=S.p(l),m=function(t){var e=_(h);return S.w(e.date(e.date()+Math.round(t*n)),h)};if(v===c)return this.set(c,this.$M+n);if(v===d)return this.set(d,this.$y+n);if(v===a)return m(1);if(v===o)return m(7);var y=(f={},f[s]=e,f[u]=r,f[i]=t,f)[v]||1,w=this.$d.getTime()+n*y;return S.w(w,this)},w.subtract=function(t,e){return this.add(-1*t,e)},w.format=function(t){var e=this,r=this.$locale();if(!this.isValid())return r.invalidDate||h;var n=t||"YYYY-MM-DDTHH:mm:ssZ",i=S.z(this),s=this.$H,u=this.$m,a=this.$M,o=r.weekdays,c=r.months,l=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].slice(0,s)},d=function(t){return S.s(s%12||12,t,"0")},f=r.meridiem||function(t,e,r){var n=t<12?"AM":"PM";return r?n.toLowerCase():n},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:S.s(a+1,2,"0"),MMM:l(r.monthsShort,a,c,3),MMMM:l(c,a),D:this.$D,DD:S.s(this.$D,2,"0"),d:String(this.$W),dd:l(r.weekdaysMin,this.$W,o,2),ddd:l(r.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:S.s(s,2,"0"),h:d(1),hh:d(2),a:f(s,u,!0),A:f(s,u,!1),m:String(u),mm:S.s(u,2,"0"),s:String(this.$s),ss:S.s(this.$s,2,"0"),SSS:S.s(this.$ms,3,"0"),Z:i};return n.replace(m,(function(t,e){return e||v[t]||i.replace(":","")}))},w.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},w.diff=function(n,f,h){var v,m=S.p(f),y=_(n),w=(y.utcOffset()-this.utcOffset())*e,x=this-y,g=S.m(this,y);return g=(v={},v[d]=g/12,v[c]=g,v[l]=g/3,v[o]=(x-w)/6048e5,v[a]=(x-w)/864e5,v[u]=x/r,v[s]=x/e,v[i]=x/t,v)[m]||x,h?g:S.a(g)},w.daysInMonth=function(){return this.endOf(c).$D},w.$locale=function(){return O[this.$L]},w.locale=function(t,e){if(!t)return this.$L;var r=this.clone(),n=$(t,e,!0);return n&&(r.$L=n),r},w.clone=function(){return S.w(this.$d,this)},w.toDate=function(){return new Date(this.valueOf())},w.toJSON=function(){return this.isValid()?this.toISOString():null},w.toISOString=function(){return this.$d.toISOString()},w.toString=function(){return this.$d.toUTCString()},y}(),M=j.prototype;return _.prototype=M,[["$ms",n],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",d],["$D",f]].forEach((function(t){M[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),_.extend=function(t,e){return t.$i||(t(e,j,_),t.$i=!0),_},_.locale=$,_.isDayjs=p,_.unix=function(t){return _(1e3*t)},_.en=O[g],_.Ls=O,_.p={},_}()},450:function(t,e,r){var content=r(451);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(81).default)("3f95a174",content,!0,{sourceMap:!1})},451:function(t,e,r){var n=r(80)(!1);n.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Kanit:wght@100;300;400;500;600;700&display=swap);"]),n.push([t.i,".theme--light.v-overlay{color:rgba(0,0,0,.87)}.theme--dark.v-overlay{color:#fff}.v-overlay{align-items:center;border-radius:inherit;display:flex;justify-content:center;position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:none;transition:.3s cubic-bezier(.25,.8,.5,1),z-index 1ms}.v-overlay__content{position:relative}.v-overlay__scrim{border-radius:inherit;bottom:0;height:100%;left:0;position:absolute;right:0;top:0;transition:inherit;width:100%;will-change:opacity}.v-overlay--absolute{position:absolute}.v-overlay--active{pointer-events:auto}",""]),t.exports=n},464:function(t,e,r){"use strict";r(26),r(25),r(29),r(4),r(45),r(30),r(46);var n=r(12),o=(r(242),r(450),r(371)),c=r(171),l=r(374),d=r(170);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}e.a=Object(d.a)(o.a,c.a,l.a).extend({name:"v-overlay",props:{absolute:Boolean,color:{type:String,default:"#212121"},dark:{type:Boolean,default:!0},opacity:{type:[Number,String],default:.46},value:{default:!0},zIndex:{type:[Number,String],default:5}},computed:{__scrim:function(){var data=this.setBackgroundColor(this.color,{staticClass:"v-overlay__scrim",style:{opacity:this.computedOpacity}});return this.$createElement("div",data)},classes:function(){return function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({"v-overlay--absolute":this.absolute,"v-overlay--active":this.isActive},this.themeClasses)},computedOpacity:function(){return Number(this.isActive?this.opacity:0)},styles:function(){return{zIndex:this.zIndex}}},methods:{genContent:function(){return this.$createElement("div",{staticClass:"v-overlay__content"},this.$slots.default)}},render:function(t){var e=[this.__scrim];return this.isActive&&e.push(this.genContent()),t("div",{staticClass:"v-overlay",on:this.$listeners,class:this.classes,style:this.styles},e)}})},473:function(t,e,r){"use strict";r(242),r(38),r(474);var n=r(386),o=r(371),c=r(13);e.a=o.a.extend({name:"v-progress-circular",directives:{intersect:n.a},props:{button:Boolean,indeterminate:Boolean,rotate:{type:[Number,String],default:0},size:{type:[Number,String],default:32},width:{type:[Number,String],default:4},value:{type:[Number,String],default:0}},data:function(){return{radius:20,isVisible:!0}},computed:{calculatedSize:function(){return Number(this.size)+(this.button?8:0)},circumference:function(){return 2*Math.PI*this.radius},classes:function(){return{"v-progress-circular--visible":this.isVisible,"v-progress-circular--indeterminate":this.indeterminate,"v-progress-circular--button":this.button}},normalizedValue:function(){return this.value<0?0:this.value>100?100:parseFloat(this.value)},strokeDashArray:function(){return Math.round(1e3*this.circumference)/1e3},strokeDashOffset:function(){return(100-this.normalizedValue)/100*this.circumference+"px"},strokeWidth:function(){return Number(this.width)/+this.size*this.viewBoxSize*2},styles:function(){return{height:Object(c.h)(this.calculatedSize),width:Object(c.h)(this.calculatedSize)}},svgStyles:function(){return{transform:"rotate(".concat(Number(this.rotate),"deg)")}},viewBoxSize:function(){return this.radius/(1-Number(this.width)/+this.size)}},methods:{genCircle:function(t,e){return this.$createElement("circle",{class:"v-progress-circular__".concat(t),attrs:{fill:"transparent",cx:2*this.viewBoxSize,cy:2*this.viewBoxSize,r:this.radius,"stroke-width":this.strokeWidth,"stroke-dasharray":this.strokeDashArray,"stroke-dashoffset":e}})},genSvg:function(){var t=[this.indeterminate||this.genCircle("underlay",0),this.genCircle("overlay",this.strokeDashOffset)];return this.$createElement("svg",{style:this.svgStyles,attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"".concat(this.viewBoxSize," ").concat(this.viewBoxSize," ").concat(2*this.viewBoxSize," ").concat(2*this.viewBoxSize)}},t)},genInfo:function(){return this.$createElement("div",{staticClass:"v-progress-circular__info"},this.$slots.default)},onObserve:function(t,e,r){this.isVisible=r}},render:function(t){return t("div",this.setTextColor(this.color,{staticClass:"v-progress-circular",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,directives:[{name:"intersect",value:this.onObserve}],style:this.styles,on:this.$listeners}),[this.genSvg(),this.genInfo()])}})},474:function(t,e,r){var content=r(475);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(81).default)("e003f1f8",content,!0,{sourceMap:!1})},475:function(t,e,r){var n=r(80)(!1);n.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Kanit:wght@100;300;400;500;600;700&display=swap);"]),n.push([t.i,".v-progress-circular{position:relative;display:inline-flex;vertical-align:middle;justify-content:center;align-items:center}.v-progress-circular>svg{width:100%;height:100%;margin:auto;position:absolute;top:0;bottom:0;left:0;right:0;z-index:0}.v-progress-circular--indeterminate>svg{animation:progress-circular-rotate 1.4s linear infinite;transform-origin:center center;transition:all .2s ease-in-out}.v-progress-circular--indeterminate .v-progress-circular__overlay{animation:progress-circular-dash 1.4s ease-in-out infinite;stroke-linecap:round;stroke-dasharray:80,200;stroke-dashoffset:0px}.v-progress-circular--indeterminate:not(.v-progress-circular--visible) .v-progress-circular__overlay,.v-progress-circular--indeterminate:not(.v-progress-circular--visible)>svg{animation-play-state:paused!important}.v-progress-circular__info{align-items:center;display:flex;justify-content:center}.v-progress-circular__underlay{stroke:hsla(0,0%,62%,.4);z-index:1}.v-progress-circular__overlay{stroke:currentColor;z-index:2;transition:all .6s ease-in-out}@keyframes progress-circular-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0px}50%{stroke-dasharray:100,200;stroke-dashoffset:-15px}to{stroke-dasharray:100,200;stroke-dashoffset:-124px}}@keyframes progress-circular-rotate{to{transform:rotate(1turn)}}",""]),t.exports=n},503:function(t,e,r){var content=r(570);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(81).default)("07b917b4",content,!0,{sourceMap:!1})},569:function(t,e,r){"use strict";r(503)},570:function(t,e,r){var n=r(80)(!1);n.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Kanit:wght@100;300;400;500;600;700&display=swap);"]),n.push([t.i,'.stage__container[data-v-16a6ac52]{background-color:#555}.stage__box[data-v-16a6ac52],.stage__container[data-v-16a6ac52]{display:flex;align-items:center;justify-content:center}.stage__box[data-v-16a6ac52]{position:relative;border-radius:24px;background-color:rgba(0,0,0,.2);overflow:hidden}.stage__box--disable[data-v-16a6ac52]:after{content:"";position:absolute;top:0;bottom:0;left:0;right:0;background-color:hsla(0,0%,100%,.7);box-shadow:inset 0 10px 30px rgba(0,0,0,.1),inset 0 10px 30px rgba(0,0,0,.2),inset 0 10px 30px rgba(0,0,0,.05),inset 0 10px 30px rgba(0,0,0,.05)}.stage-btn[data-v-16a6ac52]{position:absolute;left:16px;right:16px;top:16px;bottom:16px;font-size:3rem;font-weight:500;color:#820000;display:flex;align-items:center;justify-content:center;background-color:transparent;background-color:initial;background-image:linear-gradient(#e51414,#720000);border-radius:50%;box-shadow:0 10px 20px rgba(0,0,0,.1),0 3px 6px rgba(0,0,0,.2);box-sizing:border-box;cursor:pointer;-webkit-user-select:none;-webkit-touch-callout:none;-moz-user-select:none;user-select:none}.stage-btn[data-v-16a6ac52]:active{background-image:linear-gradient(#720000,#8a0000);border:5px solid #8c0000;color:#820000}.stage-btn[data-v-16a6ac52]:disabled{cursor:not-allowed;opacity:.8;background-image:linear-gradient(red,#720000)!important;border:none!important;color:#720000!important}.stage-btn--border[data-v-16a6ac52]{position:relative;border-radius:50%;background-color:#aaa;border-bottom:3px solid rgba(0,0,0,.4);border-top:3px solid hsla(0,0%,100%,.3)}',""]),t.exports=n},586:function(t,e,r){"use strict";r.r(e);var n=r(464),o=r(473),c=r(376),l=(r(63),r(26),r(25),r(29),r(4),r(45),r(30),r(46),r(12)),d=r(8),f=(r(31),r(47),r(407)),h=r.n(f);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function m(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(l.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var y={name:"StagePage",data:function(){return{boxSize:100,buttonSize:50,status:!1}},mounted:function(){this.initEvent()},methods:{initEvent:function(){var t=this;try{this.$fire.database.ref("game/stage").on("value",(function(e){var r=e.val();t.status=r.status,console.log("upate status",r,t.status)}))}catch(t){console.error(t)}},onResize:function(){var t=Math.max(Math.min(800,window.innerWidth),320);console.log(t),this.boxSize=parseInt(.8*t),this.buttonSize=parseInt(.5*this.boxSize)},getReward:function(){var t=this;return Object(d.a)(regeneratorRuntime.mark((function e(){var r,n,o,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$fire.database.ref("game/reward").once("value");case 2:return r=e.sent,n=r.val(),e.next=6,t.$fire.database.ref("rewards").child(n.ref).once("value");case 6:return o=e.sent,c=o.val(),e.abrupt("return",m(m({},c),{},{ref:n.ref}));case 9:case"end":return e.stop()}}),e)})))()},handleOnSpin:function(){var t=this;return Object(d.a)(regeneratorRuntime.mark((function e(){var r,n,o,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(["ready","spined"].includes(t.status)){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,r=Math.floor(501*Math.random()),n="คุณมโน ได้รางวัล",e.next=7,t.getReward();case 7:return o=e.sent,console.log("rewards",o),e.next=11,t.$fire.database.ref("game/stage").update({code:r,status:"spinning"});case 11:return c=o.draws+1,e.next=14,t.$fire.database.ref("rewards").child(o.ref).update({draws:c});case 14:return e.next=16,t.$fire.database.ref("logs").push({code:r,name:n,reward_id:o.id,reward_name:o.name,reward_ref:o.ref,status:"confirmed",timestamp:h()().format("YYYY-MM-DD HH:mm:ss")});case 16:e.next=21;break;case 18:e.prev=18,e.t0=e.catch(2),console.error(e.t0);case 21:case"end":return e.stop()}}),e,null,[[2,18]])})))()}}},w=(r(569),r(65)),component=Object(w.a)(y,(function(){var t=this,e=t._self._c;return e("div",{directives:[{def:c.a,name:"resize",rawName:"v-resize",value:t.onResize,expression:"onResize"}],staticClass:"stage__container fill-height"},[e("div",{class:["stage__box"],style:{width:t.boxSize+"px",height:t.boxSize+"px"}},[e("div",{staticClass:"stage-btn--border",style:{width:t.buttonSize+"px",height:t.buttonSize+"px"}},[e("button",{staticClass:"stage-btn",attrs:{disabled:!["ready","spined"].includes(t.status)},on:{click:t.handleOnSpin}},[t._v("\n        หมุน\n      ")])])]),t._v(" "),e(n.a,{attrs:{value:"wait"===t.status,opacity:.7}},[e("div",{staticClass:"text-center"},[e("div",{staticClass:"white--text text-h6 mt-2"},[t._v("ปิดใช้งาน")])])]),t._v(" "),e(n.a,{attrs:{value:!["ready","spined","wait"].includes(t.status)}},[e("div",{staticClass:"text-center"},[e(o.a,{attrs:{width:"2",indeterminate:""}}),t._v(" "),e("div",{staticClass:"white--text text-h6 mt-2"},[t._v("โปรดรอสักครู่...")])],1)])],1)}),[],!1,null,"16a6ac52",null);e.default=component.exports}}]);