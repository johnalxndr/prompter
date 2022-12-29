let editMode = false;
let scrollSpeed = 1000;
let isTeleprompterRunning = false;
let IntervalId;
let timerIntervalId; 


function toggleEditMode() {
    editMode = !editMode;
    const teleprompterText = document.getElementById('teleprompter-text');
    if (editMode) {
        teleprompterText.contentEditable = true;
        teleprompterText.focus();
        teleprompterText.classList.add('edit-mode-bg'); // Add the edit-mode-bg class to the teleprompter container element
    } else {
        teleprompterText.contentEditable = false;
        teleprompterText.classList.remove('edit-mode-bg');
        updateReadTime(); // Call the updateReadTime function when the user exits edit mode
    }
}

function updateScrollSpeed(event) {
    scrollSpeed = event.target.value;
}

//Run Teleprompter
function startTeleprompter() {
    if (isTeleprompterRunning) {
        return;
    }
    isTeleprompterRunning = true;
    startTimer();
    document.getElementById('stop-button').style.display = 'inline-block';
    document.getElementById('read-bar').style.display = 'block'; // Show the read bar element
    document.getElementById('start-button').style.display = 'none'; //hide start button


    const teleprompterText = document.getElementById('teleprompter-text');
    const teleprompterWindow = document.getElementById('teleprompter-window');
    const totalHeight = teleprompterText.offsetHeight;
    const windowHeight = teleprompterWindow.offsetHeight;

    let currentPosition = teleprompterWindow.scrollTop;
    const startPosition = windowHeight;
    const endPosition = totalHeight;

    function scrollTeleprompter() {
        console.log(`Current scroll speed: ${scrollSpeed}`); // Add this line to log the current scroll speed
        console.log(`Current position: ${currentPosition}`); // Add this line to log the current position
        console.log(`teleprompterWindow.scrollTop: ${teleprompterWindow.scrollTop}`);
        const increment = (scrollSpeed / 60) * (50 / 1000);
        currentPosition += increment; // Increment the current position by the desired amount based on the scroll speed
        if (currentPosition >= endPosition) {
            currentPosition = startPosition;
        }
        teleprompterWindow.scrollTop = currentPosition;
    }
    IntervalId = setInterval(scrollTeleprompter, 50); // Call the scrollTeleprompter function every 50 milliseconds and store the interval ID
}
function stopTeleprompter() {
    document.getElementById('stop-button').style.display = 'none';
    stopTimer();
    isTeleprompterRunning = false; // Set the flag to false to indicate that the teleprompter is not running
    clearInterval(IntervalId); // Clear the interval to stop the teleprompter from scrolling
    document.getElementById('read-bar').style.display = 'none'; // Hide the read bar element
    document.getElementById('start-button').style.display = 'inline-block'; // Show the start button when the teleprompter is stopped
}

function toggleCase() {
    const teleprompterText = document.getElementById('teleprompter-text');
    const currentText = teleprompterText.textContent;
    if (currentText === currentText.toUpperCase()) {
        teleprompterText.textContent = currentText.toLowerCase();
    } else {
        teleprompterText.textContent = currentText.toUpperCase();
    }
}
 
function startTimer() {
    const timerInput = document.getElementById('timer-input');
    const timerDisplay = document.getElementById('timer-display');
    let timerValue = parseInt(timerInput.value, 10) * 60; // Convert the time limit from minutes to seconds
    timerIntervalId = setInterval(() => {
        timerValue--; // Decrement the timer value by 1 second

        // Update the timer display
        const minutes = Math.floor(timerValue / 60);
        const seconds = timerValue % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timerValue === 0) {
            clearInterval(timerIntervalId); // Clear the interval when the timer reaches 0
        }
    }, 1000);
}
function stopTimer() {
    clearInterval(timerIntervalId); // Clear the interval to stop the timer
}
  

function updateReadTime() {
    const teleprompterText = document.getElementById('teleprompter-text');
    const readTimeElement = document.getElementById('read-time');
    const wordsPerMinute = 180; // Adjust this value to change the read time calculation
    const numWords = teleprompterText.textContent.split(' ').length;
    const readTime = Math.ceil(numWords / wordsPerMinute);
    readTimeElement.textContent = `Duration: ${readTime} minutes`;
}
updateReadTime();  // Call the updateReadTime function on start

const settingsButton = document.getElementById('settings-button');
const settingsContainer = document.getElementById('settings-container');

settingsButton.addEventListener('click', () => {
  settingsContainer.style.display = 'block';
});



document.getElementById('stop-button').style.display = 'none';
document.getElementById('read-bar').style.display = 'none';
document.addEventListener('DOMContentLoaded', () => {
  const editButton = document.getElementById('edit-button');
  const startButton = document.getElementById('start-button');
  const stopButton = document.getElementById('stop-button');
  const caseToggleButton = document.getElementById('case-toggle');
  caseToggleButton.addEventListener('click', toggleCase);
  const speedSlider = document.getElementById('speed-slider');
  const fontSizeSlider = document.getElementById('font-size-slider');
  editButton.addEventListener('click', toggleEditMode);
  startButton.addEventListener('click', startTeleprompter);
  stopButton.addEventListener('click', stopTeleprompter); 
  speedSlider.addEventListener('input', updateScrollSpeed);
  fontSizeSlider.addEventListener('input', (event) => {
    const fontSize = event.target.value;
    const teleprompterText = document.getElementById('teleprompter-text');
    teleprompterText.style.fontSize = `${fontSize}px`;

  });
  startButton.addEventListener('click', () => {
    // Change the text and appearance of the start button
    startButton.textContent = 'Stop';
    startButton.classList.add('stop-button-style');
  
    // Start the teleprompter
    startTeleprompter();
  });
  
  stopButton.addEventListener('click', () => {
    // Change the text and appearance of the start button back to its original state
    startButton.textContent = 'Start';
    startButton.classList.remove('stop-button-style');
  
    // Stop the teleprompter
    stopTeleprompter();
  });
});
