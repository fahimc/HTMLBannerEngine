var tween={fs:35,tweens:[],to:function(e,t,n,r){var i=new Tweener(e,t,n,r);this.tweens.push(i);if(!window.tweenTimer){var s=this;var o=function(){s.onFrame()};window.tweenTimer=setInterval(o,35)}},onFrame:function(){for(var e=0;e<this.tweens.length;e++){if(this.tweens[e].done){delete this.tweens[e];this.tweens.splice(e,1)}else{this.tweens[e].onFrame()}}if(this.tweens.length==0){clearInterval(window.tweenTimer);window.tweenTimer=null}},setOpacity:function(e,t){if(e.style["-ms-filter"])e.style["-ms-filter"]="progid:DXImageTransform.Microsoft.Alpha(Opacity="+t*100+")";if(e.style["filter"])e.style["filter"]=t;if(e.style["-moz-opacity"])e.style["-moz-opacity"]=t;if(e.style["-khtml-opacity"])e.style["-khtml-opacity"]=t},getStyle:function(e,t){if(e.currentStyle)return e.currentStyle[t];else if(document.defaultView&&document.defaultView.getComputedStyle)return document.defaultView.getComputedStyle(e,"")[t];else return e.style[t]}};var Tweener=function(e,t,n,r){this.obj=e;this.duration=t;this.props=n;this.callback=r;this.done=false;var i=35;this.onFrame=function(){var t=0;var r=0;for(var s in this.props){var o;r++;if(this.props[s].value==null){var u=String(n[s]).indexOf("px")>=0;o=String(this.props[s]).replace("px","");this.props[s]={value:o,negative:null,complete:false,subtraction:null,currentProp:null,suffix:u};this.props[s].currentProp=this.obj.style[s]?e.style[s].replace("px",""):0}else{o=this.props[s].value}if(this.props[s].currentProp==null||this.props[s].currentProp==""){if(tween.getStyle(this.obj,s)==""||tween.getStyle(e,s)==null||tween.getStyle(e,s)==undefined){this.props[s].currentProp=s=="opacity"?1:0}else{this.props[s].currentProp=tween.getStyle(e,s).replace(/\D/g,"")}}if(this.props[s].negative==null){this.props[s].negative=Number(o)<Number(this.props[s].currentProp)?true:false;this.props[s].subtraction=Math.abs(Number(this.props[s].currentProp)-Number(o))/(this.duration*1e3/i)}if(this.props[s].negative&&Number(this.props[s].currentProp)-Number(this.props[s].subtraction)>=Number(o)||!this.props[s].negative&&Number(this.props[s].currentProp)+Number(this.props[s].subtraction)<=Number(o)){if(this.props[s].negative){this.props[s].currentProp=Number(this.props[s].currentProp)-Number(this.props[s].subtraction)}else{this.props[s].currentProp=Number(this.props[s].currentProp)+Number(this.props[s].subtraction)}this.obj.style[s]=this.props[s].currentProp+(this.props[s].suffix?"px":"");if(s=="opacity")tween.setOpacity(this.obj,this.props[s].currentProp)}else if(!this.props[s].complete){this.obj.style[s]=o+(this.props[s].suffix?"px":"");this.props[s].complete=true;t++}}if(t>=r){this.done=true;if(this.callback)this.callback()}}}
var BannerEngine=
{
	holderId:"sectionHolder",
	children:[],
	currentIndex:0,
	animateInDuration:1,
	callbacks:[],
	holdDuration:1,
	currentLoops:0,
	maxLoops:3,
	events:
	{
		animateIn:"animateInComplete",
		animateOut:"animateOutComplete",
		loopEnd:"loopEnd"
	},
	att:{
		delay:"data-delay",
		loops:"data-loops",
		out:"data-out"
	},
	globalName:"engine",
	init:function()
	{
		this.checkHolder();
		this.getChildren();
		this.resetChildren();
		this.animateSlideIn(0);
	},
	addListener:function(index,eventName,callback)
	{
		if(!this.callbacks[eventName])this.callbacks[eventName]=new Array();
		if(!this.callbacks[eventName][index])this.callbacks[eventName][index]=new Array();
		this.callbacks[eventName][index].push(callback);
		
	},
	removeListener:function(index,eventName,callback)
	{
		if(!this.callbacks[eventName]||!this.callbacks[eventName][index])return;
		for(var a=0;a<this.callbacks[eventName][index].length;a++)
		{
			if(callback==this.callbacks[eventName][index][a])
			{
				delete this.callbacks[eventName][index][a];
				this.callbacks[eventName][index].splice(a, 1);
				return true;
			}
		}
		return false;
	},
	checkHolder:function()
	{
		var holder =  document.getElementById(this.holderId);
		if(holder.getAttribute(this.att.loops)!=undefined)this.maxLoops=Number(holder.getAttribute(this.att.loops));
	},
	getChildren:function()
	{
		this.children=[];
		var holder =  document.getElementById(this.holderId);
		if(!holder)return;
		for(var a=0;a<holder.childNodes.length;a++)
		{
			
			if(holder.childNodes[a].tagName=="DIV")
			{
				this.children.push(holder.childNodes[a]);
			}
		}
	},
	resetChildren:function()
	{
		for(var a=0;a<this.children.length;a++)
		{
			this.children[a].style.display="none";
		}
	},
	animateSlideIn:function(index) {
		var slide = this.children[index];
		if(!slide)return;
		slide.style.display="block";
		this.currentIndex=index;
		var root=this;
		tween.to(slide, this.animateInDuration, {opacity:1},function(){root.onSlideInComplete();});

	},
	onSlideInComplete:function()
	{
		this.dispatchEvents(this.currentIndex,this.events.animateIn);
		if(this.currentLoops>=this.maxLoops-1 && this.currentIndex+1>=this.children.length)
		{
			
			this.end();
			return;
		}
		var delay = this.children[this.currentIndex].getAttribute(this.att.delay)!=undefined?this.children[this.currentIndex].getAttribute(this.att.delay):this.holdDuration;
		var root = this;
		setTimeout(function(){root.animateSlideOut();},(delay*1000));
	},
	animateSlideOut:function() {
		
		var slide = this.children[this.currentIndex];
		
		if (!slide) {
			this.end();
			return;
		}
		var root=this;
		if(slide.getAttribute(this.att.out)!=undefined)
		{
			setTimeout(function(){
				tween.to(slide, 1, {opacity:0},function(){root.onSlideOutComplete(true);});
			},Number(slide.getAttribute(this.att.out))*1000);
			this.nextSlide();
		}else{
			
			tween.to(slide, 1, {opacity:0},function(){root.onSlideOutComplete();});
		}
		
		

	},
	onSlideOutComplete:function(once)
	{
		var slide = this.children[this.currentIndex];
		slide.style.display="block";
		this.dispatchEvents(this.currentIndex,this.events.animateOut);
		if(!once)this.nextSlide(once);
	},
	nextSlide:function()
	{
		this.currentIndex++;
		if(this.currentIndex>=this.children.length)
		{
			this.currentIndex=0;
			this.currentLoops++;
		}
		this.animateSlideIn(this.currentIndex);
	},
	end:function()
	{
		this.dispatchEvents(this.globalName,this.events.loopEnd);
	},
	dispatchEvents:function(index,eventName)
	{
		if(!this.callbacks[eventName]||!this.callbacks[eventName][index])
		return false;
		for(var a=0;a<this.callbacks[eventName][index].length;a++)
		{
			this.callbacks[eventName][index][a]();
		}
	}
	
};
