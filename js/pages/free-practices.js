// assets/js/pages/free-practice.js
;(function(){
  const techSelect = document.getElementById("tech-select");
  const techDiff   = document.getElementById("tech-diff");
  const algoSelect = document.getElementById("algo-select");
  const algoDiff   = document.getElementById("algo-diff");
  const commSelect = document.getElementById("comm-select");
  const commFocus  = document.getElementById("comm-focus");
  const startBtns  = document.querySelectorAll(".start-btn");
  const btnBack    = document.getElementById("btn-back");

  startBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      let target = "skill-maps";
      switch(type) {
        case "tech":
          target = `free-practice-session.html?type=tech&lang=${encodeURIComponent(techSelect.value)}&level=${encodeURIComponent(techDiff.value)}`;
          break;
        case "algo":
          target = `free-practice-session.html?type=algo&problem=${encodeURIComponent(algoSelect.value)}&level=${encodeURIComponent(algoDiff.value)}`;
          break;
        case "comm":
          target = `free-practice-session.html?type=comm&exercise=${encodeURIComponent(commSelect.value)}&focus=${encodeURIComponent(commFocus.value)}`;
          break;
      }
      window.location.href = `index.html?page=${target}`;
    });
  });

  btnBack.addEventListener("click", () => {
    window.location.href = "index.html?page=welcome";
  });
})();
