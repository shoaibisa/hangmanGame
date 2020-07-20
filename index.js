const wordElement = document.getElementById('word');
const wrongLetterEl = document.getElementById('wrong-letters');
const playAgainBt = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figurParts = document.querySelectorAll('.figur-part');

//  vocbulary
 const words=['rice', 'programming','instrument','application','freak','fallout','pandemic','confederate','justice','movement','earth','anthropocene','database','system','advantage','clucter','cosmos','entire','instance','interface','query'];

 let selectedWord = words[Math.floor(Math.random()*words.length)];
 
 
  const correctLetters =[];
  const wrongLetters =[];

//   showing hidden word
function displayWord() {
    wordElement.innerHTML = `
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
        

    //removing newlines
    const innerWord = wordElement.innerText.replace(/\n/g,'');
   
    if(innerWord===selectedWord){
        finalMessage.innerText='Congratulation! you won! 😀';
        popup.style.display='flex';
    }
    }

   

    //show notification
    function showNotification(){
        notification.classList.add('show');

        setTimeout(()=>{
            notification.classList.remove('show');
        }, 2000);
    }

      //updatiing letter wrong word
     function updatewrongEl(){
        //  display wrong letter
        wrongLetterEl.innerHTML = `
         ${wrongLetters.length>0 ? '<p>Wrong</P>' : '' }
         ${wrongLetters.map(letter =>`<span>${letter}</span>` )}
        `;

        // display hangman
       figurParts.forEach((part,index)=>{
           const error = wrongLetters.length;
           if(index<error){
               part.style.display='block';
           }else{
               part.style.display = 'none';
           }
       });

    //    checking lost
     if(wrongLetters.length===figurParts.length){
        finalMessage.innerText='Oops! you lost. 😌';
        popup.style.display='flex';
     }
    }

   //pressing keybord
   window.addEventListener('keydown', e=>
   {
      if(e.keyCode>= 65 && e.keyCode<=90){
          const letter =e.key;
          if(selectedWord.includes(letter))
          {
            if(!correctLetters.includes(letter)){
             correctLetters.push(letter);

             displayWord();
            }
          else{

              showNotification();
          }
      }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updatewrongEl();
            }else{
                showNotification(); 
            }
      }
    }
   });

//    restasrt the game

  playAgainBt.addEventListener('click',e =>{
      //Empty arrays
      correctLetters.splice(0);
      wrongLetters.splice(0);
      selectedWord = words[Math.floor(Math.random()*words.length)];
      displayWord();
      updatewrongEl();
      popup.style.display='none';
  })

 displayWord();




 //keyboard js
 $(function(){
	var $write = $('#write'),
		shift = false,
		capslock = false;
	
	$('#keyboard li').click(function(){
		var $this = $(this),
			character = $this.html(); // If it's a lowercase letter, nothing happens to this variable
		
		
		
		// Caps lock
		if ($this.hasClass('capslock')) {
			$('.letter').toggleClass('uppercase');
			capslock = true;
			return false;
		}
		
		// Delete
		if ($this.hasClass('delete')) {
			var html = $write.html();
			
			$write.html(html.substr(0, html.length - 1));
			return false;
		}
		
		// Special characters
		if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
		if ($this.hasClass('space')) character = ' ';
		if ($this.hasClass('tab')) character = "\t";
		if ($this.hasClass('return')) character = "\n";
		
		// Uppercase letter
		if ($this.hasClass('uppercase')) character = character.toUpperCase();
		
		// Remove shift once a key is clicked.
		if (shift === true) {
			$('.symbol span').toggle();
			if (capslock === false) $('.letter').toggleClass('uppercase');
			
			shift = false;
		}
		
		// Add the character
        $write.html($write.html() + character);
    

        

        //game starts here

        if((character==='a')||(character==='b')||(character==='c')||(character==='d')||(character==='e')||(character==='f')||(character==='g')||(character==='h')||(character==='i')||(character==='j')||(character==='k')||(character==='l')||(character==='m')||(character==='n')||(character==='o')||(character==='p')||(character==='q')||(character==='r')||(character==='s')||(character==='t')||(character==='u')||(character==='v')||(character==='x')||(character==='y')||(character==='z')){
          const letter =character;
          if(selectedWord.includes(letter))
          {
            if(!correctLetters.includes(letter)){
             correctLetters.push(letter);

             displayWord();
            }
          else{

              showNotification();
          }
      }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updatewrongEl();
            }else{
                showNotification(); 
            }
      }
    }

    
	});
});