import { players } from "./playerCharacter.js";

const monsters = document.getElementsByClassName('monster')

const monsterHp1 = document.getElementById("monster-01-hp")
const monsterHp2 = document.getElementById("monster-02-hp")
const monsterHp3 = document.getElementById("monster-03-hp")
const combatResults = document.getElementById('combat-text')
const monsterHpArr = [monsterHp1, monsterHp2, monsterHp3]

const youLose = document.getElementById('you-lose')
const soundOfLosers = new Audio('./assets/backgrounds/you-lose.mp3');

const youWin = document.getElementById('you-win')
const soundOfSuccess = new Audio('./assets/backgrounds/you-win.mp3');



const playerAttackValue = (name) => {
    let playerAttack;
    for (let i = 0; i < players.length; i++) {
        const element = players[i];
        const stringName = name.children[0].textContent.toLowerCase()
        if (stringName === element.name) {
            // playerAttack = element.attack
            playerAttack = () =>{
                switch(i){
                    case 0:
                    case 2:
                    case 3:
                        return Math.floor(Math.random() * 15) + 1;
                        break;
                    case 1:
                    case 4:
                        return Math.floor(Math.random() * 8) + 1;
                        break;
                    default: 
                }
            }
        }
    }
    return playerAttack
}


const gameDice = () => {
    let var1 =[];
    for (let i = 0; i < 3; i++) {
        var1.push(Math.floor(Math.random()*20))
    }
    return var1
}

const winLoss = (playerHp, monsterHp) => {
    // monsterHp should be an array
    playerHp = playerHp.textContent
    if (playerHp <= 0 ) {
        youLose.classList.remove('visibility') 
        soundOfLosers.play()
    }

    if (+monsterHp[0].textContent === 0 && +monsterHp[1].textContent === 0 && +monsterHp[2].textContent === 0) {
        youWin.classList.remove('visibility') 
        soundOfSuccess.play()
    }
}

export const attackBtn = (playerName, monsterName, num) => {
    const monstersArray = []
    let playerAttackRoll = gameDice()
    let playerDefenseRoll = gameDice()
    let playerDamage = playerAttackValue(playerName)
    let monsterAttackRoll = gameDice()
    let monsterDefenseRoll = gameDice()
    let monsterHP = monsterHPpopulate()
    let monsterDamage = monsterAttackValue(monsterHP)
    const playerHP = document.getElementById(`player-hp`);


        for (let i = 0; i < monsters.length; i++) {
            const element = monsters[i].children[0].textContent;
            monstersArray.push(element)  
        }
    if (num === 1) {
    let checksCombatDamage = willAttack(playerAttackRoll, playerDamage, monsterDefenseRoll, monsterName)
    let checksDefense = willDefend(playerDefenseRoll, monsterAttackRoll, monsterDamage, playerHP, monsterHP);
    combatPane(playerName, checksCombatDamage, checksDefense, monsterName, monstersArray, monsterDamage, num)
    } else {
        let playerAttackRoll = [0, 0, 0]
        let checksCombatDamage = willAttack(playerAttackRoll, playerDamage, monsterDefenseRoll, monsterName)
        let checksDefense = willDefend(playerDefenseRoll, monsterAttackRoll, monsterDamage, playerHP, monsterHP);
        console.log("Monster Roll: " + monsterAttackRoll);
        console.log("Player Roll: " + playerDefenseRoll);
        combatPane(playerName, checksCombatDamage, checksDefense, monsterName, monstersArray, monsterDamage, num)
    }

    winLoss(playerHP, monsterHpArr)
}

function monsterAttackValue (monsterHP){
    let mAttackArr = [];
    for (let i = 0; i < monsterHP.length; i++) {
        mAttackArr.push(Math.floor(Math.random() * (monsterHP[i] * .2)+ 1));   
        //monster HP lowering causes monster damage to lower as well   
    }
    return mAttackArr;
}

const monsterHPpopulate = () => {
    let mHP = []
    let monstersHPList = [+monsterHp1.textContent, +monsterHp2.textContent, +monsterHp3.textContent]
    for (let i = 0; i < 3; i++) {
        if (monstersHPList[i]) {
            mHP.push(monstersHPList[i])
        } else {
            mHP.push(0)
        }
    }
    // mHP.push(+monsterHp1.textContent)
    // mHP.push(+monsterHp2.textContent)
    // mHP.push(+monsterHp3.textContent)
    return mHP
}


const willAttack = (playerAttackRoll, playerDamage, monsterDefenseRoll, monsterName) => {
    let plyerDmg;
    if (playerAttackRoll >= monsterDefenseRoll){
        for (let i = 0; i < monsters.length; i++) {
            const element = monsters[i].children[0].textContent;
            if (element === monsterName.children[0].textContent){
                let j = Number(monsterHpArr[i].textContent)
                plyerDmg = playerDamage()
                let k = j - plyerDmg;
                if (k <= 0){
                    k = 0;
                }
                monsterHpArr[i].textContent = k
            }
        }
    } else {
        return false
    }
    return plyerDmg
}

const takeMyPoints = (playerHP, monsterDamage) => {
    let blood = Number(playerHP) - Number(monsterDamage)
    return blood
}

const willDefend = (playerDefenseRoll, monsterAttackRoll, monsterDamage, playerHP, monsterHP) => {
    let HP = Number(playerHP.textContent);
    let hitOrMiss = []
    for (let i = 0; i < monsterAttackRoll.length; i++) {
        if (monsterHP[i] > 0){
            if (playerDefenseRoll[i] < monsterAttackRoll[i]){
                playerHP.textContent = takeMyPoints(HP, monsterDamage[i]);
                HP = takeMyPoints(HP, monsterDamage[i])
                hitOrMiss.push(true)
            } else {
                hitOrMiss.push(false)
            }
        } else {
            monsters[i].classList.add('visibility')
            hitOrMiss.push(false)
        }
    }
    return hitOrMiss
}

const combatPane = (playerName, checksCombatDamage, checksDefense, monsterName, monstersArray, monsterDamage, num) => {
    let name = playerName.children[0].textContent
    let characterDamage = checksCombatDamage
    let selectedMonster = monsterName.children[0].textContent

    let hit = `<p class="player-attack">:>> Your <span class="bold">${name}s</span> attack dealt <span class="bold">${characterDamage}</span> damage to enemy <span class="bold">${selectedMonster}</span></p>`
    let miss = `<p class="player-attack">:>> Your attack against <span class="bold">${selectedMonster}</span> failed</p>`
    let heal = `<p class="player-attack">:>> Your <span class="bold">${name}</span> successfully healed for <span class="bold">10</span> HP`

    if (num === 1) {
        if (checksCombatDamage) {
        combatResults.insertAdjacentHTML("beforeend", hit)
        } else {
            combatResults.insertAdjacentHTML("beforeend", miss)
        }
    } else {
        combatResults.insertAdjacentHTML("beforeend", heal)
    }
    

    for (let i = 0; i < checksDefense.length; i++) {
        let monsterHit = `<p class="monster-attack">:>><span class="bold">${monstersArray[i]}</span> attack dealt <span class="bold">${monsterDamage[i]}</span> damage</p>`
        let monsterMiss = `<p class="monster-attack">:>><span class="bold">${monstersArray[i]}</span> attack failed</p>`
        const element = checksDefense[i];
        if (element) {
        combatResults.insertAdjacentHTML("beforeend", monsterHit)
        } else {
            combatResults.insertAdjacentHTML("beforeend", monsterMiss)
        }
    }

    
}