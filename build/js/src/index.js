'use strict';

function isElementInViewport (el) {
    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    var top = rect.top;
    var bottom = rect.bottom;
    var browserHeight = $(window).height();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= ($(window).height()) &&
        rect.right <= ($(window).width())
    );
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

var $body = $('body'),
  $burger = $('button.burger-box'),
  $player = $('#player');

$(document).ready(function() {
  /*//////////////////////////////////////
  //  Burger menu
  //////////////////////////////////////*/
  $burger.on('click', function(event) {
    event.preventDefault();
    if ($(this).hasClass('open')) { // close the modal
      $(this).removeClass('open').addClass('closed');
      $body.removeClass('nav-open');
      $body.removeClass('no-scroll');
    } else { // open the modal
      $(this).addClass('open').removeClass('closed');
      $body.addClass('nav-open');
      $body.addClass('no-scroll');
    }
  });


  /*//////////////////////////////////////
  //  Movement Handling
  //////////////////////////////////////*/
  var move = function(direction){
    var current = $player.offset(),
        top = current.top,
        left = current.left;

    //console.log(direction);
    
    switch(direction){
      case('top'):
        $player.css('top',top - 20);
        break;
      case('left'):
        $player.css('left',left - 20);
        break;
      case('right'):
        $player.css('left',left + 60);
        break;
      case('bottom'):
        $player.css('top',top+ 60);
        break;
    }
  }

  var keysdown = {};
  // keydown handler
  $(document).keydown(function(e){
    // Do we already know it's down?
    if (keysdown[e.keyCode]) {
        // Ignore it
        //return;
    }

    // Remember it's down
    keysdown[e.keyCode] = true;

    // Do our thing
    switch(e.keyCode){
      case 87: //left (a)
        move('top');
        break;
      
      case 65: //left (a)
        move('left');
        break;

      case 68: //right (d)
        move('right');
        break;

      case 83: //left (a)
        move('bottom');
        break;
    }
  });

  // keyup handler
  $(document).keyup(function(e){
    // Remove this key from the map
    delete keysdown[e.keyCode];
  });
});
