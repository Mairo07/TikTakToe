console.log(123)

function checkString(string) {
    for (let i = 0; i < string.length - 1; i++) {

        for (let j = i + 1; j < string.length; j++) {
            
            if (string[i] === string[j]) {
             return false  
            } 
               
    
            
        }
        
        
    }

    return true

}

console.log(checkString("123") === true)
console.log(checkString("111") === false)
console.log(checkString("papamamapapa") === false)
console.log(checkString("Aa") === true)

