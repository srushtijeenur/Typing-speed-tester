const displayText = document.getElementById("text-display");
const inputArea = document.getElementById("input-area");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");

const texts = [
  "JavaScript is a versatile language used for web development.",
  "Typing fast improves your productivity.",
  "Practice daily to improve your typing speed and accuracy.",
  "Frontend development includes HTML, CSS, and JavaScript."
];

let startTime;
let timerInterval;
let currentText = "";

function startTest() {
  currentText = texts[Math.floor(Math.random() * texts.length)];
  displayText.innerText = currentText;
  inputArea.value = "";
  inputArea.disabled = false;
  inputArea.focus();

  startTime = new Date().getTime();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTime, 1000);
}

function updateTime() {
  const currentTime = new Date().getTime();
  const timeTaken = Math.floor((currentTime - startTime) / 1000);
  timeDisplay.innerText = `Time: ${timeTaken}s`;

  const wordsTyped = inputArea.value.trim().split(/\s+/).length;
  const wpm = Math.round((wordsTyped / timeTaken) * 60);
  wpmDisplay.innerText = `WPM: ${isNaN(wpm) ? 0 : wpm}`;

  // Auto-stop if user types the sentence correctly
  if (inputArea.value.trim() === currentText) {
    clearInterval(timerInterval);
    inputArea.disabled = true;
    alert(`✅ Test Completed!\n⏱ Time Taken: ${timeTaken}s\n🚀 Speed: ${wpm} WPM`);
  }
}

function stopTest() {
  clearInterval(timerInterval);
  inputArea.disabled = true;

  const currentTime = new Date().getTime();
  const timeTaken = Math.floor((currentTime - startTime) / 1000);
  const wordsTyped = inputArea.value.trim().split(/\s+/).length;
  const wpm = Math.round((wordsTyped / timeTaken) * 60);

  alert(`🛑 Test Stopped!\n⏱ Time Taken: ${timeTaken}s\n🚀 Speed: ${isNaN(wpm) ? 0 : wpm} WPM`);
}

function resetTest() {
  clearInterval(timerInterval);
  timeDisplay.innerText = "Time: 0s";
  wpmDisplay.innerText = "WPM: 0";
  inputArea.disabled = true;
  inputArea.value = "";
  displayText.innerText = 'Click "Start Test" to begin.';
}
