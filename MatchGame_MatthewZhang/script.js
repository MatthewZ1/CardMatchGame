function initialize(){
   let cards = Array.from(document.getElementsByClassName('card'));
   cards.forEach(card => {
    card.addEventListener('click', () => {
       game.flipCard(card);
    });
   });
   let game = new Game(cards);
}

class Game{
    constructor(cards){
        this.cardsArray = cards;
        this.flipsOutput = document.getElementById('flips');   
        this.encoruagementOutput = document.getElementById('encouragement');
        this.winOutput = document.getElementById('win');
        this.totalClicks = 0;
        this.shuffleCards();
        this.matchedCards = [];
    }
    startGame(){
        this.secondCard = null;
        this.totalClicks = 0;
        this.activated = false;
        this.shuffleCards();
    }
    canFlipCard(card){
        return !this.activated && !this.matchedCards.includes(card) && card !== this.secondCard;    
    }
    flipCard(card){
        if(this.canFlipCard(card)){
            this.totalClicks++;
            this.flipsOutput.innerHTML = this.totalClicks;
            card.classList.add('visible');

            if(this.secondCard){
                this.checkCardMatch(card);
            }
            else{
                this.secondCard = card;
            }
        }
    }
    shuffleCards() {
        for(let i = this.cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }
    checkCardMatch(card){
        if(this.getCardType(card) === this.getCardType(this.secondCard)){
            this.cardMatch(card, this.secondCard);
        }
        else{
            this.cardMisMatch(card, this.secondCard);
        }
        this.secondCard = null;
        this.generateMessage();
    }
    cardMatch(cardOne, cardTwo){
        this.matchedCards.push(cardOne);
        this.matchedCards.push(cardTwo);
        cardOne.classList.add('matched');
        cardTwo.classList.add('matched');
        if(this.matchedCards.length === this.cardsArray.length){
            this.win();
        }
    }
    cardMisMatch(cardOne, cardTwo){
        this.activated = true;
        setTimeout(() => {
            cardOne.classList.remove('visible');
            cardTwo.classList.remove('visible');
            this.activated = false;
        }, 1000);
    }
    getCardType(card){
        return card.getElementsByClassName('cv')[0].src;
    }
    win(){
        this.winOutput.innerHTML = "You Win!";
    }
    generateMessage(){
        this.encoruagementOutput.innerHTML = (this.totalClicks < 20)
                                                ?"You're doing great!"
                                                : (this.totalClicks < 35)
                                                ?"You got this!"
                                                :"Um..."
    }
}
function reset(){
    location.reload();
}

function initialize2(){
    instructionsOutput = document.getElementById('instructions');
    instructionsOutput.innerHTML = "Instructions (Click Me!)";
}
let instruction = "To play a matching game, click two images at a time and if they match, you continue until you get all the cards are face up. Good luck!";
function instructionsDisplay(){
    instructionsOutput.innerHTML = `${instruction}`;
    console.log(`${instruction}`);
}