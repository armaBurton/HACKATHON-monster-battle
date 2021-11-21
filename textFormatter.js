export const formatter = (str) => {
    for (let i = 0, me = '' ; i < str['Hit Points'].length; i++) {
        let stringy = str['Hit Points']
        if (stringy[i] !== ' ') {
            me += stringy[i]        
        } else {
            return me
        } 
    }
}