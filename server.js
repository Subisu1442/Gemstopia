const Discord = require('discord.js');
const exampleEmbed = new Discord.MessageEmbed().setTitle('Some title');
const { Client, MessageEmbed } = require('discord.js');
const botsettings = require('./botsettings.json');

const randomPuppy = require('random-puppy');
const mongoose = require('mongoose');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./command').filter(file => file.endsWith('.js'))


const prefix = "$"

const bot = new Discord.Client({ disableEveryone: true });

mongoose.connect('mongodb+srv://Subisu:Kukukukuning@subisu.ogeah.mongodb.net/Data', { useNewUrlParser: true, useUnifiedTopology: true})

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`)
  bot.user.setActivity(`${prefix}help`, { type: "PLAYING" });
})

for (const file of commandFiles) {
  const command = require(`./command/${file}`);
  client.commands.set(command.name, command);
}

bot.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;
  try {
      client.commands.get(command).execute(message, args);
  } catch (error) {
      console.error(error);
      message.reply(`Something error when you run this command`)
  }

});

bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'english-only');
  if (!channel) return;
  channel.send(`<:AmongWelcome:751835725443497994>**${member} Welcome to ${member.guild.name}. 
  Make sure to check out <#752552305366401084> and follow the rules**`);
    member.send({embed: { color: "BLACK", description: `**Welcome to** \`${member.guild.name}\`,
  Thanks for joining ${member.guild.name}. We know you probably won't read this, or won't talk in the server at all, so welcome!` }})
});

