import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}

function callPromise({ amount, step, delay }) {
  let calculateDelay = delay;
  for (let index = 1; index <= amount; index += 1) {
    createPromise(index, calculateDelay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    calculateDelay += step;
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  const data = {
    amount: parseInt(refs.amount.value),
    step: parseInt(refs.step.value),
    delay: parseInt(refs.delay.value),
  };
  callPromise(data);
}

refs.form.addEventListener('submit', onFormSubmit);
