import { attackBtn } from "./gameLogic.js";
import { monsterArray } from "./monsters.js"
import { players } from "./playerCharacter.js";
import { populator } from "./populateGmMonsters.js"

const gmAttackBtn = document.getElementById('attack')
const characterSelection = document.getElementById(`chooser-id`);
const archer = document.getElementById(`selected-01`);
const barbarian = document.getElementById(`selected-02`);
const warlock = document.getElementById(`selected-03`);
const cleric = document.getElementById(`selected-04`);
const valkyrie = document.getElementById(`selected-05`);
const charPick = document.getElementById(`pick-char-button`);
const rulesPane = document.getElementById('rules')
const healBtn = document.getElementById('heal')
const resetBtn = document.getElementsByClassName('play-again')
const youWin = document.getElementById('you-win')
const youLose = document.getElementById('you-lose')
const combatText = document.getElementById('combat-text')

let lastMonsterPick;
let lastPick;

const apiUrl = 'https://gist.githubusercontent.com/tkfu/9819e4ac6d529e225e9fc58b358c3479/raw/d4df8804c25a662efc42936db60cfbc0a5b19db8/srd_5e_monsters.json'

let fullMonsterArr = await monsterArray(apiUrl)

rulesPane.addEventListener('click', () => {
    rulesPane.classList.add('visibility')
    characterSelection.classList.remove('visibility')
})


gmAttackBtn.addEventListener('click', () => {
    // console.log(lastMonsterPick)
    attackBtn(lastPick, lastMonsterPick, 1)
})

healBtn.addEventListener('click', () => {
    attackBtn(lastPick, lastMonsterPick, 2)
    for (let i = 0; i < players.length; i++) {
        const element = players[i].name;
        if (element === lastPick.children[0].textContent.toLowerCase()) {
            playerhp.textContent = Number(playerhp.textContent) + 10
        }
    }
})

const  newMonsterArray = async () => {
    let newMonsterArr = await monsterArray(apiUrl)
    populator(newMonsterArr)
    fullMonsterArr = newMonsterArr
}

resetBtn[0].addEventListener('click', () => {
    console.log("You clicked the reset btn");
    youWin.classList.add('visibility')
    characterSelection.classList.remove('visibility')
    newMonsterArray()
    combatText.innerHTML = '<div class="combat-text" id="combat-text"></div>'
    for (let i = 0; i < monsters.length; i++) {
        const element = monsters[i];
        element.classList.remove('visibility')
        
    }
})
resetBtn[1].addEventListener('click', () => {
    console.log("You clicked the reset btn");
    youLose.classList.add('visibility')
    characterSelection.classList.remove('visibility')
    newMonsterArray()
    combatText.innerHTML = '<div class="combat-text" id="combat-text"></div>'
    for (let i = 0; i < monsters.length; i++) {
        const element = monsters[i];
        element.classList.remove('visibility')
        
    }
})

archer.addEventListener('click', () => {
    if (!lastPick){
        archer.classList.add('is-selected'); 
        picker(archer);
    } else {
        lastPick.classList.remove('is-selected');
        archer.classList.add('is-selected'); 
        picker(archer);
    }
    // console.log(lastPick.children[0].innerText);
});

barbarian.addEventListener('click', () => {
    if (!lastPick){
        barbarian.classList.add('is-selected'); 
        picker(barbarian);
    } else {
        lastPick.classList.remove('is-selected');
        barbarian.classList.add('is-selected'); 
        picker(barbarian);
    }
});

warlock.addEventListener('click', () => {
    if (!lastPick){
        warlock.classList.add('is-selected'); 
        picker(warlock);
    } else {
        lastPick.classList.remove('is-selected');
        warlock.classList.add('is-selected'); 
        picker(warlock);
    }
});

cleric.addEventListener('click', () => {
    if (!lastPick){
        cleric.classList.add('is-selected'); 
        picker(cleric);
    } else {
        lastPick.classList.remove('is-selected');
        cleric.classList.add('is-selected'); 
        picker(cleric);
    }
});

valkyrie.addEventListener('click', () => {
    if (!lastPick){
        valkyrie.classList.add('is-selected'); 
        picker(valkyrie);
    } else {
        lastPick.classList.remove('is-selected');
        valkyrie.classList.add('is-selected'); 
        picker(valkyrie);
    }
});

const playerName = document.getElementById('player-name')
const playerhp = document.getElementById('player-hp')
const playerImage = document.getElementById('player-image')

charPick.addEventListener('click', () => {
    let name = lastPick.children[0].innerText
    characterSelection.classList.add('visibility')
    playerName.textContent = name
    playerSetter(name)
    // attackBtn(name.toLowerCase())
    populator(fullMonsterArr);
    playerName.classList.add('player-name')
});

function picker(playerClass){
    lastPick = playerClass;
}

const playerSetter = (lastPick) => {
    if(lastPick === 'Archer'){
        playerImage.src = players[0].img_url
        playerhp.textContent = players[0].hp
    }
    if(lastPick === 'Barbarian'){
        playerImage.src = players[1].img_url
        playerhp.textContent = players[1].hp
    }
    if(lastPick === 'Warlock'){
        playerImage.src = players[2].img_url
        playerhp.textContent = players[2].hp
    }
    if(lastPick === 'Cleric'){
        playerImage.src = players[3].img_url
        playerhp.textContent = players[3].hp
    }
    if(lastPick === 'Valkyrie'){
        playerImage.src = players[4].img_url
        playerhp.textContent = players[4].hp
    }
}

const monster1 = document.getElementById('monster-01')
const monster2 = document.getElementById('monster-02')
const monster3 = document.getElementById('monster-03')
const monsters = document.getElementsByClassName('monster')

const monsterSelected = (num) => {
    if (!lastMonsterPick){
        monsters[num].classList.add('is-selected'); 
        monsterPicker(monsters[num]);
        
    } else {
        lastMonsterPick.classList.remove('is-selected');
        monsters[num].classList.add('is-selected'); 
        monsterPicker(monsters[num]);
    }
}

function monsterPicker(monsterClass){
    lastMonsterPick = monsterClass;
}

monster1.addEventListener('click', () => {
    monsterSelected(0)
})
monster2.addEventListener('click', () => {
    monsterSelected(1)
})
monster3.addEventListener('click', () => {
    monsterSelected(2)
})
