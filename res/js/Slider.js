/**
 * TODO: Container childs top/left must be set to container's height/width except the last element which is the 
 * first one to be shown. It depends on the direction mode (vertical => set only top, horizontal => set only left).
 */
var Slider = new function () {
  var self = this;
  
  self.DIRECTION_HORIZONTAL = 0;
  self.DIRECTION_VERTICAL   = 1;
  
  /**
   * Creates the Slider object itself.
   *
   * @param {object} container      Container's jQuery object.
   *
   * @param {object} previousButton Previous button jQuery object.
   *
   * @param {object} nextButton     Next button jQuery object.
   *
   * @param {number} direction      Specifies the sliding direction (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL).
   */
  self.class = function (container, previousButton, nextButton, direction) {
    var $this        = this;
    
    var sliding      = false;
    var currentIndex = 0;
    var nextIndex    = 0;
    var previous     = null;
    var next         = null;
    
    /**
     * Tells is there's any slide in progress.
     *
     * @return {boolean}
     */
    $this.isSliding = function () {
      return sliding;
    }
    
    /**
     * Returns the slider direction.
     *
     * @return {number}
     */
    $this.getDirection = function () {
      return direction;
    }
    
    /**
     * Returns the current index.
     *
     * @return {number}
     */
    $this.getCurrentIndex = function () {
      return currentIndex;
    }
    
    /**
     * Returns the next index.
     *
     * @return {number}.
     */
    $this.getNextIndex = function () {
      return nextIndex;
    }
    
    /**
     * Returns the slide speed.
     *
     * @return {string|number}.
     */
    $this.getSlideSpeed = function () {
      return self.getAttribute(container, 'data-slideSpeed');
    }
    
    /**
     * Initialises and constructs the object.
     */
    function __construct () {
      currentIndex = container.children().length - 1;
    }
    
    /**
     * Slides to the previous item.
     */
    $this.previous = function () {
      try {
        validateSlide();
      } catch (errorString) {
        return;
      }
      
      var index = currentIndex - 1;
      
      if (index <= -1) {
        index = container.children().length - 1;
      }
      
      nextIndex = index;
      defineCurrentAndNext();
      
      if (direction == self.DIRECTION_HORIZONTAL) {
        slideToRight();
      } else {
        slideToDown();
      }
    }
    
    /**
     * Slides to the next item.
     */
    $this.next = function () {
      try {
        validateSlide();
      } catch (errorString) {
        return;
      }
      
      var index = currentIndex + 1;
      
      if (index >= container.children().length) {
        index = 0;
      }
      
      nextIndex = index;
      defineCurrentAndNext();
      
      if (direction == self.DIRECTION_HORIZONTAL) {
        slideToLeft();
      } else {
        slideToUp();
      }
    }
    
    /**
     * Sets the click actions for the respective slider buttons.
     */
    $this.setButtonsClickListeners = function () {
      $this.unsetButtonsClickListeners();
      previousButton.click(onPreviousButtonClick);
      nextButton.click(onNextButtonClick);
    }
    
    /**
     * Unsets the click actions for the respective slider buttons.
     */
    $this.unsetButtonsClickListeners = function () {
      previousButton.unbind('click', onPreviousButtonClick);
      nextButton.unbind('click', onNextButtonClick);
    }
    
    /**
     * Previous button click listener.
     *
     * @param {object} evt Sent event object.
     */
    function onPreviousButtonClick (evt) {
      $this.previous();
    }
    
    /**
     * Next button click listener.
     *
     * @param {object} evt Sent event object.
     */
    function onNextButtonClick (evt) {
      $this.next();
    }
    
    /**
     * Throws an error in case of slide in progress.
     */
    function validateSlide () {
      if (sliding) {
        throw 'Slide in progress.';
      }
      
      sliding = true;
    }
    
    /**
     * Defines the jQuery objects for the current and next items.
     */
    function defineCurrentAndNext () {
      current = $(container.children()[ currentIndex ]);
      next    = $(container.children()[ nextIndex ]);
    }
    
    /**
     * Slides the current and the next containers to up.
     */
    function slideToUp () {
      next.css({ top : next.height() + 'px' });
      current.animate({ top : '-' + current.height() + 'px' }, $this.getSlideSpeed());
      animateAndFinish({ top : '0px' });
    }
    
    /**
     * Slides the current and the next containers to down.
     */
    function slideToDown () {
      next.css({ top : '-' + next.height() + 'px' });
      current.animate({ top : current.height() + 'px' }, $this.getSlideSpeed());
      animateAndFinish({ top : '0px' });
    }
    
    /**
     * Slides the current and the next containers to the left.
     */
    function slideToLeft () {
      next.css({ left : next.width() + 'px' });
      current.animate({ left : '-' + current.width() + 'px' }, $this.getSlideSpeed());
      animateAndFinish({ left : '0px' });
    }
    
    /**
     * Slides the current and the next containers to the right.
     */
    function slideToRight () {
      next.css({ left : '-' + next.width() + 'px' });
      current.animate({ left : current.width() + 'px' }, $this.getSlideSpeed());
      animateAndFinish({ left : '0px' });
    }
    
    /**
     * Animates the next container and finishes the animation.
     */
    function animateAndFinish (attributes) {
      next.animate(attributes, $this.getSlideSpeed(), function () {
        currentIndex = nextIndex;
        nextIndex    = 0;
        previous     = null;
        next         = null;
        sliding      = false;
      });
    }
    
    __construct();
  }
  
  /**
   * Creates a returns a new Slider object instance.
   *
   * @param {object} container      Container's jQuery object.
   *
   * @param {object} previousButton Previous button jQuery object.
   *
   * @param {object} nextButton     Next button jQuery object.
   *
   * @param {number} direction      Specifies the sliding direction (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL).
   *
   * @return {object}
   */
  self.create = function (container, previousButton, nextButton, direction) {
    return new self.class(container, previousButton, nextButton, direction);
  }
  
  /**
   * Reads an specific attribute from the provided element, in property is a number then returns a number, 
   * otherwise returns a string.
   *
   * @param {object} element   Element where to read the attribute.
   *
   * @param {string} attribute Attribute name to read.
   *
   * @return {string|number}
   */
  self.getAttribute = function (element, attribute) {
    var value = element.attr(attribute);
    
    return isNaN(value) ? value : +value ;
  }
}