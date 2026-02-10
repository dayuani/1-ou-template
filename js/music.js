const music = document.getElementById("bg-music");
const toggle = document.getElementById("musicToggle");

let isPlaying = false;

// icon awal (play)
toggle.innerHTML = '<i class="fa-solid fa-play"></i>';

toggle.addEventListener("click", () => {
  if (!isPlaying) {
    music.play();
    toggle.innerHTML = '<i class="fa-solid fa-pause"></i>';
    isPlaying = true;
  } else {
    music.pause();
    toggle.innerHTML = '<i class="fa-solid fa-play"></i>';
    isPlaying = false;
  }
});
