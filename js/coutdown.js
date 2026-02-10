const countdownDate = new Date("2027-09-08T00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) return;

  document.getElementById("days").innerText =
    Math.floor(distance / (1000 * 60 * 60 * 24));

  document.getElementById("hours").innerText =
    Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  document.getElementById("minutes").innerText =
    Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  document.getElementById("seconds").innerText =
    Math.floor((distance % (1000 * 60)) / 1000);
}

updateCountdown();
setInterval(updateCountdown, 1000);