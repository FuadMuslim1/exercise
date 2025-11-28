// login.js
document.getElementById('back').addEventListener('click',()=>{history.back();});
document.getElementById('login').addEventListener('click',()=> {
  const name = document.getElementById('name').value.trim();
  const pass = document.getElementById('password').value.trim();
  const error = document.getElementById('error');
  const PROMO = 'fuadmuslym';
  if(!name){ error.textContent='Please enter your name.'; return; }
  if(pass !== PROMO){ error.textContent='Password incorrect. Please check your IG promo password.'; return; }
  // success
  localStorage.setItem('quiz_name', name);
  window.location.href = 'rules.html';
});