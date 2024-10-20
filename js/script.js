// songs arrays
const songImageSource = ["assets/images/song covers/mascara-image.jpg", "assets/images/song covers/rosemary-image.jpg", "assets/images/song covers/ceremony-image.png"];
const songNames = ["Mascara", "Rosemary", "Ceremony"];
const songAudioSource = ["assets/music/mascara-audio.mp3", "assets/music/rosemary-audio.mp3", "assets/music/ceremony-audio.mp3"];

// defines song iformation constants
const coverImage = document.getElementById("cover-img");
const songName = document.getElementById("song-name");

// audio player object
const audioPlayer = new Audio();

// play pause next previous button
const playPauseButton = document.getElementById("play-button");
const nextButton = document.getElementById("next-button");
const previousButton = document.getElementById("previous-button");

// sliders
const progressSlider = document.getElementById("progress-slider");
const volumeSlider = document.getElementById("volume-slider");

// progress and duration text
const progressText = document.getElementById("progress-text");
const durationText = document.getElementById("duration-text");

// drag and drop constants
const item = document.getElementById("item");
const dropZone = document.getElementById("main-div");
let draggedImage = undefined;

let offsetX = 0;
let offsexY = 0;

// links audio file, first song by deafualt
audioPlayer.src = "assets/music/mascara-audio.mp3";
audioPlayer.volume = 0.5;

// let variables
let playing = false;
let updatingProgress = false;

// play pause fucntion
function onPlayPauseClick() {
    if (playing) {
        audioPlayer.pause();
        playPauseButton.src = "assets/images/icons/play-icon.png";
        playPauseButton.alt = "Play";
        playing = false;
    } else {
        audioPlayer.play();
        playPauseButton.src = "assets/images/icons/pause-icon.png";
        playPauseButton.alt = "Pause";
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

let songCount = 0;

// next song function
function nextSong() {
    // song count
    songCount += 1;
    if (songCount > 2) {
        songCount = 0;
    }

    // changes song information
    coverImage.src = songImageSource[songCount];
    songName.innerHTML = songNames[songCount];
    audioPlayer.src = songAudioSource[songCount];
}

// previous song function
function previousSong() {
    // song count
    songCount -= 1;
    if (songCount < 0) {
        songCount = 2;
    }

    // changes song information
    coverImage.src = songImageSource[songCount];
    songName.innerHTML = songNames[songCount];
    audioPlayer.src = songAudioSource[songCount];
}

// drag and drop functions
item.addEventListener("dragstart", function (event) {
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
    dropZone.prepend(item)

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
nextButton.onclick = nextSong;
previousButton.onclick = previousSong;