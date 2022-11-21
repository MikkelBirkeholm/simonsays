


let tips = document.querySelectorAll('.tip')
const postPreview = document.querySelector('#postPreview')
const previewBtn = document.querySelector('#preview-text')
let userName = 'Mikkel Birkeholm'
let userTitle = 'Webudvikler | Digitale Tools | SaaS';
let emoji = document.querySelector('#emoji')
let checkboxList = document.querySelectorAll('.checkbox')
let readMoreBtn = document.querySelector('#readMore')

let tipsList = document.querySelector('#tipsList')
let tipsArray = [
    {title: 'Hvad gør alle de andre?', desc: 'Så skal jeg i hvert fald ikke gøre det'},
    {title: 'Hvordan er min indledning?', desc: 'Den skal fange opmærksomhed!'},
    {title: 'Hvordan er min struktur?', desc: 'Opdel teksten i let spiselige bidder'},
    {title: 'Hvordan er min rytme?', desc: 'Veksl mellem korte og lange sætninger og afsnit'},
    {title: 'Hvem taler jeg til?', desc: 'Henvend dig direkte til læseren'},
    {title: 'Hvem skal have noget ud af den her tekst?', desc: 'Tal om din læsers udfordring'},
    {title: 'Giver jeg et løfte?', desc: 'Det er en rigtig god idé at give et løfte om en løsning - tidligt i teksten'},
    {title: 'Har jeg noget blikfang?', desc: 'Overvej at tilføje enten billede, emojis eller formateret tekst'},
    {title: 'Lyder min tekst som smuk musik?', desc: 'Læs din tekst højt, inden du trykker "post"'},
    {title: 'Hvad er klokken?', desc: 'Lad være med at poste om natten eller midt i aftensmaden'}
]

document.querySelector('#go-to-options').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});


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
                            <h4>${item.title}</h4>
                            <p>${item.desc}</p>
                          </label>
                        </label>
                      </div>
                </li>
    `
    tipsList.insertAdjacentHTML('beforeend', checkbox)
}

for (let box of checkboxList) {
    box.addEventListener('click', ()=> {})

}



previewBtn.addEventListener('click', ()=>{
    profileName.innerText = userName
    profileTitle.innerText = userTitle
    profileImage.style.backgroundImage = '#fefefe'
    postContent.innerText = notes.value
    chrome.storage.sync.get({
      profile_name: 'LinkedIn Name',
      profile_title: 'LinkedIn Title'
    }, function(items) {
      document.getElementById('profileName').value = items.profile_name;
      document.getElementById('profileTitle').value = items. profile_title;
    });
    postPreview.showModal()
})

closePreview.addEventListener('click', ()=> {
    postPreview.close()
})

readMoreBtn.addEventListener('click', ()=> {
  postContent.classList.toggle('short-text')
  if(readMoreBtn.innerText === '...læs mere') {
    readMoreBtn.innerText = '...læs mindre'
  } else {
    readMoreBtn.innerText = '...læs mere'
  }
})
