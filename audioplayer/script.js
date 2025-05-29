const tracks = [
  { title: 'Chains', src: './audio/Chains.mp3' },
  { title: 'Connection', src: './audio/Connection.mp3' },
  { title: 'Lazy Funk', src: './audio/Lazy Funk.mp3' }
];

const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const seek = document.getElementById('seek');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const tracklistEl = document.getElementById('tracklist');

let currentTrackIndex = 0;

// Отображение треков
tracks.forEach((track, index) => {
  const li = document.createElement('li');
  li.textContent = track.title;
  li.addEventListener('click', () => {
    loadTrack(index);
    audio.play();
  });
  tracklistEl.appendChild(li);
});

function loadTrack(index) {
  currentTrackIndex = index;
  audio.src = tracks[index].src;
  updateTracklistUI();
}

function updateTracklistUI() {
  [...tracklistEl.children].forEach((li, idx) => {
    li.classList.toggle('active', idx === currentTrackIndex);
  });
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

audio.addEventListener('loadedmetadata', () => {
  seek.max = Math.floor(audio.duration);
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  seek.value = Math.floor(audio.currentTime);
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

seek.addEventListener('input', () => {
  audio.currentTime = seek.value;
});

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playPauseBtn.textContent = '▶️';
  }
});

audio.addEventListener('ended', () => {
  const next = (currentTrackIndex + 1) % tracks.length;
  loadTrack(next);
  audio.play();
});

// Загрузка первого трека по умолчанию
loadTrack(0);
