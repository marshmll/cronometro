const counter = document.querySelector(".stopwatch__counter")
const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const resetButton = document.querySelector(".reset");
let hours = 0;
let minutes = 0;
let seconds = 0;
let tens = 0;
let counterIsRunning = false;
let interval;
let hasTwoDigitsRegex = /^\d\d$/i;

function updateCounterValue() {
  let minutesCorrected = minutes;
  let secondsCorrected = seconds;
  let tensCorrected = tens;
  let hoursCorrected = hours;
  if (!hasTwoDigitsRegex.test(minutes)) {
    minutesCorrected = `0${minutes}`;
  }
  if (!hasTwoDigitsRegex.test(seconds)) {
    secondsCorrected = `0${seconds}`;
  }
  if (!hasTwoDigitsRegex.test(tens)) {
    tensCorrected = `0${tens}`;
  }
  if (!hasTwoDigitsRegex.test(hours)) {
    hoursCorrected = `0${hours}`;
  }
  counter.innerHTML = `${hoursCorrected}:${minutesCorrected}:${secondsCorrected}:${tensCorrected}`;
}

startButton.addEventListener("click", () => {
  if (counterIsRunning) return;
  counterIsRunning = true;
  interval = setInterval(() => {
    tens += 1;
    if (tens == 100) {
      tens = 0;
      seconds++
    }

    if (seconds == 60) {
      seconds = 0;
      minutes++
    }

    if (minutes == 60) {
      minutes = 0;
      hours++;
    }
    
    updateCounterValue();
  }, 10);
});

stopButton.addEventListener("click", () => {
  counterIsRunning = false;
  clearInterval(interval);
});

resetButton.addEventListener("click", () => {
  counterIsRunning = false;
  clearInterval(interval);
  minutes = 0;
  seconds = 0;
  tens = 0;
  updateCounterValue();
});