const weatherForm = document.querySelector('form')      /// call section by its name  >> call 1st occurance!
const messageOne= document.querySelector('#message-1')  /// call section by id
const messageTwo= document.querySelector('#message-2')  /// call section by id

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()                                      /// prevent reloading page when press the button
    const location = document.querySelector('input').value; /// get search element
    console.log('event listener is added successfully');
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    fetch("http://localhost:3000/weather?adress=" + location).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if(data.error)
                 messageOne.textContent='Unable to get location!  Try another Search.'
            else {
                 messageOne.textContent=data.location
                 messageTwo.textContent= data.summary+ 'It is currently '+data.temperature+' degrees out.there is '+data['chance of rain']+'% Chance of rain'
            }
        })
    })
})