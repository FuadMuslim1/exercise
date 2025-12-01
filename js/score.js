// File: js/score.js

// =======================================================
// === SESSION CHECK (12 HOUR EXPIRATION) ===
// =======================================================

const EXPIRATION_TIME = 43200000; // 12 hours in ms (Harus didefinisikan di setiap file yang dilindungi)

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
// === KODE INTI SCORE ===================================
// =======================================================

// Array Jawaban Benar (disalin dari quiz.js agar skor dapat dihitung)
const LOCAL = [
    {word:'ship', ipa:'/ʃɪp/'},{word:'sheep',ipa:'/ʃiːp/'},{word:'beat',ipa:'/biːt/'},{word:'bit',ipa:'/bɪt/'},
    {word:'bed',ipa:'/bɛd/'},{word:'bad',ipa:'/bæd/'},{word:'father',ipa:'/ˈfɑːðər/'},{word:'lot',ipa:'/lɑt/'},
    {word:'thought',ipa:'/θɔːt/'},{word:'thin',ipa:'/θɪn/'},{word:'this',ipa:'/ðɪs/'},{word:'thing',ipa:'/θɪŋ/'},
    {word:'measure',ipa:'/ˈmɛʒər/'},{word:'judge',ipa:'/dʒʌdʒ/'},{word:'cake',ipa:'/keɪk/'},{word:'say',ipa:'/seɪ/'},
    {word:'go',ipa:'/ɡoʊ/'},{word:'no',ipa:'/noʊ/'},{word:'house',ipa:'/haʊs/'},{word:'boy',ipa:'/bɔɪ/'},
    {word:'put',ipa:'/pʊt/'},{word:'foot',ipa:'/fʊt/'},{word:'nurse',ipa:'/nɜːrs/'},{word:'bird',ipa:'/bɜːrd/'},
    {word:'happy',ipa:'/ˈhæpi/'},{word:'camera',ipa:'/ˈkæmərə/'},{word:'orange',ipa:'/ˈɔːrəndʒ/'},{word:'gas',ipa:'/ɡæs/'},
    {word:'water',ipa:'/ˈwɔːtər/'},{word:'mirror',ipa:'/ˈmɪrər/'}
];

// Ambil Data dari Local Storage (Menggunakan kunci baru: 'quizAnswers' dan 'currentUserName')
const storedAnswers = localStorage.getItem('quizAnswers');
const name = localStorage.getItem('currentUserName') || 'Student'; // Menggunakan kunci baru

document.getElementById('name').textContent = name;

let answers = [];
try { 
    answers = storedAnswers ? JSON.parse(storedAnswers) : []; 
} catch(e) { 
    answers = []; 
}

// Logika PENTING: Jika tidak ada jawaban, alihkan untuk mencegah error
if (answers.length === 0 || answers.length < LOCAL.length) {
    alert('Data kuis tidak lengkap atau tidak ditemukan. Mohon ulangi kuis.');
    window.location.href = 'rules.html'; // Mengalihkan ke halaman aturan
    throw new Error("Missing quiz data.");
}


// --- Proses Penghitungan Skor ---
let correct = 0;
for(let i = 0; i < LOCAL.length; i++){
    const right = LOCAL[i].ipa;
    const given = answers[i];
    if(given && given === right) {
        correct++;
    }
}

const totalQuestions = LOCAL.length;
const percent = Math.round((correct / totalQuestions) * 100);

// Ambil elemen untuk menampilkan hasil
const scoreEl = document.getElementById('score');
const gradeEl = document.getElementById('grade');
const correctCountEl = document.getElementById('correct-count');

// Tampilkan jumlah benar/total
correctCountEl.textContent = `Jawaban Benar: ${correct} / ${totalQuestions}`;


// --- Animasi Hitung Skor (Count-up animation) ---
let start = 0; 
const duration = 1200; 
let startTime = null;

function animate(now){
    if(!startTime) startTime = now;
    const t = Math.min(1, (now - startTime) / duration);
    const val = Math.round(start + (percent - start) * t);
    scoreEl.textContent = val + '%';
    
    // Perbarui warna berdasarkan persentase saat animasi berjalan
    scoreEl.style.color = (val >= 75) ? '#065f46' : (val >= 60 ? '#f59e0b' : '#dc2626');

    if(t < 1) {
        requestAnimationFrame(animate); 
    } else {
        finalize();
    }
}

function finalize(){
    // Tentukan Grade
    let g = 'D (Kurang)';
    if(percent >= 90) g = 'A (Sangat Baik)'; 
    else if(percent >= 75) g = 'B (Baik)'; 
    else if(percent >= 60) g = 'C (Cukup)';
    
    gradeEl.textContent = 'Grade: ' + g;

    // --- Tampilkan Kunci Jawaban ---
    const key = document.getElementById('key');
    key.innerHTML = ''; // Kosongkan placeholder

    LOCAL.forEach((q, idx) => {
        const li = document.createElement('li');
        const given = answers[idx] || '(Tidak Dijawab)';
        const isCorrect = (given === q.ipa);
        
        // Tambahkan styling
        li.style.color = isCorrect ? '#065f46' : '#dc2626'; // Hijau untuk benar, Merah untuk salah
        li.style.fontWeight = isCorrect ? 'bold' : 'normal';

        li.innerHTML = `
            ${idx + 1}. 
            <strong>${q.word}</strong> — Benar: ${q.ipa} — Jawaban Anda: ${given}
            ${!isCorrect && given !== '(Tidak Dijawab)' ? ' (SALAH)' : ''}
        `;
        key.appendChild(li);
    });
    
    // !!! PENTING: Hapus semua data progres kuis setelah skor final ditampilkan !!!
    localStorage.removeItem('quizAnswers');
    localStorage.removeItem('quizIndex');
    localStorage.removeItem('timeLeft');
}

// Mulai animasi
requestAnimationFrame(animate);

// --- Event Listeners untuk Navigasi ---
document.getElementById('home').addEventListener('click', () => { 
    // Kembali ke home (login screen)
    window.location.href = 'index.html'; 
});

document.getElementById('retry').addEventListener('click', () => { 
    // Mulai ulang dari rules (semua data progres sudah dihapus di finalize())
    window.location.href = 'rules.html'; 
});