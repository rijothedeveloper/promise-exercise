class Card {
    cardId = 0;
    rotation = 0;
    constructor() {
        axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(response => {
            this.cardId = response.data.deck_id
            console.log(this.cardId);
            this.getNewCard()
        })                                                             
    }

    getNewCard() {
        axios.get(`http://deckofcardsapi.com/api/deck/${this.cardId}/draw/?count=1`)
            .then(response => {
                const card = response.data.cards[0]
                console.log(card.value)
                console.log(card.suit)
                return axios.get(`http://deckofcardsapi.com/api/deck/${this.cardId}/draw/?count=1`)
            })
            .then(response => {
                const card = response.data.cards[0]
                console.log(card.value)
                console.log(card.suit)
            })
    }

    appendCardImage() {
        axios.get(`http://deckofcardsapi.com/api/deck/${this.cardId}/draw/?count=1`)
            .then(response => {
                const card = response.data.cards[0]
                const newImg = document.createElement("img");
                newImg.style.position = "absolute";
                newImg.style.top = "60px"
                newImg.style.left = "100px"
                newImg.style.transform = `rotate(${this.rotation}deg)`;
                this.rotation += 30;
                newImg.setAttribute("src", card.image)
                document.getElementById("img-section").appendChild(newImg)
            })
    }

}

const card = new Card();
const newButton = document.getElementById("new-card");
newButton.addEventListener("click", event => {
    card.appendCardImage()
})