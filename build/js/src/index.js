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

var $body = $('body'),
  $burger = $('button.burger-box'),
  $modal = $('dialog.o_external-link-modal');

$(document).ready(function() {

  /*//////////////////////////////////////
  //  Inputs
  //////////////////////////////////////*/
  $('form input').on('blur', function(){
    var $el = $(this);
    var $parent = $el.closest('div');

    if($el.is(':invalid')){
      $el.addClass('invalid');
    }
    else {
      $el.removeClass('invalid');
      $parent.remove('p.error');
    }
  });

  $('section.o_registration-form form').on('submit', function(){
    // event handler for form submission
  });

  $('section.o_registration-form checkbox').on('change', function(){
    if($(this).is(':checked')){
      $('button[name="submit"]').attr('disabled',false);
    }
    else{
      $('button[name="submit"]').attr('disabled',true);
    }
  });


  /*//////////////////////////////////////
  //  Checking for in position on scroll
  //////////////////////////////////////*/
  // check to seethat any title containers are in view
  $('span.accent').each(function(){
    if(isElementInViewport($(this))){
      $(this).addClass('in-view');
    }
  });
  $(window).on('scroll', function(){
    $('span.accent').each(function(){
      if(isElementInViewport($(this))){
        $(this).addClass('in-view');
      }
    });
  });

  $('.a_title-container').each(function(){
    if(isElementInViewport($(this))){
      $(this).addClass('in-view');
    }
  });
  $(window).on('scroll', function(){
    $('.a_title-container').each(function(){
      if(isElementInViewport($(this))){
        $(this).addClass('in-view');
      }
    });
  });

  $('img.callout').each(function(){
    if(isElementInViewport($(this))){
      $(this).addClass('in-view');
    }
  });
  $(window).on('scroll', function(){
    $('img.callout').each(function(){
      if(isElementInViewport($(this))){
        $(this).addClass('in-view');
      }
    });
  });

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
  //  Modal launch
  //////////////////////////////////////*/
  $('a').filter(function() {
      return this.hostname && this.hostname !== location.hostname;
  }).addClass("external");

  $body.on('click', 'a.external', function(event) {
    event.preventDefault();

    var $el = $(this);
    $modal.get(0).showModal();
    $modal.addClass('open');
    $modal.find('a').attr('href', $el.attr('href'));
  });

  $body.on('click', 'button.close', function(event) {
    $modal.removeClass('open');
    setTimeout(function(event) {
      $modal.get(0).close();
    }, 1000);
  });

  /*//////////////////////////////////////
  //  Quiz
  //////////////////////////////////////*/
  var quiz = $('.o_quiz-block');
  var counter = 2;
  var output = $('#output');
  if (output) {
    output.html('1');
  }
  var step, input, currentCount, age;
  $('.o_quiz-block input').on('click', function(event) {
    step = $(this).closest('.step');
    input = $(this);
    currentCount = counter - 1;
    /* Sets delay on slide progression for smoother transition. */
    setTimeout(function() {
      /* If age step, immediately redirect if under 18, adjust q4 if not. */
      if (step.hasClass('step-2')) {
        age = input.attr('id');
        var num = age.replace(/age/g, '');
        num = parseInt(num);
        if (num == 1) {
          $('body').hide();
          window.location = "./results/threeb.html";
        }
        num = num + 1;
        while (num < 7) {
          $('.step-4').find('#howOld' + num).closest('.container').hide();
          num++;
        }
      }
      /* Final step, sets cookies, determines results, sets redirect timeout based on results. */
      if (step.hasClass('step-8')) {

        // Todo: need to cookie these here for the next page
        var q3 = $("input[name='q3']:checked").val();
        var q4 = $("input[name='q4']:checked").val();
        var q5 = $("input[name='q5']:checked").val();
        var q6 = $("input[name='q6']:checked").val();
        var q7 = $("input[name='q7']:checked").val();
        var q8 = $("input[name='q8']:checked").val();
        // setCookie('formData', q2, 365);

        if (q3 == '>3') {
          showResults('./results/three.html');
        } else {

          // I should rly do a switch statement here
          var count = 0;
          if (q4 == "18–30" || q4 == "31–39") {
            count++;
          }
          if (q5 == "Yes") {
            count++;
          }
          if (q6 == "Yes") {
            count++;
          }
          if (q7 == "No") {
            count++;
          }
          if (q8 == "Yes") {
            count++;
          }
          if (count >= 4) {
            showResults('./results/two.html');
          } else {
            showResults('./results/three.html');
          }
        }
      }
      /* Progresses quiz */
      step.hide();
      quiz.removeClass('step' + currentCount).addClass('step' + counter);
      $('.step-' + counter).show(); // we might need to add in additional tab-index=1 or -1 logic here for accessibility as well, but we can take care of that later
        /* Sets Progress Bar */
      $("#progress").animate().val(counter + 1);
      output.html(counter);
      var parentPos = $(".progress-number").parent().width();
      var newPos = parentPos / 8 * counter - 10; // @ema can we make 8 a var as well, maybe a div.step.length(0) or something? just thinking about how to make this quiz work for other projects with not that much extra work
      $(".progress-number").css('left', newPos);

      counter++;
    }, 1200);
  });
  function showResults(destination) {
    setTimeout(function() {
      $('body').hide();
      window.location = destination;
    }, 5000);
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
  // Do we wanna do anything with this data/store it anywhere?
  // console.log($('form').serializeArray()); // @ema btw i think making the whole thing a form was really clever, i love this approach
});
