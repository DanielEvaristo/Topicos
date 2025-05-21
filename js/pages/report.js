// assets/js/pages/report.js
;(function(){
  const params   = new URLSearchParams(window.location.search);
  const jobId    = params.get("jobId");
  const mentorId = params.get("mentorId");
  const now      = new Date();

  // Elementos
  const dateEl   = document.getElementById("report-date");
  const durEl    = document.getElementById("report-duration");
  const roleEl   = document.getElementById("report-role");
  const skillsEl = document.getElementById("report-skills");
  const transEl  = document.getElementById("report-transcript");
  const fbEl     = document.getElementById("report-feedback");
  const btnHome  = document.getElementById("btn-home");
  const btnDL    = document.getElementById("btn-download");

  // Datos dummy
  const jobs = {
    "1": "Desarrollador Frontend React",
    "2": "Frontend Dev React/Next.js",
    "3": "React Frontend Engineer"
  };
  const maps = {
    "1": [ {name:"React.js",cur:5,tgt:5}, {name:"JS",cur:5,tgt:5} ],
    "2": [ {name:"Next.js",cur:4,tgt:4}, {name:"TS",cur:4,tgt:5} ],
    "3": [ {name:"GraphQL",cur:3,tgt:4} ]
  };
  const transcripts = {
    "1": "Transcripción completa de tu sesión IA...",
    "2": "Otra transcripción ejemplo..."
  };
  const feedbacks = {
    "1": "El mentor comenta que tu respuesta sobre React fue muy clara, pero profundiza más en hooks.",
    "2": "Buen manejo de Next.js, sigue así."
  };

  // Meta
  dateEl.textContent = now.toLocaleDateString();
  durEl.textContent  = "15:00 min"; // podrías medir real

  // Rol
  roleEl.textContent = jobs[jobId] || "Tu Rol";

  // Skill Map
  const skillList = maps[jobId] || [];
  skillsEl.innerHTML = "";
  skillList.forEach(s => {
    const card = document.createElement("div");
    card.className = "skill-report-card";
    card.innerHTML = `<h3>${s.name}</h3>
                      <p>Actual: ${s.cur} / Objetivo: ${s.tgt}</p>`;
    skillsEl.appendChild(card);
  });

  // Transcripción y feedback
  transEl.textContent = transcripts[jobId] || "—";
  fbEl.textContent    = feedbacks[jobId]   || "—";

  // Botones
  btnHome.addEventListener("click", () => {
    window.location.href = "index.html?page=welcome";
  });
  btnDL.addEventListener("click", () => {
    const data = {
      date: dateEl.textContent,
      duration: durEl.textContent,
      role: roleEl.textContent,
      skills: skillList,
      transcript: transEl.textContent,
      feedback: fbEl.textContent
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:"application/json"});
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "informe-simulacion.json";
    a.click();
    URL.revokeObjectURL(url);
  });

})();
