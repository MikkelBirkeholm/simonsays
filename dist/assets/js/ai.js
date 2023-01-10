const fetchBtn = document.querySelector('#fetch-btn')
// const aiForm = document.querySelector('#ai-form')
let requestBody = { 'model': 'text-davinci-003', 'prompt': '', 'temperature': 0, 'top_p': 1, 'max_tokens': 2000 }
const postResult = document.querySelector('.generator-result')
const promptPreview = document.querySelector('#prompt-preview')
const generatorContent = document.querySelector('#generator-content')

chrome.storage.sync.get(['savedNote'], function (result) {
    if (result.savedNote.content) {
        generatorContent.value = result.savedNote.content
    } else {
        console.log('No saved text found')
    }
});

function setPrompt() {
    // let fieldEvent = document.querySelector('#field_event').value;
    // let fieldLesson = document.querySelector('#field_lesson').value;
    let fieldCTA = document.querySelector('input[name="field_cta"]:checked').value;
    let fieldTone = document.querySelector('input[name="field_tone"]:checked').value;

    // requestBody.prompt =
    //     `Write a text for a LinkedIn post, based on the following story, "${fieldEvent}. What I learned was, ${fieldLesson}".
    //     The text must have a tone of voice that is ${fieldTone}. ${fieldCTA}. Answer in Danish.
    //     `
    requestBody.prompt =
        `${fieldCTA}: "${generatorContent.value}". The text must be ${fieldTone}. Answer in danish.`

    requestBody.temperature = Number(document.querySelector('#field_range').value);
    promptPreview.innerText = requestBody.prompt
}

fetchBtn.onclick = (e) => {
    e.preventDefault()
    setPrompt()
    fetchBtn.innerText = 'Arbejder...'
    fetchBtn.disabled = true
    fetch("https://api.openai.com/v1/completions", {
        body: JSON.stringify(requestBody),
        headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json"
        },
        method: "POST"
    }).then(res => res.json())
        .then(data => {
            console.log(data.usage)
            postResult.innerText = data.choices[0].text
            fetchBtn.disabled = false
            fetchBtn.innerText = 'Generer igen'
        })
}