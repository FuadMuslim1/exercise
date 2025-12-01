// File: login.js

// 1. VALID USER LIST AND PASSWORD
const validUsers = [
    "Elen Kustiawardani",
    "Andik Ibnu Ramadani",
    "Trio Kusuma Hari Utami",
    "Ollivia Niken Anggraini",
    "Afifah Nazhiifah",
    "Dhiya Firyal Muthi'",
    "Angga Aprianto",
    "Adzra Naila Najihah Krisna",
    "Andi Aisyah Muthmainnah",
    "Rahmattia Anzilla Nurhalija",
    "Nur Fitasari",
    "Milka Ulin Simarmata",
    "Margaretha Ariani Mulyono",
    "Maulana Habib",
    "Anastasia Rugun Christiany",
    "Muthia Syafitri",
    "Dina Maiatul Farihah",
    "Rahmatul Aini",
    "Dimas Apriliando Fahreza",
    "Rut Pebrina Tesalonika Br Siburian",
    "Natasya Ayuka Mutiara Zudya"
];

const validPassword = "fuadmuslym";

// 2. EXPIRATION LOGIC (12 hours in milliseconds)
const EXPIRATION_TIME = 43200000; // 12 * 60 * 60 * 1000

// 3. BACK BUTTON HANDLER (Uses the 'back' ID from your code)
document.getElementById('back').addEventListener('click', () => {
    history.back();
});

// 4. LOGIN BUTTON HANDLER (Uses the 'login' ID from your code)
document.getElementById('login').addEventListener('click', () => {
    // Assuming HTML IDs: 'name', 'password', 'error'
    const enteredUsername = document.getElementById('name').value.trim();
    const enteredPassword = document.getElementById('password').value.trim();
    const errorElement = document.getElementById('error');
    
    // Clear previous error message
    if (errorElement) {
        errorElement.textContent = ''; 
    }
    
    // --- VALIDATION ---
    if (!enteredUsername) { 
        if (errorElement) errorElement.textContent = 'Please enter your name.'; 
        return; 
    }
    
    const isUserValid = validUsers.includes(enteredUsername);

    if (!isUserValid) {
        if (errorElement) errorElement.textContent = 'User name not found. Please check the spelling of your name.'; 
        return; 
    }
    
    if (enteredPassword !== validPassword) { 
        if (errorElement) errorElement.textContent = 'Password incorrect. Please check your password.'; 
        return; 
    }
    
    // --- LOGIN SUCCESS ---
    
    // 1. Store login status and session timestamp (for 12-hour expiry)
    localStorage.setItem('isLoggedIn', 'true'); 
    localStorage.setItem('loginTimestamp', Date.now()); 
    
    // 2. Store the logged-in user's name
    localStorage.setItem('currentUserName', enteredUsername);
    
    alert(`Welcome, ${enteredUsername}! Login Successful.`);
    
    // 3. Check for existing quiz progress (quizIndex, score, timer) to determine the next page
    if (localStorage.getItem('quizIndex')) {
        window.location.href = "quiz.html"; // Resume quiz
    } else {
        window.location.href = 'rules.html'; // Start from rules
    }
});