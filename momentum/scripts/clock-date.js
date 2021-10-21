const time = document.querySelector('.js-time');
const date = document.querySelector('.js-date');

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate();
}

function showDate() {
  const DATE = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = DATE.toLocaleDateString('en-Us', options);
  date.textContent = currentDate;
}

showTime();
