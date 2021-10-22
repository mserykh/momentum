const timeDisplay = document.querySelector('.js-time');
const dateDisplay = document.querySelector('.js-date');
const nameDisplay = document.querySelector('.js-name-display');
const nameInput = document.querySelector('.js-name-input');
const greetingMessage = document.querySelector('.js-greeting-message');
const sliderBtnBack = document.querySelector('.js-slider-btn-back');
const sliderBtnForward = document.querySelector('.js-slider-btn-forward');

const background = document.querySelector('.js-background');

const date = new Date();
const hours = date.getHours();
const timeOfDayList = ['night', 'morning', 'afternoon', 'evening'];
const timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay},`;

let randomNum;

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

function setLocalStorage() {
  localStorage.setItem('name', nameDisplay.textContent);
  localStorage.setItem('city', weatherCity.value);
}

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    nameDisplay.textContent = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    weatherCity.value = localStorage.getItem('city');
  }
}

function getRandomNum() {
  const max = 20;
  randomNum = Math.floor(Math.random() * max + 1);
}

function setBg() {
  const bgNum = randomNum.toString().padStart(2, "0");
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.addEventListener('load', () => {
    background.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
  });
}

function getSlideNext() {
  randomNum++;
  if (randomNum === 21) {
    randomNum = 1;
  }
  
  setBg();
}

function getSlidePrev() {
  randomNum--;
  if (randomNum === 0) {
    randomNum = 20;
  }
  
  setBg();
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

nameDisplay.addEventListener('click', changeName);
nameInput.addEventListener('blur', displayName);

sliderBtnBack.addEventListener('click', getSlidePrev);
sliderBtnForward.addEventListener('click', getSlideNext);

showTime();
displayName();
showGreeting();
getRandomNum();
setBg();
