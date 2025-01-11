// const express = require('express'); // Import Express
// const bodyParser = require('body-parser'); // Import body-parser middleware
// const app = express(); // create an instance fo the express application

// const { fetchParkingData } = require('./js/api'); //Import fetchParkingData

// app.get('/api/parking', async (req, res) => {
//     try {
//         const parkingData = await fetchParkingData();
//         if (!parkingData) {
//             res.status(500).json({error: "Failed to fetch parking data"});
//         } else {
//             res.json(parkingData);
//         }
//     } catch (err){
//         res.status(500).json({error: err.message });
//     }
// });

// const PORT = 3000 // define the port number
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// })
