//import {today, month, day, year, fetchParkingData, transformParkingDay, fetchForecastData, combineForecastAndParkingData, combinePW} from 'main.js';

const parkingP = document.getElementById("parking")
const morningP = document.getElementById("morningF")
const eveningP = document.getElementById("eveningF")


console.log(combinePW(parkingData, forecastData))

// asnyc 
async function updateDOM () {
    try {

       const parkingData = await fetchParkingData(); // from api.js
       const forecastData = await fetchForecastData(); //from api.js
    
       if (!parkingData || !forecastData) {
        throw new Error('Failed to fetch parking or forecast data.');
       }

       // step 2: combine weather and parking data
       //const combinedData = combinePW(parkingData, forecastData); // from combine.js
          
       // Get today's data (first item in combinedData)
       //it's more complicated than this. It needs to be datematched, and then for each date, parking for parking, [0] for morning, [1] for evening. 
       const todayData = combinedData[0];

       if (!todayData) {
        throw new Error("There is something wrong with today's data.");
       }

       // update the DOM
       parkingP.innerText = todayData.parking.details || "No parking info available.";
       morningP.innerText = todayData.weather.morning?.period?.detailedForecast || "No weather data available."
       eveningP.innerText = todayData.weather.evening?.period?.detailedForecast || "No weather data available."
    } catch (err) {
        console.error('Error combining data:', err);
    
        parkingP.innerText = "Error loading parking info."
        morningP.innerText = "Error loading morning forecast."
        eveningP.innerText = "Error loading evening forecast."
    }
  
} 
updateDOM()