import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import BSN from "bootstrap.native";
const modalBSN = new BSN.Modal('#staticBackdrop');

document.body.style.marginLeft = 20 + 'px';

const startButton = document.querySelector(`[data-start]`)
const days = document.querySelector(`[data-days]`)
const hours = document.querySelector(`[data-hours]`)
const minutes = document.querySelector(`[data-minutes]`)
const seconds = document.querySelector(`[data-seconds]`)

let timeChosen = null;
let intervalID = null;

const timeObject = { days, hours, minutes, seconds }

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
         const timeNow = new Date();
        timeChosen = selectedDates[0];
        const timeLeft = timeChosen - timeNow;

          if (timeLeft < 0) {
            modalBSN.show();
              return;
        }

        startButton.disabled = false;
        return timeChosen;
  },
};

startButton.addEventListener(`click`, onStartButton)
startButton.disabled = true;

flatpickr("#datetime-picker", options);

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
    return String(value).padStart(2, '0')
}

function onStartButton(event) {
    intervalID = setInterval(startCountdown, 1000)
}

function startCountdown() {
    startButton.disabled = true;
    const timeNow = Date.now();
    const timeLeft = timeChosen - timeNow;
    const convertedTime = convertMs(timeLeft);
    for (const time in timeObject) {
        if  (Object.keys(convertedTime).includes(time)) {
        timeObject[time].textContent = convertedTime[time];
        }
    }

    if (timeLeft <= 0) {
        stopCountdown()
    }
}

function stopCountdown() {
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  clearInterval(intervalID);
  
  modalTitle.textContent = 'GREAT!';
  modalBody.textContent = "IT'S HIGHT TIME WE HAD SOME BEER:)";
  modalBSN.show();
    for (const time in timeObject) {
        timeObject[time].textContent = `00`;
    }
    startButton.disabled = true;
}