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
    if (!response.ok) throw new Error('Failed to fetch Parking API');
    const data = await response.json();

    // process and transform data 
    // the slice here gives us 8 days of parking information
         return data["days"].slice(0,8).map(day => {

          //transform the date data here. 
          let pDay = (day.today_id.slice(6, 8));
          let pMonth = (day.today_id.slice(4, 6), 0); // 0 converts the number to zero-based
          let pYear = (day.today_id.slice(0, 4));
          // create a new Date object
          let pFormatted = new Date(pYear, pMonth, pDay)

          return {
            dateFormat: day.today_id,  //20241230 YearMonthDay
            day: pFormatted.toLocaleDateString('en-US', {weekday: 'long', month: 'short', day: 'numeric', year: 'numeric'}),
            parking: day.items[0]
          };
        });
      } catch(err) {
         console.error('Error fetching parking data:', err);
      return null; // return an empty array if the fetch fails.
      }
    };


    // Modular fetch function for Parking
    (async function testParkingAPI(){
      const parkingData = await fetchParkingData();
      console.log('Output for Parking API:', parkingData);
    })();



const weatherURL = `https://api.weather.gov/points/40.6863,-73.9641`;

    // Weather data below
    fetch(weatherURL)
      .then(response => {
        // check if the response is valid
        if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        //console.log(data.properties) - Additional raw weather info. Save for testing

        // check if 'properties' exist and log the Forecast URL
        if (data.properties && data.properties.forecast) {
          const forecastURL = data.properties.forecast;
          //console.log(`Forecast URL:`, forecastURL) -- this is the raw weather info. Save for testing.

          // Fetch the forecast data and do something with it. 
          return fetch(forecastURL)
            .then(response => {
              
              // check if the response is valid
              if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);
              return response.json();
            });
          } else {
            throw new Error(`Forecast URL not found in properties.`)
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
                  //rawData: period,
                  period: period.number,
                  day: `${period.name}, ${period.temperature}°F`,
                  //temp: `${period.temperature}°F`,
                  forecast: period.detailedForecast
                }
              })
              JSON.stringify(timedForecast, null, 2);
              console.log(timedForecast);
        })
       // errors 
        .catch(err => {
          console.error(`Error fetching weather data:`, err.message);
        });


  
