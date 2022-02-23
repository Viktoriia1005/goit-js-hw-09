import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let specifiedDate = Date.now();

const isDisabled = true;

function onCloseCalendar(date) {
  if (Date.now() > date) {
    Notify.failure('Please choose a date in the future');
  } else {
    refs.startBtn.disabled = !isDisabled;
    specifiedDate = date;
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onCloseCalendar(selectedDates[0]);
  },
};

const fp = flatpickr(refs.input, options);

refs.startBtn.disabled = isDisabled;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function pad(value) {
  return String(value).padStart(2, '0');
}
function getTimeComponents({ days, hours, minutes, seconds }) {
  refs.days.textContent = pad(days);
  refs.hours.textContent = pad(hours);
  refs.minutes.textContent = pad(minutes);
  refs.seconds.textContent = pad(seconds);
}

function calculationInterval() {
  setInterval(() => {
    const oddsTime = convertMs(specifiedDate - Date.now());
    getTimeComponents(oddsTime);
  }, 1000);
}

function onStartBtnClick() {
  refs.startBtn.disabled = isDisabled;
  fp.destroy();
  refs.input.disabled = isDisabled;
  calculationInterval();
}
refs.startBtn.addEventListener('click', onStartBtnClick);
