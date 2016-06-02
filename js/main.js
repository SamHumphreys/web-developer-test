//stash of varibles:
  //allImages -> an array of all image sources from setup.getImages
  //currentImgIndex -> keeps track of the allImages index of the picure currently displayed
  //timerVar -> the id of the setInterval so you can cancel it when manually changing pictures
  //timerInterval -> the timer delay in milliseconds
var variStash = {
  allImages: [],
  currentImgIndex: 0,
  timerVar: 0,
  timerInterval: 3000
};

//setup on page refresh, gets image sources, creates carousel, and adds event
// listeners and timer, then displays the first image
var setup = {
  //runTheSetup -> runs the setup functions, then calls execute.showImage to
  // display the first image
  runTheSetup: function () {
    this.getImages();
    this.createCarousel();
    this.addListeners();
    this.addTimer();
    execute.showImage(variStash.currentImgIndex);
  },
  //getImages -> checks the HTML, adds all image sources to variStash.allImages
  getImages: function () {
    images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i ++) {
      var path = images[i].src;
      variStash.allImages.push(path);
    };
  },
  //createCarousel -> creates the elements of the carousel and appends them to #container
  createCarousel: function () {
    var container = document.getElementById('container');
    var carousel = document.createElement('div');
    carousel.className = 'carousel';
    container.appendChild(carousel);

    var leftArrow = document.createElement('div');
    leftArrow.className = 'left-arrow arrow';
    leftArrow.innerHTML = '<img src="img/carousel-resources/arrow.png">';

    var carouselImage = document.createElement('div');
    carouselImage.className = 'carousel-image';

    var rightArrow = document.createElement('div');
    rightArrow.className = 'right-arrow arrow';
    rightArrow.innerHTML = '<img src="img/carousel-resources/arrow.png">';

    carousel.appendChild(leftArrow);
    carousel.appendChild(carouselImage);
    carousel.appendChild(rightArrow);
  },
  //addListeners -> adds click listeners to the arrows and image elements of the
  // carousel, and adds key listeners to the left and right arrow keys
  addListeners: function () {
    var leftButton = document.getElementsByClassName('left-arrow')[0];
    leftButton.addEventListener('click', execute.clickPrevImage);

    var rightButton = document.getElementsByClassName('right-arrow')[0];
    rightButton.addEventListener('click', execute.clickNextImage);

    var carouselImage = document.getElementsByClassName('carousel-image')[0];
    carouselImage.addEventListener('click', execute.clickNextImage);

    window.onkeyup = function (e) {
      if (e.keyCode === 37) {
        execute.clickPrevImage();
      };
      if (e.keyCode === 39) {
        execute.clickNextImage();
      };
    };
  },
  //addTimer -> calls execute.nextImage with the delay set by variStash.timerInterval
  addTimer: function () {
    variStash.timerVar = setInterval(execute.nextImage, variStash.timerInterval);
  }
};

var execute = {
  //showImage -> receives the index of the image to display from variStash.allImages,
  // clears any previous image being displayed, creates an img element with
  // the source from variStash.allImages and appends it to the carousel.
  showImage: function (imgIndex) {
    var carouselImage = document.getElementsByClassName('carousel-image')[0];
    carouselImage.innerHTML = '';
    var imgSrc = variStash.allImages[imgIndex];
    var image = document.createElement('img');
    image.src = imgSrc;
    carouselImage.appendChild(image);
  },
  //clickPrevImage -> when the left arrow is clicked the timer is cleared,
  // execute.prevImage is called and the timer restarted
  clickPrevImage: function () {
    clearInterval(variStash.timerVar);
    execute.prevImage();
    setup.addTimer();
  },
  //clickNextImage -> when the right arrow is clicked the timer is cleared,
  // execute.nextImage is called and the timer restarted
  clickNextImage: function () {
    clearInterval(variStash.timerVar);
    execute.nextImage();
    setup.addTimer();
  },
  //prevImage -> updates variStash.currentImgIndex to be 1 less than it currently is
  // (going to the end if at position 0) and calls execute.showImage with the new
  // index number
  prevImage: function () {
    if (variStash.currentImgIndex === 0) {
      variStash.currentImgIndex = variStash.allImages.length - 1;
    } else {
      variStash.currentImgIndex -= 1;
    };
    execute.showImage(variStash.currentImgIndex);
  },
  //nextImage -> updates variStash.currentImgIndex to be 1 more than it currently is
  // (going to the start if at the last position) and calls execute.showImage with the new
  // index number
  nextImage: function () {
    if (variStash.currentImgIndex === (variStash.allImages.length - 1)) {
      variStash.currentImgIndex = 0;
    } else {
      variStash.currentImgIndex += 1;
    };
    execute.showImage(variStash.currentImgIndex);
  }
};


//call setup.runTheSetup to start the carousel
setup.runTheSetup();
