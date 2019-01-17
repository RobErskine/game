'use strict';

function isElementInContainer (el, container, threshold, direction) {
  //special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0];
      container = container[0];
  }

  var rect = el.getBoundingClientRect();
  var cont = container.getBoundingClientRect();

  switch(direction){
    case("top"):
      if(rect.top <= (cont.top + threshold)){
        console.log('stop moving top');
        return false;
      }
      break;
    case("left"):
      if(rect.left <= (cont.left + threshold)){
        console.log('stop moving left');
        return false;
      }
      break;
    case("bottom"):
      if(rect.top >= (cont.bottom - (threshold*4))){
        console.log('stop moving bottom');
        return false;
      }
      break;
    case("right"):
      if(rect.right >= (cont.right - threshold)){
        console.log('stop moving right');
        return false;
      }
      break;
  }
  return true;
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
  $player = $('#player'),
  $stage  = $('#stage');

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
        stage = $stage.offset(),
        top = current.top - stage.top,
        left = current.left - stage.left;

    $player.removeClass('looking-top looking-left looking-right looking-bottom');
    $player.addClass('looking-'+direction);

    console.log(isElementInContainer($player, $stage, ($player.height() / 2), direction));
    if(! isElementInContainer($player, $stage, ($player.height() / 2), direction)){
      return;
    }
    
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
        $player.css('top',top + 80);
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

    $player.addClass('moving');

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
    setTimeout(function(){
      $player.removeClass('moving');
    },100);
  });
});
