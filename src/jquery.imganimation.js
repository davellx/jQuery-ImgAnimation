(function($) {

    $.ImgAnimation = function(element, options) {

        var defaults = {
            loop:true,
            intervalTime:25,
            onPlayTo:function(){},
            labels:{},
            //onAnimationEnd:function(){},
            onAnimationEnterFrame:function(){},
            images:[]
        };

        var plugin = this;

        plugin.settings = {};

        var $element = $(element),
             element = element;
     
        plugin.currentFrame = 0;
        plugin.totalFrames = 0;
        
        plugin.getElement = function(){
            return $element;
        }
        
        var interval;
        var intervalTo;

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            plugin.totalFrames = plugin.settings.images.length-1;
            $element.html('');
            for(var i = 0; i <= plugin.totalFrames; i++){
                $element.append(plugin.settings.images[i]);
                $(plugin.settings.images[i]).css({display:'none'}).on('dragstart', function(event) { event.preventDefault(); });
            }
            /* Prevent the EnterFrame action for the init as the object may be not still initialized */
            var tempEnterFrame = plugin.settings.onAnimationEnterFrame;
            plugin.settings.onAnimationEnterFrame = function(){};
            plugin.gotoAndStop(0);
            plugin.settings.onAnimationEnterFrame = tempEnterFrame
        };
        
        plugin.playTo = function(frame,callback){
            if(isNaN(frame)){
                frame = plugin.settings.labels[frame];
                if(isNaN(frame)) frame = 0;
            }
            window.clearInterval(interval);
            interval = window.setInterval(function(){
                if(plugin.currentFrame > frame){
                    plugin.prevFrame();
                }else if(plugin.currentFrame < frame){
                    plugin.nextFrame();
                }else{
                    window.clearInterval(interval);
                    if(callback != null && callback != undefined){
                        callback();
                    }
                }
            },plugin.settings.intervalTime);        };
        
        plugin.gotoAndPlay = function(frame){
            window.clearInterval(interval);
            if(isNaN(frame)){
                frame = plugin.settings.labels[frame];
                if(isNaN(frame)) frame = 0;
            }
            plugin.gotoAndStop(frame);
            plugin.play();
        };
        
        plugin.gotoAndStop = function(frame){
           window.clearInterval(interval);
           if(isNaN(frame)){
                frame = plugin.settings.labels[frame];
                if(isNaN(frame)) frame = 0;
           }
           $element.find('img').css('display','none');
            frame = setGoodNum(frame);
            $(plugin.settings.images[frame]).css("display",'block');
            //console.log(plugin.settings.images[num]);
            plugin.currentFrame = frame;
            plugin.settings.onAnimationEnterFrame();
        };
        
        plugin.play = function() {
            window.clearInterval(interval);
            interval = window.setInterval(function(){
                plugin.nextFrame();
            },plugin.settings.intervalTime);
        };
        
        plugin.stop = function() {
            window.clearInterval(interval);
        };
        
		plugin.destroy = function(){
			window.clearInterval(intervalTo);
			window.clearInterval(interval);
			$element.empty();
		}
		
        plugin.nextFrame = function(){
            var oldFrame = plugin.currentFrame;
            plugin.currentFrame++;
            plugin.currentFrame = setGoodNum(plugin.currentFrame);
            $(plugin.settings.images[plugin.currentFrame]).css("display",'block');
            $(plugin.settings.images[oldFrame]).css("display",'none');
			if(!plugin.settings.loop && plugin.currentFrame == plugin.totalFrames){
				plugin.stop();
			}
            plugin.settings.onAnimationEnterFrame();
        };
        
        plugin.prevFrame = function(){
            var oldFrame = plugin.currentFrame;
            plugin.currentFrame--;
            plugin.currentFrame = setGoodNum(plugin.currentFrame);
            $(plugin.settings.images[plugin.currentFrame]).css("display",'block');
            $(plugin.settings.images[oldFrame]).css("display",'none');
            plugin.settings.onAnimationEnterFrame();
        };
        
        this.visible = function(bool,element){
            if(bool){
                //$element.css('display','block');
                element.prepend($element);
            }else{
                //$element.css('display','none');
                $element.remove();
            }
        };
        
        var setGoodNum = function(num){
            if(num < 0){
                return plugin.settings.loop?plugin.totalFrames:0;
            }
            if(num > plugin.totalFrames){
                return plugin.settings.loop?0:plugin.totalFrames;
            }
            return num;
        };
        plugin.init();
    };

    $.fn.ImgAnimation = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('ImgAnimation')) {
                var plugin = new $.ImgAnimation(this, options);
                $(this).data('ImgAnimation', plugin);
            }
        });

    };

})(jQuery);