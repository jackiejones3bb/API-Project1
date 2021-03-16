const card1 = document.getElementById('card1')
const card2 = document.getElementById('card2')
const cardWinner1 = document.getElementById('card1-winner')
const cardWinner2 = document.getElementById('card2-winner')

card1.style.display = "none"
card2.style.display = "none"


function getPokemon(cardId){
let anchorTag=document.getElementById(cardId)
//let anchorTag=document.getElementById('card1')

var randomImage = anchorTag.querySelector('.random-image');
console.log('randomImage:', randomImage);
const randomNumber = Math.round(Math.random() * 500);
var pokemonName = anchorTag.querySelector('.pokemonName')
var abilitiesList = anchorTag.querySelector('ul');

fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
.then(function(response) {
    if (!response.ok){
        console.log(response);
        return new Error(response);
    }
    return response.json();
})
.then(function(data) {
    console.log('My Data:', data)
    var imageURL = data.sprites.front_default
    console.log('Image URL:', imageURL);
    randomImage.src = imageURL;
    pokemonName.textContent = data.name
    
while (abilitiesList.firstChild) {
    abilitiesList.removeChild(abilitiesList.firstChild);
}

    for(a of data.abilities) {
        let listItem = document.createElement('li');
        listItem.innerHTML = '<p>' + a.ability.name + '</p>';
        abilitiesList.appendChild(listItem);
    }

})

.catch(function(err) {
    console.log(err);
});

}

const drawCardsBtn=document.getElementById('btnDrawCards')
drawCardsBtn.addEventListener('click', () => {
    cardWinner1.style.display = "none"
    cardWinner2.style.display = "none"
    card1.style.display = "block"
    card2.style.display = "block"
    getPokemon('card1'); 
    getPokemon('card2'); 
})

const battleBtn=document.getElementById('btnBattle')
battleBtn.addEventListener('click', () => {

    const randomNumber = Math.round(Math.random() * 2);
    if(randomNumber % 2 == 0){
        cardWinner2.style.display = ""
    }
    else {
        cardWinner1.style.display = ""
    }
})
