// document.querySelector('button').addEventListener('click', getFetch);

// function getFetch() {
//   const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Public CORS proxy
// f = from date (today), t = to date (1 week away or whatever timeframe you choose)
function dateMath(today){
  
}


let today = new Date();
let fromDate = today.toLocaleDateString().split("/")
let toDate = today.setDate(getDate()+ 15)
//toDate = toDate.toLocaleDateString().split("/")
console.log(fromDate, toDate)

// let fMonth = split[0]
// let fDay = split[1]
// let fYear = split[2] 




const apiUrl = 'https://api.nyc.gov/public/api/GetCalendar?fromdate=12%2F12%2F2024&todate=01%2F01%2F2025';
 
 

  // fetch(apiUrl, {
  //   method: 'GET',
  //   headers: {
  //     'Cache-Control': 'no-cache',
  //     'Ocp-Apim-Subscription-Key': 'f900a38d921947fa920d239f7931049f'
  //   }
  // })
  //   .then((response) => {
  //     if (!response.ok) throw new Error('Network response was not ok');
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log(JSON.stringify(data, null, 2));
  //   })
  //   .catch((err) => console.error('Error:', err));
  
 
