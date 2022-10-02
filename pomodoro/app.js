const timerMinutes = document.querySelector(".timer__minutes");
const timerSeconds = document.querySelector(".timer__seconds");
const timerMilliseconds = document.querySelector(".timer__milliseconds");
const startBtn = document.querySelector(".stopwatch__start");
const stopBtn = document.querySelector(".stopwatch__stop");
const resetBtn = document.querySelector(".stopwatch__reset");

let cancelId;
let startTime;
let savedTime = 0;

const countdown = parseInt(timerMinutes.innerHTML) * 60 * 1000;

function startTimer() {
  startTime = Date.now();
  cancelId = requestAnimationFrame(updateTimer);
  startBtn.disabled = true;
  stopBtn.disabled = false;
  resetBtn.disabled = false;
}

function stopTimer() {
  savedTime += Date.now() - startTime;
  cancelAnimationFrame(cancelId);

  stopBtn.disabled = true;
  startBtn.disabled = false;
  resetBtn.disabled = false;
}

function resetTimer() {
  startTime = Date.now();
  savedTime = 0;

  timerMilliseconds.innerHTML = "000";
  timerSeconds.innerHTML = "00";
  timerMinutes.innerHTML = "25";

  cancelAnimationFrame(cancelId);

  resetBtn.disabled = true;
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function updateTimer() {
  let millisecondsElapsed = Date.now() - startTime + savedTime;

  let millisecondsLeft = countdown - millisecondsElapsed;
  if (millisecondsLeft < 0) {
    millisecondsLeft = 0;
    cancelAnimationFrame(cancelId);
    cancelId = null;
  }
  let secondsLeft = millisecondsLeft / 1000;
  let minutesLeft = secondsLeft / 60;

  let millisecondsText = millisecondsLeft % 1000;
  let secondsText = Math.floor(secondsLeft) % 60;
  let minutesText = Math.floor(minutesLeft);

  if (minutesText.toString().length < 2) {
    minutesText = minutesText.toString().padStart(2, "0");
  }
  if (secondsText.toString().length < 2) {
    secondsText = secondsText.toString().padStart(2, "0");
  }
  if (millisecondsText.toString().length < 3) {
    millisecondsText = millisecondsText.toString().padStart(3, "0");
  }

  timerMilliseconds.innerHTML = millisecondsText;
  timerSeconds.innerHTML = secondsText;
  timerMinutes.innerHTML = minutesText;

  if (cancelId) {
    cancelId = requestAnimationFrame(updateTimer);
  }
}
