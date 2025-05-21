// assets/js/pages/job-search.js
(function() {
  var input       = document.getElementById("job-keywords");
  var btnSearch   = document.getElementById("btn-search");
  var resultsDiv  = document.getElementById("job-results");
  var btnContinue = document.getElementById("btn-continue");
  var selectedId  = null;

  var jobsData = [
    { id: 1, title: "Desarrollador Frontend React", company: "TechVision México", location: "CDMX", level: "Junior/Mid", tags: ["React.js","JS","CSS3","Redux","Jest"] },
    { id: 2, title: "Frontend Dev React/Next.js",    company: "Innovatech Solutions", location: "Remoto", level: "Mid",        tags: ["React","Next.js","TS","Tailwind"] },
    { id: 3, title: "React Frontend Engineer",      company: "FinanzApp",           location: "Remoto", level: "Senior",     tags: ["React","Redux","GraphQL","Styled"] }
  ];

  // Muestra todas al inicio
  renderJobs(jobsData);

  // Filtrar sin recarga
  btnSearch.addEventListener("click", function() {
    var q = input.value.trim().toLowerCase();
    var filtered = q
      ? jobsData.filter(function(job) {
          return (
            job.title.toLowerCase().includes(q) ||
            job.company.toLowerCase().includes(q) ||
            job.tags.some(function(t){ return t.toLowerCase().includes(q); })
          );
        })
      : jobsData;
    selectedId = null;
    btnContinue.disabled = true;
    renderJobs(filtered);
  });

  // Render y selección
  function renderJobs(list) {
    resultsDiv.innerHTML = "";
    list.forEach(function(job) {
      var card = document.createElement("div");
      card.className = "job-card";
      card.dataset.id = job.id;
      card.innerHTML =
        '<div class="job-header">' +
          '<h3 class="job-title">' + job.title + '</h3>' +
          '<span class="job-level">' + job.level + '</span>' +
        '</div>' +
        '<div class="job-company">' + job.company + '</div>' +
        '<div class="job-location">' + job.location + '</div>' +
        '<div class="job-tags">' +
          job.tags.map(function(t){ return '<span class="job-tag">' + t + '</span>'; }).join("") +
        '</div>';
      resultsDiv.appendChild(card);

      card.addEventListener("click", function() {
        document.querySelectorAll(".job-card")
          .forEach(function(c){ c.classList.remove("selected"); });
        card.classList.add("selected");
        selectedId = parseInt(card.dataset.id, 10);
        btnContinue.disabled = false;
      });
    });
  }

  // Navegar al Skill Map con jobId
  btnContinue.addEventListener("click", function() {
    if (selectedId === null) return;
    window.location.href = `index.html?page=skill-maps&jobId=${selectedId}`;

  });

})();
