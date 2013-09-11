(function(window) {

	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}

	}

	function onLoad() {
		// the body has loaded.
		// start coding here!
		// BannerEngine.addListener(0,"animateInComplete",function(){console.log("animateInComplete 0");});
		// BannerEngine.addListener(0,"animateOutComplete",function(){console.log("animateOutComplete 0");});
		// BannerEngine.addListener(1,"animateInComplete",function(){console.log("animateInComplete 1");});
		// BannerEngine.addListener(1,"animateOutComplete",animateOut);
		// BannerEngine.removeListener(1,"animateOutComplete",animateOut);
		// BannerEngine.addListener("engine","loopEnd",function(){console.log("loopEnd");});
		BannerEngine.init();
		
		if (window.addEventListener) {
			window.addEventListener("resize", resize);
		} else {
			window.attachEvent("onresize", resize);
		}
		 resize();
	}
	function resize()
	{
		var holder =  document.getElementById("sectionHolder");
		var stageWidth = holder.clientWidth;
		var stageHeight = holder.clientHeight;
		var wr = stageWidth/1170 ;
		var hr= stageHeight/250 ;
		
		//resize lion
		var lion =  document.getElementById("lion");
		var lh = (250 * (wr<hr?wr:hr));
		var lw = (382 * (wr<hr?wr:hr));
		lion.style.width = lw+"px";
		lion.style.height =lh +"px";
		lion.style.marginTop =((stageHeight-lh)*0.5)+"px";
		//resize logo
		var logo =  document.getElementById("logo");
		var logoHeight = (250 * (wr<hr?wr:hr));
		var logoWidth = (330 * (wr<hr?wr:hr));
		var logoHolder =  document.getElementById("logoHolder");
		logo.style.width = logoWidth+"px";
		logo.style.height = logoHeight+"px";
		logo.style.marginTop =((stageHeight-logoHeight)*0.5)+"px";
		logoHolder.style.width = (330 * (wr<hr?wr:hr))+"px";
		//logoHolder.style.height = (250 * (wr>hr?wr:hr))+"px";
		
		//resize frame2Text
		var frame2Text =  document.getElementById("frame2Text");
		var frame2TextHeight = (250 * (wr<hr?wr:hr));
		var frame2TextWidth = (384 * (wr<hr?wr:hr));
		var leftMargin = lw *0.11;
		frame2Text.style.width = frame2TextWidth+"px";
		frame2Text.style.height = frame2TextHeight+"px";
		frame2Text.style.left = (((stageWidth-logoWidth)-(frame2TextWidth-lw))*0.5)-leftMargin+"px";
		frame2Text.style.top =((stageHeight-frame2TextHeight)*0.5)+"px";
		
		//resize frame2Text
		var frame3Text =  document.getElementById("frame3Text");
		var frame3TextHeight = (250 * (wr<hr?wr:hr));
		var frame3TextWidth = (840 * (wr<hr?wr:hr));
		frame3Text.style.width = frame3TextWidth+"px";
		frame3Text.style.height = frame3TextHeight+"px";
		
		frame3Text.style.top =((stageHeight-frame3TextHeight)*0.5)+"px";
		frame3Text.style.left =(((stageWidth-logoWidth)-frame3TextWidth)*0.5)+"px";
	}
	Main();
}
)(window);
