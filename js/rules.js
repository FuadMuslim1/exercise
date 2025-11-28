// rules.js
document.getElementById('back').addEventListener('click',()=>{window.location.href='index.html';});
document.getElementById('start').addEventListener('click',()=>{
  // ensure name present
  const name = localStorage.getItem('quiz_name');
  if(!name){ alert('Name not found. Please login again.'); window.location.href='index.html'; return; }
  // start -> quiz
  window.location.href = 'quiz.html';
});