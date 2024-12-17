document.querySelector('button').addEventListener('click', getFetch);

function getFetch() {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Public CORS proxy
  const apiUrl = 'https://api.nyc.gov/public/api/GetCalendar?fromdate=12%2F12%2F2024&todate=01%2F01%2F2025';

  fetch(proxyUrl + apiUrl, {
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
    .then((data) => console.log(data))
    .catch((err) => console.error('Error:', err));
}
 
