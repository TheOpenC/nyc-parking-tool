import{combineForecastAndParkingData} from "./combine.js";
import{ fetchParkingData, fetchForecastData } from "./api.js"

const parkingP = document.getElementById("parking")
const morningF = document.getElementById("morningF")
const eveningF = document.getElementById("eveningF")
const combined = document.getElementById("combinedData")

async function updateParkingDOM () {
    const todayParking = await fetchParkingData();

    return parkingData.map(pDay => {
        //dateFormat: pDay.dateFormat, //YYYYMMDD
        return {
            day: pDay.day,
            parking: pDay.parking,
    }
    });
        
    
}

updateParkingDOM() 

async function updateForecastDOM(){
    const todayWeather = await fetchForecastData();
    console.log("today's weather", todayWeather)

    morningF.textContent = todayWeather[0]
    console.log("today's morning weather", todayWeather)
    eveningF.textContent = todayWeather[1]

    function abstractFData() {
        return todayWeather.filter(day => day[0] && day[1])
    }

    
    //  // update the DOM
    //  //parkingP.innerText = todayData.parking.details || "No parking info available.";
    //  morningF.innerText = today || "No weather data available."
    //  eveningF.innerText = todayData.weather.evening?.period?.detailedForecast || "No weather data available."
}

console.log(updateForecastDOM())
// asnyc 
async function updateCombineDOM () {
    try {

       //const parkingData = await fetchParkingData(); // from api.js
       //const forecastData = await fetchForecastData(); //from api.js

       const pWDataObject = await combineForecastAndParkingData();
        

        // Save for Debugging
    //    if (!parkingData || !forecastData) {
    //     throw new Error('Failed to fetch parking or forecast data.');
    //    }
          
       // Get today's data (first item in combinedData)
       //it's more complicated than this. It needs to be datematched, and then for each date, parking for parking, [0] for morning, [1] for evening. 
       const todayData = combinedData[0];

       if (!todayData) {
        throw new Error("There is something wrong with today's data.");
       }

      
    } catch (err) {
        console.error('Error combining data:', err);
    
        parkingP.innerText = "Error loading parking info."
        morningP.innerText = "Error loading morning forecast."
        eveningP.innerText = "Error loading evening forecast."
    }
  
} 
updateCombineDOM()