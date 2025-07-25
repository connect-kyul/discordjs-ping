const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// 슬래시 명령어 정의
const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!')
    .toJSON()
];

// 봇이 준비되었을 때 실행
client.once('ready', async () => {
  console.log(`${client.user.tag} 봇이 온라인입니다!`);
  
  // 슬래시 명령어 등록
  const rest = new REST({ version: '10' }).setToken('여기에_봇_토큰_입력');
  
  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands }
    );
    console.log('슬래시 명령어가 등록되었습니다!');
  } catch (error) {
    console.error(error);
  }
});

// 슬래시 명령어 처리
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  
  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

// 봇 토큰으로 로그인
client.login('여기에_봇_토큰_입력');
