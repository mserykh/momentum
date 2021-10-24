import playList from "./playList.js";

const playListContainer = document.querySelector('.js-player-list');
const playBtn = document.querySelector('.js-player-btn-play');
const playPrevBtn = document.querySelector('.js-player-btn-back');
const playNextBtn = document.querySelector('.js-player-btn-forward');
const audioProgress = document.querySelector('.js-player-audio-progress');
const volumeProgress = document.querySelector('.js-player-volume-progress');
const playVolumeBtn = document.querySelector('.js-player-btn-volume');
const songTitle = document.querySelector('.js-player-song-title');
const songDuration = document.querySelector('.js-player-duration');
const songTimer = document.querySelector('.js-player-timer');

playList.forEach(playerItem => {
  const playListItem = document.createElement('li');
  playListItem.classList.add('player__item');
  playListItem.classList.add('js-player-item');
  playListItem.textContent = playerItem.title;
  playListContainer.append(playListItem);
});

const playListItems = document.querySelectorAll('.js-player-item');

let audio = new Audio();
let isPlaying = false;
let playNum = 0;
let currentTime = 0;
let isMousedown = false;
let isVolumeOn = true;
let lastVolumeValue = 50;

function initPlayer(index) {
  audio.src = playList[index].src;
  songDuration.textContent = playList[index].duration;
  showSongTitle();
  showActivePlayerListItem();
  volumeProgress.value = lastVolumeValue;
  handleProgress();
  handleProgressVolume(lastVolumeValue);
}

function playAudio() {
  audio.src = playList[playNum].src;
  audio.play();
  isPlaying = true;
  toggleIcon();
  showActivePlayerListItem();
  showSongTitle();
}

function showActivePlayerListItem() {
  playListItems.forEach(playListItem => playListItem.classList.remove('active'));
  playListItems[playNum].classList.add('active');
}

function pauseAudio() {
  audio.pause();
  isPlaying = false;
  toggleIcon();
}

function toggleAudio() {
  if (isPlaying) {
    pauseAudio();
  }
  else {
    playAudio();
  }
}

function toggleIcon() {
  if (!isPlaying) {
    playBtn.classList.add('icon-play');
    playBtn.classList.remove('icon-pause');
    playListItems.forEach(playListItem => playListItem.classList.remove('playing'));
  }
  else {
    playBtn.classList.add('icon-pause');
    playBtn.classList.remove('icon-play');
    playListItems.forEach(playListItem => playListItem.classList.remove('playing'));
    playListItems[playNum].classList.add('playing');
  }
}

function playPrev() {
  playNum--;
  if (playNum === 0) {
    playNum = playList.length;
  }
  playAudio();
}

function playNext() {
  playNum++;
  if (playNum === playList.length) {
    playNum = 0;
  }
  playAudio();
}

function showSongTitle() {
  songTitle.textContent = playList[playNum].title;
}

function playByClick(index) {
  if (index === playNum) {
    toggleAudio();
  }
  else {
    playNum = index;
    playAudio();
  }
}

function handleProgress() {
  const duration = audio.duration;
  currentTime = (currentTime === 'NaN') ? currentTime : audio.currentTime;
  const percent = (currentTime / duration) * 100;
  audioProgress.value = (isNaN(percent)) ? 0 : percent;
  audioProgress.style.background = `linear-gradient(to right, #0bdbac 0%, #0bdbac ${percent}%, #ffffff ${percent}%)`;
  displayReadableTime(currentTime);
  
  if (currentTime === duration) {
    audio.pause();
    isPlaying = false;
  };
}

function setProgress() {
  const duration = audio.duration;
  currentTime = duration * audioProgress.value / 100;
  audio.currentTime = currentTime;
  audioProgress.style.background = `linear-gradient(to right, #0bdbac 0%, #0bdbac ${percent}%, #ffffff ${percent}%)`;
  displayReadableTime(currentTime);
}

function displayReadableTime(currentTime) {
  const hours = Math.floor(currentTime / 3600) > 0 ? Math.floor(currentTime / 3600) : '';
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  const showHours = formatNumber(hours) + (formatNumber(hours) === '' ? '' : ':')
  songTimer.textContent = `${showHours}${formatNumber(minutes)}:${formatNumber(seconds)}`;
  songDuration.textContent = playList[playNum].duration;
}

function formatNumber(number) {
  return typeof number === 'number' && number < 10 ? `0${number}` : number;
}

function toggleVolume() {
  const prevVolumeValue = lastVolumeValue;

  if (!playVolumeBtn.classList.contains('icon-volumeMute')) {
    mute();
    handleProgressVolume(lastVolumeValue);
    lastVolumeValue = prevVolumeValue;
  }
  else {
    unmute();
    lastVolumeValue = prevVolumeValue;
    handleProgressVolume(lastVolumeValue);
  }
}

function mute() {
  playVolumeBtn.classList.add('icon-volumeMute');
  audio.muted = true;
  lastVolumeValue = 0;
}

function unmute() {
  playVolumeBtn.classList.remove('icon-volumeMute');
  audio.muted = false;
}

function handleProgressVolume(volumeValue) {
  lastVolumeValue = +volumeValue;
  volumeProgress.value = lastVolumeValue;
  audio.volume = lastVolumeValue / 100;
  const volumeMax = 100;
  const percent = (lastVolumeValue / volumeMax) * 100;
  volumeProgress.style.background = `linear-gradient(to right, #0bdbac 0%, #0bdbac ${percent}%, #ffffff ${percent}%)`;
  if (lastVolumeValue === 0) {
    mute();
  } else {
    unmute();
  }
}

initPlayer(0);

playBtn.addEventListener('click', toggleAudio);
playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);
playListItems.forEach((playListItem, index) => playListItem.addEventListener('click', () => playByClick(index)));
audio.addEventListener ('ended', playNext);
audio.addEventListener('timeupdate', handleProgress);

audioProgress.addEventListener('click', setProgress);

playVolumeBtn.addEventListener('click', toggleVolume);
volumeProgress.addEventListener('input', () => {
  handleProgressVolume(volumeProgress.value);
});
