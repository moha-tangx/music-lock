import tracks from "./tracks.json" assert { type: "json" };
import { getElem, setTrack, playTrack } from "./index.js";

const list = getElem(".list"),
  playList = getElem(".play-list");

const fragment = tracks.map((track) => {
  return `<div class="music">
  <div class="list-img">
    <img src=${track.img} alt="">
  </div>
  <div class="list-text">
    ${
      track.title.length > 15
        ? `<marquee>${track.title}</marquee>`
        : `<p class="music-title">${track.title}</p>`
    }
    <span class="music-artist">${track.artist}</span>
  </div>
  <div>
    <svg class="options extra">
      <use xlink:href="./icons/bootstrap-icons.svg#three-dots-vertical" />
    </svg>
  </div>
</div>`;
});
list.innerHTML = fragment.join("");

const trackList = document.querySelectorAll(".music .list-text");
trackList.forEach((track, i) =>
  track.addEventListener("click", () => {
    setTrack(tracks[i]);
    playTrack();
    playList.classList.remove("open");
  })
);
