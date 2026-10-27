const images = [
  'Vogel-810433_1280.jpg',
  'Katze-810434_1248.jpg',
  'Esel-810435_1348.jpg',
  'Ente-810435_7896.jpg',
  'Giraffe-812436_1475.jpg',
  'Grashüpfer-87125_4856.jpg',
  'Fischreiher-78542_8765.jpg',
  'Pferd-52443_5248.jpg',
  'Löwe-03265_6321.jpg',
  'Wolf-52122_0212.jpg',
  'Eichhörnchen-15236_4521.jpg',
  'Hase-69582_3256.jpg'
];

const imageDialog = document.getElementById('image-dialog');
const closeButton = document.getElementById('close-dialog');
const largeImage = document.querySelector('#image-dialog img');
const imageTitle = document.getElementById('img-title');
const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector('.arrow-left');
const imageCounter = document.getElementById('image-counter');
const gallery = document.querySelector('.gallery');

const IMAGE_COUNT = images.length;

let currentIndex = 0;

function init() {
  console.log('init wurde gestartet');
  renderGallery();
  initEventListeners();
}

function init() {
  renderGallery();
  initEventListeners();
}

function renderGallery() {
  gallery.replaceChildren();

  for (let i = 0; i < images.length; i++) {
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('gallery-button');

    const img = document.createElement('img');
    img.src = `./img/${images[i]}`;
    img.alt = images[i].split('.')[0];
    img.dataset.title = images[i].split('.')[0];

    button.appendChild(img);
    gallery.appendChild(button);

    button.addEventListener('click', () => openImage(i));
  }
}

function updateImage() {
  const filename = images[currentIndex];

  largeImage.src = `./img/${filename}`;
  largeImage.alt = filename.split('.')[0];
  imageTitle.textContent = filename.split('.')[0];
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

function initEventListeners() {
  arrowLeft.addEventListener('click', () => navigateImage(-1));
  arrowRight.addEventListener('click', () => navigateImage(1));

  closeButton.addEventListener('click', () => imageDialog.close());

  imageDialog.addEventListener('click', closeOnBackdrop);
}