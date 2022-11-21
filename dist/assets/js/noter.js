const notes = document.querySelector('#notes')
let savedNote;
const count = document.querySelector('#count')
const savedDot = document.querySelector('#saved')
const copyBtn = document.querySelector('#copy-text')
const profileImage = document.querySelector('#profileImage')

chrome.storage.sync.get(console.log)


window.onload = () => {
	let recentImage = localStorage.getItem('image')
	let profileImageSet = localStorage.getItem('profileImage')

	chrome.storage.sync.get(['savedNote'], function(result) {
		notes.value = result.savedNote.content
		count.innerText = result.savedNote.content.trim().length + '/3000'
	  });

	if(recentImage) {
		postImage.style.backgroundImage = `url(${recentImage})`
	}
	if(profileImageSet) {
		profileImage.style.backgroundImage = `url(${profileImageSet})`
	}
	savedDot.style.color = '#008900'
}

notes.addEventListener('input', () => {
    processChange(notes.value)
	savedDot.style.color = '#ccaa00'
})


const image_input = document.querySelector("#image-input");

image_input.addEventListener("change", function() {
	const reader = new FileReader();
	reader.addEventListener("load", () => {
		localStorage.setItem('image', reader.result)
        postImage.style.backgroundImage = `url(${reader.result})`
  });
  reader.readAsDataURL(this.files[0]);
  
});

copyBtn.onclick = ()=> {navigator.clipboard.writeText(notes.value)}

function debounce(func, timeout = 500) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}

function saveInput(content) {
	chrome.storage.sync.set({
		savedNote: {
			'content': content
		}}
		);

	count.innerText = content.trim().length + '/3000'
	savedDot.style.color = '#008900'
   }


const processChange = debounce((e) => saveInput(e));
