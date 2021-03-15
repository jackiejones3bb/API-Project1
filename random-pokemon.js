const card1 = document.getElementById('card1')
const card2 = document.getElementById('card2')

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

const card1Result = document.getElementById('card1-battle-result')
const card2Result = document.getElementById('card2-battle-result')
const drawCardsBtn=document.getElementById('btnDrawCards')
drawCardsBtn.addEventListener('click', () => {
    card1.style.display = "block"
    card2.style.display = "block"
    card2Result.innerText=''
    card1Result.innerText=''
    getPokemon('card1'); 
    getPokemon('card2'); 
})

const battleBtn=document.getElementById('btnBattle')
battleBtn.addEventListener('click', () => {

    const randomNumber = Math.round(Math.random() * 2);
    if(randomNumber % 2 == 0){
        card2Result.innerText='WINNER!'
        card1Result.innerText='loser :('
    }
    else {
        card1Result.innerText='WINNER!'
        card2Result.innerText='loser :('

    }
})
