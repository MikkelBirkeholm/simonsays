export default function learnMore() {
let helpBtn = document.querySelector('#help')
let helpDialog = document.querySelector('#helpDialog')
let closeHelp = document.querySelector('#closeHelp')

helpBtn.onclick = () => {
    helpDialog.showModal()
}

closeHelp.onclick = () => {
    helpDialog.close()
}
}