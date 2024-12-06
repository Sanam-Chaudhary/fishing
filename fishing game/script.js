// Initialize variables
let score = 0;
const fishTypes = ['Front','Trout', 'Salmon', 'Bass', 'Catfish', 'Tuna','End'];
const fishLog = [];
let currentPage = 0; // Track the current page in the fish book
const totalPages = fishTypes.length; // Total number of fish pages

// Function to simulate fishing
function startFishing() {
    // Disable the button to prevent multiple clicks
    const catchButton = document.getElementById('catch-fish');
    catchButton.disabled = true;
    catchButton.innerText = "Casting...";

    // Get the video element
    const fishingVideo = document.getElementById('fishing-video');
        // Hide all elements except the video
        document.getElementById('catch-fish').style.display = 'none';
        document.getElementById('score-display').style.display = 'none';
        document.getElementById('caught-fish-log').style.display = 'none';
        document.getElementById('fish-book').style.display = 'none';
    

    // Show the fishing video
    fishingVideo.style.display = 'block'; // Show the video
    fishingVideo.currentTime = 0; // Reset video to start
    fishingVideo.play(); // Play the video

    // Set a timeout to simulate catching a fish after the video ends
    fishingVideo.onended = () => {
            // Show all hidden elements
document.getElementById('catch-fish').style.display = 'block'; // or 'inline' depending on your layout
document.getElementById('score-display').style.display = 'block'; // or 'inline'
document.getElementById('caught-fish-log').style.display = 'block'; // or 'inline'
document.getElementById('fish-book').style.display = 'block'; // or 'inline'
        catchFish();
        catchButton.disabled = false; // Re-enable the button
        catchButton.innerText = "Cast Line"; // Reset button text
        fishingVideo.style.display = 'none'; // Hide the video after fishing
    };
}

// Function to catch a fish
function catchFish() {
    // Randomly select a fish type
    const fishCaught = fishTypes[Math.floor(Math.random() * fishTypes.length)];
    fishLog.push(fishCaught); // Add the caught fish to the log
    score += 10; // Increment score
    updateScoreDisplay();
    updateFishLog();
    updateFishBook(fishCaught);
}

// Function to update the score display
function updateScoreDisplay() {
    document.getElementById('score').innerText = score;
}

// Function to update the caught fish log
function updateFishLog() {
    const fishLogElement = document.getElementById('fish-log');
    const newFishItem = document.createElement('li');
    newFishItem.innerText = fishLog[fishLog.length - 1]; // Get the last caught fish
    fishLogElement.appendChild(newFishItem);
}

// Function to update the fish book
function updateFishBook(fishCaught) {
    const fishImages = document.querySelectorAll('.page');
    fishImages.forEach((page, index) => {
        const fishName = page.querySelector('img').getAttribute('data-fish');
        if (fishName === fishCaught) {
            page.querySelector('img').classList.remove('blurry'); // Remove blur effect
            currentPage = index; // Update current page
            showPage(currentPage); // Show the current page
        }
    });
}

// Function to show the current page
function showPage(pageIndex) {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        page.style.display = (index === pageIndex) ? 'flex' : 'none'; // Show the current page
    });
}

// Function to navigate to the previous page
function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
    }
}

// Function to navigate to the next page
function nextPage() {
    if (currentPage < totalPages - 1) {
        currentPage++;
        showPage(currentPage);
    }
}

// Event listeners for buttons
document.getElementById('catch-fish').addEventListener('click', startFishing);
document.getElementById('prev-page').addEventListener('click', prevPage);
document.getElementById('next-page').addEventListener('click', nextPage);