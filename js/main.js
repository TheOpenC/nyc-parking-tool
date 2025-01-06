
// Date info for parking API
let today = new Date();
let dayOfWeek = today.getDay()

// this resolves formatting issues with dates
let month = String(today.getMonth()+1).padStart(2, '0'); //MM
let day = String(today.getDate()).padStart(2, '0'); //DD
let year = String(today.getFullYear()); //YYYY


//Fetch Parking data from 311 API
async function fetchParkingData() {
  const parkingURL = `https://api.nyc.gov/public/api/GetCalendar?fromdate=${month}%2F${day}%2F${year}&todate=${+month + 1}%2F${day}%2F${year}`;
  try {
  // Parking data
    const response = await fetch(parkingURL, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': 'f900a38d921947fa920d239f7931049f'
      }
    });
    // Check if the response is OK
    if (!response.ok) throw new Error('Failed to fetch Parking API');
    
    // Parse the JSON response
    const data = await response.json();

    // Transform parking data // slice gives us 8 days of data
        return data["days"].slice(0,8).map(day => transformParkingDay(day));
      } catch(err) {
        //if errors:
        console.error('Error fetching parking data:', err);
        return null;
      }
}
// Transforms a single Parking Day for .map above ^ 
function transformParkingDay(day) {
  //Extract and parse date components from today_id
  const pDay = parseInt(day.today_id.slice(6, 8), 10); //parseInt ensures int / DD
  const pMonth = parseInt(day.today_id.slice(4, 6), 10) - 1; // -1 for 0 based months. MM
  const pYear = parseInt(day.today_id.slice(0, 4), 10); // YYYY

  // create a new Date object
  const pFormatted = new Date(pYear, pMonth , pDay); 

  // Return a structured object with transformed data
  return {
    dateFormat: day.today_id,  //20241230 YYYYMMDD
    day: pFormatted.toLocaleDateString('en-US', { // calendar formatted date
      weekday: 'long', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    }),
    parking: day.items[0] // Parking restriction info
  };
}


// Test the parking data fetch and transformation
// (async function testParkingAPI() {
//   const parkingData = await fetchParkingData();
//   if (parkingData) {
//     console.log('Transformed Parking Data:', parkingData);
//   } else {
//     console.log('No parking data returned.');
//   }
// })();


//Fetch Weather Data from 311 API
async function fetchForecastData(){  
  const weatherURL = `https://api.weather.gov/points/40.6863,-73.9641`;
  try {
      // API request to weatherURL
      const response = await fetch(weatherURL);
        
      // Check if the response is OK
      if (!response.ok) throw new Error(`Failed to fetch Weather API`);
          
      // Parse the JSON response
      const data = await response.json();    
      //console.log(data.properties) - Additional raw weather info. Save for testing

      // Extract the forecastURL from response
      const forecastURL = data.properties.forecast;
      if (!forecastURL) throw new Error('Forecast URL not found in Weather API response')
          
      // Make an API request to the Forecast URL 
      const forecastResponse = await fetch(forecastURL);
      //console.log(`Forecast URL:`, forecastURL) -- this is the raw weather info. Save for testing.

      //Check if the forecast response is OK
      if (!forecastResponse.ok) throw new Error(`Failed to fetch Forecast API`);

      // Parse the JSON response 
      const forecastData = await forecastResponse.json();
          
      // Transform and return the weather data
      return forecastData.properties.periods.map(period => {
        const dateFormat = period.startTime.slice(0, 10).replace(/-/g, ''); // replace `-` with nospace. /g (flag 'g') says all instances
        return {
          dateFormat: dateFormat, //YYYYMMDD
          period: period.name, //time of day
          temperature: `${period.temperature}°F`,
          forecast: period.detailedForecast 
        };
      });
    } catch (err) {
      //error catch
      console.error('Error fetching weather data', err);

      // Return null if an error occurs to prevent breaking the program
      return null;
    } 
  }   

// Test the Weather Data Fetch Function
// (async function testForecastAPI() {
//   const forecastData = await fetchForecastData();
//   if (forecastData) {
//     console.log('Output for Forecast API:', forecastData);
//   } else {
//     console.log('No Weather data returned.');
//   }
// })();

  // ***********************
  //
  // Combine the Parking and Weather Data
  //
  // ***********************
async function combineData() {
  try {
    // step 1. Fetch parking and weather data
    const parkingData = await fetchParkingData();
    const forecastData = await fetchForecastData();

    if (!parkingData || !forecastData) {
      throw new Error('Failed to fetch one or both datasets')
    } 

    // Step 2, combine the data
    const combinedData = parkingData.map(pDay => {
      // Match parking day with weather forecasts using dateFormat
      const matchingForecast = forecastData.filter(wDay => wDay.dateFormat === pDay.dateFormat);

      // Separate morning and evening forecasts
      const morningForecast = matchingForecast.find(weather => weather.period.includes("Morning"));
      const eveningForecast = matchingForecast.find(weather => weather.period.includes("Evening"));

      return {
        dateFormat: pDay.dateFormat, //shared date format weather / parking
        day: pDay.day, // calendar date
        parking: pDay.parking, // parking restriction info
        morningForecast: morningForecast ? morningForecast.forecast : 'No morning forecast available', // Morning weather
        eveningForecast: eveningForecast ? eveningForecast.forecast : 'No evening forecast available', // Evening weather
      };
    });

    console.log('Combined Data:', combinedData); // Log the combined dataset
    return combinedData; 
  } catch (err) {
    // Step 3: Handle any errors
    console.error('Error combining data:', err);
    return null;
  }
}

(async function testCombinedData() {
  const combinedData = await combineData();
  if (combinedData) {
    console.log('Final Combined Data:', combinedData);
  } else {
    console.log('Failed to combine parking and weather data.');
  }
})();