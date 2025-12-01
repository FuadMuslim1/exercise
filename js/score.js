// js/score.js

// Array Jawaban Benar (disalin dari quiz.js agar skor dapat dihitung)
// js/score.js
// Array LOCAL - Transkripsi IPA yang Benar (American English - GA)
const LOCAL = [
    {word:'ship', ipa:'/ʃɪp/'},{word:'sheep',ipa:'/ʃiːp/'},{word:'beat',ipa:'/biːt/'},{word:'bit',ipa:'/bɪt/'},
    {word:'bed',ipa:'/bɛd/'},{word:'bad',ipa:'/bæd/'},{word:'father',ipa:'/ˈfɑːðər/'},{word:'lot',ipa:'/lɑt/'}, // <--- DIBUAT GA
    {word:'thought',ipa:'/θɔːt/'},{word:'thin',ipa:'/θɪn/'},{word:'this',ipa:'/ðɪs/'},{word:'thing',ipa:'/θɪŋ/'},
    {word:'measure',ipa:'/ˈmɛʒər/'},{word:'judge',ipa:'/dʒʌdʒ/'},{word:'cake',ipa:'/keɪk/'},{word:'say',ipa:'/seɪ/'},
    {word:'go',ipa:'/ɡoʊ/'},{word:'no',ipa:'/noʊ/'},{word:'house',ipa:'/haʊs/'},{word:'boy',ipa:'/bɔɪ/'},
    {word:'put',ipa:'/pʊt/'},{word:'foot',ipa:'/fʊt/'},{word:'nurse',ipa:'/nɜːrs/'},{word:'bird',ipa:'/bɜːrd/'}, // <--- DIBUAT GA
    {word:'happy',ipa:'/ˈhæpi/'},{word:'camera',ipa:'/ˈkæmərə/'},{word:'orange',ipa:'/ˈɔːrəndʒ/'},{word:'gas',ipa:'/ɡæs/'}, // <--- DIBUAT GA
    {word:'water',ipa:'/ˈwɔːtər/'},{word:'mirror',ipa:'/ˈmɪrər/'} // <--- DIBUAT GA
];

// Ambil Data dari Local Storage
const stored = localStorage.getItem('quiz_answers');
const name = localStorage.getItem('quiz_name') || 'Student'; // Menggunakan nama jika disimpan

document.getElementById('name').textContent = name;

let answers = [];
try { 
    answers = stored ? JSON.parse(stored) : []; 
} catch(e) { 
    answers = []; 
}

// ⚠️ Logika PENTING: Jika tidak ada jawaban, kembali ke halaman kuis (pencegahan)
if (answers.length === 0 || answers.length < LOCAL.length) {
    alert('Data kuis tidak lengkap atau tidak ditemukan. Silakan coba lagi.');
    window.location.href = 'rules.html'; // Mengalihkan ke halaman awal kuis
    // Kita hentikan eksekusi script selanjutnya
}


// --- Proses Penghitungan Skor ---
let correct = 0;
for(let i = 0; i < LOCAL.length; i++){
    const right = LOCAL[i].ipa;
    const given = answers[i];
    // Cek: Jawaban harus ada (tidak null) DAN harus sama dengan IPA yang benar
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
    
    // Setelah selesai, hapus data kuis dari Local Storage (opsional, tapi disarankan)
    // localStorage.removeItem('quiz_answers');
}

// Mulai animasi
requestAnimationFrame(animate);

// --- Event Listeners untuk Navigasi ---
document.getElementById('home').addEventListener('click', () => { 
    // Bersihkan jawaban sebelum kembali ke home
    localStorage.removeItem('quiz_answers'); 
    window.location.href = 'index.html'; 
});

document.getElementById('retry').addEventListener('click', () => { 
    // Bersihkan jawaban dan mulai ulang dari rules
    localStorage.removeItem('quiz_answers'); 
    window.location.href = 'rules.html'; 
});