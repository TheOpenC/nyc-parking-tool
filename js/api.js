
async function fetchParkingData(){
    const parkingURL = `https://api.nyc.gov/public/api/GetCalendar?fromdate=${month}%2F${day}%2F${year}&todate=${+month + 1}%2F${day}%2F${year}`;

    try {
        const response = await fetch(parkingURL, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache',
                'Ocp-Apim-Subscription-Key': 'f900a38d921947fa920d239f7931049f'
              }
        });
        if (!response.ok) throw new Error('Problem fetching parking data.')
            
        const data = await response.json();

        return data.days.slice(0,8).map(day => {
            const pDay = parseInt(day.today_id.slice(6, 8), 10); //parseInt ensures int / DD
            const pMonth = parseInt(day.today_id.slice(4, 6), 10) - 1; // -1 for 0 based months. MM
            const pYear = parseInt(day.today_id.slice(0, 4), 10); // YYYY
        
            const pFormatted = new Date(pYear, pMonth, pDay);
            
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

            
        })

       
    } catch (err) {
        console.log("Error in fetchParkingData", err);
        return null
    }
}

fetchParkingData().then(data => {
    if (data && data.length > 0) {
        console.log("Transformed Parking Data:", data);
    } else {
        console.log("No parking data returned");
    }
});