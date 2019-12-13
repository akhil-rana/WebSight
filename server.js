//Install express server
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/speech-google"));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/speech-google/index.html"));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
