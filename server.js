const express = require('express'); // Import Express
const bodyParser = require('body-parser'); // Import body-parser middleware
const app = express(); // create an instance fo the express application

const 

app.get('/', (req, res) => {
    res.send('Hello, World!'); // send a response when the root route is accessed
});

const PORT = 3000 // define the port number
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
