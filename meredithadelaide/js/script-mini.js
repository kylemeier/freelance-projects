(function(){function g(e,t){e.bind("load",function(){e.addClass("visible");e.removeClass("invisible")});e.attr("src",e.attr("data-src"));t<800&&E(e.next(),0)}function y(e,t){var n=f*o+u,r=(l-n)/2,i=0;if(t==="left")for(var s=a;s>=0;s--){i=Math.floor(n*s-r);if(e>i)return e-i}else for(var s=1;s<=a;s++){i=Math.floor(n*s-r);if(e<i)return i-e}}function b(e,t,n,r){var i=r.attr("data-owidth")/r.attr("data-oheight"),s=0,o=0;if(e<800){s=Math.round(n/i);r.parent().css("height",s);r.parent().css("width","100%");return s+u}o=Math.round(i*t);r.parent().css("width",o);r.parent().css("height","100%");return-(o+u)}function w(e,t,i){var o=m.height(),f=m.width(),l=o*n*r,c=f*n,d=0;p.each(function(){var n=$(this);e&&g(n,f);if(s){t&&$("iframe").remove();i&&E(n.next(),0);a++}d+=b(f,l,c,n)});if(d>0){v.height(d);h.css("width","80%")}else{h.width(-d-u);v.css("height","100%")}}function E(e,t){var n=e.attr("data-url");e.parent().append('<iframe width="100%" height="100%" src="'+n+"?theme=light&color=white&autohide=1&autoplay="+t+'" frameBorder="0" allowfullscreen></iframe>')}function S(){v.removeClass("invisible");v.addClass("visible");if(s||document.URL.search("film")>0||document.URL.search("print")>0){r=.75;$("body").addClass("short-content")}w(1);f=d.height();l=d.width();c=h.width()}var e=0,t=0,n=.8,r=1,i=0,s=document.URL.search("video")>0,o=16/9,u=2,a=0,f=0,l=0,c=0,h=$("#content"),p=h.find("img"),d=$("#content-pane"),v=$(".page-container"),m=$(window);m.resize(function(){var e=0,t=0;i<800&&m.width()>=800&&(e=1);i>=800&&m.width()<800&&(t=1);w(0,e,t);c=h.width();f=d.height();l=d.width();i=m.width()});$(".nav-item").hover(function(){$(this).children("ul").stop(!0,!1).slideDown("fast").css("z-index","1")},function(){$(this).children("ul").stop(!0,!1).css("z-index","0").slideUp("fast",function(){$(this).css("height","auto")})});$("#icon-scroll-right").click(function(){var e=d.scrollLeft(),t=0;if(!(e+l<c))return;s?t=y(e,"right"):t=l*.6;d.animate({scrollLeft:"+="+t},500,"easeInOutQuad")});$("#icon-scroll-left").click(function(){var e=d.scrollLeft(),t=0;if(!(e>0))return;s?t=y(e,"left"):t=l*.6;d.animate({scrollLeft:"-="+t},500,"easeInOutQuad")});$(document).on("click",".play-video",function(e){e.preventDefault();$("iframe").remove();$(".play-video").show();E($(this),1)});$("#icon-nav").click(function(){if(e===0){v.addClass("menu-open");setTimeout(function(){e=1},500)}});$("#sliding-container").click(function(){if(e===1){v.removeClass("menu-open");setTimeout(function(){e=0},500)}});S()})();