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
    
    editMode = false;
    const teleprompterText = document.getElementById('teleprompter-text');
    teleprompterText.contentEditable = false;
    teleprompterText.classList.remove('edit-mode-bg');
    
    const teleprompterWindow = document.getElementById('teleprompter-window');
    const totalHeight = teleprompterText.offsetHeight;
    const windowHeight = teleprompterWindow.offsetHeight;

    let currentPosition = teleprompterWindow.scrollTop;
    const startPosition = windowHeight;
    const endPosition = totalHeight;

    function scrollTeleprompter() {
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
    const checkbox = document.getElementById('case-toggle').firstElementChild;
    const teleprompterText = document.getElementById('teleprompter-text');
    const currentText = teleprompterText.textContent;
    if (checkbox.checked) {
      teleprompterText.textContent = currentText.toUpperCase();
    } else {
      teleprompterText.textContent = currentText.toLowerCase();
    }
  }
 
  function startTimer() {
    const timerInput = document.getElementById('timer-input');
    const timerDisplay = document.getElementById('timer-display');
    let timerValue = parseInt(timerInput.value, 10) * 60; // Convert the time limit from minutes to seconds
    timerIntervalId = setInterval(() => {
        timerValue--; // Decrement the timer value by 1 second

        // Update the timer display
        let minutes = Math.floor(timerValue / 60);
        let seconds = timerValue % 60;
        if (timerValue <= 0) {
          timerDisplay.textContent = `-${Math.abs(minutes)}:${Math.abs(seconds).toString().padStart(2, '0')}`;
          timerValue = Math.abs(timerValue); // Make the timer value positive again so it keeps counting up
        } else {
          timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
        if (timerValue <= 0) {
          clearInterval(timerIntervalId);
          timerDisplay.classList.add('timer-expired'); // Add the 'timer-expired' class to the timer element
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
  document.getElementById('timer-input').value = readTime;
}

updateReadTime();  // Call the updateReadTime function on start

const settingsButton = document.getElementById('settings-button');
const settingsContainer = document.getElementById('settings-container');

settingsButton.addEventListener('click', () => {
    if (settingsContainer.style.display === 'none') {
      settingsContainer.style.display = 'block';
      settingsButton.textContent = 'Close';
    } else {
      settingsContainer.style.display = 'none';
      settingsButton.textContent = 'Settings';
    }
  });


document.getElementById('stop-button').style.display = 'none';
document.getElementById('read-bar').style.display = 'none';
document.addEventListener('DOMContentLoaded', () => {
  const editButton = document.getElementById('edit-button');
  const startButton = document.getElementById('start-button');
  const stopButton = document.getElementById('stop-button');
  const checkbox = document.getElementById('case-toggle').firstElementChild;
checkbox.addEventListener('change', toggleCase);
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
