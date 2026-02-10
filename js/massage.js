  async function loadComments() {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal load:", error);
    return;
  }

  data.forEach(renderComment);
}


  function addWish(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    const attendance =
      document.querySelector('input[name="attendance"]:checked')?.value || "Hadir";

    const time = new Date().toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    const commentData = { name, message, attendance, time };

    saveComment(commentData);
    renderComment(commentData);

    e.target.reset();
  }
   const images = document.querySelectorAll('.gallery-img');
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const closeBtn = document.getElementById('closeModal');

  images.forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });

  async function saveComment(data) {
  const { error } = await supabase
    .from("comments")
    .insert([data]);

  if (error) {
    console.error("Gagal simpan:", error);
  }
}


  function renderComment({ name, message, attendance, time }) {
    const badgeClass =
      attendance === "Hadir"
        ? "bg-green-600/80"
        : attendance === "Berhalangan"
        ? "bg-red-600/80"
        : "bg-yellow-500/80";

    const comment = document.createElement("div");
    comment.className =
      "rounded-2xl bg-black/60 backdrop-blur-md p-4 text-white";

    comment.innerHTML = `
      <div class="flex justify-between items-center mb-1">
        <p class="font-semibold text-sm">${name}</p>
        <span class="px-3 py-1 text-xs rounded-full ${badgeClass}">
          ${attendance.toUpperCase()}
        </span>
      </div>
      <p class="text-xs text-gray-300 mb-2">${time} WITA</p>
      <p class="text-sm leading-relaxed">${message}</p>
    `;

    document.getElementById("commentList").prepend(comment);
  }
  const STORAGE_KEY = "wedding_comments";
