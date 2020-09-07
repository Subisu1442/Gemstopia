module.exports = {
    name: 'ping',
    description: 'Ping and Pong Command',
    execute(message, agrs) {
        message.channel.send('Pong!!!!');
    },
};