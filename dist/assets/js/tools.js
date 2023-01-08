// Pomodoro
let seconds = document.querySelector(".seconds");
let minutes = document.querySelector(".minutes");
let indicator = document.querySelector(".indicator");
let container = document.querySelector('.container');
const speakSwitch = document.querySelector('#speaker');
let play = document.querySelector(".play");
let pause = document.querySelector(".pause");
let stopBtn = document.querySelector(".stop");
let counter = -1;
let pomoValue = 25 * 60;
let counterValue = pomoValue;
var audio = new Audio('assets/sounds/buzz.wav');
let breakTime;
let isBreak = false
let isPaused = false

function getTimerValues() {
    chrome.storage.sync.get(['session_time', 'break_time'], function(result) {
    pomoValue = result.session_time * 60;
    breakTime = result.break_time
    counterValue = pomoValue;
    setValues()
  });
}
function setValues() {
let min = Math.floor(counterValue / 60);
let sec = Math.floor(counterValue % 60);
seconds.textContent = sec.toString().padStart(2, "0");
minutes.textContent = min.toString().padStart(2, "0");
}
getTimerValues()


// Play = Start timer eller forsæt timer
// Pause = Stop timer
// Stop = Reset og stop timer

play.addEventListener("click", () => {
    if(!isPaused) {
      clearInterval(counter);
      counter = -1;
    }
    if (counter == -1 && counterValue > 0) {
      if(!isBreak){
      container.style.backgroundColor = 'var(--highlight-dark)'
      }
    continueClock()
    }
    
});

function continueClock() {
  isPaused = false
    counter = setInterval(() => {
      let rest = --counterValue;
      setValues()
      indicator.style.strokeDashoffset = 600 - (rest / pomoValue) * 600;

      if (rest == 0) {
        clearInterval(counter);
        audio.play();
        container.style.backgroundColor = 'var(--green)'
        if(!isBreak){
        startBreak()
        }
      }
      
    }, 1000);
}

pause.addEventListener("click", () => {
  isPaused = true
  container.style.backgroundColor = 'var(--yellow)'
  clearInterval(counter);
  counter = -1;
});

stopBtn.addEventListener("click", () => {
  container.style.backgroundColor = 'var(--highlight-dark)'
  clearInterval(counter);
  counter = -1;
  counterValue = pomoValue;
  setValues()
  indicator.style.strokeDashoffset = 600 - (counterValue / pomoValue) * 600;
});

function startBreak() {
  isBreak = true
  isPaused = false
  container.style.backgroundColor = 'var(--yellow)'
  pomoValue = breakTime * 60;
  counterValue = pomoValue;
  minutes.textContent = breakTime

    counter = setInterval(() => {
      let rest = --counterValue;
      setValues()
      indicator.style.strokeDashoffset = 600 - (rest / pomoValue) * 600;

      if (rest == 0) {
        isBreak = false
        clearInterval(counter);
        container.style.backgroundColor = 'var(--green)'
        getTimerValues()
        audio.play();
      }
      
    }, 1000);

}

// Speech API
function speaker() {
    let txtarea = document.getElementById("notes");

    var start = txtarea.selectionStart;
    var finish = txtarea.selectionEnd;

    var sel = txtarea.value.substring(start, finish);

        var msg = new SpeechSynthesisUtterance(sel)
        msg.rate = 0.85;
        msg.pitch = 0.96;
        msg.lang = 'da-DK'
        window.speechSynthesis.speak(msg)
}

speakSwitch.addEventListener('change', () => {
    if(!speakSwitch.checked) {
        speechSynthesis.cancel()
        document.getElementById("notes").removeEventListener('mouseup', speaker)
    } else if(speakSwitch.checked) {
        document.getElementById("notes").addEventListener('mouseup', speaker)
    }
})
