// assets/js/pages/skill-maps.js
;(function(){
  const params     = new URLSearchParams(window.location.search);
  const jobId      = params.get("jobId");
  const grid       = document.getElementById("skillcards-grid");
  const titleEl    = document.getElementById("skillmaps-title");
  const btnStartIA = document.getElementById("btn-start-ia");

  const mapsByJob = {
    "1": [
      { name: "React.js", current: 3, target: 5 },
      { name: "JavaScript", current: 4, target: 5 },
      { name: "CSS3", current: 2, target: 4 }
    ],
    "2": [
      { name: "Next.js", current: 2, target: 4 },
      { name: "TypeScript", current: 3, target: 5 }
    ],
    "3": [
      { name: "GraphQL", current: 1, target: 4 }
    ]
  };

  const roleNames = {
    "1": "Desarrollador Frontend React",
    "2": "Frontend Dev React/Next.js",
    "3": "React Frontend Engineer"
  };
  titleEl.textContent = `Skill Map para: ${roleNames[jobId]||"Tu Rol"}`;

  const data = mapsByJob[jobId] || [];
  data.forEach(skill => {
    const card = document.createElement("div");
    card.className = "skill-card";
    card.innerHTML = `
      <div class="skill-name">${skill.name}</div>
      <div class="level-container">
        <span>Actual: <span class="current-val">${skill.current}</span></span>
        <span>Objetivo: ${skill.target}</span>
      </div>
      <input type="range" min="0" max="5" value="${skill.current}" class="level-slider" data-target="${skill.target}" />
    `;
    grid.appendChild(card);

    const slider = card.querySelector(".level-slider");
    const currLabel = card.querySelector(".current-val");
    slider.addEventListener("input", () => {
      currLabel.textContent = slider.value;
    });
  });

  // Habilitar botón desde el inicio
  btnStartIA.disabled = false;
  btnStartIA.addEventListener("click", () => {
    window.location.href = `index.html?page=ai-session&jobId=${jobId}`;
  });
})();