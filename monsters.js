
import { randomNumGen } from "./random.js";

export async function monsterArray (url) {
    let arr = []
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    for (let i = 0; i < 3; i++) {
      let rdmNum = randomNumGen(data.length)
      arr.push(data[rdmNum])
    }
    return arr;
  };
