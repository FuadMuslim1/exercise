// quiz.js

// ... (Kode QUESTIONS, state variables, dan playWord function tidak diubah) ...

// render function – show 3 questions based on currentScreen
function render() {
  quizArea.innerHTML = '';
  navigationControls.innerHTML = ''; // Clear navigation controls

  // Pastikan currentScreen tidak lebih kecil dari 1
  if (currentScreen < 1) currentScreen = 1;

  const startIndex = (currentScreen - 1) * QUESTIONS_PER_SCREEN;
  const endIndex = Math.min(startIndex + QUESTIONS_PER_SCREEN, QUESTIONS.length);

  // Jika endIndex <= startIndex (misal, tidak ada soal untuk dirender, ini seharusnya tidak terjadi
  // jika QUESTIONS.length > 0 dan currentScreen >= 1), kita bisa mencegah loop.
  if (startIndex >= QUESTIONS.length) {
      quizArea.textContent = 'No questions to display.';
      return;
  }
  
  // 1. Render Questions
  // Loop sekarang akan berjalan dari startIndex hingga endIndex - 1
  for(let i = startIndex; i < endIndex; i++){
    const q = QUESTIONS[i];
    const card = document.createElement('div'); card.className='card';
    
    // Tampilkan nomor soal (1-30) dan info Screen (1/10)
    const num = document.createElement('div'); 
    num.className='question'; 
    num.textContent = (i+1)+'. '+ q.word + ' (Screen ' + currentScreen + '/' + TOTAL_SCREENS + ')'; 
    card.appendChild(num);
    
    const opts = document.createElement('div'); opts.className='options';
    q.choices.forEach(opt => {
      const o = document.createElement('div'); o.className='option'; o.textContent = opt;
      if(answers[i] === opt) o.classList.add('selected');
      o.addEventListener('click', ()=>{
        answers[i] = opt;
        render(); // Re-render to show new selection
      });
      opts.appendChild(o);
    });
    // quick play button for word
    const play = document.createElement('button'); play.className='btn ghost'; play.textContent='Play audio';
    play.style.marginTop='10px';
    play.addEventListener('click', ()=>{ playWord(q.word); });
    card.appendChild(opts);
    card.appendChild(play);
    quizArea.appendChild(card);
  }

  // 2. Render Navigation Buttons
  
  // 'Go Back' Button: Hanya muncul jika bukan Screen 1
  if (currentScreen > 1) { 
    const prev = document.createElement('button');
    prev.id = 'prev';
    prev.className = 'btn ghost';
    prev.textContent = 'Go Back';
    prev.addEventListener('click', ()=>{ currentScreen--; render(); });
    navigationControls.appendChild(prev);
  }
  
  // 'Next' Button: Hanya muncul jika belum mencapai Screen terakhir
  if (currentScreen < TOTAL_SCREENS) {
    const next = document.createElement('button');
    next.id = 'next';
    next.className = 'btn';
    next.textContent = 'Next';
    next.addEventListener('click', ()=>{ currentScreen++; render(); });
    // Tambahkan tombol next di sebelah kanan (sebagai tombol utama)
    // Jika ada tombol 'Back', Next akan muncul setelahnya. Jika tidak ada 'Back' (di Screen 1), Next muncul di awal.
    navigationControls.appendChild(next);
  }

  // 'Submit' Button: Hanya muncul di Screen terakhir
  if (currentScreen === TOTAL_SCREENS) {
    const submit = document.createElement('button');
    submit.id = 'submit';
    submit.className = 'btn accent';
    submit.textContent = 'Submit';
    submit.addEventListener('click', ()=>{ 
        if(confirm('Submit your answers now?')){ 
            localStorage.setItem('quiz_answers', JSON.stringify(answers)); 
            window.location.href='score.html'; 
        } 
    });
    navigationControls.appendChild(submit);
  }
}

// ... (Kode tick function dan inisialisasi tidak diubah) ...