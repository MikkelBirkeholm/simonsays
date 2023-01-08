export default function setData() {
	const postImage = document.querySelector('#postPreviewImage')
	const notes = document.querySelector('#notes')
	const savedDot = document.querySelector('#saved')
	const profileImage = document.querySelector('#profileImage')
	const count = document.querySelector('#count')

	let recentImage = localStorage.getItem('image')
	let profileImageSet = localStorage.getItem('profileImage')

	chrome.storage.sync.get(['savedNote'], function (result) {
		if (result.savedNote.content) {
			notes.value = result.savedNote.content
			count.innerText = result.savedNote.content.trim().length + '/3000'
		} else {
			console.log('No saved text found')
		}
	});


	if (recentImage) {
		postImage.src = recentImage
	}
	if (profileImageSet) {
		profileImage.style.backgroundImage = `url(${profileImageSet})`
	}
	savedDot.style.color = '#008900'
}

