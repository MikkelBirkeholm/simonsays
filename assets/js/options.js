const profileImageInput = document.querySelector("#profile-image-input");
const profileImagePreview = document.querySelector('#profileImageOptions')

profileImageInput.addEventListener("change", function() {
    
    const reader = new FileReader();
	reader.addEventListener("load", () => {
        localStorage.setItem('profileImage', reader.result)
    });
    reader.readAsDataURL(this.files[0]);
    
    if (profileImageInput.files.length > 0) {
      const fileSize = profileImageInput.files.item(0).size;
      const fileMb = fileSize / 1024 ** 2;
      alert(fileMb);
    }
    
});



// Saves options to chrome.storage
function save_options() {
    var profile_name = document.getElementById('name').value;
    var profile_title = document.getElementById('title').value;
    chrome.storage.sync.set({
        profile_name: profile_name,
        profile_title: profile_title
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Gemt';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        profile_name: 'LinkedIn Name',
        profile_title: 'LinkedIn Title'
    }, function(items) {
        document.getElementById('name').value = items.profile_name;
        document.getElementById('title').value = items. profile_title;
    });
    let profileImagePreview = localStorage.getItem('profileImage')
    if(profileImagePreview) {
        profileImageOptions.style.backgroundImage = `url(${profileImagePreview})`
      }
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);