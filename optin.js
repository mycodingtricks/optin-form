"use strict"
var mct_optin = {
  container: jQuery(".mct_optin"),
  expir_day: 1,
  max_width: 600,
  max_scroll: 500,  
  hide_optin: false,
  init: function(){
	this.adjust();
	this.close();
  },
  show: function(){
    var c = this.container,
	s = this;
    if(false===s.hide_optin){
        c.fadeIn();
    var ov = c.find(".mct_optin_overlay").addClass("fadeIn").delay(200).show();
    var oc = c.find(".mct_optin_content");
	oc.fadeIn();
    }
  },
  hide: function(){
    var c = this.container,
	s = this,
        ov = c.find(".mct_optin_overlay").fadeOut(),
	oc = c.find(".mct_optin_content");
	oc.fadeOut();
        s.hide_optin = true;
  },
  addCookie: function(){
    var s = this;
	if(typeof (jQuery.cookie("mct_optin"))==="undefined"){
	 jQuery.cookie("mct_optin","true",{expires:s.expir_time});	  
	}
  },
  resize: function(){
    var d = jQuery(window),
	w = d.width(),
	h = d.height(),
        co = this.container,
        c = co.find(".mct_optin_content"),
        cw = c.width(),
        ch = c.find(".mct_optin_inner_content")[0].scrollHeight;
        if(w<=600){
	  var calw = w-40; //Calculated Width
          c.css("width",calw+"px");
	}else{
	  c.css("width","600px");
	}
        if(h<=ch){
	  var calh = h-40;
	  c.css("height",calh+"px");
        }
  },
  reposition: function(){
    var d = jQuery(window),
	w = d.width(),
	h = d.height(),
        c = this.container.find(".mct_optin_content"),
	p = c.position(),
        cw = c.width() || 600,
        ch = c[0].scrollHeight || 340;
    var pt = (h/2)-(ch/2),	
	pw = (w/2)-(cw/2);
        c.css("top",pt+"px").css("left",pw+"px");
        if(h<=ch){
	  c.css("top","20px");
        }
        if(w<cw){
	  c.css("left","20px");
	}
  },
  adjust: function(){
	this.resize();
	this.reposition();
  },
   checkCookie: function(){
        var s = this;
	if(typeof (jQuery.cookie("mct_optin"))==="undefined"){
	  return true;
	}
	return false;
   },
   detect: function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	   return true;
	}
	return false;
   },
   open: function(){
     var w = window,
         s = this;
     s.init();
     s.scroll();
     s.mouseleave();
     jQuery(w).resize(function(){s.adjust()});
   },
   scroll: function(){
     var s = this;
     if(s.detect()){
	jQuery(window).scroll(function(){
	   var t = jQuery(this).scrollTop();
	   if(t>s.max_scroll && true===s.checkCookie()){
		s.show();
           }
	});
	var c = s.container,
	    e = c.find(".mct_optin_form_email"),
	    uc = c.find(".mct_optin_upper_content");
	e.blur(function(){uc.show();s.adjust();});
	e.focus(function(){uc.hide();s.adjust();});
     }else{
      console.log(s.detect());
     }
   },
   mouseleave: function(){
     var s = this;
     jQuery(document).mouseleave(function(){
        console.log(s.checkCookie());
    	if (true===s.checkCookie()) {
          s.show();
    	}
     });
   },
   close: function(){
    var c = this.container;
	v = c.find(".mct_optin_close_btn,.mct_optin_close_text"),
	s = this;
        v.bind("click",function(){
	 s.hide();
         s.addCookie();
	});
   }
}
