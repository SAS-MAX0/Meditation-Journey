// script.js

const API_KEY = 'vK6x04nqAqkPILA53dkQBzCcqntAJOoZ_oBY9hxImcw';
const IMAGE_COUNT = 100; // Number of images to fetch from Unsplash
let images = [];
let currentIndex = 0;
let intervalId;
let slideInterval = 1000; // Default to 3 seconds

// Elements
const imgElement = document.getElementById('slideshow-image');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const intervalInput = document.getElementById('interval');
const categorySelect = document.getElementById('category');
const startBtn = document.getElementById('start-btn');
const cancelBtn = document.getElementById('cancel-btn');
const slideshowContainer = document.getElementById('slideshow-container');
const controlsContainer = document.querySelector('.controls');
const categorySelection = document.querySelector('.category-selection');

// Fetch images from Unsplash based on category
async function fetchImages(category) {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?client_id=${API_KEY}&query=${category}&per_page=${IMAGE_COUNT}`);
    const data = await response.json();
    
    // Ensure we get images
    if (data.results && data.results.length > 0) {
      images = data.results.map(item => item.urls.regular); // Extract image URLs
      showImage(); // Display the first image
      categorySelection.style.display = 'none'; // Hide category selection
      slideshowContainer.classList.remove('hidden'); // Show slideshow container
      controlsContainer.classList.remove('hidden'); // Ensure controls are visible
      slideshowContainer.style.opacity = 1; // Fade in the container
      setIntervalTime(); // Start the slideshow
    } else {
      alert('No images found for this category!');
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    alert('Failed to fetch images, please try again.');
  }
}

// Display the current image
function showImage() {
  if (images.length > 0) {
    imgElement.src = images[currentIndex];
  }
}

// Show the next image
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
}

// Show the previous image
function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
}

// Set the slideshow interval
function setIntervalTime() {
  clearInterval(intervalId); // Clear existing interval
  slideInterval = intervalInput.value * 1000; // Convert to milliseconds
  intervalId = setInterval(nextImage, slideInterval); // Set the interval to change images
}

// Stop the slideshow and go back to category selection
function cancelSlideshow() {
  clearInterval(intervalId); // Stop the slideshow interval
  images = []; // Clear images
  currentIndex = 0; // Reset index
  imgElement.src = ''; // Clear the image
  categorySelection.style.display = 'block'; // Show category selection
  slideshowContainer.classList.add('hidden'); // Hide slideshow container
  controlsContainer.classList.add('hidden'); // Hide controls
}

// Event listeners
prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);
intervalInput.addEventListener('input', setIntervalTime);
startBtn.addEventListener('click', () => {
  const selectedCategory = categorySelect.value;
  fetchImages(selectedCategory);
});
cancelBtn.addEventListener('click', cancelSlideshow);

// Initialize
categorySelection.style.display = 'block'; // Show the category selection initially
controlsContainer.classList.add('hidden'); // Hide controls until images are loaded
slideshowContainer.classList.add('hidden'); // Hide slideshow initially

document.getElementById('start-btn').addEventListener('click', function() {
  // Play the audio
  const audio = document.getElementById('background-audio');
  audio.play();
});

document.getElementById('cancel-btn').addEventListener('click', function() {
  // Stop the audio
  const audio = document.getElementById('background-audio');
  audio.pause();
  audio.currentTime = 0; // Reset audio to the beginning

  // Optionally hide the slideshow container and controls
  document.getElementById('slideshow-container').classList.add('hidden');
  document.querySelector('.controls').classList.add('hidden');
});