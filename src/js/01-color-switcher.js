const body = document.body;
const startBtn = document.querySelector('[data-start');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;
const isDisabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBgColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function onStartBtnClick() {
  timerId = setInterval(changeBgColor, 1000);
  startBtn.disabled = isDisabled;
  stopBtn.disabled = !isDisabled;
}
startBtn.addEventListener('click', onStartBtnClick);

function onStopBtnClick() {
  clearInterval(timerId);
  stopBtn.disabled = isDisabled;
  startBtn.disabled = !isDisabled;
}
stopBtn.addEventListener('click', onStopBtnClick);
