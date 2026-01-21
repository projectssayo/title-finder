import express from "express";
import path from "path";
import "colors";

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files (CSS, JS, images)
// Option 1: serve project root (works with your current index.html/style.css/script.js layout)
app.use(express.static(path.resolve(".")));

// Option 2 (recommended): move static files to ./public and use:
// app.use(express.static(path.join(process.cwd(), "public")));

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

app.get("/about", (req, res) => {
    res.sendFile(path.resolve("about.html"));
    console.log("about page displayed".cyan.bgWhite);
});

app.post("/send", async (req, res) => {
    let binary_data = "";

    req.on("data", chunk => binary_data += chunk);

    req.on("end", async () => {
        try {
            const json_data = JSON.parse(binary_data || "{}");
            if (!json_data.input_url) {
                res.status(400).send("Missing input_url");
                return;
            }
            const title = await get_title(json_data.input_url);
            res.send(title);
        } catch (err) {
            console.error("Error parsing JSON or fetching title:", err);
            res.status(500).send("Internal server error");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Website running on port ${PORT} at http://localhost:${PORT}`.rainbow.bold);
});
