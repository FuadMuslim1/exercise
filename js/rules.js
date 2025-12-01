// File: js/rules.js (Ganti SELURUH isi file Anda dengan kode ini)

// =======================================================
// === 1. SESSION CHECK (12 HOUR EXPIRATION) ===
// =======================================================

const EXPIRATION_TIME = 43200000; // 12 hours in ms

function checkAuthAndExpiration() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loginTimestamp = localStorage.getItem('loginTimestamp');
    
    // Cek 1: Login Status
    if (isLoggedIn !== 'true' || !loginTimestamp) {
        returnToLogin("Sesi tidak ditemukan. Mohon login terlebih dahulu.");
        return false;
    }

    // Cek 2: Time Expiry
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

// PANGGIL FUNGSI INI SEGERA!
if (!checkAuthAndExpiration()) {
    // Hentikan eksekusi jika autentikasi gagal
    throw new Error("Authentication failed, redirected to login.");
}

// =======================================================
// === 2. EVENT LISTENERS (LOGIKA TOMBOL) ===
// =======================================================

// Handle 'Start' button click
const startButton = document.getElementById('start');

if (startButton) { // PASTIKAN ELEMEN DITEMUKAN
    startButton.addEventListener('click', () => {
        
        // Pastikan nama hadir (seharusnya sudah dijamin oleh checkAuth, ini hanya pengaman)
        const name = localStorage.getItem('currentUserName');
        if (!name) { 
            alert('User name not found. Please log in again.'); 
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('loginTimestamp');
            window.location.href = 'index.html'; 
            return; 
        }
        
        // --- LOGIKA ENHANCED: Check for Saved Progress ---
        const savedScreen = localStorage.getItem('currentScreen'); 
        
        if (savedScreen !== null && parseInt(savedScreen) > 1) { 
            // Progres ditemukan! Tanya pengguna apakah ingin melanjutkan
            const confirmResume = confirm("Progress found! Would you like to resume your quiz from the last question?");
            
            if (confirmResume) {
                window.location.href = 'quiz.html';
                return;
            } else {
                // Pengguna memilih mulai baru: Hapus data progres/timer yang lama
                localStorage.removeItem('currentScreen');
                localStorage.removeItem('quizAnswers');
                localStorage.removeItem('timeLeft');
            }
        }
        
        // Start the quiz -> redirect to quiz.html
        window.location.href = 'quiz.html';
    });
}