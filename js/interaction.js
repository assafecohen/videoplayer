//Variable
const video1 = document.getElementById('video1');
let initialPlay = false;
let menuIn = true;

let showQuestion = false;

//Time Variables
let currentTime = 0;
let halfwayPoint;
let durationPoint;

//Video Load
video1.onloadedmetadata = function () {
  durtaionPoint = Math.round(video1.duration);
  halfwayPoint = Math.round(video1.duration / 2);
};

video1.onplay = function () {
  if (!initialPlay) {
    initialPlay = true;
  }
};

video1.onpause = function () {
  // showModal('This is the new text for the modal!');
};

video1.onended = function () {
  alert('Video ended');
};

function toggleVideo() {
  if (!video1.paused) {
    document.getElementById('play_pause').src = 'media/play.png';
    video1.pause();
  } else {
    document.getElementById('play_pause').src = 'media/pause.png';
    video1.play();
  }
}
// Mute Audio
function muteAudio() {
  if (!video1.muted) {
    video1.muted = true;

    document.getElementById('playBtn').style.backgroundImage =
      'url(media/audio_mute.png)';
  } else {
    video1.muted = false;
    document.getElementById('playBtn').style.backgroundImage =
      'url(media/audio_up.png)';
  }
}
function animateMenu() {
  if (menuIn) {
    console.log(true);
    $('.menu').animate({ right: '0' }, 500);
    menuIn = false;
  } else {
    console.log(false);
    $('.menu').animate({ right: '-405px' }, 500);
    menuIn = true;
  }
}
//jump to point
function jumpToPoint(time) {
  video1.currentTime = time;
}
function loadVideo(e) {
  video1.src = e;
  animateMenu();
  video1.play();
}
// video1.onseeked = function () {
//   console.log('seeking');
// };
// video1.onvolumechange = function () {
//   console.log('volume');
// };
video1.ontimeupdate = function () {
  currentTime = Math.round(video1.currentTime);

  if (currentTime === 5) {
    if (!showQuestion) {
      showQuestion = true;
      $('#modal1').modal('show');
    }
  }
  if (currentTime == halfwayPoint) {
    alert('HalfWay');
  }
};
//Page Loaded
function pageLoaded() {}

function showModal(e) {
  document.getElementById('modalText').innerHTML = e;
  $('#modal1').modal('show');
}

$(document).on('show.bs.modal', '#modal1', function () {
  video1.pause();
});

$(document).on('hide.bs.modal', '#modal1', function () {
  video1.play();
});
