const SUPABASE_URL = "https://ecpzvlbrulxbhtwqqmub.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_jx0p00VOq4hKOkt1lcAxUQ_sbDojSJR";

const db = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

console.log("db ready:", typeof db.from); // HARUS "function"


// ===== GLOBAL =====
const music = document.getElementById("bg-music");
const toggle = document.getElementById("musicToggle");
const openBtn = document.getElementById("openInvitation");
const cover = document.getElementById("cover");
const invitation = document.getElementById("invitation-content");

let isPlaying = false;

// ===== MUSIC =====
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

// ===== OPEN INVITATION =====
openBtn.addEventListener("click", () => {
  cover.classList.add("opacity-0", "pointer-events-none");

  setTimeout(() => {
    cover.classList.add("hidden");
    invitation.classList.remove("hidden");
    AOS.refresh();
  }, 700);

  music.play().catch(() => {});
  toggle.innerHTML = '<i class="fa-solid fa-pause"></i>';
  isPlaying = true;

  window.scrollTo({ top: 0, behavior: "smooth" });
});
//===== cout =====
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

//===== aos =====
document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
      duration: 1200,
      easing: "ease-out-cubic",
      once: true,
      offset: 120
    });
  });
//===== aos =====

async function addWish(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();
  const attendance =
    document.querySelector('input[name="attendance"]:checked')?.value ||
    "Hadir";

  if (!name || !message) {
    alert("Nama dan ucapan tidak boleh kosong 🙏");
    return;
  }

  const time = new Date().toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const commentData = { name, message, attendance, time };

  const { error } = await db
    .from("comments")
    .insert([commentData]);

  if (error) {
    console.error(error);
    alert("Ucapan gagal dikirim 🙏");
    return;
  }

  renderComment(commentData);
  e.target.reset();
}

// Fungsi untuk memformat tampilan satu komentar
function renderComment(data) {
  const list = document.getElementById("commentList");
  const div = document.createElement("div");
  
  // Styling card komentar (menyesuaikan dengan tema gelap kamu)
  div.className = "bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-white/10 mb-3";
  div.innerHTML = `
    <div class="flex justify-between items-start mb-2">
      <h4 class="font-bold text-indigo-300 text-sm">${data.name}</h4>
      <span class="text-[10px] bg-white/10 px-2 py-1 rounded text-gray-300">${data.attendance}</span>
    </div>
    <p class="text-sm text-gray-200 leading-relaxed">${data.message}</p>
    <small class="text-[9px] text-gray-500 mt-2 block">${data.time || ''}</small>
  `;
  
  // Menambahkan komentar terbaru di paling atas
  list.prepend(div);
}

// Fungsi untuk mengambil semua data dari Supabase
async function loadComments() {
  const { data, error } = await db
    .from("comments")
    .select("*")
    .order("created_at", { ascending: true }); // Mengurutkan berdasarkan waktu

  if (error) {
    console.error("Gagal mengambil data:", error);
    return;
  }

  if (data) {
    // Bersihkan list sebelum diisi (agar tidak double)
    document.getElementById("commentList").innerHTML = "";
    data.forEach((comment) => {
      renderComment(comment);
    });
  }
}

// Panggil fungsi loadComments saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
  loadComments();
});


// Konfigurasi Google Script RSVP
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx-R9S8FYPf1vu2qIompUX93v-hOoZrwpNsCHimh2zfo_DrmlpxRA4nARl925cqvfaH/exec";
const rsvpForm = document.getElementById('rsvpForm');
const btnRsvp = document.getElementById('btnRsvp');

rsvpForm.addEventListener('submit', e => {
  e.preventDefault();
  
  // Ubah status tombol
  btnRsvp.disabled = true;
  btnRsvp.innerHTML = "Mengirim...";

  const formData = new FormData(rsvpForm);
  const data = {
    nama: formData.get('nama'),
    kehadiran: formData.get('kehadiran'),
    jumlah_tamu: formData.get('jumlah_tamu')
  };

  // Kirim ke Google Sheets
  fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  .then(response => {
    alert("Terima kasih! Reservasi Anda telah terkirim. 🙏");
    rsvpForm.reset();
  })
  .catch(error => {
    console.error('Error!', error.message);
    alert("Maaf, terjadi kesalahan saat mengirim data.");
  })
  .finally(() => {
    btnRsvp.disabled = false;
    btnRsvp.innerHTML = "Kirim";
  });
});