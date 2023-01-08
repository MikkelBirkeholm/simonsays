import saveData from './setData.js'
import learnMore from './help.js';
import postImagePreview from './postPreview.js';
import checkForFetch from './dailyTips.js';
import signUp from './signUp.js';

const copyBtn = document.querySelector('#copy-text')
const notes = document.querySelector('#notes')
const savedDot = document.querySelector('#saved')
const count = document.querySelector('#count')

window.onload = () => {
	saveData()
	learnMore()
	postImagePreview()
	checkForFetch()
	if (!localStorage.getItem('signup')) {
		document.querySelector('.signup-wrapper').classList.add('show')
		signUp()
	}
}

copyBtn.onclick = () => {
	navigator.clipboard.writeText(notes.value)
}


notes.addEventListener('input', () => {
	processChange(notes.value)
	savedDot.style.color = '#ccaa00'
})

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
		}
	}
	);

	count.innerText = content.trim().length + '/3000'
	savedDot.style.color = '#008900'
}


const processChange = debounce((e) => saveInput(e));
