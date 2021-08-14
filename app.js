const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

let rand= Math.floor(Math.random() * 14000);
let selectedWord= "";
fetch('words.txt')
    .then(function(res){
        return res.text();
    })
    .then( data => {
        let arr= data.split('\n');
        selectedWord=arr[rand];
        selectedWord= selectedWord.trim();
        displayWord();

    })
     


const correctLetters = [];
const wrongLetters = [];

function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
      )
      .join('')}
  `;
  const innerWord = wordEl.innerText.replace(/\n/g, '');
  if(innerWord === selectedWord) {
    finalMessage.innerText = 'Wygranko! ';
    popup.style.display='flex';
  }
}

function updateWrong(){
 wrongLettersEl.innerHTML= `
 ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
 ${wrongLetters.map(letter => `<span>${letter}</span>`)}
 `;

 figureParts.forEach( (part,index) => {
   const errors= wrongLetters.length;
   if(index<errors) {
     part.style.display ='block';
   } else {
     part.style.display= 'none';
   }
 });

 if(wrongLetters.length === figureParts.length){
   finalMessage.innerText =`Przegranko, słowo brzmi: "${selectedWord}"`;
   popup.style.display ='flex';
 }
}
function showNotification() {
  notification.classList.add('show');

  setTimeout(() =>{
    notification.classList.remove('show');
  }, 2000)
}

window.addEventListener('keydown', e => {
  if(e.keyCode >= 65 && e.keyCode <= 90 ){
    const letter = e.key;
    if(selectedWord.includes(letter)){
      if(!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification ();
      }
    } else {
      if(!wrongLetters.includes(letter)){
         wrongLetters.push(letter);

         updateWrong(letter);
      } else {
        showNotification();
      }
     
    }
  }
})
playAgainBtn.addEventListener('click', () => location.reload());
