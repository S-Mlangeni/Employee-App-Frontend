const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(__dirname + "/dist/app-frontend/browser"));

app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running");
});
//To allow angular to handling routing instead of this server file:
app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname + "/dist/app-frontend/browser/index.html"));
})