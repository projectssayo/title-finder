import express from "express";
import path from "path";
import "colors";

const app = express();
const PORT = 7450;

async function get_title(url) {
    const response = await fetch(`https://selenium-api-2.onrender.com/title?url=${encodeURIComponent(url)}`);
    const text = await response.text();
    const data = JSON.parse(text);

    if (!data.title) {
        return "RETRY BY USING CORRECT URL e.g. https://google.com";
    }

    return data.title;
}

app.get("/", (req, res) => {
    res.sendFile(path.resolve("index.html"));
    console.log("Home page displayed".cyan.bgWhite);
});

app.post("/send", async (req, res) => {
    let binary_data = "";

    req.on("data", chunk => binary_data += chunk);

    req.on("end", async () => {
        const json_data = JSON.parse(binary_data);
        const title = await get_title(json_data.input_url);
        res.send(title);
    });
});

app.listen(PORT, () => {
    console.log(`Website running on port ${PORT} at http://localhost:${PORT}`.rainbow.bold);
});
