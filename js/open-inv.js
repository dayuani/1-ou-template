const openBtn = document.getElementById("openInvitation");
    const cover = document.getElementById("cover");
    const invitation = document.getElementById("invitation-content");
    openBtn.addEventListener("click", () => {
      cover.classList.add("opacity-0", "pointer-events-none");
      setTimeout(() => cover.classList.add("hidden"), 600);

      invitation.classList.remove("hidden");

      window.scrollTo({ top: 0, behavior: "smooth" });

      // play music (browser safe)
      if (music) {
        music.play().catch(() => {});
      }
    });
    music.play().catch(() => {});
    toggle.innerHTML = "❚❚";
    isPlaying = true;
    
    // AOS REFRESH
    document.getElementById("openInvitation").addEventListener("click", function () {
    const cover = document.getElementById("cover");
    const content = document.getElementById("invitation-content");

    cover.classList.add("opacity-0");

    setTimeout(() => {
      cover.classList.add("hidden");
      content.classList.remove("hidden");

      // 🔥 INI YANG PENTING
      AOS.refresh();
    }, 700);
  });
