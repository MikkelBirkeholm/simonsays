
let checkboxList = document.querySelectorAll('.checkbox')
// let tips = document.querySelectorAll('.tip')
let tipsList = document.querySelector('#tipsList')
let tipsListWrapper = document.querySelector('.tips-list-wrapper')
let tipsArray = [
  { title: 'Hvad gør alle de andre?', desc: 'Så skal jeg i hvert fald ikke gøre det' },
  { title: 'Hvordan er min indledning?', desc: 'Den skal fange opmærksomhed!' },
  { title: 'Hvordan er min struktur?', desc: 'Opdel teksten i let spiselige bidder' },
  { title: 'Hvordan er min rytme?', desc: 'Veksl mellem korte og lange sætninger og afsnit' },
  { title: 'Hvem taler jeg til?', desc: 'Henvend dig direkte til læseren' },
  { title: 'Hvem skal have noget ud af den her tekst?', desc: 'Tal om din læsers udfordring' },
  { title: 'Giver jeg et løfte?', desc: 'Det er en rigtig god idé at give et løfte om en løsning - tidligt i teksten' },
  { title: 'Har jeg noget blikfang?', desc: 'Overvej at tilføje enten billede, emojis eller formateret tekst' },
  { title: 'Lyder min tekst som smuk musik?', desc: 'Læs din tekst højt, inden du trykker "post"' },
  { title: 'Hvad er klokken?', desc: 'Lad være med at poste om natten eller midt i aftensmaden' }
]
let goOptions = document.querySelectorAll('.go-to-options')
goOptions.forEach((e) => {
  e.addEventListener('click', function () {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  });
})


for (let [i, item] of tipsArray.entries()) {
  let checkbox = `
        <li class="tip">
                    <div class="checkbox-wrapper-52">
                        <label for="${'todo' + [i]}" class="item">
                          <input type="checkbox" id="${'todo' + [i]}" class="checkbox hidden"/>
                          <label for="${'todo' + [i]}" class="cbx">      
                            <svg width="14px" height="12px" viewBox="0 0 14 12">
                              <polyline points="1 7.6 5 11 13 1"></polyline>
                            </svg>
                          </label>
                          <label for="${'todo' + [i]}" class="cbx-lbl">
                          <h4><span>${i + 1} ⎯ </span> ${item.title}</h4>
                            <p>${item.desc}</p>
                          </label>
                        </label>
                      </div>
                </li>
    `
  tipsList.insertAdjacentHTML('beforeend', checkbox)
  checkboxList = document.querySelectorAll('.checkbox')
  if (localStorage.getItem(`todo${[i]}`)) {
    document.querySelector(`#todo${i}`).checked = JSON.parse(localStorage.getItem(`todo${[i]}`))
  }
}

function goGreen() {
  let counter = 0;
  for (let check of checkboxList) {
    if (check.checked) {
      counter++
    }
    if (counter == checkboxList.length) {
      tipsListWrapper.classList.add('go-green')
    } else {
      tipsListWrapper.classList.remove('go-green')
    }
  }

}

goGreen()

for (let [i, box] of checkboxList.entries()) {
  box.addEventListener('click', () => {
    localStorage.setItem(`todo${[i]}`, box.checked);
    goGreen()
  })
}




