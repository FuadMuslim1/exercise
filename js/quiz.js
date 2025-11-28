// quiz.js
// Questions array - 30 items focusing on IPA tricky contrasts
const QUESTIONS = [
  // Vowel Contrasts (i: vs ɪ, e vs æ, ɑ: vs ʌ, ɔ: vs ɒ/ɑ)
  {word:'ship', ipa:'/ʃɪp/', choices:['/ʃɪp/','/sɪp/','/ʃiːp/','/tʃɪp/']},
  {word:'sheep', ipa:'/ʃiːp/', choices:['/ʃiːp/','/ʃɪp/','/siːp/','/tʃiːp/']},
  {word:'beat', ipa:'/biːt/', choices:['/bɪt/','/biːt/','/beɪt/','/bæt/']},
  {word:'bit', ipa:'/bɪt/', choices:['/bɪt/','/biːt/','/bət/','/bɛt/']},
  {word:'bed', ipa:'/bɛd/', choices:['/bæd/','/bɪd/','/bɛd/','/beɪd/']},
  {word:'bad', ipa:'/bæd/', choices:['/bæd/','/bɑːd/','/bɛd/','/beɪd/']}, // Vowel /æ/
  {word:'father', ipa:'/ˈfɑːðər/', choices:['/ˈfɑːðər/','/ˈfɔːðər/','/ˈfɑːtər/','/ˈfɛðər/']},
  {word:'lot', ipa:'/lɑːt/', choices:['/lɑːt/','/ɒl/','/læt/','/ɔːl/']}, // Using /ɑː/ for American English (Father-Lot Merger)
  {word:'thought', ipa:'/θɔːt/', choices:['/θɑːt/','/θɔːt/','/θaʊt/','/tɔːt/']}, // Using /ɔː/ or /ɑː/ (depends on dialect, using common /ɔː/)
  
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
  {word:'nurse', ipa:'/nɜːrs/', choices:['/nɜːrs/','/nɪrs/','/nɔːrs/','/nʌrs/']}, // American English R-colored vowel /ɜːr/
  {word:'bird', ipa:'/bɜːd/', choices:['/bɜːd/','/bɪrd/','/bəd/','/bɛrd/']}, // American English R-colored vowel /ɜːd/
  
  // Schwa (ə) and Stress (ˈ) in multi-syllable words
  {word:'happy', ipa:'/ˈhæpi/', choices:['/ˈhæpi/','/ˈhapi/','/ˈheɪpi/','/ˈhɪpi/']},
  {word:'camera', ipa:'/ˈkæmərə/', choices:['/ˈkæmərə/','/kəˈmɛrə/','/ˈkamərə/','/ˈkæmər/']},
  {word:'orange', ipa:'/ˈɔːrɪndʒ/', choices:['/ˈɒrɪndʒ/','/ˈɔːrɪndʒ/','/ˈɔːrəndʒ/','/ˈɑːrəndʒ/']}, // Using /ˈɔːrɪndʒ/ or /ˈɑːrɪndʒ/ (depends on dialect), choosing /ˈɔːrɪndʒ/ for general use.
  
  // Vowel Contrasts (æ vs ɑː vs ɛ)
  {word:'gas', ipa:'/ɡæs/', choices:['/ɡæs/','/ɡɑːs/','/ɡɛs/','/ɡɒs/']},
  
  // Water and R-colored Vowels
  {word:'water', ipa:'/ˈwɔːtər/', choices:['/ˈwɔːtər/','/ˈwɑːtər/','/ˈwætər/','/ˈweɪtər/']}, // Using /ˈwɔːtər/ or /ˈwɑːtər/ (depends on dialect), choosing /ˈwɔːtər/ for general use.
  {word:'mirror', ipa:'/ˈmɪrər/', choices:['/ˈmɪrər/','/ˈmɪrə/','/ˈmirə/','/ˈmɛrər/']} // American English R-colored vowel
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
    const play = document.createElement('button'); play.className='btn ghost'; play.textContent='Play audio';
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
document.getElementById('play-word').addEventListener('click', ()=>{
  const w = document.getElementById('audio-word').value.trim();
  if(w) playWord(w);
});
function playWord(word){
  playerTitle.textContent = word;
  // fetch from dictionaryapi.dev
  fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + encodeURIComponent(word))
    .then(r=>r.json())
    .then(data=>{
      // try to set audio and show IPA if available
      if(Array.isArray(data) && data[0].phonetics && data[0].phonetics.length){
        const phon = data[0].phonetics.find(p=>p.audio) || data[0].phonetics[0];
        if(phon && phon.audio){
          audioEl.src = phon.audio;
          audioEl.play().catch(()=>{});
        }
      }
      // set title to include ipa if available
      const ipa = data[0].phonetic || (data[0].phonetics && data[0].phonetics[0] && data[0].phonetics[0].text) || '';
      if(ipa) playerTitle.textContent = word + ' ' + ipa;
    })
    .catch(()=>{ alert('Audio/IPA not found for '+word); });
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