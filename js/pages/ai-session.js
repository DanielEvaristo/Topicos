// assets/js/pages/ai-session.js
;(function(){
  const questions = [
    'Cuéntame sobre tu experiencia con React hooks. ¿Qué ventajas ofrecen sobre los componentes de clase?',
    'Explícame cómo manejarías el estado global en una aplicación React. ¿Prefieres Redux, Context API u otra solución?',
    '¿Cómo optimizarías el rendimiento de un componente React que renderiza una lista larga de elementos?'
  ];
  let currentIndex = 0;
  let remainingTime = 15 * 60;

  const questionList = document.querySelector('.question-list');
  const timerEl      = document.getElementById('timer');
  const btnRecord    = document.getElementById('btn-record');
  const statusEl     = document.getElementById('record-status');
  const transcriptEl = document.getElementById('transcript-text');
  const btnPrev      = document.getElementById('btn-prev');
  const btnNext      = document.getElementById('btn-next');

  // Cronómetro
  function startTimer() {
    const mins = String(Math.floor(remainingTime/60)).padStart(2,'0');
    const secs = String(remainingTime%60).padStart(2,'0');
    timerEl.textContent = `${mins}:${secs}`;
    if (remainingTime > 0) {
      remainingTime--;
      setTimeout(startTimer,1000);
    }
  }
  startTimer();

  // Render preguntas
  function renderQuestions() {
    questionList.innerHTML = '';
    questions.forEach((q,i) => {
      const item = document.createElement('div');
      item.className = 'question-item' + (i===currentIndex?' active':'');
      item.innerHTML = `<span class="q-number">${i+1}.</span><span class="q-text">${q}</span>`;
      item.addEventListener('click',()=>changeQuestion(i));
      questionList.appendChild(item);
    });
  }

  function changeQuestion(idx) {
    currentIndex = idx;
    renderQuestions();
  }
  renderQuestions();

  // Prev/Next
  btnPrev.addEventListener('click',()=>{
    if(currentIndex>0) changeQuestion(currentIndex-1);
  });
  btnNext.addEventListener('click',()=>{
    if(currentIndex<questions.length-1) changeQuestion(currentIndex+1);
    else {
      const jobId = new URLSearchParams(window.location.search).get('jobId');
      // Después, apuntando al nuevo page=mentor-session
window.location.href = `index.html?page=mentor-session&jobId=${jobId}`;

    }
  });

  // Grabación
  let recording=false;
  btnRecord.addEventListener('click',()=>{
    recording=!recording;
    btnRecord.classList.toggle('recording',recording);
    statusEl.textContent = recording?'Grabando...':'Grabar';
    transcriptEl.textContent = recording? '': 'Aquí aparece la transcripción de tu última respuesta.';
  });
})();