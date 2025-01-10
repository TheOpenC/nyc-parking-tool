import { fetchForecastData, fetchParkingData } from "./api.js";


async function testAPIs(){
  const parkingData = await fetchParkingData();
  const forecastData = await fetchForecastData();
  console.log('Parking Data:', parkingData);
  console.log('Forecast Data:', forecastData);
}

testAPIs();


// //Fetch Parking data from 311 API
// async function fetchParkingData() {
//   const parkingURL = `https://api.nyc.gov/public/api/GetCalendar?fromdate=${month}%2F${day}%2F${year}&todate=${+month + 1}%2F${day}%2F${year}`;
//   try {
//   // Parking data
//     const response = await fetch(parkingURL, {
//       method: 'GET',
//       headers: {
//         'Cache-Control': 'no-cache',
//         'Ocp-Apim-Subscription-Key': 'f900a38d921947fa920d239f7931049f'
//       }
//     });
//     // Check if the response is OK
//     if (!response.ok) throw new Error('Failed to fetch Parking API');
    


//     // Transform parking data // slice gives us 8 days of data
//         return data["days"].slice(0,8).map(day => transformParkingDay(day));
//       } catch(err) {
//         //if errors:
//         console.error('Error fetching parking data:', err);
//         return null;
//       }
// }
// Transforms a single Parking Day for .map above ^ 
// function transformParkingDay(day) {
//   //Extract and parse date components from today_id
//   const pDay = parseInt(day.today_id.slice(6, 8), 10); //parseInt ensures int / DD
//   const pMonth = parseInt(day.today_id.slice(4, 6), 10) - 1; // -1 for 0 based months. MM
//   const pYear = parseInt(day.today_id.slice(0, 4), 10); // YYYY

//   // create a new Date object
//   const pFormatted = new Date(pYear, pMonth , pDay); 

//   // Return a structured object with transformed data
//   return {
//     dateFormat: day.today_id,  //20241230 YYYYMMDD
//     day: pFormatted.toLocaleDateString('en-US', { // calendar formatted date
//       weekday: 'long', 
//       month: 'short', 
//       day: 'numeric', 
//       year: 'numeric'
//     }),
//     parking: day.items[0] // Parking restriction info
//   };
// }

// //Fetch Weather Data from NWS API
// // async function fetchForecastData(){  
// //   const weatherURL = `https://api.weather.gov/points/40.6863,-73.9641`;
// //   try {
// //       // API request to weatherURL
// //       const response = await fetch(weatherURL);
        
// //       // Check if the response is OK
// //       if (!response.ok) throw new Error(`Failed to fetch Weather API`);
          
// //       // Parse the JSON response
// //       const data = await response.json();    
// //       //console.log(data.properties) - Additional raw weather info. Save for testing

// //       // Extract the forecastURL from response
// //       const forecastURL = data.properties.forecast;
// //       if (!forecastURL) throw new Error('Forecast URL not found in Weather API response')
          
// //       // Make an API request to the Forecast URL 
// //       const forecastResponse = await fetch(forecastURL);
// //       //console.log(`Forecast URL:`, forecastURL) //-- this is the forecast URL. Save for testing.

// //       //Check if the forecast response is OK
// //       if (!forecastResponse.ok) throw new Error(`Failed to fetch Forecast API`);

// //       // Parse the JSON response 
// //       const forecastData = await forecastResponse.json();

// //       // Transform and return the weather data
// //       return forecastData.properties.periods.map(period => {
// //         const dateFormat = period.startTime.slice(0, 10).replace(/-/g, ''); // replace `-` with nospace. /g (flag 'g') says all instances
// //         return {
// //           dateFormat: dateFormat, //YYYYMMDD
// //           period: period
// //         };
// //       });
// //     } catch (err) {
// //       //error catch
// //       console.error('Error fetching weather data', err);

// //       // Return null if an error occurs to prevent breaking the program
// //       return null;
// //     } 
// //   }   

//   // ***********************
//   // IIFE immediately invoked function expression
//   // Combine the Parking and Weather Data
//   //
//   // ***********************
// // (async function combineForecastAndParkingData() {
// //   try {
// //     // step 1. Fetch parking and weather data
// //     const parkingData = await fetchParkingData();
// //     const forecastData = await fetchForecastData();

// //     if (!parkingData || !forecastData) {
// //       throw new Error('Failed to fetch one or both datasets')
// //     } 

// //     // Step 2, combine the data
// //     const aDayofData = combinePW(parkingData, forecastData);
  
// //     // Console Log the combined data
// //     console.dir(aDayofData, {depth: 5});

// //     return aDayofData; 
// //   } catch (err) {
// //     // Step 3: Handle any errors
// //     console.error('Error combining data:', err);
// //     return null;
// //   }
// // })();

// // Create a day of Data
// function combinePW (parkingData, forecastData) {
//   return parkingData.map(pDay => {
//     //dateFormat: pDay.dateFormat, //YYYYMMDD
//     const matchingForecast = forecastData.filter(wDay => wDay.dateFormat === pDay.dateFormat);
//     const morningForecast = matchingForecast[0];
//     const eveningForecast = matchingForecast[1];

//     // Returns structured object
//     return {
//       day: pDay.day,
//       parking: pDay.parking,
//       weather: {
//         morning: morningForecast,
//         evening: eveningForecast,
//       }
//     };
//   });
// }



