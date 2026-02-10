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
    console.error("Supabase error:", error);
    alert("Ucapan gagal dikirim 🙏");
    return;
  }

  // ❌ JANGAN render manual (karena realtime)
  e.target.reset();
}
supabase
  .channel("comments-realtime")
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "comments" },
    (payload) => {
      renderComment(payload.new);
    }
  )
  .subscribe();
