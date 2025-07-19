const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

const songs = ['song1', 'song2', 'song3'];
let songIndex = 0;

function loadSong(song) {
  title.innerText = song;
  audio.src = `songs/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  playBtn.textContent = '⏸';
  audio.play();
  cover.parentElement.style.animationPlayState = 'running';
}

function pauseSong() {
  playBtn.textContent = '▶️';
  audio.pause();
  cover.parentElement.style.animationPlayState = 'paused';
}

function togglePlay() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

// Event listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);

// Init
loadSong(songs[songIndex]);
pauseSong();
