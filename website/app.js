/* Global Variables */
const apiKey = 'bc60e0720c85e60a128fc72c61828321'
const country = 'de'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', () => generate() )

const generate = async() => {
    const zip = document.getElementById('zip').value
    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&appid=${apiKey}&units=metric`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            const userResponse = document.getElementById('feelings').value;
            
            return postData('http://localhost:3000/add', {
                temperature: data.main.temp,
                date: newDate,
                userResponse: userResponse
            })
            
        })
        .then(() => { updateUI('http://localhost:3000/all') }
        )
        .catch(error => console.log(error));
    
}

const postData = async (path, data) => {
    const response = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    try{
        const newData = await response.json();
        console.log(newData)
        return newData;
    } catch (error){
        console.log(error);
    }
};

const updateUI = async (path) => {
    fetch(path)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data)
            document.getElementById('feelings').value = '';
            document.getElementById('feelings').blur();
            document.getElementById('date').innerHTML = data.date;
            document.getElementById('temp').innerHTML = data.temp + ' °C';
            document.getElementById('content').innerHTML = data.userResponse;
        })
    
}
