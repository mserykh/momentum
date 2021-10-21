const timeDisplay = document.querySelector('.js-time');
const dateDisplay = document.querySelector('.js-date');
const date = new Date();

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  timeDisplay.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate();
}

function showDate() {
  const options = { weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString('en-Us', options);
  dateDisplay.textContent = currentDate;
}

showTime();
