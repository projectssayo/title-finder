import express from "express";
import "colors";

const app = express();
const PORT = process.env.PORT || 8452;

app.use(express.json());
app.use(express.static(".")); // serve index.html, style.css, script.js

function print_current_min_second(msg = "") {
    const now = new Date();
    console.log(`${msg}${now.getMinutes()}:${now.getSeconds()}`);
}

app.post("/send-url", async (req, res) => {
    print_current_min_second("POST received at ");

    try {
        const { url } = req.body;

        if (!url) return res.status(400).json({ error: "URL missing" });

        console.log(`Fetching title for: ${url}`.cyan);

        const api_url = `https://selenium-api-2.onrender.com/title?url=${encodeURIComponent(url)}`;
        const api_response = await fetch(api_url);
        const data = await api_response.text();

        const json_data = JSON.parse(data);
        console.log(`Received title: ${json_data.title}`.green);

        res.json(json_data);
    } catch (err) {
        console.log(`Error: ${err}`.red);
        res.status(500).json({ error: "Failed to fetch title" });
    }

    print_current_min_second("Request completed at ");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.rainbow.bold);
});
