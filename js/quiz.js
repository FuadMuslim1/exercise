// File: quiz.js

// [ ... Questions array - KEEP AS IS ... ]
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


// =======================================================
// === SESSION CHECK (12 HOUR EXPIRATION) ===
// =======================================================

const EXPIRATION_TIME = 43200000; // 12 hours in ms

function checkAuthAndExpiration() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loginTimestamp = localStorage.getItem('loginTimestamp');
    
    // Cek Status Login dan Keberadaan Timestamp
    if (isLoggedIn !== 'true' || !loginTimestamp) {
        returnToLogin("Sesi tidak ditemukan. Mohon login terlebih dahulu.");
        return false;
    }

    // Cek Waktu Kedaluwarsa
    const currentTime = Date.now();
    const timeElapsed = currentTime - parseInt(loginTimestamp);

    if (timeElapsed > EXPIRATION_TIME) {
        localStorage.clear(); 
        returnToLogin("Sesi Anda telah kedaluwarsa (12 jam). Mohon login kembali.");
        return false;
    }
    return true; 
}

function returnToLogin(message) {
    alert(message);
    window.location.href = "index.html";
}

// PANGGIL FUNGSI INI SEBELUM KODE LAIN BERJALAN
if (!checkAuthAndExpiration()) {
    // Stop execution if authentication fails
    throw new Error("Authentication failed, redirected to login.");
}

// =======================================================
// === STATE & CORE LOGIC ===
// =======================================================

// state
let currentScreen = 1; // Start from screen 1
let answers = new Array(QUESTIONS.length).fill(null);
let remaining = 1800; // 30 minutes in seconds (Initial default)
let warned = false;
let timerInterval = null;

const QUESTIONS_PER_SCREEN = 3;
const TOTAL_SCREENS = QUESTIONS.length / QUESTIONS_PER_SCREEN; // 30 / 3 = 10 screens
const quizArea = document.getElementById('quiz-area');
const navigationControls = document.getElementById('navigation-controls'); 
const timerEl = document.getElementById('timer');
const audioEl = document.getElementById('audio');
const playerTitle = document.getElementById('player-title');
const player = document.getElementById('player');


// --- NEW: PROGRESS MANAGEMENT FUNCTIONS ---

// Function to save current progress (screen, answers, time)
function saveProgress() {
    // Simpan screen saat ini (untuk melanjutkan navigasi)
    localStorage.setItem('currentScreen', currentScreen);
    
    // Simpan semua jawaban
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
    
    // Simpan sisa waktu (untuk melanjutkan timer)
    localStorage.setItem('timeLeft', remaining);
}


// Function to load progress and initialize
function loadProgress() {
    // 1. Load Answers
    const savedAnswers = localStorage.getItem('quizAnswers');
    if (savedAnswers) {
        // Ganti array answers default dengan yang tersimpan
        answers = JSON.parse(savedAnswers); 
    }

    // 2. Load Screen
    const savedScreen = localStorage.getItem('currentScreen');
    if (savedScreen) {
        // Lanjutkan dari screen yang tersimpan
        currentScreen = parseInt(savedScreen); 
    }
    
    // 3. Load Timer (HARUS DI-LOAD SEBELUM TIMER DIMULAI)
    const savedTime = localStorage.getItem('timeLeft');
    if (savedTime) {
        // Gunakan waktu yang tersimpan
        remaining = parseInt(savedTime); 
    } else {
        // Jika tidak ada data tersimpan, gunakan default 30 menit
        remaining = 1800;
    }

    // Mulai render dan timer
    render();
    startTimer();
}


// --- TIMER FUNCTION MODIFICATION ---
function startTimer() {
    // PASTIKAN HANYA ADA SATU TIMER BERJALAN
    if (timerInterval) clearInterval(timerInterval); 
    
    // Panggil tick() sekali untuk segera memperbarui tampilan timer
    tick();

    timerInterval = setInterval(tick, 1000);
}


function tick(){
    remaining--;
    
    // SAVE PROGRESS DI SETIAP TICK
    saveProgress(); 

    if(remaining <= 0){ 
        clearInterval(timerInterval); 
        // Gunakan key yang benar ('quizAnswers') saat submit
        localStorage.setItem('quizAnswers', JSON.stringify(answers)); 
        window.location.href='score.html'; 
        return; 
    }
    if(remaining <= 300 && !warned){ 
        warned = true; 
        alert('5 minutes remaining!'); 
    } 
    const min = Math.floor(remaining/60).toString().padStart(2,'0');
    const sec = (remaining%60).toString().padStart(2,'0');
    timerEl.textContent = min+':'+sec;
}


