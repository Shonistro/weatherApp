import conditions from './conditions.js';

console.log(conditions)

const apiKey = 'cbb6f141401f4643b82185001232803'



/* I get city name  */
const header = document.querySelector('.header')
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');


function removeCard(){
    const prevCard = document.querySelector('.card');
    if (prevCard) prevCard.remove();
}

function showError(errorMessage){
    const html = `<div class="card"> ${errorMessage} </div>`
    header.insertAdjacentHTML('afterend', html)
}

function showCard({name,country,temp,condition,imgPath}) {
    //Displaying data on page
    const html = `<div class="card">
            
                <h2 class="card-city">${name} <span>${country}</span> </h2>
            
            
                <div class="card-weather">
                <div class="card-value">${temp}<sup>°c</sup> </div>
                    <img class="card-img" src="${imgPath}"  alt="Weather">
                </div>
            
                <div class="card-description"> ${condition} </div>
            
                             
            </div>`;

    //Show card

    header.insertAdjacentHTML('afterend', html)
}

async function getWeather(city){
    //Making request on server
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data


}

//Listening for form submission
form.onsubmit = async (e) => {
    //Cancel update page
    e.preventDefault();

    //take data on input
    let city = input.value.trim();

    const data = await getWeather(city);




    if(data.error){

        removeCard();
        showError(data.error.message);

    }else {

        removeCard()

        // const weatherData = {
        //     name: data.location.name,
        //     country: data.location.country,
        //     temp: data.current.temp_c,
        //     condition: data.current.condition.text
        //
        // }

        const info = conditions.find(
            (obj) => obj.code === data.current.condition.code
        );
        console.log(info);
        console.log(info.languages[23]['day_text']);

        const filePath = './img/' + (data.current.is_day ? 'day' : 'night') + '/';
        const fileName = (data.current.is_day ? info.day : info.night) + '.png';
        const imgPath = filePath + fileName;
        console.log('filePath', filePath + fileName);

        const weatherData = {
            name: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            condition: data.current.condition.text,

            imgPath,
        };


        showCard(weatherData);


    }


};






















