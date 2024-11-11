// script.js

// This script can be expanded for more interactive features in the future
document.querySelectorAll('.container').forEach(container => {
    container.addEventListener('mouseenter', () => {
        container.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });

    container.addEventListener('mouseleave', () => {
        container.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
});

// script.js

const accessKey = 'vK6x04nqAqkPILA53dkQBzCcqntAJOoZ_oBY9hxImcw'; // Your Unsplash Access Key

let currentPage = 1;
const perPage = 5;

document.getElementById('search-button').addEventListener('click', fetchImages);
document.getElementById('show-more-button').addEventListener('click', () => {
    currentPage++;
    fetchImages();
});

async function fetchImages() {
    const query = document.getElementById('search-input').value;
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&page=${currentPage}&per_page=${perPage}`);
    const data = await response.json();
    displayImages(data.results);

    // Show or hide the "Show More" button
    const showMoreButton = document.getElementById('show-more-button');
    if (data.results.length > 0) {
        showMoreButton.classList.remove('hidden');
    } else {
        showMoreButton.classList.add('hidden');
    }
}

function displayImages(images) {
    const imageResults = document.getElementById('image-results');
    // Clear previous results only if it's the first search
    if (currentPage === 1) {
        imageResults.innerHTML = ''; // Clear previous results
    }

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.small;
        imgElement.alt = image.alt_description; // This can be removed if not needed
        imgElement.className = 'image';
        imgElement.addEventListener('click', () => openModal(image.urls.full));
        imageResults.appendChild(imgElement);
    });
}

function openModal(imageUrl) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');

    modalImage.src = imageUrl;
    modal.classList.remove('hidden');

    const closeButton = document.querySelector('.close');
    closeButton.onclick = () => {
        modal.classList.add('hidden');
    };
}

// Close modal when clicking outside of the image
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.classList.add('hidden');
    }
}