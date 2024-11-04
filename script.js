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