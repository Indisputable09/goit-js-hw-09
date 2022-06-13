import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import BSN from "bootstrap.native";
const modalBSN = new BSN.Modal('#staticBackdrop');
// console.log( modalBSN)

const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minEl = document.querySelector('[data-minutes]');
const secEl = document.querySelector('[data-seconds]');

document.body.style.marginLeft = 20 + 'px';
startBtn.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
        wrongDate();
    } else {
    enableStartBtn();
    let isActive = false;
    
    startBtn.addEventListener('click', () => {
    if(isActive) {
        return;
    }
    const intervalId = setInterval(() => {
    isActive = true;
    console.log("~ isActive", isActive)
    const timeLeft = selectedDates[0] - new Date();
    console.log("~ timeLeft", timeLeft);
    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minEl.textContent = minutes;
    secEl.textContent = seconds;
    
    if (timeLeft < 1000) {
    clearInterval(intervalId);
    wrongDate();
    }
    }, 1000);
})
    }
  },
};

flatpickr('#datetime-picker', options );
function enableStartBtn() {
    startBtn.disabled = false;
}

function wrongDate() {
    startBtn.disabled = true;
    modalBSN.show();
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
/*
Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future".
Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому.
Натисканням на кнопку «Start» починається відлік часу до обраної дати з моменту натискання. */