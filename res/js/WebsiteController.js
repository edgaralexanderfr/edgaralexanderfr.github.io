$(document).ready(function () {
  var birthDate = new Date('August 25, 1993 00:00:00');
  var experienceStartDate = new Date('April 11, 2011 00:00:00');
  var currentDate = new Date();

  var age = Math.floor((currentDate - birthDate) / 1000 / 3600 / 24 / 365);
  var yearsOfExperience = Math.floor((currentDate - experienceStartDate) / 1000 / 3600 / 24 / 365);
  
  $('#age').text(age);
  $('#years-of-experience').text(yearsOfExperience);
  $('#current-year').text(currentDate.getFullYear());
  
  /**
   * Scroll up button singleton.
   */
  (function () {
    var scrolling = false;
    
    /**
     * Performs an scroll-top animation when scroll up button is clicked.
     *
     * @param {object} evt Sent object event.
     */
    $('#scrollUpButton').click(function (evt) {
      if (scrolling) {
        return;
      }
      
      scrolling = true;
      
      $('html,body').animate({ scrollTop : 0 }, Slider.getAttribute($(this), 'data-scrollSpeed'), function () {
        scrolling = false;
      });
    });
    
    /**
     * Decides whether to fade in/out the scroll up button.
     *
     * @param {object} evt Sent event object.
     */
    $(window).scroll(function (evt) {
      if ($(window).scrollTop() > +$('#scrollUpButton').attr('data-fadeAt')) {
        if ($('#scrollUpButton').css('display') == 'none') {
          $('#scrollUpButton').fadeIn(Slider.getAttribute($('#scrollUpButton'), 'data-fadeSpeed'));
        }
      } else {
        if ($('#scrollUpButton').css('display') != 'none') {
          $('#scrollUpButton').fadeOut(Slider.getAttribute($('#scrollUpButton'), 'data-fadeSpeed'));
        }
      }
    });
  })();
  
  /**
   * Nav singleton.
   */
  (function () {
    var navNumber = 1;
    var navElement;
    
    while ((navElement = $('#nav' + navNumber)).length > 0) {
      navElement.click(function (evt) {
        var targetId = $(this).attr('data-targetId');
        evt.preventDefault();
        
        $('html, body').animate({
          scrollTop : $('#' + targetId).offset().top
        }, Slider.getAttribute($(this), 'data-scrollSpeed'));
      });
      
      navNumber++;
    }
  })();
  
  /**
   * Projects singleton.
   */
  (function () {
    var slider = Slider.create(
      $('#projects'), 
      $('#projectsPreviousButton'), 
      $('#projectsNextButton'), 
      Slider.DIRECTION_HORIZONTAL
    );
    
    slider.setButtonsClickListeners();
  })();
  
  /**
   * About singleton.
   */
  (function () {
    var slider = Slider.create(
      $('#experiences'), 
      $('#experiencesPreviousButton'), 
      $('#experiencesNextButton'), 
      Slider.DIRECTION_VERTICAL
    );
    
    slider.setButtonsClickListeners();
  })();
  
  /**
   * Slide to section singleton.
   */
  (function () {
    var section = $('#controllerParams').attr('data-section');
    
    if (section == '') {
      return;
    }
    
    $('html, body').animate({
      scrollTop : $('#' + section).offset().top
    }, Slider.getAttribute($('#controllerParams'), 'data-sectionScrollSpeed'));
  })();
});