bot.on('guildMemberRemove', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'english-only');

  member.send({embed: { color: "RED", description: `You leave ${member.guild.name}
  Join Invite link: https://discord.gg/wRKPHQT` }})
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

  if (message.content === '$help') {
    const embed = new MessageEmbed()
      .setColor('BLUE')
      .setTitle('Among Commands')
      .setDescription('Prefix: "$"')
      .addFields(
        { name: '$help', value: 'Help command' },
        { name: '$membercount', value: 'Count member on this server' },
        { name: '$info', value: 'Your Information' },
        { name: '$meme', value: 'Post meme from reddit' },
        { name: '$ping', value: 'Ping Command' },
        { name: '$purge', value: 'Delete Bulk Message.' },
        { name: '$avatar', value: 'Bot will show your avatar. Aliases `$av`' },
        { name: '$howgay', value: 'How gay Command' },
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
  if (message.content === `${prefix}meme`) {
    const subReddit = ["dankmeme", "meme", "memes"]
    const random = subReddit[Math.floor(Math.random() * subReddit.length)];

    const img = await randomPuppy(random);
    const embed = new Discord.MessageEmbed()
    .setTitle(`From /r/${random}`)
    .setImage(img)
    .setColor("RANDOM")
    .setFooter('Powered by Reddit')
    .setURL(`https://reddit.com/r/${random}`);
    message.channel.send(embed)
  }
  if (message.content.startsWith(`${prefix}ping`)) {
      const pingembed = new Discord.MessageEmbed()
      .setDescription(
        `🏓Pong!\nLatency is **${Math.floor(
          msg.createdTimeStamp | message.createdTimestamp
        )}ms \nAPI Latency is **${Math.round(client.ws.ping)}ms**`
      )
      .setColor("RED")
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
        .catch(err => message.reply(`**Something when wrong**`));
    
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
  if (message.content === `$howgay`) {
    var random = Math.floor(Math.random() * 100) + 1;
    message.channel.send(`${message.author.username} ${Math.floor(Math.random() * 100) + 2}% Gays🌈`)
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
  if (cmd === `${prefix}poll`) {
    let pollChannel = message.mentions.channels.first();
    let pollDescription = args.slice(1).join (' ');

    let embedPoll = new Discord.MessageEmbed()
  .setTitle('NEW QOTD')
    .setDescription(pollDescription)
    .setColor("GREEN")
    let msgEmbed = await pollChannel.send(embedPoll);
    await msgEmbed.react('✅')
    await msgEmbed.react('❌')
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
        { name: '$coc', value: 'Clash of Clans Guild, Event, and Website' },
        { name: '$amongus', value: 'Amongus Event' },
      )
      .setFooter(`Clash of Clans`)
      .setColor("BLUE")
    message.channel.send(embed);
  }
  if (message.content === `$coc`) {
    const embed = new MessageEmbed()
      .setTitle('More Information')
      .addFields(
        { name: 'We have Clash of Clans', value: `Direct message <@653159264529154068> if you want join our Clans` },
        { name: 'Requirement', value: 'Can using INDONESIAN Language' },
        { name: 'Clash of Clans Website', value: 'Visit our Clash of Clans Website on https://kopi.glitch.me' },
      )
      .setFooter(`Clash of Clans`)
      .setColor("BLUE")
    message.channel.send(embed);
  }
  if (message.content === `$amongus`) {
    const embed = new MessageEmbed()
      .setTitle('More Information')
      .addFields(
        { name: 'Among Us Event:', value: `Not Available` },
      )
      .setColor("BLUE")
    message.channel.send(embed);
  }
  if (message.content.startsWith(`${prefix}say`)) {
    if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send('**You dont have `MANAGE_MESSAGES` permission!**')
    var text = message.content.split(" ").slice(1).join(' ')
    if (!text) return message.channel.send('Enter your text')
    message.channel.send(text)
    message.delete()
  }

//RULES COMMAND
  if (message.content === '$rules') {
    const embed = new MessageEmbed()
      .setTitle('Rules command')
      .setDescription('Deafult Rules [1-7] `Example $rules 1`')
      .setColor("RED")
      .setTimestamp()
    message.channel.send(embed);
  }
  if (message.content === '$rules 1') {
    const embed = new MessageEmbed()
      .setTitle('1️⃣  Be friendly to everyone')
      .setDescription('Dont say bad words, or things that can hurt people')
      .setColor("RED")
      .setTimestamp()
    message.channel.send(embed);
  }
  if (message.content === '$rules 2') {
    const embed = new MessageEmbed()
      .setTitle(`2️⃣ Don't spam chats in any channels`)
      .setDescription('You can spam on <#744200160032194611>')
      .setColor("RED")
      .setTimestamp()
    message.channel.send(embed);
  }
  if (message.content === '$rules 3') {
    const embed = new MessageEmbed()
      .setTitle(`3️⃣ Don't ping our Staff without any reasons`)
      .setDescription('Ping staff only for purposes, and not for trolling')
      .setColor("RED")
      .setTimestamp()
    message.channel.send(embed);
  }
  if (message.content === '$rules 4') {
    const embed = new MessageEmbed()
      .setTitle('4️⃣ Do not Advertise your own Content')
      .setDescription('You are not allowed to advertise anything. If you do you will be punished')
      .setColor("RED")
      .setTimestamp()
    message.channel.send(embed);
  }
  if (message.content === '$rules 5') {
    const embed = new MessageEmbed()
      .setTitle('5️⃣ Do not Complain Anything About this Server')
      .setDescription('You shouldnt complain about this server. but you are allowed to give suggestions for this server')
      .setColor("RED")
      .setTimestamp()
    message.channel.send(embed);
  }
  if (message.content === '$rules 6') {
    const embed = new MessageEmbed()
      .setTitle('6️⃣ Do not talk inappropriate words.')
      .setDescription('You may get muted if you do')
      .setColor("RED")
      .setTimestamp()
    message.channel.send(embed);
  }
  if (message.content === '$rules 7') {
    const embed = new MessageEmbed()
      .setTitle('7️⃣ Follow Discord ToS & Guidelines')
      .setDescription(`**https://discord.com/new/terms
      https://discord.com/new/guidelines**`)
      .setColor("RED")
      .setTimestamp()
    message.channel.send(embed);
  }
});


bot.on('message', async message => {
  if(message.author.bot || message.channel.type === "dm") return;
  if (message.content.startsWith(`${prefix}reactionwdsfa3roles23l`)) {
    const embed = new  MessageEmbed()
    .setTitle('Roles Games')
    .addFields(
      { name: '🐸: Dank Memer', value: '`Dank Memer Roles. Can enter Dank memer Bot Command`'},
      { name: '👨‍🌾: Growtopia', value: '`Growtopia Roles. Can enter Growtopia Bot Command`'},
      { name: '⛏️: Minecraft', value: '`Minecraft Roles. Can enter Minecraft Bot Command`'},
    )
    .setColor("RED")
    let msg = await message.channel.send(embed);
    await msg.react('🐸').then(msg.react('👨‍🌾')).then(msg.react('⛏️'))
  }
    if (message.content.startsWith(`${prefix}re2ac34ti4donroles23l`)) {
      const embed = new  MessageEmbed()
      .setTitle('Roles Age')
      .addFields(
        { name: '👶: ', value: '`13-15`'},
        { name: '👦: ', value: '`16-17`'},
        { name: '👴: ', value: '`18+`'},
      )
      .setColor("RED")
      let msg = await message.channel.send(embed);
      await msg.react('👶').then(msg.react('👦')).then(msg.react('👴'))
    }
    if (message.content.startsWith(`${prefix}re2ac34t23568roles23l`)) {
      const embed = new  MessageEmbed()
      .setTitle('Roles Gender')
      .addFields(
        { name: '👧: ', value: '`Female`'},
        { name: '👨: ', value: '`Male`'},
      )
      .setColor("RED")
      let msg = await message.channel.send(embed);
      await msg.react('👧').then(msg.react('👨'))
    }
});

bot.on('messageReactionAdd', async (reaction, user ) => {
  if (reaction.message.partial) await reaction.message.fetch()
  if (reaction.partial) await reaction.fetch()
  if (user.bot)return
  if (reaction.message.channel.id === '752552305366401084') {
    if (reaction.emoji.name === '🐸') await reaction.message.guild.members.cache.get(user.id).roles.add('727340886421405817')
    if (reaction.emoji.name === '👨‍🌾') await reaction.message.guild.members.cache.get(user.id).roles.add('741945946442694706')
    if (reaction.emoji.name === '⛏️') await reaction.message.guild.members.cache.get(user.id).roles.add('741946662800326747')
    if (reaction.emoji.name === '👶') await reaction.message.guild.members.cache.get(user.id).roles.add('744036349157572718')
    if (reaction.emoji.name === '👦') await reaction.message.guild.members.cache.get(user.id).roles.add('744036453897601035')
    if (reaction.emoji.name === '👴') await reaction.message.guild.members.cache.get(user.id).roles.add('744036520113078352')
    if (reaction.emoji.name === '👧') await reaction.message.guild.members.cache.get(user.id).roles.add('744033864078327888')
    if (reaction.emoji.name === '👨') await reaction.message.guild.members.cache.get(user.id).roles.add('744033796835377172')
  }
});

bot.on('messageReactionRemove', async (reaction, user ) => {
  if (reaction.message.partial) await reaction.message.fetch()
  if (reaction.partial) await reaction.fetch()
  if (user.bot)return
  if (reaction.message.channel.id === '752552305366401084') {
    if (reaction.emoji.name === '🐸') await reaction.message.guild.members.cache.get(user.id).roles.remove('727340886421405817')
    if (reaction.emoji.name === '👨‍🌾') await reaction.message.guild.members.cache.get(user.id).roles.remove('741945946442694706')
    if (reaction.emoji.name === '⛏️') await reaction.message.guild.members.cache.get(user.id).roles.remove('741946662800326747')
    if (reaction.emoji.name === '👶') await reaction.message.guild.members.cache.get(user.id).roles.remove('744036349157572718')
    if (reaction.emoji.name === '👦') await reaction.message.guild.members.cache.get(user.id).roles.remove('744036453897601035')
    if (reaction.emoji.name === '👴') await reaction.message.guild.members.cache.get(user.id).roles.remove('744036520113078352')
    if (reaction.emoji.name === '👧') await reaction.message.guild.members.cache.get(user.id).roles.remove('744033864078327888')
    if (reaction.emoji.name === '👨') await reaction.message.guild.members.cache.get(user.id).roles.remove('744033796835377172')
  }
});
bot.login(process.env.token);