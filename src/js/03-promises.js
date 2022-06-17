import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const delayEl = document.querySelector('[name=delay]');
const stepEl = document.querySelector('[name=step]');
const amountEl = document.querySelector('[name=amount]');
const buttonEl = document.querySelector('button');
const inputsEl = document.querySelectorAll('input');

buttonEl.disabled = true;

formEl.addEventListener('input', stateHandle);
formEl.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
      resolve({ position, delay });
    }
      reject({ position, delay })
    }, delay);
  })
}

function onFormSubmit(e) {
  const delay = Number(delayEl.value);
  const step = Number(stepEl.value);
  const amount = Number(amountEl.value);
  e.preventDefault();
  for (let i = 1; i <= amount; i++) {
    const timeOutStep = delay + i * step - step;
    createPromise(i, timeOutStep).then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    })
  }
  buttonEl.disabled = true;
  formEl.reset();
}

function stateHandle() {
  inputsEl.forEach((element) => {
    if (element.value === "") {
      buttonEl.disabled = true;
    }
    else {
      buttonEl.disabled = false;
    }
  })
}