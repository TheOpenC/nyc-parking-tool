
//api.js



// Date info for parking API
// this resolves formatting issues with dates
let today = new Date();
let month = String(today.getMonth()+1).padStart(2, '0'); //MM
let day = String(today.getDate()).padStart(2, '0'); //DD
let year = String(today.getFullYear()); //YYYY


export async function fetchParkingData() {
    const parkingURL = "http://localhost:3001/api/parking"; // local proxy server
   
    try {
        console.log(`Fetching parking data from: ${parkingURL}`);
        const response = await fetch(parkingURL);

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        
        //Parse the JSON response
        const data = await response.json();

        //return data;
        return data.days.slice(0,8).map((day) => {
            const pDay = parseInt(day.today_id.slice(6, 8), 10); //parseInt ensures int / DD
            const pMonth = parseInt(day.today_id.slice(4, 6), 10) - 1; // -1 for 0 based months. MM
            const pYear = parseInt(day.today_id.slice(0, 4), 10); // YYYY
        
            const pFormatted = new Date(pYear, pMonth, pDay);
            
            return {
                day: pFormatted.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric'
                }),
                dateFormat: day.today_id,  //20241230 YYYYMMDD
                parking: day.items[0] // Parking restriction info
              };
        })
       
    } catch (err) {
        console.log("Error in fetchParkingData", err);
        return null;
    }
}

fetchParkingData().then(data => {
    if (data && data.length > 0) {
       ;
    } else {
        console.log("No parking data returned");
    }
});


export async function fetchForecastData() {
    const weatherURL = `https://api.weather.gov/points/40.6863,-73.9641`;
    try {
        const response = await fetch(weatherURL);
        if(!response.ok) throw new Error("Failed to fetch Weather API");

        const data = await response.json();
        const forecastURL = data.properties.forecast;
        if(!forecastURL) throw new Error("Forecast URL not found in Weather API")
        
        const forecastResponse = await fetch(forecastURL);
        if (!forecastResponse) throw new Error("Failed to fetch Forecast API")
        
        const forecastData = await forecastResponse.json();

        return forecastData.properties.periods.map(period => {
            const dateFormat = period.startTime.slice(0, 10). replace(/-/g, "");
           
             const wDay = (dateFormat.slice(6, 8)); //parseInt ensures int / DD
             const wMonth = (dateFormat.slice(4, 6)) - 1; // -1 for 0 based months. MM
             const wYear = (dateFormat.slice(0, 4)); // YYYY

             const wFormatted = new Date(wYear, wMonth, wDay);

            return {
                //dateFormat: dateFormat,
                day: wFormatted.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric'
                  }),
                dateFormat: dateFormat,
                period: period,
            };
        });
    } catch (err){
        console.err('Error fetching weather data', err);
        // if an error, return null so the program keeps running.
        return null;
    }
} 

