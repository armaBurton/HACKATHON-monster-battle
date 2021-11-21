import { formatter } from "./textFormatter.js"

const monsterNames = document.getElementsByClassName('monster-name')
const monsterImage = document.getElementsByClassName('monster-image')
const monsterHp1 = document.getElementById("monster-01-hp")
const monsterHp2 = document.getElementById("monster-02-hp")
const monsterHp3 = document.getElementById("monster-03-hp")

export const populator = async (fullMonsterArr) => {
    // console.log(fullMonsterArr);
    // console.log(fullMonsterArr[0]['Hit Points'].length);
    monsterHp1.textContent = formatter(fullMonsterArr[0])
    monsterHp2.textContent = formatter(fullMonsterArr[1])
    monsterHp3.textContent = formatter(fullMonsterArr[2])

    for (let i = 0; i < 3; i++) {
        monsterNames[i].textContent = fullMonsterArr[i].name
        // console.log(fullMonsterArr[i].img_url);
        monsterImage[i].src = fullMonsterArr[i].img_url
    }

}
