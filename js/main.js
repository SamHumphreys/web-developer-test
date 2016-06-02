var allImages = [];
var currentImgIndex = 0;
var timerVar = 0;

//saves the images as an array in allImages
var getImages = function () {
  images = document.getElementsByTagName('img');
  for (var i = 0; i < images.length; i ++) {
    var path = images[i].src;
    allImages.push(path);
  }
};

//creates a div with 3 sections, the left arrow, carouselImage, and right arrow
var createCarousel = function () {
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
};

var showImage = function (imgIndex) {
  var carouselImage = document.getElementsByClassName('carousel-image')[0];
  carouselImage.innerHTML = '';
  var imgSrc = allImages[imgIndex];
  var image = document.createElement('img');
  image.src = imgSrc;
  carouselImage.appendChild(image);
};

var addClickListeners = function () {
  var leftButton = document.getElementsByClassName('left-arrow')[0];
  leftButton.addEventListener('click', clickPrevImage);

  var rightButton = document.getElementsByClassName('right-arrow')[0];
  rightButton.addEventListener('click', clickNextImage);

  window.onkeyup = function (e) {
    if (e.keyCode === 37) {
      clickPrevImage();
    };
    if (e.keyCode === 39) {
      clickNextImage();
    };
  };
};

var clickPrevImage = function () {
  clearInterval(timerVar);
  prevImage();
  addTimer();
};

var clickNextImage = function () {
  clearInterval(timerVar);
  nextImage();
  addTimer();
};

var prevImage = function () {
  if (currentImgIndex === 0) {
    currentImgIndex = allImages.length - 1;
  } else {
    currentImgIndex -= 1;
  };
  showImage(currentImgIndex);
};

var nextImage = function () {
  if (currentImgIndex === (allImages.length - 1)) {
    currentImgIndex = 0;
  } else {
    currentImgIndex += 1;
  };
  showImage(currentImgIndex);
};

var addTimer = function () {
  // timerVar = setInterval(nextImage, 3000);
};


getImages();
createCarousel();
showImage(currentImgIndex);
addClickListeners();
addTimer();
