import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      window.alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

startButton.addEventListener('click', startCountdown);

function startCountdown() {
  const selectedDate = flatpickr.parseDate(datetimePicker.value);
  const currentDate = new Date();
  const timeDifference = selectedDate.getTime() - currentDate.getTime();

  if (timeDifference <= 0) {
    return;
  }

  clearInterval(countdownInterval);
  countdownInterval = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const remainingTime = selectedDate.getTime() - new Date().getTime();
    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      resetCountdown();
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
  }
}

function resetCountdown() {
  daysValue.textContent = '00';
  hoursValue.textContent = '00';
  minutesValue.textContent = '00';
  secondsValue.textContent = '00';
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const timerElement = document.querySelector('.timer');
timerElement.style.display = 'flex';
timerElement.style.justifyContent = 'center';
timerElement.style.alignItems = 'center';
timerElement.style.marginTop = '20px';

const fields = Array.from(document.querySelectorAll('.field'));
fields.forEach(field => {
  field.style.textAlign = 'center';
  field.style.margin = '0 10px';
});

const values = Array.from(document.querySelectorAll('.value'));
values.forEach(value => {
  value.style.fontSize = '24px';
  value.style.fontWeight = 'bold';
});

const labels = Array.from(document.querySelectorAll('.label'));
labels.forEach(label => {
  label.style.fontSize = '12px';
  label.style.textTransform = 'uppercase';
});
