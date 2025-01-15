import fetch from 'node-fetch';
import express from 'express';
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://127.0.0.1:5500", // Allow live-server requests
    methods: "GET"
}));

const PORT = 3001;
//simple route to proxy requests to the parking api
app.get("/api/parking", async (req, res) => {
    const today = new Date()    
    const month = String(today.getMonth()+ 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const year = String(today.getFullYear());

    const parkingURL = `https://api.nyc.gov/public/api/GetCalendar?fromdate=${month}%2F${day}%2F${year}&todate=${+month + 1}%2F${day}%2F${year}`

    try {
        const response = await fetch(parkingURL, {
            method: "GET",
            headers: {
                'Cache-Control': 'no-cache',
                'Ocp-Apim-Subscription-Key': 'f900a38d921947fa920d239f7931049f'
            },
        });

        if (!response.ok) {
            return res.status(response.status).json({error: "Failed to fetch Parking API"});
        }

        const data = await response.json();
        res.json(data);
    } catch(err) {
        console.error("Error fetching parking data", err);
        res.status(500).json({ error: "internal service error" });
    }
});

// start the server
app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`)
});
