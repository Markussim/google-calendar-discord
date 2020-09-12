const express = require('express')
const fs = require('fs');
const other = require("./app.js")
const app = express()
const port = 3000

app.get('/', (req, res) => {
    //res.send('Hello World!')

    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Calendar API.
        other.authorize(JSON.parse(content), other.listEvents, res);
    });
})
app.listen(port, () => console.log(`Example app listening on port port!`))