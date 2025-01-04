// document.querySelector('button').addEventListener('click', getFetch);

// Date info for parking API
let today = new Date();
let dayOfWeek = today.getDay()

// this resolves formatting issues with dates
let month = String(today.getMonth()+1).padStart(2, '0');
let day = String(today.getDate()).padStart(2, '0');
let year = String(today.getFullYear());



async function fetchParkingData() {
  const parkingURL = `https://api.nyc.gov/public/api/GetCalendar?fromdate=${month}%2F${day}%2F${year}&todate=12%2F31%2F2025`;
  try {
  // Parking data
    const response = await fetch(parkingURL, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': 'f900a38d921947fa920d239f7931049f'
      }
    });
    // check if the response is OK
    if (!response.ok) throw new Error('Failed to fetch Parking API');
    
    // Parse the JSON response
    const data = await response.json();

    
    // transform and return: the slice gives us 8 days of parking information
        return data["days"].slice(0,8).map(day => transformParkingDay(day));
      } catch(err) {
        console.error('Error fetching parking data:', err);
        
        // return null if there's an error
        return null;
      }
}

function transformParkingDay(day) {
  //transform the date data here. 
  const pDay = parseInt(day.today_id.slice(6, 8), 10); //parseInt ensures an integer is returned
  const pMonth = parseInt(day.today_id.slice(4, 6), 10) - 1; //subtract by 1 because the month is 0 based.
  const pYear = parseInt(day.today_id.slice(0, 4), 10);
  // create a new Date object
  const pFormatted = new Date(pYear, pMonth , pDay);

  // Return a structured object with transformed data
  return {
    dateFormat: day.today_id,  //20241230 YYYYMMDD
    day: pFormatted.toLocaleDateString('en-US', {
      weekday: 'long', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    }),
    parking: day.items[0]
  };
}


// test the parking data fetch and transformation
(async function testParkingAPI() {
  const parkingData = await fetchParkingData();
  if (parkingData) {
    console.log('Transformed Parking Data:', parkingData);

    // Log the first entry for clarity
    if (parkingData.length > 0) {
      console.log('First Transformed Parking Entry:', parkingData[0]);
    }
  } else {
    console.log('No parking data returned.');
  }
})();


//initial weather data fetch
async function fetchForecastData(){  
  const weatherURL = `https://api.weather.gov/points/40.6863,-73.9641`;
  try {
      // Weather data below
      const response = await fetch(weatherURL);
        
          // check if the response is valid
      if (!response.ok) throw new Error(`Failed to fetch Weather API`);
          
      // Parse the JSON response body
      const data = await response.json();    
      //console.log(data.properties) - Additional raw weather info. Save for testing

      // extract the forecast URL
      const forecastURL = data.properties.forecast;
      if (!forecastURL) throw new Error('Forecast URL not found in Weather API response')
          
      // Make an API request to the Forecast URL 
      const forecastResponse = await fetch(forecastURL);
      //console.log(`Forecast URL:`, forecastURL) -- this is the raw weather info. Save for testing.

      //check if the forecast response is OK
      if (!forecastResponse.ok) throw new Error(`Failed to fetch Forecast API`);


      // Parse the JSON response 
      const forecastData = await forecastResponse.json();
          

      // Transform and return the weather data
      return forecastData.properties.periods.map(period => {
        const dateFormat = period.startTime.slice(0, 10).replace(/-/g, ''); // replace `-` with nospace. /g (flag 'g') says all instances
        return {
          
        }
      })



          .then(forecastData => {
                // Handle Forecast Data
                const timedForecast = forecastData.properties.periods.map(period => {

                  //date format follows:  startTime: '2025-01-06T06:00:00-05:00'
                  let wDay = period.startTime.slice(8,10)
                  let wMonth = period.startTime.slice(5,7)
                  let wYear = period.startTime.slice(0,4)
                  let wFormatted = wYear+wMonth+wDay // this formats the forecast date the same way as the parking date 
                  return {
                    dateFormat: wFormatted,
                    //rawData: period, // includes parking, school and sanitation info
                    period: period.number,
                    day: `${period.name}, ${period.temperature}°F`,
                    forecast: period.detailedForecast
                  }
                })
                JSON.stringify(timedForecast, null, 2);
                console.log(timedForecast);
          })
   // errors 
  }         catch(err) {
            console.error(`Error fetching weather data:`, err);
          
            return null;
          };
};        

// Modular fetch function for Forecasts
(async function testForecastAPI(){
  const forecastData = await fetchForecastData();
  console.log('Output for Forecast API:', forecastData);
})();

  
