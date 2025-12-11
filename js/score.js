// File: js/score.js

// =======================================================
// === SESSION CHECK (12 HOUR EXPIRATION) ===
// =======================================================

const EXPIRATION_TIME = 43200000; // 12 hours in ms (Must be defined in each protected file)

function checkAuthAndExpiration() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loginTimestamp = localStorage.getItem('loginTimestamp');
    
    // Check login status and existence of timestamp
    if (isLoggedIn !== 'true' || !loginTimestamp) {
        returnToLogin("Session not found. Please log in first.");
        return false;
    }

    // Check expiration time
    const currentTime = Date.now();
    const timeElapsed = currentTime - parseInt(loginTimestamp);

    if (timeElapsed > EXPIRATION_TIME) {
        localStorage.clear(); 
        returnToLogin("Your session has expired (12 hours). Please log in again.");
        return false;
    }
    return true; 
}

function returnToLogin(message) {
    alert(message);
    window.location.href = "index.html";
}

// CALL THIS FUNCTION BEFORE ANY OTHER CODE
if (!checkAuthAndExpiration()) {
    // Stop execution if authentication fails
    throw new Error("Authentication failed, redirected to login.");
}

// =======================================================
// === SCORE LOGIC =======================================
// =======================================================

// Correct Answers Array (copied from quiz.js to calculate score)
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

// Retrieve stored answers and current user name
const storedAnswers = localStorage.getItem('quizAnswers');
const name = localStorage.getItem('currentUserName') || 'Student';

document.getElementById('name').textContent = name;

let answers = [];
try { 
    answers = storedAnswers ? JSON.parse(storedAnswers) : []; 
} catch(e) { 
    answers = []; 
}

// IMPORTANT LOGIC: Redirect if no answers to prevent errors
if (answers.length === 0 || answers.length < LOCAL.length) {
    alert('Quiz data is incomplete or not found. Please retake the quiz.');
    window.location.href = 'rules.html'; // Redirect to rules page
    throw new Error("Missing quiz data.");
}

// --- Score Calculation ---
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

// Elements to display results
const scoreEl = document.getElementById('score');
const gradeEl = document.getElementById('grade');
const correctCountEl = document.getElementById('correct-count');

// Display correct answers / total
correctCountEl.textContent = `Correct Answers: ${correct} / ${totalQuestions}`;

// --- Score Count-up Animation ---
let start = 0; 
const duration = 1200; 
let startTime = null;

function animate(now){
    if(!startTime) startTime = now;
    const t = Math.min(1, (now - startTime) / duration);
    const val = Math.round(start + (percent - start) * t);
    scoreEl.textContent = val + '%';
    
    // Update color based on percentage
    scoreEl.style.color = (val >= 75) ? '#065f46' : (val >= 60 ? '#f59e0b' : '#dc2626');

    if(t < 1) {
        requestAnimationFrame(animate); 
    } else {
        finalize();
    }
}

function finalize(){
    // Determine Grade
    let g = 'D (Poor)';
    if(percent >= 90) g = 'A (Excellent)'; 
    else if(percent >= 75) g = 'B (Good)'; 
    else if(percent >= 60) g = 'C (Fair)';
    
    gradeEl.textContent = 'Grade: ' + g;

    // --- Display Answer Key ---
    const key = document.getElementById('key');
    key.innerHTML = ''; // Clear placeholder

    LOCAL.forEach((q, idx) => {
        const li = document.createElement('li');
        const given = answers[idx] || '(Not Answered)';
        const isCorrect = (given === q.ipa);
        
        // Add styling
        li.style.color = isCorrect ? '#065f46' : '#dc2626'; // Green for correct, Red for incorrect
        li.style.fontWeight = isCorrect ? 'bold' : 'normal';

        li.innerHTML = `
            ${idx + 1}. 
            <strong>${q.word}</strong> — Correct: ${q.ipa} — Your Answer: ${given}
            ${!isCorrect && given !== '(Not Answered)' ? ' (WRONG)' : ''}
        `;
        key.appendChild(li);
    });
    
    // !!! IMPORTANT: Clear all quiz progress data after final score is displayed !!!
    localStorage.removeItem('quizAnswers');
    localStorage.removeItem('quizIndex');
    localStorage.removeItem('timeLeft');
}

// Start animation
requestAnimationFrame(animate);

// --- Navigation Event Listeners ---
document.getElementById('home').addEventListener('click', () => { 
    window.location.href = 'index.html'; 
});

document.getElementById('retry').addEventListener('click', () => { 
    window.location.href = 'rules.html'; 
});
