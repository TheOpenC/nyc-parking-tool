// document.querySelector('button').addEventListener('click', getFetch);

// Date info for parking API
let today = new Date();
let dayOfWeek = today.getDay()

// this resolves formatting issues with dates
let month = String(today.getMonth()+1).padStart(2, '0');
let day = String(today.getDate()).padStart(2, '0');
let year = String(today.getFullYear());


const parkingURL = `https://api.nyc.gov/public/api/GetCalendar?fromdate=${month}%2F${day}%2F${year}&todate=12%2F31%2F2025`;
 
// Parking data
  fetch(parkingURL, {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache',
      'Ocp-Apim-Subscription-Key': 'f900a38d921947fa920d239f7931049f'
    }
  })
    .then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then((data) => {
      // the slice here gives us 8 days of parking information
      let returnedData = data["days"].slice(0,8)
      const transformedData = returnedData.map(day => {
        return {
          today_id: day.today_id,
          items: day.items[0]
        };
      });
      JSON.stringify(transformedData, null, 2);
      console.log(transformedData);
    })
    .catch((err) => console.error('Error:', err));


const weatherURL = `https://api.weather.gov/points/40.6863,-73.9641`;

    // Weather data below
    fetch(weatherURL)
      .then(response => {
        // check if the response is valid
        if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        console.log(data.properties)
        // check if 'properties' exist and log the Forecast URL
        if (data.properties && data.properties.forecast) {
          const forecastURL = data.properties.forecast;
          console.log(`Forecast URL:`, forecastURL)

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
                return {
                  number: period.number,
                  name: period.name,
                  isDaytime: period.isDaytime,
                  temp: `${period.temperature}F`,
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



  
