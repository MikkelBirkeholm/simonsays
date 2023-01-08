const profileImageInput = document.querySelector("#profile-image-input");
const profileImageOptions = document.querySelector('#profileImageOptions')

profileImageInput.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    localStorage.setItem('profileImage', reader.result)
    profileImageOptions.setAttribute('style', `background-image: url(${reader.result});`)

  });
  reader.readAsDataURL(this.files[0]);

  if (profileImageInput.files.length > 0) {
    const fileSize = profileImageInput.files.item(0).size;
    const fileMb = fileSize / 1024 ** 2;
    alert('filen er for stor. ', fileMb);
  }
});



// Saves options to chrome.storage
function save_options() {
  let profile_name = document.querySelector('#name').value;
  let profile_title = document.querySelector('#title').value;
  let session_time = document.querySelector('#session-time').value;
  let break_time = document.querySelector('#break-time').value;
  chrome.storage.sync.set({
    profile_name: profile_name,
    profile_title: profile_title,
    session_time: session_time,
    break_time: break_time
  }, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Gemt';
    setTimeout(function () {
      status.textContent = '';
    }, 750);
  });
}


function restore_options() {
  chrome.storage.sync.get(['profile_name', 'profile_title', 'session_time', 'break_time'], function (items) {
    setData(items.profile_name, document.getElementById('name'), 'Intet navn angivet')
    setData(items.profile_title, document.getElementById('title'), 'Ingen titel angivet')
    setData(items.session_time, document.querySelector('#session-time'), '20')
    setData(items.break, document.querySelector('#break-time'), '5')
  });


}

const setData = (what, where, msg) => {
  where.value = what ? what : msg;
}

let profileImagePreview = localStorage.getItem('profileImage')

if (profileImagePreview) {
  profileImageOptions.style.backgroundImage = `url(${profileImagePreview})`
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
  save_options);