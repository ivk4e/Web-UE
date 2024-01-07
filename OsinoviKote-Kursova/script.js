const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide() {
  slides.forEach((slide, index) => {
    if (index === currentSlide) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });

  currentSlide = (currentSlide + 1) % slides.length;
}

setInterval(showSlide, 5000);

// News Scripts
// Function to handle the intersection observer
function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    }
  });
}

// Create an intersection observer
const observer = new IntersectionObserver(handleIntersection, {
  root: null,
  threshold: 0.5,
});

// Observe each box element
const elementsToObserve = document.querySelectorAll(".box, .paws-path");
elementsToObserve.forEach((element) => {
  observer.observe(element);
});

// Gallery

var imageArray = [
  "cat-eye.jpg",
  "long-cat.jpg",
  "cat1.jpg",
  "cat2.jpg",
  "cat3.jpg",
  "high-cat.jpg",
  "mountain-cat.jpg",
];
var imageArrayIndex;

document.addEventListener("DOMContentLoaded", function () {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  createImages(imageArray, "left-column-pictures", "right-column-pictures");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      return;
    }

    assembleCat();
    startingMessages1();
  });
});

function assembleCat() {
  const catFaceLeft = document.getElementById("cat-face-left");
  const catFaceRight = document.getElementById("cat-face-right");
  const catUpperBody = document.getElementById("cat-upper-body");
  const catLowerBody = document.getElementById("cat-lower-body");

  const scrollPosition = window.scrollY;

  const translateX = scrollPosition * 1;
  const translateY = scrollPosition * 0.5;

  catFaceRight.style.transform = `translate(0%, ${translateY}px)`;
  catLowerBody.style.transform = `translate(0%, ${-translateY}px)`;
  catFaceLeft.style.transform = `translate(${translateX}px, 0%)`;
  catUpperBody.style.transform = `translate(${-translateX}px, 0%)`;

  let currentOpacity = scrollPosition / 200;

  catFaceRight.style.opacity = currentOpacity;
  catLowerBody.style.opacity = currentOpacity;
  catFaceLeft.style.opacity = currentOpacity;
  catUpperBody.style.opacity = currentOpacity;
}

function startingMessages1() {
  const leftMessage1 = document.getElementById("left-msg1");
  const rightMessage1 = document.getElementById("right-msg1");
  const leftMessage2 = document.getElementById("left-msg2");
  const rightMessage2 = document.getElementById("right-msg2");

  const scrollPosition = window.scrollY;
  const translateX = scrollPosition * 1;

  if (scrollPosition > 0 && scrollPosition <= 200) {
    leftMessage1.style.transform = `translate(${translateX}px, 0%)`;
    rightMessage1.style.transform = `translate(${-translateX}px, 0%)`;
  }
  if (window.scrollY > 0 && window.scrollY <= 300) {
    leftMessage2.style.transform = `translate(${translateX}px, 0%)`;
    rightMessage2.style.transform = `translate(${-translateX}px, 0%)`;
  }

  let currentOpacity = scrollPosition / 200;

  if (scrollPosition > 0 && scrollPosition <= 200) {
    leftMessage1.style.opacity = scrollPosition / 200;
    rightMessage1.style.opacity = scrollPosition / 200;
  }
  if (scrollPosition > 100 && scrollPosition <= 200) {
    leftMessage2.style.opacity = scrollPosition / 400;
    rightMessage2.style.opacity = scrollPosition / 400;
  }
  if (scrollPosition > 0 && scrollPosition <= 100) {
    leftMessage2.style.opacity = 0;
    rightMessage2.style.opacity = 0;
  }
  if (scrollPosition > 200 && scrollPosition <= 300) {
    leftMessage2.style.opacity = scrollPosition / 200;
    rightMessage2.style.opacity = scrollPosition / 200;
  }
}

function createImages(imageArray, containerId, containerId2) {
  var container = document.getElementById(containerId);
  var container2 = document.getElementById(containerId2);

  let cnt = 0;
  imageArray.forEach(function (filename) {
    var img = document.createElement("img");
    img.src = "images/galery/" + filename;
    img.classList.add("picture");
    img.onclick = function () {
      showModal(filename);
    };

    if (cnt % 2 == 0) {
      container.appendChild(img);
    } else {
      container2.appendChild(img);
    }

    cnt++;
  });
}

function showModal(imageSrc) {
  for (let i = 0; i < imageArray.length; i++) {
    if (imageSrc == imageArray[i]) {
      imageArrayIndex = i;
    }
  }
  var modalImage = document.getElementById("overlay-img");
  document.getElementById("overlay").style.display = "block";
  document.getElementById("left-arrow").style.display = "block";
  document.getElementById("right-arrow").style.display = "block";
  document.getElementById("exit-btn").style.display = "block";
  modalImage.src = "images/galery/" + imageSrc;
  modalImage.style.display = "block";

  modalImage.style.width = "1000px";
  modalImage.style.height = "auto";

  if (modalImage.height > window.innerHeight) {
    modalImage.style.height = window.innerHeight + "px";
    modalImage.style.width = "auto";
  }

  modalImage.style.maxWidth = "100%";
  modalImage.style.position = "absolute";
  modalImage.style.top = "50%";
  modalImage.style.left = "50%";
  modalImage.style.transform = "translate(-50%, -50%)";
  modalImage.style.zIndex = "1001";
}

function exitOverlay() {
  var overlay = document.getElementById("overlay");
  overlay.style.display = "none";
  document.getElementById("left-arrow").style.display = "none";
  document.getElementById("right-arrow").style.display = "none";
  document.getElementById("exit-btn").style.display = "none";
}

function changePictureRight() {
  console.log(imageArrayIndex);
  if (imageArrayIndex == imageArray.length - 1) {
    imageArrayIndex = 0;
  } else {
    imageArrayIndex++;
  }
  showModal(imageArray[imageArrayIndex]);
}

function changePictureLeft() {
  console.log(imageArrayIndex);
  if (imageArrayIndex == 0) {
    imageArrayIndex = imageArray.length - 1;
  } else {
    imageArrayIndex--;
  }
  showModal(imageArray[imageArrayIndex]);
}
