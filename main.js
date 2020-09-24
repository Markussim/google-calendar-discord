const Discord = require('discord.js');
const fs = require('fs');
const other = require("./app.js")
const client = new Discord.Client();

let token = fs.readFileSync("./discordtoken").toString()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.author.bot) return;

    try {
        if (Object.keys(msg.mentions.users.toJSON()).length === 0) {
            console.log("No mentions")
        } else {
            console.log("\nid: " + msg.mentions.users.toJSON()[0].id)
            console.log("status: " + msg.mentions.users.toJSON()[0].presence.status)
            if (msg.mentions.users.toJSON()[0].id == 292403753360031745) {
                //msg.reply('pong');

                //msg.reply(msg.content)

                fs.readFile('credentials.json', (err, content) => {
                    if (err) return console.log('Error loading client secret file:', err);
                    // Authorize a client with credentials, then call the Google Calendar API.
                    other.authorize(JSON.parse(content), other.listEvents, msg);
                });
            }
        }

    } catch {
        msg.reply("Något blev fel. Försök igen");
    }
});

client.login(token);

/*app.get('/', (req, res) => {
    //res.send('Hello World!')

    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Calendar API.
        other.authorize(JSON.parse(content), other.listEvents, res);
    });
})
app.listen(port, () => console.log(`Example app listening on port port!`))*/
