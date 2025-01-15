import { fetchForecastData, fetchParkingData } from "./api.js"


export async function combineForecastAndParkingData() {
          try {
            //Fetch parking and weather data
            const parkingData = await fetchParkingData();
            const forecastData = await fetchForecastData();
        
            if (!parkingData || !forecastData) {
              throw new Error('Failed to fetch one or both datasets')
            } 
        
            // Step 2, combine the data
            const aDayofData = dayDataCombiner(parkingData, forecastData);
            
            //log the combined data
            return aDayofData;
        
          } catch (err) {
            // Step 3: Handle any errors
            console.error('Error combining data:', err);
            return null;
          }
        };
        
        // Create a day of Data
        function dayDataCombiner (parkingData, forecastData) {
          return parkingData.map(pDay => {
            //dateFormat: pDay.dateFormat, //YYYYMMDD
            const matchingForecast = forecastData.filter(wDay => wDay.dateFormat === pDay.dateFormat);
            const morningForecast = matchingForecast[0];
            const eveningForecast = matchingForecast[1];
        
            // Returns structured object
            return {
              day: pDay.day,
              parking: pDay.parking,
              weather: {
                morning: morningForecast,
                evening: eveningForecast
              }
            };
          });
        }
