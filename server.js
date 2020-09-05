const Discord = require('discord.js');
const exampleEmbed = new Discord.MessageEmbed().setTitle('Some title');
const { Client, MessageEmbed } = require('discord.js');
const botsettings = require('./botsettings.json');

const bot = new Discord.Client({ disableEveryone: true });

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`)
  bot.user.setActivity(`${prefix}help`, { type: "PLAYING" });
})

bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === '💬┇english•only');
  if (!channel) return;
  channel.send(`${member} has joined the server!

Welcome to ${message.guild.name}, Make sure to check out <#727338502324486234> and follow the rules! !

Now we have : ${message.guild.memberCount} members`);
});

bot.on('guildMemberRemove', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === '💬┇english•only');
  if (!channel) return;
  channel.send(`Gooodbye ${member} IWasGems will miss you. `);
});

bot.on('message', msg => {
  if (msg.content === '$invite') {
    msg.reply('**Official Among Dungeon Server Invite** https://discord.gg/wRKPHQT');
  }
});

bot.on("message", async message => {
  if(message.author.bot || message.channel.type === "dm") return;

  let prefix = botsettings.prefix;
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
  if (message.content === '!join') {
		bot.emit('guildMemberAdd', message.member);
	}
  if (message.content === '$help') {
    const embed = new MessageEmbed()
      .setColor('BLUE')
      .setTitle('Among Commands')
      .setDescription('Prefix: "$"')
      .addFields(
        { name: '$help', value: 'Help command' },
        { name: '$membercount', value: 'Count member on this server' },
        { name: '$info', value: 'Your Information' },
        { name: '$purge', value: 'Delete Bulk Message.' },
        { name: '$avatar', value: 'Bot will show your avatar. Aliases `$av`' },
        { name: '$donate', value: 'Donate our server by donating World Locks/Diamond Locks' },
        { name: '$more', value: 'More Information' },
        { name: '$rules', value: 'Rules/Reminder' },
      )
      .setTimestamp()
      .setFooter(`ID: ${message.id}`)
    message.channel.send(embed);
  }
  if (message.content === '$membercount') {
    const embed = new MessageEmbed()
      .setTitle(`Total member on this server`)
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(`ID: ${message.id}`)
      .setDescription(`Member Count: ${message.guild.memberCount}`);
    message.channel.send(embed);
  }
  if (message.content === `$info`) {
    const embed = new MessageEmbed()
      .setTitle('Your information')
      .addFields(
        { name: 'Your ID', value: `${message.author.id}` },
        { name: 'Join Discord', value: `${message.author.createdAt}` },
        { name: 'User Tag', value: `${message.author.tag}` },
      )
      .setColor("BLUE")
      .setFooter(`Message ID: ${message.id}`)
      .setTimestamp()
    message.channel.send(embed);
  }
  if(cmd === `${prefix}purge`){
        if (message.deletable) {
            message.delete();
        }

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("**This command requires you to have the ``MANAGE MESSAGES`` permission to use it**").then(m => m.delete(5000));
        }

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("This is not a number").then(m => m.delete(5000));
        }

        let deleteAmount;
        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
        .catch(err => message.reply(`**Error Message: ${err}**`));
    
    }
  if (message.content === `$avatar`) {
    const embed = new MessageEmbed()
      .setTitle('Your avatar')
      .setAuthor(`${message.author.username}`, message.author.avatarURL())
      .setImage(message.author.avatarURL())
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp()
    message.channel.send(embed);
  }
  if (message.content === `$av`) {
    const embed = new MessageEmbed()
      .setTitle('Your avatar')
      .setAuthor(`${message.author.username}`, message.author.avatarURL())
      .setImage(message.author.avatarURL())
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp()
    message.channel.send(embed);
  }
  if (message.content === `$donate`) {
    const embed = new MessageEmbed()
      .setTitle('How to donate')
      .setDescription('You can support this server by donate World Lock, or Diamond Lock. By donating you will get reward <#744043084685508670>, Ready to Donate? Go `CATSBANK` on Growtopia.')
      .setFooter(`ID: ${message.id}`)
      .setColor("BLUE")
    message.channel.send(embed);
  }
  if (message.content === `$more`) {
    const embed = new MessageEmbed()
      .setTitle('More Information')
      .addFields(
        { name: 'We have Clash of Clans', value: `Direct message <@653159264529154068> if you want join our Clans` },
        { name: 'Clash of Clans Website', value: 'Visit our Clash of Clans Website on https://kopi.glitch.me' },
      )
      .setFooter(`ID: ${message.id}`)
      .setColor("BLUE")
    message.channel.send(embed);
  }
//RULES COMMAND
  if (message.content === '$rules') {
    const embed = new MessageEmbed()
      .setTitle('Rules command')
      .setDescription('Deafult Rules [1-7] `Example $rules 1`')
      .setColor("RED")
      .setTimestamp()
      .setFooter(`ID: ${message.id}`)
    message.channel.send(embed);
  }
  if (message.content === '$rules 1') {
    const embed = new MessageEmbed()
      .setTitle('1️⃣  Be friendly to everyone')
      .setDescription('Dont say bad words, or things that can hurt people')
      .setColor("RED")
      .setTimestamp()
      .setFooter(`ID: ${message.id}`)
    message.channel.send(embed);
  }
  if (message.content === '$rules 2') {
    const embed = new MessageEmbed()
      .setTitle(`2️⃣ Don't spam chats in any channels`)
      .setDescription('You can spam on <#744200160032194611>')
      .setColor("RED")
      .setTimestamp()
      .setFooter(`ID: ${message.id}`)
    message.channel.send(embed);
  }
  if (message.content === '$rules 3') {
    const embed = new MessageEmbed()
      .setTitle(`3️⃣ Don't ping our Staff without any reasons`)
      .setDescription('Ping staff only for purposes, and not for trolling')
      .setColor("RED")
      .setTimestamp()
      .setFooter(`ID: ${message.id}`)
    message.channel.send(embed);
  }
  if (message.content === '$rules 4') {
    const embed = new MessageEmbed()
      .setTitle('4️⃣ Do not Advertise your own Content')
      .setDescription('You are not allowed to advertise anything. If you do you will be punished')
      .setColor("RED")
      .setTimestamp()
      .setFooter(`ID: ${message.id}`)
    message.channel.send(embed);
  }
  if (message.content === '$rules 5') {
    const embed = new MessageEmbed()
      .setTitle('5️⃣ Do not Complain Anything About this Server')
      .setDescription('You shouldnt complain about this server. but you are allowed to give suggestions for this server')
      .setColor("RED")
      .setTimestamp()
      .setFooter(`ID: ${message.id}`)
    message.channel.send(embed);
  }
  if (message.content === '$rules 6') {
    const embed = new MessageEmbed()
      .setTitle('6️⃣ Do not talk inappropriate words.')
      .setDescription('You may get muted if you do')
      .setColor("RED")
      .setTimestamp()
      .setFooter(`ID: ${message.id}`)
    message.channel.send(embed);
  }
  if (message.content === '$rules 7') {
    const embed = new MessageEmbed()
      .setTitle('7️⃣ Follow Discord ToS & Guidelines')
      .setDescription(`**https://discord.com/new/terms
      https://discord.com/new/guidelines**`)
      .setColor("RED")
      .setTimestamp()
      .setFooter(`ID: ${message.id}`)
    message.channel.send(embed);
  }
});

bot.login(process.env.token);