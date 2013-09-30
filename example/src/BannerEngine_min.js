var tween={fs:35,tweens:[],to:function(e,t,n,r){var i=new Tweener(e,t,n,r);this.tweens.push(i);if(!window.tweenTimer){var s=this;var o=function(){s.onFrame()};window.tweenTimer=setInterval(o,35)}},onFrame:function(){for(var e=0;e<this.tweens.length;e++){if(this.tweens[e].done){delete this.tweens[e];this.tweens.splice(e,1)}else{this.tweens[e].onFrame()}}if(this.tweens.length==0){clearInterval(window.tweenTimer);window.tweenTimer=null}},killAll:function(){clearInterval(window.tweenTimer);window.tweenTimer=null;this.tweens=[]},setOpacity:function(e,t){if(e.style["-ms-filter"])e.style["-ms-filter"]="progid:DXImageTransform.Microsoft.Alpha(Opacity="+t*100+")";if(e.style["filter"])e.style["filter"]=t;if(e.style["-moz-opacity"])e.style["-moz-opacity"]=t;if(e.style["-khtml-opacity"])e.style["-khtml-opacity"]=t},getStyle:function(e,t){if(e.currentStyle)return e.currentStyle[t];else if(document.defaultView&&document.defaultView.getComputedStyle)return document.defaultView.getComputedStyle(e,"")[t];else return e.style[t]}};var Tweener=function(e,t,n,r){this.obj=e;this.duration=t;this.props=n;this.callback=r;this.done=false;var i=35;this.onFrame=function(){var t=0;var r=0;for(var s in this.props){var o;r++;if(this.props[s].value==null){var u=String(n[s]).indexOf("px")>=0;o=String(this.props[s]).replace("px","");this.props[s]={value:o,negative:null,complete:false,subtraction:null,currentProp:null,suffix:u};this.props[s].currentProp=this.obj.style[s]?e.style[s].replace("px",""):0}else{o=this.props[s].value}if(this.props[s].currentProp==null||this.props[s].currentProp==""){if(tween.getStyle(this.obj,s)==""||tween.getStyle(e,s)==null||tween.getStyle(e,s)==undefined){this.props[s].currentProp=s=="opacity"?1:0}else{this.props[s].currentProp=tween.getStyle(e,s).replace(/\D/g,"")}}if(this.props[s].negative==null){this.props[s].negative=Number(o)<Number(this.props[s].currentProp)?true:false;this.props[s].subtraction=Math.abs(Number(this.props[s].currentProp)-Number(o))/(this.duration*1e3/i)}if(this.props[s].negative&&Number(this.props[s].currentProp)-Number(this.props[s].subtraction)>=Number(o)||!this.props[s].negative&&Number(this.props[s].currentProp)+Number(this.props[s].subtraction)<=Number(o)){if(this.props[s].negative){this.props[s].currentProp=Number(this.props[s].currentProp)-Number(this.props[s].subtraction)}else{this.props[s].currentProp=Number(this.props[s].currentProp)+Number(this.props[s].subtraction)}this.obj.style[s]=this.props[s].currentProp+(this.props[s].suffix?"px":"");if(s=="opacity")tween.setOpacity(this.obj,this.props[s].currentProp)}else if(!this.props[s].complete){this.obj.style[s]=o+(this.props[s].suffix?"px":"");this.props[s].complete=true;t++}}if(t>=r){this.done=true;if(this.callback)this.callback()}}}
var BannerEngine={holderId:"sectionHolder",children:[],currentIndex:0,animateInDuration:1,callbacks:[],holdDuration:1,currentLoops:0,maxLoops:3,nextIndex:null,animateOutDuration:1,frameOrder:null,frameIndex:0,_hide:false,timers:{delay:null},events:{animateIn:"animateInComplete",animateOut:"animateOutComplete",animateOutStarted:"animateOutStarted",animateInStarted:"animateInStarted",loopEnd:"loopEnd"},att:{delay:"data-delay",loops:"data-loops",out:"data-out",stop:"data-stop"},globalName:"engine",init:function(){this.checkHolder();this.getChildren();this.resetChildren();this.animateSlideIn(0)},addListener:function(e,t,n){if(!this.callbacks[t])this.callbacks[t]=new Array;if(!this.callbacks[t][e])this.callbacks[t][e]=new Array;this.callbacks[t][e].push(n)},removeListener:function(e,t,n){if(!this.callbacks[t]||!this.callbacks[t][e])return;for(var r=0;r<this.callbacks[t][e].length;r++){if(n==this.callbacks[t][e][r]){delete this.callbacks[t][e][r];this.callbacks[t][e].splice(r,1);return true}}return false},checkHolder:function(){var e=document.getElementById(this.holderId);if(e.getAttribute(this.att.loops)!=undefined)this.maxLoops=Number(e.getAttribute(this.att.loops))},getChildren:function(){this.children=[];var e=document.getElementById(this.holderId);if(!e)return;for(var t=0;t<e.childNodes.length;t++){if(e.childNodes[t].tagName=="DIV"){this.children.push(e.childNodes[t])}}},resetChildren:function(){for(var e=0;e<this.children.length;e++){this.children[e].style.display="none"}},animateSlideIn:function(e){var t=this.children[e];if(!t)return;t.style.display="block";this.currentIndex=e;var n=this;tween.to(t,this.animateInDuration,{opacity:1},function(){n.onSlideInComplete()});this.dispatchEvents(this.currentIndex,this.events.animateInStarted)},onSlideInComplete:function(){this.dispatchEvents(this.currentIndex,this.events.animateIn);if(this.currentLoops>=this.maxLoops-1&&this.currentIndex+1>=this.children.length){this.end();return}var e=this.children[this.currentIndex].getAttribute(this.att.delay)!=undefined?this.children[this.currentIndex].getAttribute(this.att.delay):this.holdDuration;var t=this;this.timers.delay=setTimeout(function(){t.animateSlideOut()},e*1e3)},animateSlideOut:function(e){var t=this.children[this.currentIndex];if(!t){this.end();return}var n=this;if(t.getAttribute(this.att.out)!=undefined){var r=this.currentIndex;setTimeout(function(){tween.to(t,this.animateOutDuration,{opacity:0},function(){n.onSlideOutComplete(e!=undefined?e:r)})},Number(t.getAttribute(this.att.out))*1e3);this.nextSlide()}else{tween.to(t,this.animateOutDuration,{opacity:0},function(){n.onSlideOutComplete(e)})}this.dispatchEvents(this.currentIndex,this.events.animateOutStarted)},onSlideOutComplete:function(e){var t=this.children[e!=undefined?e:this.currentIndex];t.style.display="none";this.dispatchEvents(this.currentIndex,this.events.animateOut);if(e==undefined)this.nextSlide(e)},nextSlide:function(){this.currentIndex=this.nextIndex!=null?this.nextIndex:this.currentIndex+1;this.frameIndex=this.nextIndex!=null?this.nextIndex:this.frameIndex+1;if(this.frameOrder&&this.frameOrder.length>0)this.currentIndex=this.frameOrder[this.frameIndex];this.nextIndex=null;if(this.currentIndex>=this.children.length||this.frameIndex>=this.children.length){this.frameIndex=0;this.currentIndex=0;this.currentLoops++}this.animateSlideIn(this.currentIndex)},restart:function(){this.currentIndex=this.children.length-1;this.currentLoops=0;this.animateSlideOut()},end:function(){this.dispatchEvents(this.globalName,this.events.loopEnd)},dispatchEvents:function(e,t){if(!this.callbacks[t]||!this.callbacks[t][e])return false;for(var n=0;n<this.callbacks[t][e].length;n++){this.callbacks[t][e][n]()}},stop:function(){clearTimeout(this.timers.delay);tween.killAll()},play:function(){this.animateSlideOut()},gotoAndPlay:function(e){this.nextIndex=e;this.stop();if(!this._hide){this.animateSlideOut()}else{this.nextSlide()}},hide:function(){this._hide=true;this.stop();this.animateSlideOut(this.currentIndex)}};