const timerMilliseconds = document.querySelector(".timer__milliseconds");
const timerSeconds = document.querySelector(".timer__seconds");
const timerMinutes = document.querySelector(".timer__minutes");

let cancelId;
let startTime;
let savedTime = 0;

function startTimer() {
  startTime = Date.now();
  cancelId = requestAnimationFrame(updateTimer);
}

function stopTimer() {
  savedTime = savedTime + Date.now() - startTime;
  cancelAnimationFrame(cancelId);
}

function resetTimer() {
  savedTime = 0;
  startTime = Date.now();
  timerMilliseconds.innerHTML = "000";
  timerSeconds.innerHTML = "00";
  timerMinutes.innerHTML = "00";

  cancelAnimationFrame(cancelId);
}

function updateTimer() {
  let millisecondsElapsed = savedTime + (Date.now() - startTime);
  let secondsElapsed = millisecondsElapsed / 1000;
  let minutesElapsed = secondsElapsed / 60;

  let minutesText = Math.floor(minutesElapsed % 10);
  let secondsText = Math.floor(secondsElapsed % 10);
  let millisecondsText = millisecondsElapsed % 1000;

  if (minutesText.toString().length === 1) {
    minutesText = "0" + minutesText;
  }
  if (secondsText.toString().length === 1) {
    secondsText = "0" + secondsText;
  }
  if (millisecondsText.toString().length < 3) {
    millisecondsText.toString().padStart(3, "0");
  }

  timerMilliseconds.innerHTML = millisecondsText;
  timerSeconds.innerHTML = secondsText;
  timerMinutes.innerHTML = minutesText;

  cancelId = requestAnimationFrame(updateTimer);
}
