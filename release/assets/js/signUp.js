
export default function signUp() {
    const signUpForm = document.querySelector('#form-signup')
    const nameField = document.querySelector('#name_field')
    const emailField = document.querySelector('#email_field')

    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('signup', true)
        if (nameField.value && emailField.value) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: "post",
                headers: myHeaders,
                redirect: "follow",
                body: `[["${emailField.value}", "${nameField.value}", "true"]]`
            };
            fetch("https://v1.nocodeapi.com/birkeholm/google_sheets/pcXqXCgMTsPsyhFe?tabId=Ark1", requestOptions)
                .then(response => response.text())
                .then(() => {
                    document.querySelector('.signup-wrapper span').innerText = 'Succes! Tjek din indbakke :)'
                    signUpForm.remove()
                })
                .catch(error => console.log('error', error));
        } else {
            alert('Udfyld begge felter')
        }
    })
}