const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve your HTML files
app.use(express.static(__dirname));

// Folder where account(username).json files live
const accountsDir = path.join(__dirname, "ignore");

// GET /api/users → scan ignore/ for account(*).json
app.get("/api/users", (req, res) => {
    fs.readdir(accountsDir, (err, files) => {
        if (err) {
            console.error("Error reading accounts directory:", err);
            return res.json([]);
        }

        const users = [];

        files
            .filter(f => f.startsWith("account(") && f.endsWith(".json"))
            .forEach(file => {
                const fullPath = path.join(accountsDir, file);

                try {
                    const raw = fs.readFileSync(fullPath, "utf8");
                    const data = JSON.parse(raw);

                    if (data.username) {
                        users.push({
                            name: data.username,
                            online: !!data.online
                        });
                    }
                } catch (e) {
                    console.error("Invalid account file:", file, e);
                }
            });

        res.json(users);
    });
});

app.listen(PORT, () => {
    console.log(`StudSup backend running at http://localhost:${PORT}`);
});