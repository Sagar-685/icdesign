// Load the YouTube IFrame API asynchronously
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

// This function creates an <iframe> (and YouTube player) after the API code downloads.
function onYouTubeIframeAPIReady() {
    player = new YT.Player('myVideo', {
        events: {
            'onReady': onPlayerReady
        }
    });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
    // Set up scroll event listener to pause/play the video
    window.addEventListener('scroll', function() {
        const rect = player.getIframe().getBoundingClientRect();

        // Check if the video frame is completely out of the viewport
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
            player.pauseVideo(); // Pause the video if it's out of view
        } else {
            player.playVideo(); // Play the video if it's in view
        }
    });
}
const carousel = document.getElementById('custom-carousel');
const images = carousel.children;
const totalImages = images.length;
let currentIndex = 0;
const interval = 4000; // 4 seconds interval

// Function to update the carousel position
function updateCarousel() {
    const offset = -currentIndex * (images[0].offsetWidth + 13); // Adjust with gap
    carousel.style.transform = `translateX(${offset}px)`;
}

// Function to go to the next image
function nextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateCarousel();
}

// Function to go to the previous image
function prevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateCarousel();
}

// Set interval for automatic carousel
setInterval(nextImage, interval);

// Event listeners for navigation buttons
document.getElementById('custom-left-btn').addEventListener('click', prevImage);
document.getElementById('custom-right-btn').addEventListener('click', nextImage);

// Initial update
updateCarousel();
