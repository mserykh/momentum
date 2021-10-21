const timeDisplay = document.querySelector('.js-time');
const dateDisplay = document.querySelector('.js-date');
const date = new Date();
const nameDisplay = document.querySelector('.js-name-display');
const nameInput = document.querySelector('.js-name-input');
const greetingMessage = document.querySelector('.js-greeting-message');
const hours = date.getHours();
const timeOfDayList = ['night', 'morning', 'afternoon', 'evening'];
const timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay},`;

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  timeDisplay.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate();
  showGreeting();
}

function showDate() {
  const options = { weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString('en-Us', options);
  dateDisplay.textContent = currentDate;
}

function displayName() {
  nameDisplay.classList.add('active');
  nameInput.classList.remove('active');
  nameDisplay.textContent = nameInput.value;
}

function changeName() {
  nameDisplay.classList.remove('active');
  nameInput.classList.add('active');
}

function getTimeOfDay() {
  const index = Math.floor(hours / 6);
  return timeOfDayList[index];
}

function showGreeting() {
  greetingMessage.textContent = greetingText;
}

nameDisplay.addEventListener('click', changeName);
nameInput.addEventListener('blur', displayName);

showTime();
displayName();
showGreeting();
