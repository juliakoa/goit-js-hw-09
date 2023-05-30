const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;
let intervalId = null;

startButton.addEventListener('click', startChangingColor);
stopButton.addEventListener('click', stopChangingColor);

function startChangingColor() {
  startButton.disabled = true;
  intervalId = setInterval(changeBackgroundColor, 1000);
}

function stopChangingColor() {
  startButton.disabled = false;
  clearInterval(intervalId);
}

function changeBackgroundColor() {
  const randomColor = getRandomHexColor();
  body.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
