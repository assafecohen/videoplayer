//Variable
let videosData;
let currentPlaying = 0;
const video1 = document.getElementById('video1');
let isShuffle = false;

document.addEventListener('DOMContentLoaded', function (event) {
  fetch('../data/data.json')
    .then((response) => response.json())
    .then((data) => {
      videosData = data;
      video1.setAttribute('src', videosData[currentPlaying].file);
      initializePlayList();
    });
});

function initializePlayList() {
  var ul = document.getElementById('playlist');
  for (let i = 0; i < videosData.length; i++) {
    let _img = document.createElement('img');
    _img.src = videosData[i].thumbnail;
    let li = document.createElement('li');
    li.id = i;
    li.appendChild(document.createTextNode(videosData[i].title));
    li.appendChild(_img);
    ul.appendChild(li);
  }
  highlightCurrentPlaying();
}
function toggleVideo() {
  if (!video1.paused) {
    document.getElementById('play_pause').src = 'media/play.png';
    video1.pause();
  } else {
    document.getElementById('play_pause').src = 'media/pause.png';
    video1.play();
  }
}
function nextVideo() {
  currentPlaying++;
  if (currentPlaying === videosData.length) currentPlaying = 0;
  video1.setAttribute('src', videosData[currentPlaying].file);
  video1.play();
  document.getElementById('play_pause').src = 'media/pause.png';
  highlightCurrentPlaying();
}
function prevVideo() {
  currentPlaying--;
  if (currentPlaying < 0) currentPlaying = videosData.length - 1;
  video1.setAttribute('src', videosData[currentPlaying].file);
  video1.play();
  document.getElementById('play_pause').src = 'media/pause.png';
  highlightCurrentPlaying();
}
function highlightCurrentPlaying() {
  let currentVideo = document.getElementsByClassName('selected');
  currentVideo.length ? currentVideo[0].classList.remove('selected') : null;
  document.getElementById(currentPlaying).classList.add('selected');
}
function onEnded() {
  if (isShuffle) {
    shuffle();
  } else {
    currentPlaying++;
    currentPlaying === videosData.length
      ? (currentPlaying = 0)
      : currentPlaying
      ? video1.setAttribute('src', videosData[currentPlaying].file)
      : video1.setAttribute('src', videosData[0].file);
  }
  highlightCurrentPlaying();
  video1.play();
}
function shuffleOnOf() {
  isShuffle = !isShuffle;
  if (isShuffle) shuffle();
  highlightCurrentPlaying();
}
function shuffle() {
  let randomVideo = Math.floor(Math.random() * videosData.length - 1) + 1;
  video1.setAttribute('src', videosData[randomVideo].file);
  currentPlaying = randomVideo;
}
