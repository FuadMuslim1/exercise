// quiz.js
// Questions array - 30 items focusing on IPA tricky contrasts (GA - American English)
const QUESTIONS = [
  // Vowel Contrasts (i: vs ɪ, e vs æ, ɑ vs ʌ, ɔ vs ɑ)
  {word:'ship', ipa:'/ʃɪp/', choices:['/ʃɪp/','/sɪp/','/ʃiːp/','/tʃɪp/']},
  {word:'sheep', ipa:'/ʃiːp/', choices:['/ʃiːp/','/ʃɪp/','/siːp/','/tʃiːp/']},
  {word:'beat', ipa:'/biːt/', choices:['/bɪt/','/biːt/','/beɪt/','/bæt/']},
  {word:'bit', ipa:'/bɪt/', choices:['/bɪt/','/biːt/','/bət/','/bɛt/']},
  {word:'bed', ipa:'/bɛd/', choices:['/bæd/','/bɪd/','/bɛd/','/beɪd/']},
  {word:'bad', ipa:'/bæd/', choices:['/bæd/','/bɑːd/','/bɛd/','/beɪd/']}, 
  {word:'father', ipa:'/ˈfɑːðər/', choices:['/ˈfɑːðər/','/ˈfɔːðər/','/ˈfɑːtər/','/ˈfɛðər/']},
  {word:'lot', ipa:'/lɑt/', choices:['/lɑt/','/ɒl/','/læt/','/ɔːl/']}, // JAWABAN BENAR GA (/lɑt/)
  {word:'thought', ipa:'/θɔːt/', choices:['/θɑːt/','/θɔːt/','/θaʊt/','/tɔːt/']}, 
  
  // Consonant Contrasts (θ vs ð vs s vs t, ʃ vs ʒ vs tʃ vs dʒ)
  {word:'thin', ipa:'/θɪn/', choices:['/tɪn/','/θɪn/','/ðɪn/','/siːn/']},
  {word:'this', ipa:'/ðɪs/', choices:['/ðɪs/','/dɪs/','/θɪs/','/zɪs/']},
  {word:'thing', ipa:'/θɪŋ/', choices:['/ðɪŋ/','/θɪŋ/','/tɪŋ/','/ʃɪŋ/']},
  {word:'measure', ipa:'/ˈmɛʒər/', choices:['/ˈmɛʒər/','/ˈmɛsər/','/ˈmɛʃər/','/ˈmiːʒər/']},
  {word:'judge', ipa:'/dʒʌdʒ/', choices:['/dʒʌdʒ/','/ʒʌdʒ/','/tʃʌdʒ/','/dʌdʒ/']},
  
  // Diphthongs Contrasts (eɪ, oʊ, aʊ, ɔɪ)
  {word:'cake', ipa:'/keɪk/', choices:['/keɪk/','/kæk/','/kɔːk/','/kɛk/']},
  {word:'say', ipa:'/seɪ/', choices:['/seɪ/','/siː/','/sæ/','/sai/']},
  {word:'go', ipa:'/ɡoʊ/', choices:['/ɡoʊ/','/ɡuː/','/ɡɔː/','/ɡaʊ/']},
  {word:'no', ipa:'/noʊ/', choices:['/noʊ/','/naʊ/','/nɔː/','/nɒ/']},
  {word:'house', ipa:'/haʊs/', choices:['/haʊs/','/hæs/','/hɒs/','/huːs/']},
  {word:'boy', ipa:'/bɔɪ/', choices:['/bɔɪ/','/boʊ/','/bɔː/','/baɪ/']},
  
  // Vowel Contrasts (ʊ vs uː, ʌ vs ə, ɜːr vs ɪr)
  {word:'put', ipa:'/pʊt/', choices:['/pʊt/','/pʌt/','/puːt/','/pət/']},
  {word:'foot', ipa:'/fʊt/', choices:['/fʊt/','/fuːt/','/fət/','/fɒt/']},
  {word:'nurse', ipa:'/nɜːrs/', choices:['/nɜːrs/','/nɪrs/','/nɔːrs/','/nʌrs/']}, 
  {word:'bird', ipa:'/bɜːrd/', choices:['/bɜːrd/','/bɪrd/','/bəd/','/bɛrd/']}, // JAWABAN BENAR GA (/bɜːrd/)
  
  // Schwa (ə) and Stress (ˈ) in multi-syllable words
  {word:'happy', ipa:'/ˈhæpi/', choices:['/ˈhæpi/','/ˈhapi/','/ˈheɪpi/','/ˈhɪpi/']},
  {word:'camera', ipa:'/ˈkæmərə/', choices:['/ˈkæmərə/','/kəˈmɛrə/','/ˈkamərə/','/ˈkæmər/']},
  {word:'orange', ipa:'/ˈɔːrəndʒ/', choices:['/ˈɒrɪndʒ/','/ˈɔːrənj/','/ˈɔːrəndʒ/','/ˈɑːrənj/']}, // JAWABAN BENAR GA (/ˈɔːrəndʒ/)
  
  // Vowel Contrasts (æ vs ɑ vs ɛ)
  {word:'gas', ipa:'/ɡæs/', choices:['/ɡæs/','/ɡɑːs/','/ɡɛs/','/ɡɒs/']},
  
  // Water and R-colored Vowels
  {word:'water', ipa:'/ˈwɔːtər/', choices:['/ˈwɔːtər/','/ˈwɑːtər/','/ˈwætər/','/ˈweɪtər/']}, 
  {word:'mirror', ipa:'/ˈmɪrər/', choices:['/ˈmɪrər/','/ˈmɪrə/','/ˈmirə/','/ˈmɛrər/']} // JAWABAN BENAR GA (/ˈmɪrər/)
];

