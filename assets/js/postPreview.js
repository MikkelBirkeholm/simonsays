export default function postImagePreview() {
const imageInput = document.querySelector('#image-input');
const removePostImageBtn = document.querySelector('#removePostImage')
const imagePreview = document.querySelector('#postPreviewImage')
const postPreview = document.querySelector('#postPreview')
const previewBtn = document.querySelector('#preview-text')
const profileName = document.querySelector('#profileName')
const profileTitle = document.querySelector('#profileTitle')
const postContent = document.querySelector('#postContent')
const closePreview = document.querySelector('#closePreview')
const notes = document.querySelector('#notes')

let userName = 'Dit Navn'
let userTitle = 'Indstil Dette I Settings (det lille tandhjul)';
let readMoreBtn = document.querySelector('#readMore')

imageInput.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        localStorage.setItem('image', reader.result)
        changePostImage()
        
    });
    reader.readAsDataURL(this.files[0]);
});

removePostImageBtn.addEventListener('click', () => {
    localStorage.removeItem('image');
    changePostImage()
})

function changePostImage() {
    let newImage = localStorage.getItem('image')
    imagePreview.src = newImage
}

previewBtn.addEventListener('click', ()=>{
    profileName.innerText = userName
    profileTitle.innerText = userTitle
    postContent.innerText = notes.value
    // previewTools.style.top = '0'

    chrome.storage.sync.get(['profile_name'], function(result) {
      document.querySelector('#profileName').innerText = result.profile_name
      });
  
      chrome.storage.sync.get(['profile_title'], function(result) {
      document.querySelector('#profileTitle').innerText = result.profile_title
      });

      adjustLineClamp()
    postPreview.showModal()
})

closePreview.addEventListener('click', ()=> {
    postPreview.close()
})

readMoreBtn.addEventListener('click', ()=> {
  postContent.classList.toggle('short-text')
  if(readMoreBtn.innerText === '... se mere') {
    readMoreBtn.innerText = '... se mindre'
  } else {
    readMoreBtn.innerText = '... se mere'
  }
})

function adjustLineClamp() {
  let lineClampBtns = document.querySelectorAll('.line-btn')
  let shortText = document.querySelector('.short-text')

  for(let btn of lineClampBtns) {
    btn.addEventListener('click', (e) => {
      shortText.style.webkitLineClamp = e.currentTarget.value
    })
  }
  
}
}

