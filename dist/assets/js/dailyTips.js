export default function checkForFetch() {
    let today = new Date().toISOString().slice(0, 10)
    let dailyMessage = document.querySelector('#daily')
    let dailyContainer = document.querySelector('.daily-message')
    let latestFetch = localStorage.getItem('latestFetch')

    if (!localStorage.getItem('latestFetch')) {
        localStorage.setItem('latestFetch', today)
        fetchDaily()
    } else {
        dailyMessage.innerText = localStorage.getItem('daily')
        dailyContainer.classList.add('display')
    }

    function checkDate() {
        if (latestFetch != today) {
            fetchDaily()
            localStorage.setItem('latestFetch', today)
        }
    }

    checkDate()

    function fetchDaily() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "get",
            headers: myHeaders,
            redirect: "follow",

        };

        fetch("https://v1.nocodeapi.com/birkeholm/google_sheets/equMMYAhkLUvhvtU?tabId=Ark1", requestOptions)
            .then(response => response.json())
            .then(result => {
                let todaysMessage = result.data[0].Daily
                localStorage.setItem('daily', todaysMessage)
                dailyMessage.innerText = todaysMessage
                dailyContainer.classList.add('display')
            })
            .catch(error => console.log('error', error));
    }
}