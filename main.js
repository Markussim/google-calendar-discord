const Discord = require("discord.js");
const fs = require("fs");
const other = require("./app.js");
const client = new Discord.Client();

let token = fs.readFileSync("./discordtoken").toString();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  //getUser();
});

client.on("message", async (msg) => {
  if (msg.author.bot) return;

  try {
    if (Object.keys(msg.mentions.users.toJSON()).length === 0) {
      console.log("No mentions");
    } else {
      //console.log(msg.mentions.users.toJSON()[0].id);
      if (msg.mentions.users.toJSON()[0].id == 292403753360031745) {
        //msg.reply('pong');

        //msg.reply(msg.content)

        let me = await msg.guild.members.fetch("292403753360031745");

        console.log(me.user.presence.status);

        if (me.user.presence.status != "online") {
          console.log("Markus is not online");
          fs.readFile("credentials.json", (err, content) => {
            if (err)
              return console.log("Error loading client secret file:", err);
            // Authorize a client with credentials, then call the Google Calendar API.
            other.authorize(JSON.parse(content), other.listEvents, msg);
          });
        }
      }
    }
  } catch (err) {
    msg.reply("Något blev fel. Försök igen");
    console.log(err);
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

async function getUser() {
  const user = client.guilds.cache.get("554977304665784325");
  //.members.cache.get("292403753360031745");

  console.log(user);
}
