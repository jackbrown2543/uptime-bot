
//Refering to the Packages


var Discord = require('discord.js');
var noblox = require('noblox.js');
var bot = new Discord.Client();
const fs = require('fs')
var config = require('./config.json')
bot.commands = new Discord.Collection()
const commandfiles = fs.readdirSync(`./Commands/`).filter(file => file.endsWith('.js'))

for (const file of commandfiles){
    const command = require(`./Commands/${file}`)
    bot.commands.set(command.name,command);
}


bot.on('message' , (message) => {
// Variables

var msg = message.content.toLowerCase()
var prefix = 'f!'
var args = message.content.split(/ +/)

if(message.author.bot) return; // If message.author is a bot it ignores it
if(message.channel.type === 'dm') return; // Ignores Dm's to prevent errors from the bot


if (msg.startsWith(prefix + 'userinfo')) {
    bot.commands.get(`UserInfo`).execute(message, msg);
    
}

    if (msg.startsWith(prefix + 'rank')) {
        let roles = ["854410017285472297", "851257230074183720"]
        if(!roles.some(role => message.member.roles.cache.has(role)))
        return message.reply("you do not have permission to use this command.")
            bot.commands.get(`Rank`).execute(message, msg, args, config);
        }
    {
    }

    if(msg.startsWith(prefix + 'promote'))return bot.commands.get('Promote').execute(message,msg,args);

    if(msg.startsWith(prefix + 'demote'))return bot.commands.get('Demote').execute(message,msg,args);

    if(msg.startsWith(prefix + 'shout'))return bot.commands.get('GroupShout').execute(message,msg,args);

    if(msg.startsWith(prefix + 'fire'))return bot.commands.get('Fire').execute(message,msg,args);

    }


);

    bot.on ('ready' , async () => {
    console.log("The Bot is Running")
    bot.user.setActivity("Flavorful Ranking", {type : "WATCHING"} )
    await noblox.setCookie(config.Cookie)
    .then((success) => { // Required if the group's shout is private

        let onShout = noblox.onShout(config.GroupID);
        
        onShout.on('data', function(post) {
           
            bot.fetchWebhook(config.GroupShoutWebhookID)
            .then(webhook => {

                webhook.send({

                    username : post.poster.username,
                    avatar_url : "https://t3.rbxcdn.com/0defb07c4003c728e608281d85b7a11a",
                    embeds : [{

                        title : "Shout",
                        description : post.body,
                        url : "https://www.roblox.com/groups/5248575/Flavorful#!/about"

                    }]

                })
                
                .catch(console.error)

            })
        });        
        
        onShout.on('error', function (err) {
            console.error(err.stack);
        });
    
        console.log('Logged in.');
    
    }).catch((err) => console.error(err.stack));

    },

    )
bot.login("ODUwNzAxNDgyNDMzMzE0ODQ2.YLtjfg.I_LgCc15CGpVYu-kAg33OIn16IY")

    
