(()=>{document.querySelectorAll(".tip");const e=document.querySelector("#postPreview"),t=document.querySelector("#preview-text");document.querySelector("#emoji");let n=document.querySelectorAll(".checkbox"),l=document.querySelector("#readMore"),i=document.querySelector("#tipsList"),o=[{title:"Hvad gør alle de andre?",desc:"Så skal jeg i hvert fald ikke gøre det"},{title:"Hvordan er min indledning?",desc:"Den skal fange opmærksomhed!"},{title:"Hvordan er min struktur?",desc:"Opdel teksten i let spiselige bidder"},{title:"Hvordan er min rytme?",desc:"Veksl mellem korte og lange sætninger og afsnit"},{title:"Hvem taler jeg til?",desc:"Henvend dig direkte til læseren"},{title:"Hvem skal have noget ud af den her tekst?",desc:"Tal om din læsers udfordring"},{title:"Giver jeg et løfte?",desc:"Det er en rigtig god idé at give et løfte om en løsning - tidligt i teksten"},{title:"Har jeg noget blikfang?",desc:"Overvej at tilføje enten billede, emojis eller formateret tekst"},{title:"Lyder min tekst som smuk musik?",desc:'Læs din tekst højt, inden du trykker "post"'},{title:"Hvad er klokken?",desc:"Lad være med at poste om natten eller midt i aftensmaden"}];document.querySelector("#go-to-options").addEventListener("click",(function(){chrome.runtime.openOptionsPage?chrome.runtime.openOptionsPage():window.open(chrome.runtime.getURL("options.html"))}));for(let[e,t]of o.entries()){let n=`\n        <li class="tip">\n                    <div class="checkbox-wrapper-52">\n                        <label for="${"todo"+[e]}" class="item">\n                          <input type="checkbox" id="${"todo"+[e]}" class="checkbox hidden"/>\n                          <label for="${"todo"+[e]}" class="cbx">      \n                            <svg width="14px" height="12px" viewBox="0 0 14 12">\n                              <polyline points="1 7.6 5 11 13 1"></polyline>\n                            </svg>\n                          </label>\n                          <label for="${"todo"+[e]}" class="cbx-lbl">\n                            <h4>${t.title}</h4>\n                            <p>${t.desc}</p>\n                          </label>\n                        </label>\n                      </div>\n                </li>\n    `;i.insertAdjacentHTML("beforeend",n)}for(let e of n)e.addEventListener("click",(()=>{}));t.addEventListener("click",(()=>{profileName.innerText="Mikkel Birkeholm",profileTitle.innerText="Webudvikler | Digitale Tools | SaaS",profileImage.style.backgroundImage="#fefefe",postContent.innerText=notes.value,chrome.storage.sync.get({profile_name:"LinkedIn Name",profile_title:"LinkedIn Title"},(function(e){document.getElementById("profileName").value=e.profile_name,document.getElementById("profileTitle").value=e.profile_title})),e.showModal()})),closePreview.addEventListener("click",(()=>{e.close()})),l.addEventListener("click",(()=>{postContent.classList.toggle("short-text"),"...læs mere"===l.innerText?l.innerText="...læs mindre":l.innerText="...læs mere"}))})();