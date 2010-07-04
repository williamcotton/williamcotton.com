(function(){function i(n,k){this.element=typeof n=="object"?n:document.getElementById(n);this.wrapper=this.element.parentNode;var m="-webkit-transition-property:-webkit-transform;-webkit-transition-timing-function:cubic-bezier(0,0,0.25,1);-webkit-transition-duration:0;-webkit-transform:"+(d?"translate3d(0,0,0)":"translate(0,0)");this.element.setAttribute("style",m);this.options={bounce:d,momentum:d,checkDOMChanges:true,topOnDOMChanges:false,hScrollbar:d,vScrollbar:d,fadeScrollbar:b||c||!a,shrinkScrollbar:b||c,desktopCompatibility:false,overflow:"auto"};if(typeof k=="object"){for(var l in k){this.options[l]=k[l]}}if(this.options.desktopCompatibility){this.options.overflow="hidden"}this.wrapper.style.overflow=this.options.overflow;this.refresh();window.addEventListener("onorientationchange" in window?"orientationchange":"resize",this,false);if(a||this.options.desktopCompatibility){this.element.addEventListener(f,this,false)}if(this.options.checkDOMChanges){this.element.addEventListener("DOMSubtreeModified",this,false)}if(!a){this.element.addEventListener("click",this,true)}}i.prototype={x:0,y:0,dist:0,handleEvent:function(k){switch(k.type){case"click":if(!k._fake){k.stopPropagation()}break;case f:this.touchStart(k);break;case h:this.touchMove(k);break;case e:this.touchEnd(k);break;case"webkitTransitionEnd":this.transitionEnd(k);break;case"orientationchange":case"resize":this.refresh();break;case"DOMSubtreeModified":this.onDOMModified(k);break}},onDOMModified:function(k){this.refresh();if(this.options.topOnDOMChanges&&(this.x!=0||this.y!=0)){this.scrollTo(0,0,"0")}},refresh:function(){this.scrollWidth=this.wrapper.clientWidth;this.scrollHeight=this.wrapper.clientHeight;this.maxScrollX=this.scrollWidth-this.element.offsetWidth;this.maxScrollY=this.scrollHeight-this.element.offsetHeight;var l=this.x,k=this.y;if(this.scrollX){if(this.maxScrollX>=0){l=0}else{if(this.x<this.maxScrollX){l=this.maxScrollX}}}if(this.scrollY){if(this.maxScrollY>=0){k=0}else{if(this.y<this.maxScrollY){k=this.maxScrollY}}}if(l!=this.x||k!=this.y){this.setTransitionTime("0");this.setPosition(l,k,true)}this.scrollX=this.element.offsetWidth>this.scrollWidth?true:false;this.scrollY=!this.scrollX||this.element.offsetHeight>this.scrollHeight?true:false;if(this.options.hScrollbar&&this.scrollX){this.scrollBarX=(this.scrollBarX instanceof j)?this.scrollBarX:new j("horizontal",this.wrapper,this.options.fadeScrollbar,this.options.shrinkScrollbar);this.scrollBarX.init(this.scrollWidth,this.element.offsetWidth)}else{if(this.scrollBarX){this.scrollBarX=this.scrollBarX.remove()}}if(this.options.vScrollbar&&this.scrollY&&this.element.offsetHeight>this.scrollHeight){this.scrollBarY=(this.scrollBarY instanceof j)?this.scrollBarY:new j("vertical",this.wrapper,this.options.fadeScrollbar,this.options.shrinkScrollbar);this.scrollBarY.init(this.scrollHeight,this.element.offsetHeight)}else{if(this.scrollBarY){this.scrollBarY=this.scrollBarY.remove()}}},setPosition:function(k,m,l){this.x=k;this.y=m;this.element.style.webkitTransform=d?"translate3d("+this.x+"px,"+this.y+"px,0px)":"translate("+this.x+"px,"+this.y+"px)";if(!l){if(this.scrollBarX){this.scrollBarX.setPosition(this.x)}if(this.scrollBarY){this.scrollBarY.setPosition(this.y)}}},setTransitionTime:function(k){k=k||"0";this.element.style.webkitTransitionDuration=k;if(this.scrollBarX){this.scrollBarX.bar.style.webkitTransitionDuration=k;this.scrollBarX.wrapper.style.webkitTransitionDuration=d&&this.options.fadeScrollbar?"300ms":"0"}if(this.scrollBarY){this.scrollBarY.bar.style.webkitTransitionDuration=k;this.scrollBarY.wrapper.style.webkitTransitionDuration=d&&this.options.fadeScrollbar?"300ms":"0"}},touchStart:function(l){l.preventDefault();l.stopPropagation();this.moved=false;this.dist=0;this.setTransitionTime("0");if(this.options.momentum){var k=new WebKitCSSMatrix(window.getComputedStyle(this.element).webkitTransform);if(k.e!=this.x||k.f!=this.y){this.element.removeEventListener("webkitTransitionEnd",this,false);this.setPosition(k.e,k.f);this.moved=true}}this.touchStartX=a?l.touches[0].pageX:l.pageX;this.scrollStartX=this.x;this.touchStartY=a?l.touches[0].pageY:l.pageY;this.scrollStartY=this.y;this.scrollStartTime=l.timeStamp;this.element.addEventListener(h,this,false);this.element.addEventListener(e,this,false)},touchMove:function(p){var n=a?p.touches[0].pageX:p.pageX,m=a?p.touches[0].pageY:p.pageY,l=this.scrollX===true?n-this.touchStartX:0,k=this.scrollY===true?m-this.touchStartY:0,q=this.x+l,o=this.y+k;this.dist+=Math.abs(this.touchStartX-n)+Math.abs(this.touchStartY-m);this.touchStartX=n;this.touchStartY=m;if(q>0||q<this.maxScrollX){q=this.options.bounce?Math.round(this.x+l/3):q>=0?0:this.maxScrollX}if(o>0||o<this.maxScrollY){o=this.options.bounce?Math.round(this.y+k/3):o>=0?0:this.maxScrollY}if(this.dist>5){this.setPosition(q,o);this.moved=true}},touchEnd:function(q){this.element.removeEventListener(h,this,false);this.element.removeEventListener(e,this,false);var n=q.timeStamp-this.scrollStartTime;if(!this.moved){this.resetPosition();var r=a?q.changedTouches[0].target:q.target;while(r.nodeType!=1){r=r.parentNode}var s=document.createEvent("MouseEvents");s.initMouseEvent("click",true,true,q.view,1,r.screenX,r.screenY,r.clientX,r.clientY,q.ctrlKey,q.altKey,q.shiftKey,q.metaKey,0,null);s._fake=true;r.dispatchEvent(s);return false}if(!this.options.momentum||n>250){this.resetPosition();return false}var l=this.scrollX===true?this.momentum(this.x-this.scrollStartX,n,this.options.bounce?-this.x+this.scrollWidth/5:-this.x,this.options.bounce?this.x+this.element.offsetWidth-this.scrollWidth+this.scrollWidth/5:this.x+this.element.offsetWidth-this.scrollWidth):{dist:0,time:0};var k=this.scrollY===true?this.momentum(this.y-this.scrollStartY,n,this.options.bounce?-this.y+this.scrollHeight/5:-this.y,this.options.bounce?(this.maxScrollY<0?this.y+this.element.offsetHeight-this.scrollHeight:0)+this.scrollHeight/5:this.y+this.element.offsetHeight-this.scrollHeight):{dist:0,time:0};if(!l.dist&&!k.dist){this.resetPosition();return false}var m=Math.max(Math.max(l.time,k.time),1);var p=this.x+l.dist;var o=this.y+k.dist;this.scrollTo(p,o,m+"ms")},transitionEnd:function(){this.element.removeEventListener("webkitTransitionEnd",this,false);this.resetPosition()},resetPosition:function(m){var n=this.x,l=this.y,k=this,m=m||"500ms";if(this.x>=0){n=0}else{if(this.x<this.maxScrollX){n=this.maxScrollX}}if(this.y>=0||this.maxScrollY>0){l=0}else{if(this.y<this.maxScrollY){l=this.maxScrollY}}if(n!=this.x||l!=this.y){this.scrollTo(n,l,m)}else{if(this.scrollBarX||this.scrollBarY){if(this.scrollBarX){this.scrollBarX.hide()}if(this.scrollBarY){this.scrollBarY.hide()}}}},scrollTo:function(l,k,m){this.element.addEventListener("webkitTransitionEnd",this,false);this.setTransitionTime(m||"450ms");this.setPosition(l,k)},momentum:function(r,l,p,k){var o=2.5,q=1.2,m=Math.abs(r)/l*1000,n=m*m/o/1000,s=0;if(r>0&&n>p){m=m*p/n/o;n=p}else{if(r<0&&n>k){m=m*k/n/o;n=k}}n=n*(r<0?-1:1);s=m/q;return{dist:Math.round(n),time:Math.round(s)}},destroy:function(k){window.removeEventListener("resize",this,false);this.element.removeEventListener(f,this,false);this.element.removeEventListener(h,this,false);this.element.removeEventListener(e,this,false);this.element.removeEventListener("DOMSubtreeModified",this,false);this.element.removeEventListener("click",this,true);this.element.removeEventListener("webkitTransitionEnd",this,false);if(this.scrollBarX){this.scrollBarX=this.scrollBarX.remove()}if(this.scrollBarY){this.scrollBarY=this.scrollBarY.remove()}if(k){this.wrapper.parentNode.removeChild(this.wrapper)}return null}};var j=function(l,q,p,n){this.dir=l;this.fade=p;this.shrink=n;this.bar=document.createElement("div");var o="position:absolute;top:0;left:0;-webkit-transition-timing-function:cubic-bezier(0,0,0.25,1);pointer-events:none;-webkit-transition-duration:0;-webkit-transition-delay:0;-webkit-transition-property:-webkit-transform;z-index:10;background:rgba(0,0,0,0.5);"+(d?"-webkit-transform:translate3d(0,0,0);":"-webkit-transform:translate(0,0);")+(l=="horizontal"?"-webkit-border-radius:3px 2px;min-width:6px;min-height:5px":"-webkit-border-radius:2px 3px;min-width:5px;min-height:6px"),m,k;this.bar.setAttribute("style",o);this.wrapper=document.createElement("div");o="-webkit-mask:-webkit-canvas(scrollbar"+this.dir+");position:absolute;pointer-events:none;overflow:hidden;opacity:0;-webkit-transition-duration:"+(p?"300ms":"0")+";-webkit-transition-delay:0;-webkit-transition-property:opacity;"+(this.dir=="horizontal"?"bottom:2px;left:1px;right:7px;height:5px":"top:1px;right:2px;bottom:7px;width:5px;");this.wrapper.setAttribute("style",o);this.wrapper.appendChild(this.bar);q.appendChild(this.wrapper);if(this.dir=="horizontal"){m=this.wrapper.offsetWidth;k=document.getCSSCanvasContext("2d","scrollbar"+this.dir,m,5);k.fillStyle="rgb(0,0,0)";k.beginPath();k.arc(2.5,2.5,2.5,Math.PI/2,-Math.PI/2,false);k.lineTo(m-2.5,0);k.arc(m-2.5,2.5,2.5,-Math.PI/2,Math.PI/2,false);k.closePath();k.fill()}else{m=this.wrapper.offsetHeight;k=document.getCSSCanvasContext("2d","scrollbar"+this.dir,5,m);k.fillStyle="rgb(0,0,0)";k.beginPath();k.arc(2.5,2.5,2.5,Math.PI,0,false);k.lineTo(5,m-2.5);k.arc(2.5,m-2.5,2.5,0,Math.PI,false);k.closePath();k.fill()}};j.prototype={init:function(k,l){this.maxSize=this.dir=="horizontal"?this.wrapper.clientWidth:this.wrapper.clientHeight;this.size=Math.round(this.maxSize*this.maxSize/l);this.maxScroll=this.maxSize-this.size;this.toWrapperProp=this.maxScroll/(k-l);this.bar.style[this.dir=="horizontal"?"width":"height"]=this.size+"px"},setPosition:function(l,k){if(!k&&this.wrapper.style.opacity!="1"){this.show()}l=this.toWrapperProp*l;if(l<0){l=this.shrink?l+l*3:0;if(this.size+l<5){l=-this.size+5}}else{if(l>this.maxScroll){l=this.shrink?l+(l-this.maxScroll)*3:this.maxScroll;if(this.size+this.maxScroll-l<5){l=this.size+this.maxScroll-5}}}if(d){l=this.dir=="horizontal"?"translate3d("+Math.round(l)+"px,0,0)":"translate3d(0,"+Math.round(l)+"px,0)"}else{l=this.dir=="horizontal"?"translate("+Math.round(l)+"px,0)":"translate(0,"+Math.round(l)+"px)"}this.bar.style.webkitTransform=l},show:function(){if(d){this.wrapper.style.webkitTransitionDelay="0"}this.wrapper.style.opacity="1"},hide:function(){if(d){this.wrapper.style.webkitTransitionDelay="200ms"}this.wrapper.style.opacity="0"},remove:function(){this.wrapper.parentNode.removeChild(this.wrapper);return null}};var d=("m11" in new WebKitCSSMatrix()),b=navigator.appVersion.match(/iphone/gi)?true:false,c=navigator.appVersion.match(/ipad/gi)?true:false,g=navigator.appVersion.match(/android/gi)?true:false,a=b||c||g,f=a?"touchstart":"mousedown",h=a?"touchmove":"mousemove",e=a?"touchend":"mouseup";window.iScroll=i})();