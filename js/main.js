// document.querySelector('button').addEventListener('click', getFetch);


let today = new Date();

// this resolves formatting issues with dates
let month = String(today.getMonth()+1).padStart(2, '0');
let day = String(today.getDate()).padStart(2, '0');
let year = String(today.getFullYear());



const apiUrl = `https://api.nyc.gov/public/api/GetCalendar?fromdate=${month}%2F${day}%2F${year}&todate=12%2F31%2F2025`;
 

  fetch(apiUrl, {
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
  
