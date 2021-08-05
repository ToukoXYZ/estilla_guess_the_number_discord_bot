const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

client.once('ready', () => {
    console.log('Bot is alive!') // Bot Start message. Customizable. (Def: Bot is alive)
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'Do >guess (number) to guess!', // Discord bot status. Customizable. (Def: Do >(number) to guess!)
            type: "PLAYING", // Discord bot status type. (Def: PLAYING)
        }
    });
});

//Start of Randomizer and console

let RandomNumber = Math.floor(Math.random() * 10000); // Number Randomizer. You can change max number. (Def: 10000)

function NumberRandomizer() {
    RandomNumber = Math.floor(Math.random() * 10000) // Number Randomizer. Put same number as above (Def: 10000)
}
var StartTime = setInterval(NumberRandomizer, 21600000); // Randomizer start. You can change how often it randomizes. (Def: 21600000)

function Console() {
    console.log(RandomNumber)
}
var StartConsole = setInterval(Console, 21600000); // Console time start. Put same as Randomizer. (Def: 21600000) 

NumberRandomizer()
Console()

//End of Randomizer and console

const prefix = '>'; // Bot Prefix. Can be changed to anything. (Def: >)

var id


client.on('message', message => {
    id = message.id
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase();

    if
        (command === 'info') { // Info command
        if (message.channel.id !== 'Channel_id') { // Change channel_id to your bot channel's id.
            message.fetch(id).then(msg => msg.delete());
            message.reply(`Wrong channel! Please use commands in <#Channel_id>!`) // Change channel_id to your bot channel's id.
                .then(message => {
                    message.delete({ timeout: 5000 })
                })
        }
        if (message.channel.id === 'Channel_id') { // Change channel_id to your bot channel's id.
            const embed = new MessageEmbed()
                .setColor('#00FFC9')
                .setTitle('Guess the number!') // Title
                .setURL('link') // Link
                .setAuthor('Author', 'https://i.imgur.com/uf8mIKU.png', 'Social_media') // Author
                .setDescription('This is a "Guess the number" minigame. Your goal is to guess the correct number between 0 and 10000! If you guess the correct number you will get random amount of Estilla coins between 0 - 100 000!') // Info 
                .addFields(
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Commands:', value: '>guess (number) & >info', inline: true }, // Commands
                    { name: 'Random text', value: 'for helping a loser like me', inline: true }, // Random text 
                    { name: 'Version', value: '1.0' }, // Version.
                )
                .setImage('https://i.imgur.com/NsLaUyT.jpg') // big image 
                .setTimestamp()
                .setFooter('Idk maan it can be aany number ¯\_(ツ)_/¯', 'https://i.imgur.com/NsLaUyT.jpg'); // small image in left down corner
            client.channels.cache.get('Channel_id').send(embed); // Change channel_id to your bot channel's id.
        }
    } else
        if (command == 'guess') { // Guess the number main command. 
            if (args[0] != RandomNumber){
                client.channels.cache.get('Channel_id').send(`Wrong ${message.author}. Try again :)`)
            }
            if (args[0] == RandomNumber) { // Guess the number number argument.
                if (message.channel.id !== 'Channel_id') { // Change channel_id to your bot channel's id.
                    message.fetch(id).then(msg => msg.delete());
                    message.reply(`Wrong channel! Please use commands in <#Channel_id>!`) // Change channel_id to your bot channel's id.
                        .then(message => {
                            message.delete({ timeout: 5000 })
                        })            
                } 
                if (message.channel.id === 'Channel_id') { // Change channel_id to your bot channel's id.
                    client.channels.cache.get('Channel_id').send(`Congratulations ${message.author}! You won **${Math.floor(Math.random() * 100000)}** coins! Contact <@YourDiscordID> to claim your coins.`) // Message to the person who guesses the number. Change channel_id to your bot channel's id. Customizable message. (Def: Congratulations ${message.author}! You won **${Math.floor(Math.random() * 100000)}** coins! Contact <@YourDiscordID> to claim your coins. )
                    NumberRandomizer()
                    Console()
                    clearInterval(StartTime)
                    StartTime = setInterval(NumberRandomizer, 21600000)  // Randomizer time restart. You can change how often it randomizes. (Def: 21600000)
                    clearInterval(StartConsole)
                    StartConsole = setInterval(Console, 21600000);       // Console time restart. Put same as Randomizer. (Def: 21600000)

                } 
            }


        }
});

client.login('TOKEN') // Discord bot token. Never share your token with randoms.