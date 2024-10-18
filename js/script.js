// audio player object
const audioPlayer = new Audio();

// play pause button
const playPauseButton = document.getElementById("play-button");

// progress slider
const progressSlider = document.getElementById("progress-slider");

// volume slider
const volumeSlider = document.getElementById("volume-slider");

// progress and duration text
const progressText = document.getElementById("progress-text");
const durationText = document.getElementById("duration-text");

// drag and drop constants
const audioPlayerCard = document.getElementById("audio-player-div");
const dropZone = document.getElementById("main-div");
let draggedImage = undefined;

let offsetX = 0;
let offsexY = 0;

// links audio file, first song by deafualt
audioPlayer.src = "assets/music/song1";
audioPlayer.volume = 0.5;

// let variables
let playing = false;
let updatingProgress = false;

// play pause fucntion
function onPlayPauseClick() {
    if (playing) {
        audioPlayer.pause();
        playPauseButton.innerHTML = "Play";
        playing = false;
    } else {
        audioPlayer.play();
        playPauseButton.innerHTML = "Pause";
        playing = true;
    }
}

// display song progress function
function onLoadedMetadata() {
    progressSlider.max = audioPlayer.duration;

    durationText.innerHTML = secondsToMMSS(audioPlayer.duration);
}

function onTimeUpdate() {
    if (!updatingProgress) {
        progressSlider.value = audioPlayer.currentTime;
    }
    progressText.innerHTML = secondsToMMSS(audioPlayer.currentTime);
}

function onEnd() {
    progressSlider.value = 0;
    playPauseButton.innerHTML = "Play";
    playing = false;

    progressText.innerHTML = "00:00";
}

// volume slider function
function onVolumeSliderChange() {
    audioPlayer.volume = (volumeSlider.value) * 0.01;
}

function onProgressMouseDown() {
    updatingProgress = true;
}

// progress slider function
function onProgressSliderChange() {
    audioPlayer.currentTime = progressSlider.value;
    updatingProgress = false;
}

// seconds coverter function
function secondsToMMSS(seconds) {
    const integerSeconds = parseInt(seconds);

    // calculate minutes
    let MM = parseInt(integerSeconds / 60);
    if (MM < 10) MM = "0" + MM;

    // calculate seconds
    let SS = integerSeconds % 60;
    if (SS < 10) SS = "0" + SS;

    return MM + ":" + SS;
}

// drag and drop functions
audioPlayerCard.addEventListener("dragstart", function (event) {
    console.log(event)

    draggedImage = event.target;

    const style = window.getComputedStyle(draggedImage);

    offsetX = event.clientX - parseInt(style.left);
    offsetY = event.clientY - parseInt(style.top);
})

dropZone.addEventListener("dragover", function (event) {
    event.preventDefault()
})

dropZone.addEventListener("drop", function (event) {
    dropZone.prepend(audioPlayerCard)

    draggedImage.style.left = event.clientX - offsetX + "px";
    draggedImage.style.top = event.clientY - offsetY + "px";
})

// links all events to functions
playPauseButton.onclick = onPlayPauseClick;
audioPlayer.onloadedmetadata = onLoadedMetadata;
audioPlayer.ontimeupdate = onTimeUpdate;
audioPlayer.onended = onEnd;
volumeSlider.onchange = onVolumeSliderChange;
progressSlider.onchange = onProgressSliderChange;
progressSlider.onmousedown = onProgressMouseDown;