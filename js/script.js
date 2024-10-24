// defines variables

//songs arrays
const songImageSource = ["assets/images/song covers/mascara-image.jpg", "assets/images/song covers/rosemary-image.jpg", "assets/images/song covers/ceremony-image.png", "assets/images/song covers/beauty-school-image.png"];
const songNames = ["Mascara", "Rosemary", "Ceremony", "Beauty School"];
const songAudioSource = ["assets/music/mascara-audio.mp3", "assets/music/rosemary-audio.mp3", "assets/music/ceremony-audio.mp3", "assets/music/beauty-school-audio.mp3"];

// song counter
let songCount = 0;
const lastSong = (songImageSource.length - 1);

// song information elements 
const coverImage = document.getElementById("cover-img");
const songName = document.getElementById("song-name");

// audio player object
const audioPlayer = new Audio();
let playing = false;
let updatingProgress = false;

// play, pause, next and previous buttons
const playPauseButton = document.getElementById("play-button");
const nextButton = document.getElementById("next-button");
const previousButton = document.getElementById("previous-button");

// sliders
const progressSlider = document.getElementById("progress-slider");
const volumeSlider = document.getElementById("volume-slider");

// determines whether any slider is moving
let sliderIsChanging = false

// progress, duration and volume text
const progressText = document.getElementById("progress-text");
const durationText = document.getElementById("duration-text");
const volumeLevelText = document.getElementById("volume-level");

// sound wave gif
const soundWaveGif = document.getElementById("sound-wave");

// drag and drop
const item = document.getElementById("item");
const dropZone = document.getElementById("main-div");
let draggedElements = undefined;
let offsetX = 0;
let offsexY = 0;

// links audio file
audioPlayer.src = "assets/music/mascara-audio.mp3";

// sets automatic volume
audioPlayer.volume = 0.5;

// functions
// play pause 
function onPlayPauseClick() {
    if (playing) {
        // pauses
        audioPlayer.pause();
        playPauseButton.src = "assets/images/icons/play-icon.png";
        playPauseButton.alt = "Play";
        playing = false;
        soundWaveGif.src = "assets/gifs/sound-waves-still.png";
    } else {
        // plays
        audioPlayer.play();
        playPauseButton.src = "assets/images/icons/pause-icon.png";
        playPauseButton.alt = "Pause";
        playing = true;
        soundWaveGif.src = "assets/gifs/sound-waves.gif";
    }
}

// displays song progress and duration
function onTimeUpdate() {
    if (!updatingProgress) {
        progressSlider.value = audioPlayer.currentTime;
    }
    progressText.innerHTML = secondsToMMSS(audioPlayer.currentTime);
}

function onLoadedMetadata() {
    progressSlider.max = audioPlayer.duration;
    durationText.innerHTML = secondsToMMSS(audioPlayer.duration);
}

// seconds to minutes and seconds coverter 
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

// progress slider
function onProgressMouseDown() {
    updatingProgress = true;
    sliderIsChanging = true;
}

function onProgressSliderChange() {
    audioPlayer.currentTime = progressSlider.value;
    updatingProgress = false;
    sliderIsChanging = false;
}

// volume slider 
function onVolumeSliderChange() {
    audioPlayer.volume = (volumeSlider.value) * 0.01;
    volumeLevelText.innerHTML = (volumeSlider.value);
    sliderIsChanging = false;
}

function onVolumeMouseDown() {
    sliderIsChanging = true;
}

// next song button
function nextSong() {
    songCount += 1;
    if (songCount > lastSong) {
        songCount = 0;
    }

    // changes song information
    coverImage.src = songImageSource[songCount];
    songName.innerHTML = songNames[songCount];
    audioPlayer.src = songAudioSource[songCount];

    // automatically plays next song if the previous song was already playing 
    if (playing) {
        audioPlayer.play();
    }
    // doesnt automatically play if the previous song was paused
    else {
        audioPlayer.pause();
    }
}

// previous song function
function previousSong() {
    songCount -= 1;
    if (songCount < 0) {
        songCount = lastSong;
    }

    // changes song information
    coverImage.src = songImageSource[songCount];
    songName.innerHTML = songNames[songCount];
    audioPlayer.src = songAudioSource[songCount];

    // automatically plays next song if the previous song was already playing 
    if (playing) {
        audioPlayer.play();
    }
    // doesnt automatically play if the previous song was paused
    else {
        audioPlayer.pause();
    }
}

// when a song finishes
function onEnd() {
    songCount += 1;

    // pauses audio and goes back to the first song when last song finishes
    if (songCount > lastSong) {
        songCount = 0;
        audioPlayer.pause();
        progressSlider.value = 0;
        playPauseButton.src = "assets/images/icons/play-icon.png";
        playPauseButton.alt = "Play";
        progressText.innerHTML = "00:00";
        playing = false;
        audioPlayer.src = songAudioSource[songCount];
        soundWaveGif.src = "assets/gifs/sound-waves-still.png";
    }
    // next song automatically plays after previous song finishes
    else {
        audioPlayer.src = songAudioSource[songCount];
        audioPlayer.play();
        playing = true;
    }

    // changes song information
    coverImage.src = songImageSource[songCount];
    songName.innerHTML = songNames[songCount];
}

// drag and drop 
item.addEventListener("dragstart", function (event) {
    // allows sliders to slide without dragging
    if (sliderIsChanging) {
        event.preventDefault();
        return;
    }
    draggedElements = event.target;

    const style = window.getComputedStyle(draggedElements);

    offsetX = event.clientX - parseInt(style.left);
    offsetY = event.clientY - parseInt(style.top);
})

dropZone.addEventListener("dragover", function (event) {
    event.preventDefault();
})

dropZone.addEventListener("drop", function (event) {
    draggedElements.style.left = event.clientX - offsetX + "px";
    draggedElements.style.top = event.clientY - offsetY + "px";
})

// links all events to relevant functions
playPauseButton.onclick = onPlayPauseClick;
audioPlayer.ontimeupdate = onTimeUpdate;
audioPlayer.onloadedmetadata = onLoadedMetadata;
progressSlider.onmousedown = onProgressMouseDown;
progressSlider.onchange = onProgressSliderChange;
volumeSlider.onchange = onVolumeSliderChange;
volumeSlider.onmousedown = onVolumeMouseDown;
nextButton.onclick = nextSong;
previousButton.onclick = previousSong;
audioPlayer.onended = onEnd;