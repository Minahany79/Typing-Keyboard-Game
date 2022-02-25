let timeLvls = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2
};
let levels = ["Easy", "Normal", "Hard"];
let defaultLvl = "Easy";
let defaultLvlSec = timeLvls[defaultLvl];


function setTime(lvl) {
    return timeLvls[lvl];
}


let words = ['If', 'you', 'have', 'a', 'conversation', 'partner,', 'ask', 'your', 'exchange', 'partner', 'to', 'say', 'the', 'phrases', 'while', 'you', 'record', 'them', 'on', 'a', 'smartphone,', 'computer', 'or', 'recording', 'device.', 'That', 'way', 'you', 'can', 'listen', 'to', 'the', 'recording', 'and', 'practice', 'pronunciation', 'by', 'yourself', 'at', 'home'];

let levelSpan = document.querySelector(".level");
let secSpan = document.querySelector(".seconds");
let remianSecSpan = document.querySelector(".remianSec");
let totalSapn = document.querySelector(".total");
let input = document.querySelector(".inpt");
let startBtn = document.querySelector(".start");
let upcomingDiv = document.querySelector(".upcoming");
let currentWord = document.querySelector(".currentWord");
let scoreSpan = document.querySelector(".score");
let selectOptsLevel = document.getElementById("lvl");
let tryAgainBtn = document.querySelector(".tryAgain");
levelSpan.innerHTML = defaultLvl;
secSpan.innerHTML = defaultLvlSec;
remianSecSpan.innerHTML = defaultLvlSec;
totalSapn.innerHTML = words.length;

selectOptsLevel.onchange = function () {
    defaultLvl = selectOptsLevel.value;
    let defaultLvlSec = timeLvls[defaultLvl];
    levelSpan.innerHTML = defaultLvl;
    secSpan.innerHTML = defaultLvlSec;
    remianSecSpan.innerHTML = defaultLvlSec;
};

input.onpaste = function () {
    return false;
};

startBtn.onclick = function () {
    this.classList.add("visually-hidden");
    selectOptsLevel.classList.add("visually-hidden");
    input.focus();
    generateWord();
};

tryAgainBtn.onclick = function () {
    this.classList.add("visually-hidden");
    startBtn.classList.remove("visually-hidden");
    selectOptsLevel.classList.remove("visually-hidden");
    upcomingDiv.innerHTML = "";
    currentWord.innerHTML = "";
    scoreSpan.innerHTML = 0;
    input.value = '';
    document.querySelector(".congrates").classList.add("visually-hidden");
    document.querySelector(".bad").classList.add("visually-hidden");
    words = ['If', 'you', 'have', 'a', 'conversation', 'partner,', 'ask', 'your', 'exchange', 'partner', 'to', 'say', 'the', 'phrases', 'while', 'you', 'record', 'them', 'on', 'a', 'smartphone,', 'computer', 'or', 'recording', 'device.', 'That', 'way', 'you', 'can', 'listen', 'to', 'the', 'recording', 'and', 'practice', 'pronunciation', 'by', 'yourself', 'at', 'home'];
};

function generateWord() {
    let random = Math.floor(Math.random() * words.length);
    let randomWord = words[random];
    currentWord.innerHTML = randomWord;
    words.splice(random, 1);
    upcomingDiv.innerHTML = "";
    for (let index = 0; index < words.length; index++) {
        let span = document.createElement("div");
        let txt = document.createTextNode(words[index]);
        span.classList.add("word");
        span.appendChild(txt);
        upcomingDiv.appendChild(span);
    }
    startPlay();
};

function startPlay() {
    let start = setInterval(() => {
        remianSecSpan.innerHTML--;
        if (remianSecSpan.innerHTML == 0) {
            clearInterval(start);
            if (input.value.toLowerCase() === currentWord.innerHTML.toLowerCase()) {
                input.value = '';
                scoreSpan.innerHTML++;
                remianSecSpan.innerHTML = setTime(levelSpan.innerHTML);
                if (words.length > 0) {
                    generateWord();
                }
                else {
                    tryAgainBtn.classList.remove("visually-hidden");
                    document.querySelector(".congrates").classList.remove("visually-hidden");
                }
            }
            else {
                remianSecSpan.innerHTML = setTime(levelSpan.innerHTML);
                tryAgainBtn.classList.remove("visually-hidden");
                document.querySelector(".bad").classList.remove("visually-hidden");
            }
        }
    }, 1000);
};

