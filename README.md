#HTMLBannerEngine

This framework gives you the ability to build simple or complex HTML Banners fast with minimal JS.  
This as a built in simple tween engine for tweening CSS attributes. 

###SimpleTweener
[SimpleTweenerJS](https://github.com/fahimc/SimpleTweenerJS)


##DEMO
[HTMLBanner](http://8fc.co.uk/github/preview/htmlbanner)

##Usage  

###Setup

1. Include BannerEngine.js
2. You need to create a div which will hold all of the frames/sections, each frames/sections will contain content which will fade in after a given time. 

###Creating the Holder
To create a holder, place a DIV in the body and give it an ID which is 'sectionHolder'.    

```
...
<div id="sectionHolder">
...
</div>
...
```

###Creating Frames/Sections
Within the holder create DIV which are stacked. Each DIV represents a frame/section.  

```
...
<div id="sectionHolder">
  <div>
    <p>This is Frame 1</p>
  </div>
  <div>
    <p>This is Frame 2</p>
  </div>
</div>
...
```
###Adding CSS to your Frames/Sections
You need to add a class to each of the sections and add the following css.
```
.slide
{
opacity: 0 and display: none
}

<div id="sectionHolder">
  <div class="slide">
    <p>This is Frame 1</p>
  </div>
  <div class="slide">
    <p>This is Frame 2</p>
  </div>
</div>
```

If you run this you will see each frame fading in and out.  

##Options

You can add a few simple attributes to manipulate the animations or some settings. Below is a list of them:  

###Global Attributes
Add these to the 'section holder'.  

**data-loops**:Number - this is the number of time(in seconds) the banner should loop. Default is 3. 

###Frame/Section Attributes
Add these to the a frame/section.  
  
**data-delay**:Number - The length of time(in seconds) in holds on this frame/section.
**data-out**:Number - The length of time(in seconds) before it fades out after it has finished holding.

##JavaScript Events and Methods
You can do more complex things by adding listeners to the built-in events. and it will call back the function you provide. Use the 'BannerEngine.addListener' method.

###Animate-in Complete
This event is fires when a section has finished animating in. The eventName is **"animateInComplete"**.

```
BannerEngine.addListener(sectionIndex,eventName,callback);
```

**sectionIndex**:Number - This section index within the holder. Starts from 0.  
**eventName**:String- Name of the event.  
**callback**:Function- you callback function.  

####Example
```
BannerEngine.addListener(0,"animateInComplete",function(){console.log("animateInComplete 0");});
```

###Animate-out Complete
This event is fires when a section has finished animating in. The eventName is **"animateOutComplete"**.

```
BannerEngine.addListener(sectionIndex,eventName,callback);
```

**sectionIndex**:Number - This section index within the holder. Starts from 0.  
**eventName**:String- Name of the event.  
**callback**:Function- you callback function.  

####Example
```
BannerEngine.addListener(1,"animateOutComplete",function(){console.log("animateOutComplete  1");});
```

##Looping Complete
This event is fired when the looping has completed. The sectionName is **"engine"** and the eventName is **"loopEnd"**.

```
BannerEngine.addListener(sectionName,eventName,callback);
```

**sectionIndex**:Number - This section index within the holder. Starts from 0.  
**eventName**:String- Name of the event.  
**callback**:Function- you callback function.  

####Example
```
BannerEngine.addListener("engine","loopEnd",function(){console.log("looping has ended");});
```

###gotoAndPlay(index:Number)
If you need to goto a specific frame via a button press or something else you can use the 'gotoAndPlay' method. Index is the position of the frame you wish to go to. (starts from zero).  

```
BannerEngine.gotoAndPlay(3);
```

###stop()
If you need to stop the banner you can use the 'stop' method. This will stop the banner going to the next frame. 

```
BannerEngine.stop();
```

###play()
To continue playing the banner just call 'play'.

```
BannerEngine.play();
```

###frameOrder:Array
This allows you to set the order of the frames in sequence. It gives you the option of dynamically changing the sequence when required.

```
BannerEngine.frameOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
```
