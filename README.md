jQuery-ImgAnimation
===================

A JQuery plugin to ease the creation of animation based on a serie of images

### Usage

Example here : http://davel.fr/demo/jQuery-ImgAnimation/

### Usage

Explanations in French here : http://www.davel.fr/techblog/?p=201

1/ include jQuery in your code, and my script (yeah, yeah, obvious !)

2/ Add a container that will hold the plugin images
```html
    <div id="animContainer"></div>
```	
3/ Load the images (objects) in an array and init the plugin, get the plugins data as an oject to control the animation.
```javascript
	$('#animContainer').ImgAnimation({images:imagesObjList});
	var animObject = $('#animContainer').data('ImgAnimation');
```	
	the options are : 
		- loop : boolean // specifies if the animation should start over when the last frame has benne reached (default : true)
		- images : array // contains the list of images used for the animation (default : empty array, but you should fill it)
		- labels : object // contains named labels and the frame associated, usefull for playTo, gotoAndPlay and gotoAndStop (default : empty object)
		- onAnimationEnterFrame // lauched at every frame while it's played. (default : empty functions)
		- intervalTime // in milliseconds the interval between two images during animation (default : 25)

4/ control the animation with the animation object
```javascript
	animObject.play();
	animObject.stop();
	animObject.gotoAndStop(num or label);
	animObject.gotoAndPlay(num or label);
	animObject.nextFrame();
	animObject.prevFrame();
	animObject.playTo(num or label, callback function);
	animObject.destroy();
```	
(if you're familiar with Flash's MovieClips it should be déjà-vu :))
