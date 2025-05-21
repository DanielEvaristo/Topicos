// assets/js/pages/mentor-session.js
;(function(){
  const params    = new URLSearchParams(window.location.search);
  const jobId     = params.get("jobId");
  const cards     = document.querySelectorAll(".mentor-card");
  const btnPrev   = document.getElementById("btn-prev");
  const btnStart  = document.getElementById("btn-start");
  let selectedId  = null;

  // Selección de tarjeta
  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      selectedId = card.dataset.id;
      btnStart.disabled = false;
    });
  });

  // Volver a IA Session
  btnPrev.addEventListener("click", () => {
    window.location.href = `index.html?page=ai-session&jobId=${jobId}`;
  });

  // Iniciar Mentor → sesión de mentoreo
  btnStart.addEventListener("click", () => {
    if (!selectedId) return;
    window.location.href = `index.html?page=report&jobId=${jobId}&mentorId=${selectedId}`;
  });
})();
