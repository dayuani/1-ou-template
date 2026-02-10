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

  const { error } = await supabase
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
function renderComment(comment) {
  const list = document.getElementById("commentList");

  const item = document.createElement("div");
  item.className =
    "p-4 rounded-2xl bg-black/60 backdrop-blur-md text-sm text-white grid gap-1";

  item.innerHTML = `
    <div class="flex justify-between items-center">
      <span class="font-semibold">${comment.name}</span>
      <span class="text-xs text-gray-300">${comment.time}</span>
    </div>

    <p class="text-gray-200">${comment.message}</p>

    <span class="text-xs italic text-gray-400">
      Kehadiran: ${comment.attendance}
    </span>
  `;

  list.prepend(item); // biar yang terbaru di atas
}
async function loadComments() {
  const { data, error } = await db
    .from("comments")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("load error:", error);
    return;
  }

  data.forEach(renderComment);
}
document.addEventListener("DOMContentLoaded", () => {
  loadComments();
});