// state
let currentScreen = 1; // Start from screen 1
const QUESTIONS_PER_SCREEN = 3;
const TOTAL_SCREENS = QUESTIONS.length / QUESTIONS_PER_SCREEN; // 30 / 3 = 10 screens
const answers = new Array(QUESTIONS.length).fill(null);
const quizArea = document.getElementById('quiz-area');
const navigationControls = document.getElementById('navigation-controls'); // Get new control element
const timerEl = document.getElementById('timer');
let remaining = 1800; // 30 minutes in seconds
let warned = false;
let timerInterval = null;

// render function – show 3 questions based on currentScreen
function render() {
  quizArea.innerHTML = '';
  navigationControls.innerHTML = ''; // Clear navigation controls

  const startIndex = (currentScreen - 1) * QUESTIONS_PER_SCREEN;
  const endIndex = Math.min(startIndex + QUESTIONS_PER_SCREEN, QUESTIONS.length);

  // 1. Render Questions
  for(let i = startIndex; i < endIndex; i++){
    const q = QUESTIONS[i];
    const card = document.createElement('div'); card.className='card';
    // Use 'Screen X/10' as info
    const num = document.createElement('div'); num.className='question'; num.textContent = (i+1)+'. '+ q.word + ' (Screen ' + currentScreen + '/' + TOTAL_SCREENS + ')'; 
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
    const play = document.createElement('button'); 
    play.className='btn accent'; // Ubah kelas agar lebih menonjol
    play.textContent='Play Audio'; // Ubah teks tombol
    play.style.marginTop='10px';
    play.addEventListener('click', ()=>{ playWord(q.word); });
    
    card.appendChild(opts);
    card.appendChild(play);
    quizArea.appendChild(card);
  }

  // 2. Render Navigation Buttons
  
  // 'Go Back' Button: Only visible if not Screen 1
  if (currentScreen > 1) { 
    const prev = document.createElement('button');
    prev.id = 'prev';
    prev.className = 'btn ghost';
    prev.textContent = 'Go Back';
    prev.addEventListener('click', ()=>{ currentScreen--; render(); });
    navigationControls.appendChild(prev);
  }
  
  // 'Next' Button: Only visible if not the last Screen
  if (currentScreen < TOTAL_SCREENS) {
    const next = document.createElement('button');
    next.id = 'next';
    next.className = 'btn';
    next.textContent = 'Next';
    next.addEventListener('click', ()=>{ currentScreen++; render(); });
    navigationControls.appendChild(next);
  }

  // 'Submit' Button: Only visible on the last Screen
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

// audio player functions
const audioEl = document.getElementById('audio');
const playerTitle = document.getElementById('player-title');
// Menghapus event listener ini karena tombol di floating player tidak lagi dibutuhkan
/*
document.getElementById('play-word').addEventListener('click', ()=>{
  const w = document.getElementById('audio-word').value.trim();
  if(w) playWord(w);
});
*/

// Fungsi playWord yang lebih fleksibel mencari audio, memprioritaskan American Accent
function playWord(word){
    // HANYA tampilkan kata yang sedang dimainkan di floating player (opsional)
    playerTitle.textContent = word; 

    // fetch dari dictionaryapi.dev
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + encodeURIComponent(word))
    .then(r=>r.json())
    .then(data=>{
      // Pastikan data adalah array dan memiliki phonetics
      if(Array.isArray(data) && data[0].phonetics && data[0].phonetics.length){
            let audioSource = null;

            // Prioritas 1: Cari audio dengan tag US/American
            audioSource = data[0].phonetics.find(p => 
                p.audio && (p.audio.includes('-us') || p.audio.includes('us_'))
            );

            // Prioritas 2: Jika tidak ditemukan, cari phonetics yang memiliki 'text' dan link audio
            if (!audioSource) {
                audioSource = data[0].phonetics.find(p => p.audio && p.text);
            }

            // Prioritas 3: Jika masih tidak ditemukan, ambil saja audio pertama yang ada
            if (!audioSource) {
                audioSource = data[0].phonetics.find(p => p.audio);
            }

          if(audioSource && audioSource.audio){
            audioEl.src = audioSource.audio;
            audioEl.play().catch(()=>{
                // Catch error jika auto-play diblokir browser
            });
          } else {
                // Teks peringatan disederhanakan
                alert('Audio tidak ditemukan untuk ' + word + '.'); 
            }
      } else {
            alert('Data tidak ditemukan untuk ' + word + '.');
        }
    })
    .catch(()=>{ alert('Gagal mengambil data audio untuk '+word); });
}

