let paragraphBox = document.querySelector('.paragraph__box p');
let inputField = document.querySelector(".input__field");
let wrapper = document.querySelector(".wrapper");
let timeTag = document.querySelector(".timer span b");
let mistakeTag = document.querySelector(".mistake span b");
let wpmTag = document.querySelector(".wpm span b"); 
let btn = document.querySelector(".btn button");

let time = maxTime = 120;
let mistake = 0;
let correct = wpm = 0;
let idx = 0;

const showText  = () => {
    let randomNum = Math.floor(Math.random() * text.length);
    text[randomNum].split("").forEach(chars => {
        paragraphBox.innerHTML += `<span>${chars}</span>`;
    });
    document.addEventListener("keydown", () => {
        inputField.focus();
    });
    wrapper.addEventListener("click", () =>{
        inputField.focus();
    });

    let timeStart = setInterval(() => {
        if(time <= 0) {
            clearInterval(timeStart);
            inputField.value = "";
        }
        timeTag.innerHTML = time;
        time--;
        wpm = Math.round(((idx - mistake)/5)/(maxTime - time) * 60);
        wpmTag.innerHTML = wpm;

    }, 1000);

}



const testTxt = () => {
    let userChars = inputField.value.split("")[idx];
    let spans = document.querySelectorAll('.paragraph__box p span');
    
    if(time <= 0 || spans.length - 1 === userChars) {
        alert("Time's is up !!!");
        inputField.value = "";
        idx = 0;
    }
    else {

    if(userChars == null) {
        spans[idx].classList.remove("correct","incorrect");
        idx--;
        if(spans[idx].classList.contains("incorrect")) {
            mistake--;
        }
    }else {
        if(spans[idx].innerHTML === userChars) {
            spans[idx].classList.add("correct");
            correct++;
        }
        else {
            spans[idx].classList.add("incorrect");
            mistake++;
        }
        idx++;
    }
}

    if(mistake < 0) {
        mistake = 0;
    }
    mistakeTag.innerHTML = mistake;
}

inputField.addEventListener("input", () => {
    testTxt();
});


showText();

const resetGame = () => {
    time = maxTime = 120;
    mistake = 0;
    correct = wpm = 0;
    idx = 0;
    showText();
}


btn.addEventListener("click", () => {
    window.location.reload();
});