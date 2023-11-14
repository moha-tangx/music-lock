"use strict";
import tracks from "./tracks.json" assert { type: "json" };

/*query element with shorter syntax*/
export const getElem = (elem) => document.querySelector(elem);

/****** data ******/
/*audio*/
export const audio = new Audio(),
  /*strings*/
  heart_fill = "./icons/bootstrap-icons.svg#heart-fill",
  pauseBtn = "./icons/bootstrap-icons.svg#pause-fill",
  playBtn = "./icons/bootstrap-icons.svg#play-fill",
  loop = "/icons/bootstrap-icons.svg#arrow-repeat",
  heart = "./icons/bootstrap-icons.svg#heart",
  /*elements*/
  playButton = getElem(".play-pause"),
  prevBtn = getElem(".prev"),
  nextBtn = getElem(".next"),
  img = getElem(".img-container"),
  title = getElem(".title"),
  artist = getElem(".artist"),
  bg = getElem("main"),
  playListIcon = getElem(".play-list-icon"),
  backBtn = getElem(".back"),
  playList = getElem(".play-list"),
  slider = getElem(".progress-slider"),
  favIcon = getElem(".fav"),
  loopIcon = getElem(".loop"),
  shuffleIcon = getElem(".shuffle"),
  settingsIcon = getElem(".settings"),
  mainOPtion = getElem(".main-option"),
  overLay = getElem(".overlay"),
  popOut = getElem(".pop-out");

/* track index tracker */
let trackIndex = 0;
let shuffle = false;

/****** methods/functions ******/
/*set the current track obj as the plying track in the ui*/
export function setTrack(track) {
  const image = img.querySelector("img");
  audio.src = track.src;
  artist.textContent = track.artist;
  title.textContent = track.title;
  image.src = track.img;
  if (title.textContent.length > 15) {
    title.innerHTML = `<marquee>${track.title}</marquee>`;
  }

  /* setting the heart icon to filled if the track is liked or not-filled if its not*/
  track.fav
    ? (favIcon.firstElementChild.attributes[0].value = heart_fill)
    : (favIcon.firstElementChild.attributes[0].value = heart);

  return track;
}

/*current track*/
let track = setTrack(tracks[trackIndex]);

/* play the track*/
export function playTrack() {
  img.classList.remove("paused");
  bg.classList.add("playing");
  audio.play();
  playButton.firstElementChild.attributes[0].value = pauseBtn;
}

/* pause the track*/
export function pauseTrack() {
  audio.pause();
  img.classList.add("paused");
  playButton.firstElementChild.attributes[0].value = playBtn;
  bg.classList.remove("playing");
}

/*go to previous track*/
function prev() {
  trackIndex--;
  if (trackIndex < 0) {
    trackIndex = tracks.length - 1;
  }
  setTrack(tracks[trackIndex]);
  playButton.firstElementChild.attributes[0].value == pauseBtn && audio.play();
}

/*go to next track*/
function next() {
  trackIndex++;
  if (trackIndex == tracks.length) {
    trackIndex = 0;
  }
  setTrack(tracks[trackIndex]);
  playButton.firstElementChild.attributes[0].value == pauseBtn && audio.play();
}

/* updates the progress slider*/
function progress() {
  const duration = (audio.currentTime / audio.duration) * 100;
  slider.value = duration;
}

/* change the current track time when the slider is dragged*/
function update() {
  audio.currentTime = (slider.value / 100) * audio.duration;
}

function setPlayedTime() {
  let played = +audio.currentTime.toFixed(0);
  let duration = audio.duration.toFixed(0);
}

function setremainingTime() {
  let played = +audio.currentTime.toFixed(0);
  let duration = audio.duration.toFixed(0);
}

function back() {
  if (playList.classList.contains("open")) {
    return playList.classList.remove("open");
  }
  // back to main menus
  console.log("back clicked");
}

function setFav() {
  const unliked = favIcon.firstElementChild.attributes[0].value == heart;
  if (unliked) {
    favIcon.firstElementChild.attributes[0].value = heart_fill;
    track.fav = true;
    // fs.writeFileSync("./tracks.json", tracks);
  } else {
    favIcon.firstElementChild.attributes[0].value = heart;
    track.fav = false;
    // fs.writeFileSync("./tracks.json", tracks);
  }
}

function loopTrack() {
  if (audio.loop) {
    audio.loop = false;
    loopIcon.firstElementChild.attributes[0].value = loop;
    return;
  }
  audio.loop = true;
  loopIcon.firstElementChild.attributes[0].value = heart_fill;
}

function shuffleTracks() {
  if (shuffle) {
    shuffle = false;
  } else {
    shuffle = true;
    audio.addEventListener("ended", () => console.log("shufle"));
  }
  console.log(shuffle);
}

function toggleElem(elem) {
  elem.classList.toggle("open");
}

/* eventlisteners*/

/* updates the progress bar according to the current time of the track*/
audio.addEventListener("timeupdate", () => {
  progress(), setPlayedTime(), setremainingTime();
});

/*playing and pusing the track and animating the music banner image*/
playButton.addEventListener("click", () => {
  audio.paused ? playTrack() : pauseTrack();
});

/*play next track*/
nextBtn.addEventListener("click", next);

/*play previous track*/
prevBtn.addEventListener("click", prev);

/* plays the next track if the current track is end*/
audio.addEventListener("ended", next);

/*moves the current time of the trak to the dragged position on the slider*/
slider.addEventListener("change", update);

/*sets or remove a track from favorites*/
favIcon.addEventListener("click", setFav);

/*sets or remove track looping*/
loopIcon.addEventListener("click", loopTrack);

/*sets or remove track shuffling*/
shuffleIcon.addEventListener("click", shuffleTracks);

/*back to the main menu if the back button is clicked and the playlist tab is not open*/
backBtn.addEventListener("click", back);

/*opening and closing playlist */
playListIcon.addEventListener("click", () => toggleElem(playList));

mainOPtion.addEventListener("click", () => toggleElem(popOut));
