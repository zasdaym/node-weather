const weatherForm = document.querySelector('#weatherForm')
const searchElement = document.querySelector('#searchElement')

const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = searchElement.value
    const url = `/weather?address=${address}`
    msgOne.textContent = ''
    msgTwo.textContent = 'Loading...'
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgTwo.textContent = data.error
            } else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
            }
        })
    })
})