// timer
function tick(){
  remaining--;
  if(remaining <= 0){ clearInterval(timerInterval); localStorage.setItem('quiz_answers', JSON.stringify(answers)); window.location.href='score.html'; return; }
  if(remaining <= 300 && !warned){ warned = true; alert('5 minutes remaining!'); } // Diterjemahkan
  const min = Math.floor(remaining/60).toString().padStart(2,'0');
  const sec = (remaining%60).toString().padStart(2,'0');
  timerEl.textContent = min+':'+sec;
}

// Initialization: Remove old event listeners and run initial render
render();
timerInterval = setInterval(tick,1000);

// draggable audio player
const player = document.getElementById('player');
player.addEventListener('dragstart',(e)=>{ e.dataTransfer.setData('text/plain',''); const rect = player.getBoundingClientRect(); e.dataTransfer.setDragImage(new Image(),0,0); player.style.opacity='0.6'; });
player.addEventListener('dragend',(e)=>{ player.style.opacity='1'; player.style.left = (e.pageX - 140) + 'px'; player.style.top = (e.pageY - 20) + 'px'; player.style.position='fixed'; });
document.getElementById('minimize').addEventListener('click', ()=>{ const body = document.querySelector('.player-body'); body.style.display = body.style.display === 'none' ? 'block' : 'none'; });