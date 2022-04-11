/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/


$(function () {
	
	"use strict";
	
	/* Preloader
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	setTimeout(function () {
		$('.loader_bg').fadeToggle();
	}, 1500);
	
	
	
	/* Tooltip
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip();
	});
	

	/* Mouseover
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(document).ready(function(){
		$(".main-menu ul li.megamenu").mouseover(function(){
			if (!$(this).parent().hasClass("#wrapper")){
			$("#wrapper").addClass('overlay');
			}
		});
		$(".main-menu ul li.megamenu").mouseleave(function(){
			$("#wrapper").removeClass('overlay');
		});
	});
	
	
	/* Scroll to Top
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(window).on('scroll', function (){
        scroll = $(window).scrollTop();
        if (scroll >= 100){
          $("#back-to-top").addClass('b-show_scrollBut')
        }else{
          $("#back-to-top").removeClass('b-show_scrollBut')
        }
      });
      $("#back-to-top").on("click", function(){
        $('body,html').animate({
          scrollTop: 0
        }, 1000);
    });
	
	
 

	/* Countdown
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$('[data-countdown]').each(function () {
        var $this = $(this),
		finalDate = $(this).data('countdown');
		$this.countdown(finalDate, function (event) {
			var $this = $(this).html(event.strftime(''
			+ '<div class="time-bar"><span class="time-box">%w</span> <span class="line-b">weeks</span></div> '
			+ '<div class="time-bar"><span class="time-box">%d</span> <span class="line-b">days</span></div> '
			+ '<div class="time-bar"><span class="time-box">%H</span> <span class="line-b">hr</span></div> '
			+ '<div class="time-bar"><span class="time-box">%M</span> <span class="line-b">min</span></div> '
			+ '<div class="time-bar"><span class="time-box">%S</span> <span class="line-b">sec</span></div>'));
		});
    });
	
	
	
	
	/* Toggle sidebar
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
     
     $(document).ready(function () {
       $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
          $(this).toggleClass('active');
       });
     });

     /* Product slider 
     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
     // optional
     $('#blogCarousel').carousel({
        interval: 5000
     });


});


/* Toggle sidebar
     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

// chatbox


$(function() {
	var INDEX = 0; 
	$("#chat-submit").click(function(e) {
	  e.preventDefault();
	  var msg = $("#chat-input").val(); 
	  if(msg.trim() == ''){
		return false;
	  }
	  generate_message(msg, 'self');
	  var buttons = [
		  {
			name: 'Existing User',
			value: 'existing'
		  },
		  {
			name: 'New User',
			value: 'new'
		  }
		];
	  setTimeout(function() {      
		generate_message(msg, 'user');  
	  }, 1000)
	  
	})
	
	function generate_message(msg, type) {
	  INDEX++;
	  var str="";
	  str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
	  str += "          <span class=\"msg-avatar\">";
	  str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
	  str += "          <\/span>";
	  str += "          <div class=\"cm-msg-text\">";
	  str += msg;
	  str += "          <\/div>";
	  str += "        <\/div>";
	  $(".chat-logs").append(str);
	  $("#cm-msg-"+INDEX).hide().fadeIn(300);
	  if(type == 'self'){
	   $("#chat-input").val(''); 
	  }    
	  $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
	}  
	
	function generate_button_message(msg, buttons){    
	  /* Buttons should be object array 
		[
		  {
			name: 'Existing User',
			value: 'existing'
		  },
		  {
			name: 'New User',
			value: 'new'
		  }
		]
	  */
	  INDEX++;
	  var btn_obj = buttons.map(function(button) {
		 return  "              <li class=\"button\"><a href=\"javascript:;\" class=\"btn btn-primary chat-btn\" chat-value=\""+button.value+"\">"+button.name+"<\/a><\/li>";
	  }).join('');
	  var str="";
	  str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg user\">";
	  str += "          <span class=\"msg-avatar\">";
	  str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
	  str += "          <\/span>";
	  str += "          <div class=\"cm-msg-text\">";
	  str += msg;
	  str += "          <\/div>";
	  str += "          <div class=\"cm-msg-button\">";
	  str += "            <ul>";   
	  str += btn_obj;
	  str += "            <\/ul>";
	  str += "          <\/div>";
	  str += "        <\/div>";
	  $(".chat-logs").append(str);
	  $("#cm-msg-"+INDEX).hide().fadeIn(300);   
	  $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);
	  $("#chat-input").attr("disabled", true);
	}
	
	$(document).delegate(".chat-btn", "click", function() {
	  var value = $(this).attr("chat-value");
	  var name = $(this).html();
	  $("#chat-input").attr("disabled", false);
	  generate_message(name, 'self');
	})
	
	$("#chat-circle").click(function() {    
	  $("#chat-circle").toggle('scale');
	  $(".chat-box").toggle('scale');
	})
	
	$(".chat-box-toggle").click(function() {
	  $("#chat-circle").toggle('scale');
	  $(".chat-box").toggle('scale');
	})
	
  })
