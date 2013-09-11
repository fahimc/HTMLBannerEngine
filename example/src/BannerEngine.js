var tween=function(e,t,n,r){var i=35;var s=this;var o=function(){s.onFrame(e,t,n,r)};if(window.tweenTimer)window.clearInterval(window.tweenTimer);window.tweenTimer=setInterval(o,35);this.onFrame=function(e,t,n,r){var s=0;var o=0;for(var u in n){var a;o++;if(n[u].value==null){var f=String(n[u]).indexOf("px")>=0;a=String(n[u]).replace("px","");n[u]={value:a,negative:null,complete:false,subtraction:null,currentProp:null,suffix:f};n[u].currentProp=e.style[u]?e.style[u].replace("px",""):0}else{a=n[u].value}if(n[u].currentProp==null||n[u].currentProp==""){if(this.getStyle(e,u)==""||this.getStyle(e,u)==null||this.getStyle(e,u)==undefined){n[u].currentProp=u=="opacity"?1:0}else{n[u].currentProp=this.getStyle(e,u).replace(/\D/g,"")}}if(n[u].negative==null){n[u].negative=Number(a)<Number(n[u].currentProp)?true:false;n[u].subtraction=Math.abs(Number(n[u].currentProp)-Number(a))/(t*1e3/i)}if(n[u].negative&&Number(n[u].currentProp)-Number(n[u].subtraction)>=Number(a)||!n[u].negative&&Number(n[u].currentProp)+Number(n[u].subtraction)<=Number(a)){if(n[u].negative){n[u].currentProp=Number(n[u].currentProp)-Number(n[u].subtraction)}else{n[u].currentProp=Number(n[u].currentProp)+Number(n[u].subtraction)}e.style[u]=n[u].currentProp+(n[u].suffix?"px":"");if(u=="opacity")this.setOpacity(e,n[u].currentProp)}else if(!n[u].complete){e.style[u]=a+(n[u].suffix?"px":"");n[u].complete=true;s++}}if(s>=o){window.clearInterval(window.tweenTimer);if(r)r()}};this.getStyle=function(e,t){if(e.currentStyle)return e.currentStyle[t];else if(document.defaultView&&document.defaultView.getComputedStyle)return document.defaultView.getComputedStyle(e,"")[t];else return e.style[t]};this.setOpacity=function(e,t){if(e.style["-ms-filter"])e.style["-ms-filter"]="progid:DXImageTransform.Microsoft.Alpha(Opacity="+t*100+")";if(e.style["filter"])e.style["filter"]=t;if(e.style["-moz-opacity"])e.style["-moz-opacity"]=t;if(e.style["-khtml-opacity"])e.style["-khtml-opacity"]=t}};
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
		tween(slide, this.animateInDuration, {opacity:1},function(){root.onSlideInComplete();});

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
				tween(slide, 1, {opacity:0},function(){root.onSlideOutComplete(true);});
			},Number(slide.getAttribute(this.att.out))*1000);
			this.nextSlide();
		}else{
			
			tween(slide, 1, {opacity:0},function(){root.onSlideOutComplete();});
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