// --- RENDER FUNCTION MODIFICATION ---
function render() {
    // ... (Keep existing rendering logic for questions) ...
    quizArea.innerHTML = '';
    navigationControls.innerHTML = ''; 

    const startIndex = (currentScreen - 1) * QUESTIONS_PER_SCREEN;
    const endIndex = Math.min(startIndex + QUESTIONS_PER_SCREEN, QUESTIONS.length);

    // 1. Render Questions
    for(let i = startIndex; i < endIndex; i++){
        const q = QUESTIONS[i];
        const card = document.createElement('div'); card.className='card';
        const num = document.createElement('div'); num.className='question'; num.textContent = (i+1)+'. '+ q.word + ' (Screen ' + currentScreen + '/' + TOTAL_SCREENS + ')'; 
        card.appendChild(num);
        const opts = document.createElement('div'); opts.className='options';
        q.choices.forEach(opt => {
            const o = document.createElement('div'); o.className='option'; o.textContent = opt;
            if(answers[i] === opt) o.classList.add('selected');
            o.addEventListener('click', ()=>{
                answers[i] = opt;
                // SAVE PROGRESS SAAT JAWABAN BERUBAH
                saveProgress(); 
                render(); // Re-render to show new selection
            });
            opts.appendChild(o);
        });
        
        const play = document.createElement('button'); 
        play.className='btn accent'; 
        play.textContent='Play Audio'; 
        play.style.marginTop='10px';
        play.addEventListener('click', ()=>{ playWord(q.word); });
        
        card.appendChild(opts);
        card.appendChild(play);
        quizArea.appendChild(card);
    }

    // 2. Render Navigation Buttons
    
    // 'Go Back' Button
    if (currentScreen > 1) { 
        const prev = document.createElement('button');
        prev.id = 'prev';
        prev.className = 'btn ghost';
        prev.textContent = 'Go Back';
        prev.addEventListener('click', ()=>{ 
            currentScreen--; 
            saveProgress(); // SAVE PROGRESS SAAT PINDAH SCREEN
            render(); 
        });
        navigationControls.appendChild(prev);
    }
    
    // 'Next' Button
    if (currentScreen < TOTAL_SCREENS) {
        const next = document.createElement('button');
        next.id = 'next';
        next.className = 'btn';
        next.textContent = 'Next';
        next.addEventListener('click', ()=>{ 
            currentScreen++; 
            saveProgress(); // SAVE PROGRESS SAAT PINDAH SCREEN
            render(); 
        });
        navigationControls.appendChild(next);
    }

    // 'Submit' Button
    if (currentScreen === TOTAL_SCREENS) {
        const submit = document.createElement('button');
        submit.id = 'submit';
        submit.className = 'btn accent';
        submit.textContent = 'Submit';
        submit.addEventListener('click', ()=>{ 
            if(confirm('Submit your answers now?')){ 
                // Gunakan key yang benar ('quizAnswers')
                localStorage.setItem('quizAnswers', JSON.stringify(answers)); 
                // Hapus data progres/timer agar kuis berikutnya dimulai dari awal
                localStorage.removeItem('currentScreen');
                localStorage.removeItem('timeLeft');
                clearInterval(timerInterval);

                window.location.href='score.html'; 
            } 
        });
        navigationControls.appendChild(submit);
    }
}

// --- Audio Functions (KEEP AS IS) ---
function playWord(word){
    // [ ... (Audio fetch and play logic remains the same) ... ]
    playerTitle.textContent = word; 

    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + encodeURIComponent(word))
    .then(r=>r.json())
    .then(data=>{
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
            });
          } else {
            alert('Audio tidak ditemukan untuk ' + word + '.'); 
        }
      } else {
            alert('Data tidak ditemukan untuk ' + word + '.');
        }
    })
    .catch(()=>{ alert('Gagal mengambil data audio untuk '+word); });
}

// --- Drag/Minimize Player (KEEP AS IS) ---
// [ ... (Drag and minimize logic remains the same) ... ]
player.addEventListener('dragstart',(e)=>{ e.dataTransfer.setData('text/plain',''); const rect = player.getBoundingClientRect(); e.dataTransfer.setDragImage(new Image(),0,0); player.style.opacity='0.6'; });
player.addEventListener('dragend',(e)=>{ player.style.opacity='1'; player.style.left = (e.pageX - 140) + 'px'; player.style.top = (e.pageY - 20) + 'px'; player.style.position='fixed'; });
document.getElementById('minimize').addEventListener('click', ()=>{ const body = document.querySelector('.player-body'); body.style.display = body.style.display === 'none' ? 'block' : 'none'; });

// =======================================================
// === INITIALIZATION ===
// =======================================================

// Ganti inisialisasi lama dengan fungsi loadProgress()
loadProgress();