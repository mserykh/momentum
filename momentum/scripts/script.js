
const timeDisplay = document.querySelector('.js-time');
const dateDisplay = document.querySelector('.js-date');
const nameDisplay = document.querySelector('.js-name-display');
const nameInput = document.querySelector('.js-name-input');
const greetingMessage = document.querySelector('.js-greeting-message');
const sliderBtnBack = document.querySelector('.js-slider-btn-back');
const sliderBtnForward = document.querySelector('.js-slider-btn-forward');
const background = document.querySelector('.js-background');
const photoSources = document.querySelectorAll('.js-settings-photo-source');
const tagInput = document.querySelector('.js-photos-tag-input');
const tagList = document.querySelector('.js-photos-tag-list');
const notValidTagInput = document.querySelector('.js-photos-tag-error');
const tagsWrapper = document.querySelector('.js-photos-tags-wrapper');

function createTag() {
  const tagTemplate = document.createElement('span');
  tagTemplate.classList.add('settings-photos__tag');
  tagTemplate.classList.add('js-photos-tag');
  tagTemplate.innerHTML = `
    ${tagInput.value}
    <span class="icono-cross js-btn-delete-tag"></span>
  `;
  tagList.appendChild(tagTemplate);
}

function onlyAlphabets() {
  const regex = /^[a-zA-Z-]{0,20}$/g;
  if (regex.test(tagInput.value)) {
    return true;
  } else {
      return false;
  }
}

function validateTagInput(event) {
  if ((event.which === 13) && (tagInput.value !== '')) {
    if (onlyAlphabets()) {
      notValidTagInput.textContent = '';
      tagInput.classList.remove('error');
      createTag();
      tagInput.value = '';
    }
    else {
      tagInput.value = '';
      tagInput.classList.add('error');
      notValidTagInput.textContent = 'Please enter only latin letters';
    }
  }
}

const date = new Date();
const hours = date.getHours();
const timeOfDayList = ['night', 'morning', 'afternoon', 'evening'];
const timeOfDay = getTimeOfDay();

let greetingText = `Good ${timeOfDay},`;
let state = {
  langauge: 'en',
  photoSource: 'github',
  tags: [timeOfDay],
  blocks: ['time', 'date', 'greeting', 'quote', 'weather', 'audio', 'todolist'],
};

let photoSourceValue;
let randomNum;

let imageURL;

function initMomentum() {
  showTime();
  displayName();
  showGreeting();
  getRandomNum();
  loadSettings();
  showPhotoSource();
  getImageURL();
  setBg();
}

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  timeDisplay.textContent = currentTime;
  showDate();
  getTimeOfDay();
  showGreeting();
  setTimeout(showTime, 1000);
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
  //localStorage.setItem('city', weatherCity.value);
  localStorage.setItem('state', JSON.stringify(state));
}

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    nameDisplay.textContent = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    weatherCity.value = localStorage.getItem('city');
  }

  if (localStorage.getItem('sstate')) {
    loadSettings();
  }
}

function getRandomNum() {
  const max = 20;
  randomNum = Math.floor(Math.random() * max + 1);
}

function setBg() {
  const img = new Image();
  img.src = imageURL;
  img.addEventListener('load', () => {
    background.style.backgroundImage = `url('${imageURL}')`;
  });
}


function getSlideNext() {
  randomNum++;
  if (randomNum === 21) {
    randomNum = 1;
  }
  getImageURL();
  setBg();
}

function getSlidePrev() {
  randomNum--;
  if (randomNum === 0) {
    randomNum = 20;
  }

  getImageURL();
  setBg();
}

function toggleTags() {
  if (photoSourceValue === 'github') {
    tagsWrapper.classList.remove('active');
  } else {
    tagsWrapper.classList.add('active')
  }
}

function updatePhotoSource(event) {
  photoSourceValue = event.target.value;
  state.photoSource = photoSourceValue;
  toggleTags();
  getImageURL();
  setBg();
}

function showPhotoSource() {
  photoSources.forEach(radio => {
    if (radio.value === state.photoSource) {
      radio.checked = true;
      photoSourceValue = state.photoSource;
    }
  });
}

function getImageURL() {
  if (state.photoSource === 'github') {
    imageURL = getGithubImageURL();
  }
  else if (state.photoSource === 'unsplash') {
    imageURL = getUnsplashImageURL().then(data => data);
  }
  else if (state.photoSource === 'flickr') {
    imageURL = getFlickrImageURL().then(data => data);
  }
}

function toggleTagsList() {

}

function getBgTags() {
  if (state.photoSource === 'github') {
    state.tag = timeOfDay;
  }
  else if (state.photoSource === 'unsplash') {
    state.tag = timeOfDay;
  }
  else if (state.photoSource === 'flickr') {
    state.tag = timeOfDay;
  }
}

function getGithubImageURL() {
  const bgNum = randomNum.toString().padStart(2, "0");
  const url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  return url;
}

async function getUnsplashImageURL() {
  const id = 'Vz1-I5AoZiCDjHGp7-V_okdCYHTZ9iBS7DUi6xouBA4';
  const url = `https://api.unsplash.com/photos/random?lang=en&orientation=landscape&query=${timeOfDay}&client_id=${id}`;
  const res = await fetch(url);
  const data = await res.json();
  imageURL = data.urls.regular;
  setBg();
 }

async function getFlickrImageURL() {
  const id = 'a41d8c521faf913ff1db9fcdc7eb372c';
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${id}&tags=${timeOfDay}&extras=url_h&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  const photos = data.photos.photo;
  const index = Math.round(Math.random(0, 1) * photos.length);
  imageURL = data.photos.photo[index].url_h;
  setBg();
 }

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

nameDisplay.addEventListener('click', changeName);
nameInput.addEventListener('blur', displayName);

sliderBtnBack.addEventListener('click', getSlidePrev);
sliderBtnForward.addEventListener('click', getSlideNext);

photoSources.forEach(radio => radio.addEventListener('change', updatePhotoSource));
tagInput.addEventListener('keypress', validateTagInput);

initMomentum();

/* Settings */
const settings = document.querySelector('.js-settings');
const settingsToggle = document.querySelector('.js-settings-toggle');

function toggleSettings() {
  if (!settings.classList.contains('active')) {
    settings.classList.add('active');
    settingsToggle.classList.add('active');
  }
  else {
    settings.classList.remove('active');
    settingsToggle.classList.remove('active');
  }
}

function loadSettings() {
  const stateStoraged = localStorage.getItem('state');
  if (stateStoraged) {
    state = JSON.parse(stateStoraged);
  } else {
    console.log('localStorage is empty');
    return;
  }
}

settingsToggle.addEventListener('click', toggleSettings);
