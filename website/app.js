/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '2f9d80ab8c52e4d2a367f61f56dcf2a4';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.'+ d.getDate()+'.'+ d.getFullYear(); //0= january, so adding 1 to show the correct month

console.log(newDate);

// Add Event Listener to button
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    // Select the actual value of an HTML input to include in POST
    const newWeather = document.getElementById('zip').value;
    const fav = document.getElementById('feelings').value;

    getWeatherDemo(baseURL, newWeather, apiKey)
    .then(function(data){   // the variable data declared in getAnimalDemo function

        console.log(data);
        postData('/addWeather', {city: data.name, date: newDate, temp: data.main, description: data.weather[0].description, fav: fav} ) //HOW TO ACCESS AN OBJECT WITHIN AN ARRAY WITHIN AN OBJECT: description: data.weather[2].description https://stackoverflow.com/questions/11922383/how-can-i-access-and-process-nested-objects-arrays-or-json

    // We can do this because of Async!
    updateUI()
})

}

/* POST Example */
const postData = async ( url = '', data = {})=>{
    //console.log(data);
    const response = await fetch(url, {
    method: 'POST', //*GET, POST, PUT, DELETE
    credentials: 'same-origin', //include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content- Type "
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
    console.log("error", error);
    //appropriately handle the error
    }
}

const getWeatherDemo = async (baseURL, weather, key)=>{
    //1.
    const res = await fetch(baseURL+weather+',us'+'&appid='+key)
    //2. Call Fake API
    //const res = await fetch('/fakePictureData')
    try {

        const data = await res.json();
        console.log(data)
        return data;
        // 1. We can do sth with our returned data here-- like chain promises

        // 2.
        // postData('/addAnimal', data)
    }   catch(error) {
        // appropriately handle the error
        console.log("error", error);
    }
}

/* Update UI Demo */
const updateUI = async () => {
    const request = await fetch('/all')
    try{
        const allData = await request.json();
        console.log(allData);

        document.getElementById('date').innerHTML ='Date: ' + allData[allData.length-1].date;
        document.getElementById('city').innerHTML ='City: ' + allData[allData.length-1].city;
        document.getElementById('temp').innerHTML = 'Temp: ' + ((allData[allData.length-1].temp.temp) * (9/5) -459.67).toFixed(1) + ' F';
        // document.getElementById('fav').innerHTML = allData[0].title;
        // document.getElementById('pictureIMG').innerHTML = `<img src=${allData[0].hdurl} alt="NASA picture of the day" width="500" height="600"></img>`;
        document.getElementById('description').innerHTML ='Forecast: ' + allData[allData.length-1].description; //accessing object within an object
        document.getElementById('content').innerHTML = 'Feeling: ' + allData[allData.length-1].fav; // allData[0] will show first fav entry. allData[allData.length-1] will show last fav entry
    }catch(error){
        console.log("error", error)
    }
}