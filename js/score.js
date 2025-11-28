// score.js
const LOCAL = [
  {word:'ship', ipa:'/ʃɪp/'},{word:'sheep',ipa:'/ʃiːp/'},{word:'beat',ipa:'/biːt/'},{word:'bit',ipa:'/bɪt/'},
  {word:'bed',ipa:'/bɛd/'},{word:'bad',ipa:'/bæd/'},{word:'father',ipa:'/ˈfɑːðər/'},{word:'lot',ipa:'/lɒt/'},
  {word:'thought',ipa:'/θɔːt/'},{word:'thin',ipa:'/θɪn/'},{word:'this',ipa:'/ðɪs/'},{word:'thing',ipa:'/θɪŋ/'},
  {word:'measure',ipa:'/ˈmɛʒər/'},{word:'judge',ipa:'/dʒʌdʒ/'},{word:'cake',ipa:'/keɪk/'},{word:'say',ipa:'/seɪ/'},
  {word:'go',ipa:'/ɡoʊ/'},{word:'no',ipa:'/noʊ/'},{word:'house',ipa:'/haʊs/'},{word:'boy',ipa:'/bɔɪ/'},
  {word:'put',ipa:'/pʊt/'},{word:'foot',ipa:'/fʊt/'},{word:'nurse',ipa:'/nɜːrs/'},{word:'bird',ipa:'/bɜːd/'},
  {word:'happy',ipa:'/ˈhæpi/'},{word:'camera',ipa:'/ˈkæmərə/'},{word:'orange',ipa:'/ˈɒrɪndʒ/'},{word:'gas',ipa:'/ɡæs/'},
  {word:'water',ipa:'/ˈwɔːtər/'},{word:'mirror',ipa:'/ˈmɪrə/'}
];
const stored = localStorage.getItem('quiz_answers');
const name = localStorage.getItem('quiz_name') || 'Student';
document.getElementById('name').textContent = name;

let answers = [];
try{ answers = stored ? JSON.parse(stored) : []; }catch(e){ answers = []; }

let correct = 0;
for(let i=0;i<LOCAL.length;i++){
  const right = LOCAL[i].ipa;
  const given = answers[i];
  if(given && given === right) correct++;
}
const percent = Math.round((correct/LOCAL.length)*100);
const scoreEl = document.getElementById('score');
const gradeEl = document.getElementById('grade');

// count-up animation
let start = 0; const duration=1200; let startTime = null;
function animate(now){
  if(!startTime) startTime = now;
  const t = Math.min(1,(now-startTime)/duration);
  const val = Math.round(start + (percent-start)*t);
  scoreEl.textContent = val + '%';
  if(t<1) requestAnimationFrame(animate); else finalize();
}
function finalize(){
  let g='D';
  if(percent>=90) g='A'; else if(percent>=75) g='B'; else if(percent>=60) g='C';
  gradeEl.textContent = 'Grade: '+g;
  // fill key
  const key = document.getElementById('key');
  key.innerHTML = '';
  LOCAL.forEach((q,idx)=>{
    const li = document.createElement('li');
    const given = answers[idx] || '(no answer)';
    li.innerHTML = '<strong>'+q.word+'</strong> — correct: '+q.ipa+' — your: '+given;
    if(given === q.ipa) li.style.color = '#065f46';
    key.appendChild(li);
  });
}
requestAnimationFrame(animate);

document.getElementById('home').addEventListener('click', ()=>{ window.location.href='index.html'; });
document.getElementById('retry').addEventListener('click', ()=>{ localStorage.removeItem('quiz_answers'); window.location.href='rules.html'; });