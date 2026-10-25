const imageDialog = document.getElementById('image-dialog');
const thumbs = document.querySelectorAll('.gallery img');
const galleryButtons = document.querySelectorAll('.gallery-button');
const closeButton = document.getElementById('close-dialog');
const largeImage = document.querySelector('#image-dialog img');
const imageTitle = document.getElementById('img-title');
const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector('.arrow-left');
const imageCounter = document.getElementById('image-counter');

const IMAGE_COUNT = thumbs.length;
let currentIndex = 0;

function updateImage() {
  const image = thumbs[currentIndex];

  largeImage.src = image.dataset.full || image.src;
  largeImage.alt = image.alt;
  imageTitle.textContent = image.dataset.title;
  imageCounter.textContent = `${currentIndex + 1} / ${IMAGE_COUNT}`;
}

function openImage(index) {
  currentIndex = index;
  updateImage();
  imageDialog.showModal();
}

function navigateImage(direction) {
  currentIndex = (currentIndex + direction + IMAGE_COUNT) % IMAGE_COUNT;
  updateImage();
}

function closeOnBackdrop(event) {
  const rect = imageDialog.getBoundingClientRect();
  const isOutside = event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (isOutside) {
    imageDialog.close();
  }
}

galleryButtons.forEach((button, index) => {
  button.addEventListener('click', () => openImage(index));
});

arrowLeft.addEventListener('click', () => navigateImage(-1));
arrowRight.addEventListener('click', () => navigateImage(1));

closeButton.addEventListener('click', () => imageDialog.close());

imageDialog.addEventListener('click', closeOnBackdrop);