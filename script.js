let word=document.getElementById('word')
let btn=document.getElementById('generate-btn')
let check=document.getElementById('check-word')
let inpt=document.getElementById('input-usr')
let serResponse=document.getElementById('server-response')

 //feature recs:
    //1.can add the option to select maximum letters
    //2.highscore maybe and local browser storage
    //3.generate words based on frequency of usage in daily life?
    //4.reshuffle the word as a user-friendly feature
    //5. hints


    //how does it work when i'm not live?api calls get made that way?

    //cases:
    //shuffled word is the same as the original
    //
    //

let options={
    method:'GET',
    headers:{"x-api-key":apiKey}
}

let url="https://api.api-ninjas.com/v1/randomword"
let randomWord;

async function IsWordValid(inp){
    console.log(inp);
    let urlDictionary=`https://api.api-ninjas.com/v1/dictionary?word=${inp}`
    let response=await fetch(urlDictionary, options)
    let data=await response.json()
    let isValid=data['valid']
    // console.log(isValid);
    return isValid
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
   
    return array;
}
async function init(){
    randomWord=await generateWord()
    let isrwValid=await IsWordValid(randomWord)
    if(isrwValid)
        {
            let scrambledWord=randomWord.split('')
            let shuffWord=shuffle(scrambledWord)
            shuffWord=shuffWord.join('')
            //give it to user
            word.innerText=shuffWord
        }
    else {
        // init()
        console.log('wrong word'+randomWord);
        init()
    }
}
function containsCapitalLetter(word) {
    const regex = /[A-Z]/;
    return regex.test(word);
}
async function generateWord(){
    //generate a random word
    do{
        let response=await fetch(url, options);
        let data=await response.json();
            console.log(data);
            randomWord=data['word']
            // randomWord='scramble' the name of the app is the result of this 
    }
    //gonna generate only words less than 8 characters
    //humans can properly unscramble words that contain upto 8 letters
    while(randomWord.length>8 ||containsCapitalLetter(randomWord))
            //scramble it
    return randomWord;
}

async function checkPart(){
    if(usr_input.value.length==0){
        serResponse.innerText='Enter a valid word'
    }
    else {
        let usr_input=inpt.value.toLowerCase()
    
        // console.log(usr_input);
        let validWord=await IsWordValid(usr_input)
        // console.log(validWord);
        if(validWord){
            serResponse.innerText= `Yayy! ${usr_input} is a valid word!!generating next word...`;
            init()
        }
        else{
            serResponse.innerText=`${usr_input} is not a valid word..try again kiddo`
        }
        inpt.value='';
    }
   
}



window.addEventListener('load', init)
btn.addEventListener('click', generateWord)
//check buttons
check.addEventListener('click', checkPart)
inpt.addEventListener('keydown', (event)=>{
    if(event.key=='Enter'){checkPart()}
})
