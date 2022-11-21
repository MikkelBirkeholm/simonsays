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
// let restValue = 300000;
play.addEventListener("click", () => {
    container.style.backgroundColor = 'var(--highlight-dark)'
  if (counter == -1 && counterValue > 0) {
    counter = setInterval(() => {
      let rest = --counterValue;
      let min = Math.floor(rest / 60);
      let sec = Math.floor(rest % 60);
      seconds.textContent = sec.toString().padStart(2, "0");
      minutes.textContent = min.toString().padStart(2, "0");
      indicator.style.strokeDashoffset = 600 - (rest / pomoValue) * 600;

      if (rest == 0) {
        clearInterval(counter);
        container.style.backgroundColor = 'var(--green)'
      }
      
    }, 1000);
  }
});
pause.addEventListener("click", () => {
    container.style.backgroundColor = 'var(--yellow)'
  clearInterval(counter);
  counter = -1;
});
stopBtn.addEventListener("click", () => {
    container.style.backgroundColor = 'var(--highlight-dark)'
  clearInterval(counter);
  counter = -1;
  counterValue = pomoValue;
  let min = Math.floor(counterValue / 60);
  let sec = Math.floor(counterValue % 60);
  seconds.textContent = sec.toString().padStart(2, "0");
  minutes.textContent = min.toString().padStart(2, "0");
  indicator.style.strokeDashoffset = 600 - (counterValue / pomoValue) * 600;
});


// Speech API
function speaker() {
    let txtarea = document.getElementById("notes");

    var start = txtarea.selectionStart;
    var finish = txtarea.selectionEnd;

    var sel = txtarea.value.substring(start, finish);

        var msg = new SpeechSynthesisUtterance(sel)
        msg.rate = 0.9;
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
