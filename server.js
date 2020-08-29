const Discord = require('discord.js');
const exampleEmbed = new Discord.MessageEmbed().setTitle('Some title');
const { Client, MessageEmbed } = require('discord.js');

const bot = new Discord.Client({ disableEveryone: true });

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`)
  bot.user.setActivity("/help", { type: "PLAYING" });
})

bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === '💬┇english•only');
  if (!channel) return;
  channel.send(`Welcome ${member}, Check <#727338502324486234>, and <#727335836462481468> .Enjoy!`);
});

bot.on('guildMemberRemove', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === '💬┇english•only');
  if (!channel) return;
  channel.send(`Gooodbye ${member} IWasGems will miss you. `);
});

bot.on('message', message => {
  if (message.content === '/help') {
    const embed = new MessageEmbed()
      .setColor('BLUE')
      .setTitle('GemsTopia Commands')
      .setDescription('Prefix: "/"')
      .addFields(
        { name: '/help', value: 'Help command' },
        { name: '/membercount', value: 'Count member on this server' },
        { name: '/info', value: 'Your Information' },
        { name: '/avatar', value: 'Bot will show your avatar. Aliases `/av`' },
        { name: '/donate', value: 'Donate our server by donating World Locks/ Diamond Locks' },
        { name: '/more', value: 'More Information' },
      )
      .setTimestamp()
      .setFooter(`ID: ${message.id}`)
    message.channel.send(embed);
  }
});

client.on('message', message => {
  if (message.content === '/membercount') {
    const embed = new MessageEmbed()
      .setTitle(`Total member on this server`)
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(`ID: ${message.id}`)
      .setDescription(`Member Count: ${message.guild.memberCount}`);
    message.channel.send(embed);
  }
  if (message.content === `/info`) {
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
  if (message.content === `/avatar`) {
    const embed = new MessageEmbed()
      .setTitle('Your avatar')
      .setAuthor(`${message.author.username}`, message.author.avatarURL())
      .setImage(message.author.avatarURL())
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp()
    message.channel.send(embed);
  }
  if (message.content === `/av`) {
    const embed = new MessageEmbed()
      .setTitle('Your avatar')
      .setAuthor(`${message.author.username}`, message.author.avatarURL())
      .setImage(message.author.avatarURL())
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp()
    message.channel.send(embed);
  }
  if (message.content === `/membercount`) {
    const embed = new MessageEmbed()
      .setAuthor(`Total member on ${message.guild.name}`)
      .setTitle(`Total Member: ${message.guild.memberCount}`)
      .setFooter('placedog.net')
      .setColor("BLUE")
    message.channel.send(embed);
  }
  if (message.content === `/donate`) {
    const embed = new MessageEmbed()
      .setTitle('How to donate')
      .setDescription('You can support this server by donate World Lock, or Diamond Lock. By donating you will get reward <#744043084685508670>, Ready to Donate? Go `CATSBANK` on Growtopia.')
      .setFooter(`ID: ${message.id}`)
      .setColor("BLUE")
    message.channel.send(embed);
  }
  if (message.content === `/more`) {
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
});

client.login(process.env.token);