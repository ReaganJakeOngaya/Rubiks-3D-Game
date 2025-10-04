// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light
const savedTheme = localStorage.getItem('rubiksTheme') || 'light';
if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  
  if (document.body.classList.contains('dark-theme')) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('rubiksTheme', 'dark');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('rubiksTheme', 'light');
  }
});

// Game state
let moveCount = 0;
let gameStarted = false;
let timerInterval;
let startTime;

// Initialize timer
function initializeTimer() {
  const timerElement = document.getElementById('timer');
  timerElement.textContent = '0.00s';
}

// Start timer
function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsedTime = (Date.now() - startTime) / 1000;
    document.getElementById('timer').textContent = `${elapsedTime.toFixed(2)}s`;
  }, 10);
}

// Stop timer
function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// Reset game
function resetGame() {
  stopTimer();
  moveCount = 0;
  gameStarted = false;
  document.getElementById('moveCount').textContent = '0';
  document.getElementById('timer').textContent = '0.00s';
  document.getElementById('winMessage').classList.remove('show');
}

// Update best time
function updateBestTime(time) {
  const bestTimeElement = document.getElementById('bestTime');
  const currentBest = localStorage.getItem('rubiksBestTime');
  
  if (!currentBest || parseFloat(time) < parseFloat(currentBest)) {
    localStorage.setItem('rubiksBestTime', time);
    bestTimeElement.textContent = `${time}s`;
  }
}

// Update games won
function updateGamesWon() {
  const gamesWonElement = document.getElementById('gamesWon');
  let gamesWon = parseInt(localStorage.getItem('rubiksGamesWon') || '0');
  gamesWon++;
  localStorage.setItem('rubiksGamesWon', gamesWon.toString());
  gamesWonElement.textContent = gamesWon;
}

// Show win message
function showWinMessage() {
  const winMessage = document.getElementById('winMessage');
  const winStats = document.getElementById('winStats');
  const time = document.getElementById('timer').textContent;
  
  winStats.textContent = `Completed in ${time} with ${moveCount} moves!`;
  winMessage.classList.add('show');
  
  updateBestTime(parseFloat(time).toFixed(2));
  updateGamesWon();
  
  stopTimer();
}

// Initialize statistics
function initializeStats() {
  const bestTime = localStorage.getItem('rubiksBestTime');
  const gamesWon = localStorage.getItem('rubiksGamesWon');
  
  if (bestTime) {
    document.getElementById('bestTime').textContent = `${bestTime}s`;
  }
  
  if (gamesWon) {
    document.getElementById('gamesWon').textContent = gamesWon;
  }
}

// Simulate cube rotation (placeholder for actual Three.js implementation)
function simulateFaceRotation(face) {
  if (!gameStarted) {
    gameStarted = true;
    startTimer();
  }
  
  moveCount++;
  document.getElementById('moveCount').textContent = moveCount;
  document.getElementById('moveCount').classList.add('move-animation');
  setTimeout(() => {
    document.getElementById('moveCount').classList.remove('move-animation');
  }, 300);
  
  // Simulate random win condition for demo
  if (moveCount > 5 && Math.random() > 0.8) {
    setTimeout(showWinMessage, 500);
  }
}

// Event listeners for face buttons
document.getElementById('btnU').addEventListener('click', () => simulateFaceRotation('U'));
document.getElementById('btnD').addEventListener('click', () => simulateFaceRotation('D'));
document.getElementById('btnL').addEventListener('click', () => simulateFaceRotation('L'));
document.getElementById('btnR').addEventListener('click', () => simulateFaceRotation('R'));
document.getElementById('btnF').addEventListener('click', () => simulateFaceRotation('F'));
document.getElementById('btnB').addEventListener('click', () => simulateFaceRotation('B'));

// Game control buttons
document.getElementById('btnScramble').addEventListener('click', () => {
  resetGame();
  gameStarted = true;
  startTimer();
  // Simulate scramble animation
  document.getElementById('ui').classList.add('loading');
  setTimeout(() => {
    document.getElementById('ui').classList.remove('loading');
    moveCount = 0;
    document.getElementById('moveCount').textContent = '0';
  }, 1500);
});

document.getElementById('btnSolve').addEventListener('click', () => {
  showWinMessage();
});

document.getElementById('btnReset').addEventListener('click', resetGame);

// Instructions toggle
document.getElementById('toggleInstructions').addEventListener('click', () => {
  const instructions = document.getElementById('instructions');
  const button = document.getElementById('toggleInstructions');
  
  if (instructions.classList.contains('hidden')) {
    instructions.classList.remove('hidden');
    button.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Instructions';
  } else {
    instructions.classList.add('hidden');
    button.innerHTML = '<i class="fas fa-eye"></i> Show Instructions';
  }
});

// Keyboard controls
document.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    event.preventDefault();
    if (timerInterval) {
      stopTimer();
    } else if (gameStarted) {
      startTimer();
    }
  } else if (event.key === 's' || event.key === 'S') {
    document.getElementById('btnScramble').click();
  } else if (event.key === 'Enter') {
    document.getElementById('btnSolve').click();
  } else if (['u', 'U', 'd', 'D', 'l', 'L', 'r', 'R', 'f', 'F', 'b', 'B'].includes(event.key)) {
    const face = event.key.toUpperCase();
    simulateFaceRotation(face);
  }
});

// Initialize the game
initializeTimer();
initializeStats();

// Three.js placeholder - in a real implementation, this would be the full 3D cube code
console.log('Rubik\'s Cube 3D initialized. Three.js implementation would go here.');

// Prevent context menu on right-click
document.addEventListener('contextmenu', (e) => e.preventDefault());