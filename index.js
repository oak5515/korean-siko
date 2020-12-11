const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : "";
const moment = require("moment");
const prefix = '시코야 ';
require("moment-duration-format");
const momenttz = require('moment-timezone');
const MessageAdd = require('./db/message_add.js')
const welcomeChannelName = "안녕하세요";
const byeChannelName = "안녕히가세요";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "안녕히가세요.";
//const msg = await message.channel.send("**당신이나 일하세요**");
//msg.edit("*(...네트워크에 오류가 발생했습니다.)*");

client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: '시코야 도움말을 입력하세요.' }, status: 'online' })
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "무직"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on("messageUpdate", (message) => {
  MessageSave(message, true)
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

client.on('message', async message => {
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).split(" "); // 메세지에서 프리픽스의 글자 수만큼 잘라내고, String.split 메서드를 이용하여 Array로 바꾼다.
    const command = args.shift().toLowerCase(); // Array의 첫번 째 값을 없애고 반환하는 Array.shift 메서드에 String.toLowerCase 메서드로 소문자화한다.

    if (command === "ping") { // discord.Message.content 속성이 'ping'과 같을 떄
        message.reply("pong"); // discord.Message.reply 메서드로 'pong'을 전송
        // 정말 ping (지연시간) 을 전송하고 싶다면 client.ws 객체의 ping 속성을 이용하자.
        // message.reply(Math.round(client.ws.ping));
    }
  }
  MessageSave(message)
  if(message.author.bot) return;
  if(message.content == '시코야 현재 핑') {
    return message.reply('지금 올라오는 메세지와 방금 입력하신 메세지의 간격이 현재 핑 상태입니다.');
  }

  //시코봇 기타 말
  if (message.content == '시코야') { //The 8ball Message
    var msg1 = Array(5); 
    msg1[1] = "네, 부르셨습니까?";
    msg1[2] = "부르셨나요?";
    msg1[3] = "저는 여기 있습니다.";
    msg1[4] = "부르셨습니까?"
    msg1[5] = "네, 어떤 일로 부르셨나요?"
    msg1[6] = "*(커피 엎어지는 소리)*" 
        var x = getRandomInt(0, 20);
    if (x < 5){ 
         if (x < 3){
          message.channel.send(msg1[1]);
    }
    else {
      message.channel.send(msg1[3]);
    }
    }
    else if (x<= 9) {
      if (x >= 7){
        message.channel.send(msg1[2]); }
        else{
          message.channel.send(msg1[4]);
        }
    } 
    else if (x <= 17 ) { 
      message.channel.send(msg1[5]);
    }
    else {
      message.channel.send(msg1[6])
      .then(msg => {
                      message.channel.send("***아놔 왜 불렀냐 인간***").then(msg => {
                      setTimeout(function() {
                          msg.edit("***앗, 커피가 엎질러졌네요...***")
                      }, 700);
                  })
                })
      .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
    }
    }


  if(message.content == '시코야 좋은 아침') {
    return message.channel.send(`<@${message.author.id}>` + "님, 좋은 아침입니다.")
  }
  
  if(message.content == '시코야 좋은 점심') {
    return message.channel.send(`<@${message.author.id}>` + "님, 좋은 점심입니다.")
  }
  
  if(message.content == '시코야 좋은 저녁') {
    return message.channel.send(`<@${message.author.id}>` + "님, 좋은 저녁입니다.")
  }

  if(message.content == '시코야 잘자') {
    return message.channel.send(`<@${message.author.id}>` + "님, 안녕히 주무십시오.")
  }

  if(message.content == '시코야 잘잤니') {
    return message.channel.send(`<@${message.author.id}>` + "님, 안녕히 주무셨습니까?")
  }

  if(message.content == '시코야 배고파') {
    return message.channel.send(`<@${message.author.id}>` + "님, 식사를 하시는것을 추천드립니다.")
  }

  if(message.content == '시코야 안녕') {
    return message.channel.send("안녕하십니까, " + `<@${message.author.id}>` + "님.")
  }

  if(message.content == '시코야 채아리') {
    return message.channel.send('저를 만들어주신 창조주님이십니다.')
  }

  if(message.content == '시코야 아이스커피') {
    return message.channel.send('<:CHSACG:766567629959593994>')
  }

  if(message.content == '시코야 김승뭔') {
    return message.channel.send('창조주님의 의형제님을 말씀하시는지요?')
  }

  if(message.content == '시코야 연유병') {
    return message.channel.send('창조주님의 의남매님을 말씀하시는지요?')
  }

  if(message.content == '시코야 4딸라') {
    return message.channel.send(`한국 원화로 약 4500원입니다.`)
  }

  if(message.content == '시코야 야인시대') {
    return message.channel.send(`《야인시대》(野人時代)는 SBS에서 2002년 7월 29일부터 2003년 9월 30일까지 총 124회 동안 김두한의 일대기를 그린 대하드라마이다. 또한 야인시대의 최고 시청률은 야인시대의 제작사인 SBS를 비롯한 9개 지역 민방 네트워크를 기준으로 57.1%이다. 또한 인터넷 합성물로 인해 대한민국 방송 역사에 엄청나게 큰 한 획을 그은 텔레비전 드라마이며, 이에 관해 극중 심영 역을 맡은 김영인의 대사인 내가 고자라니로 인해 푸른 거탑을 비롯한 여러 방송에서 수많은 패러디가 쏟아져 나오기도 했다. -https://ko.wikipedia.org/wiki/%EC%95%BC%EC%9D%B8%EC%8B%9C%EB%8C%80`)
  }

  if(message.content == '시코야 시식둥이') {
    return message.channel.send(`저의 어머니이십니다.`)
  }

  if(message.content == '시코야 코리안식스') {
    return message.channel.send(`저의 아버지이십니다.`)
  }

  if(message.content == '시코야 애플민트둥이') {
    return message.channel.send(`...`)
  }

  if(message.content == '시코야 사랑해') {
    return message.channel.send(`인간의 감정에 대해서는 관련 자료가 없습니다.`)
  }

  if(message.content == '시코야 심영') {
    return message.channel.send(`'야인시대'라는 드라마에서 상하이 조에 의해 성불구자가 된 사람입니다.`)
  }

  if(message.content == '시코야 결혼해줘') {
    return message.channel.send(`***...진심이십니까?***`)
  }

  if(message.content == '시코야 김두한') {
    return message.channel.send(`정치가이며, 드라마 '야인시대'의 주인공입니다.`)
  }

  if(message.content == '시코야 도수방 디스코드') {
    return message.channel.send(`창조주님께서 저를 추가하고 싶어하시는 디스코드 서버입니다.`)
  }

  if(message.content == '시코야 귀여운척') {
    return message.channel.send(`...일시적 오류로 인해 데이터를 불러오지 못했습니다.`)
  }
  
  if (message.content.startsWith('시코야 가능')) { //The 8ball Message
      var msg1 = Array(5); 
      msg1[1] = "가능합니다.";
      msg1[2] = "아니요, 불가능합니다.";
      msg1[3] = "아마도요. :wink:";
      msg1[4] = "글쎄요. 가능할까요?";
      msg1[5] = "말씀드리기 애매하네요. :neutral_face:"
      msg1[6] = "충분히 가능할 것 같습니다." 
          var x = getRandomInt(0, 20);
      if (x < 5){ 
           if (x < 3){
            message.channel.send(msg1[1]);
      }
      else {
        message.channel.send(msg1[3]);
      }
      }
      else if (x<= 9) {
        if (x >= 7){
          message.channel.send(msg1[2]); }
          else{
            message.channel.send(msg1[4]);
          }
      } 
      else if (x <= 12 ) { 
        message.channel.send(msg1[5]);
      }
      else {
        message.channel.send(msg1[6])
      }
      }
  
      if (message.content.startsWith('시코야 도박')) { //The 8ball Message
        var msg1 = Array(5); 
        msg1[1] = "**꽝!** 아쉽습니다... 98.04% 확률이군요...";
        msg1[2] = "**4등!** 괜찮은 수확이네요. 1% 확률이군요...";
        msg1[3] = "**3등!** 오 좋은데요? 0.6% 확률이군요...";
        msg1[4] = "**2등!** 오늘 운이 좋으시네요? 0.25% 확률이군요!";
        msg1[5] = "**1등!!** 대박! 행운이 넘치시네요! 0.1% 확률이에요!"
        msg1[6] = "**0등...?** 엥..? 이게 왜 나오죠? 0.01% 확률인데...?" 
            var x = getRandomInt(0, 10000);
        if (x < 9965){ 
             if (x < 9805){
              message.channel.send(msg1[1]);
        }
        else {
          message.channel.send(msg1[2]);
        }
        }
        else if (x<= 9989) {
          if (x >= 9965){
            message.channel.send(msg1[4]); }
            else{
              message.channel.send(msg1[3]);
            }
        } 
        else if (x <= 10000 ) { 
          message.channel.send(msg1[5]);
        }
        else {
          message.channel.send(msg1[6])
        }
        }
    

  if (message.content == '시코야 랜덤') {
      message.channel.send("랜덤 추첨 번호는.. " + getRandomInt(1, 1000) + " 입니다.");
    }


 if (message.content.startsWith('시코야 동전')) { //The coinflip Message
      var msg2 = Array(2);
      msg2[1] = ":coin: 앞면이 나왔습니다.";
        msg2[2] = ":coin: 뒷면이 나왔습니다.";
          var x = getRandomInt(0, 8);
      if (x < 4){
        message.channel.send(msg2[1]);
      }
      else{
        message.channel.send(msg2[2]);
      }
    }

  if (message.content == '시코야 가위바위보') { //The rps Message
      var msg1 = Array(3);
      msg1[1] = "바위 입니다. :fist:";
        msg1[2] = "보 입니다. :hand_splayed:";
      msg1[3] = "가위 입니다. :v:"
          var x = getRandomInt(0, 9);
      if (x < 6){
           if (x < 3){
            message.channel.send(msg1[1]);
      }
      else{
        message.channel.send(msg1[3]);
      }
      }
      else{ 
        message.channel.send(msg1[2]);
      }
    }


  if(message.content == '시코야 일해') {
        message.channel.send("**당신이나 일하세요**")
            .then(msg => {
                setTimeout(function() {
                    msg.edit("***(...네트워크에 오류가 발생했습니다.)***")
                }, 700);
            })
    }


  if(message.content == '시코야 서버정보') {
    let embed = new Discord.RichEmbed()
    let img = 'https://cdn.discordapp.com/attachments/756513236823572493/756782002748915712/20200918_224442.png';
    var duration = moment.duration(client.uptime).format(" D [일], H [시간], m [분], s [초]");
    embed.setColor('#186de6')
    embed.setAuthor('SIKO봇의 서버정보', img)
    embed.setFooter(`Made by 채아리, Profile Picture by @__kkung__ CM`)
    embed.addBlankField()
    embed.addField('RAM usage',    `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true);
    embed.addField('running time', `${duration}`, true);
    embed.addField('user',         `${client.users.size.toLocaleString()}`, true);
    embed.addField('server',       `${client.guilds.size.toLocaleString()}`, true);
    // embed.addField('channel',      `${client.channels.size.toLocaleString()}`, true);
    embed.addField('Discord.js',   `v${Discord.version}`, true);
    embed.addField('Node',         `${process.version}`, true);
    
    let arr = client.guilds.array();
    let list = '';
    list = `\`\`\`css\n`;
    
    for(let i=0;i<arr.length;i++) {
      // list += `${arr[i].name} - ${arr[i].id}\n`
      list += `${arr[i].name}\n`
    }
    list += `\`\`\`\n`
    embed.addField('list:',        `${list}`);

    embed.setTimestamp()
    message.channel.send(embed);
  }

  
  //exel
  var XLSX = require("xlsx");
  var workbook = XLSX.readFile('학습.xlsx') 
  var SheetName = workbook.SheetNames[0];
  var Sheet = workbook.Sheets[SheetName];

  if(message.content == '시코야 엑셀테스트') {
    XLSX.readFile('학습.xlsx');
    return message.channel.send(Sheet['A1'].v);
  };

  //시코봇 도움말
  if(message.content == '시코야 자기소개') {
    let img = 'https://cdn.discordapp.com/attachments/756513236823572493/756782002748915712/20200918_224442.png';
    let embed = new Discord.RichEmbed()
      .setTitle('이름 : 코리안시코')
      .setThumbnail(img)
      .addBlankField()
      .addField('영문 이름', 'Korean Siko')
      .addField('아버지', '코리안식스', true)
      .addField('어머니', '시식둥이', true)
      .addField('오빠', '애플민트둥이', true)
      .addField('특이사항', '말투: 딱딱함\n창조주: 채아리\n간단소개말: 안녕하십니까. 시코봇입니다.\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('Made by 채아리, Profile Picture by @__kkung__ CM', img)

    message.channel.send(embed)
  } else if(message.content == '시코야 도움말') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: '시코야 현재 핑', desc: '현재 핑 체감'},
      {name: '시코야 도움말', desc: '시코봇의 사용 방법을 안내해드립니다.'},
      {name: '시코야 초대코드', desc: '현재 서버의 초대코드를 알려드립니다. 초대코드는 무한히 유효합니다.'},
      {name: '시코야 전체 초대코드', desc: '시코봇이 있는 모든 서버의 초대코드를 알려드립니다. 초대코드는 무한히 유효합니다.'},
      {name: '시코야 전체공지', desc: '서버 전체 유저에게 DM으로 공지를 전달합니다.'},
      {name: '시코야 고급전체공지', desc: '서버 전체 유저에게 DM으로 카드형 공지를 전달합니다.'},
      {name: '시코야 서버정보', desc: '시코봇이 운영되고 있는 서버의 정보를 알려드립니다.'},
      {name: '시코야 청소 (숫자)', desc: '해당 숫자만큼의 채팅을 삭제합니다. (숫자는 1~100까지 사용 가능합니다.)'},
      {name: '시코야 자기소개', desc: '시코봇에 대해서 간단히 소개해드리겠습니다.'},
      {name: '시코야 (아무 말)', desc: '(아무 말) 안에 다른 말을 집어넣어 시코봇의 반응을 볼 수 있습니다.'},
      {name: '시코야 버그 신고', desc: '개발자의 디스코드 태그를 알려드립니다. 버그가 있다면 제보해주세요.'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('시코봇 도움말!', helpImg)
      .setColor('#186de6')
      .setFooter(`Made by 채아리, Profile Picture by @__kkung__ CM`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  } else if(message.content == '시코야 전체 초대코드') {
    client.guilds.array().forEach(x => {
      x.channels.find(x => x.type == 'text').createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
        .then(invite => {
          message.channel.send(invite.url)
        })
        .catch((err) => {
          if(err.code == 50013) {
            message.channel.send('**'+x.channels.find(x => x.type == 'text').guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
          }
        })
    });
  } else if(message.content == '시코야 초대코드') {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
    }
    message.guild.channels.get(message.channel.id).createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
      .then(invite => {
        message.channel.send(invite.url)
      })
      .catch((err) => {
        if(err.code == 50013) {
          message.channel.send('**'+message.guild.channels.get(message.channel.id).guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
        }
      })
  } else if(message.content.startsWith('시코야 고급전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('시코야 고급전체공지'.length);
      let embed = new Discord.RichEmbed()
        .setAuthor('SIKO봇의 공지')
        .setColor('#186de6')
        .setFooter(`Made by 채아리, Profile Picture by @__kkung__ CM`)
        .setTimestamp()
  
      embed.addField('공지: ', contents);
  
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(embed)
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  } else if(message.content.startsWith('시코야 전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('시코야 전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  } else if(message.content.startsWith('시코야 청소')) {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
    }
    
    if(message.channel.type != 'dm' && checkPermission(message)) return

    var clearLine = message.content.slice('시코야 청소 '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
      return;
    } else if(!isNum) { // c @나긋해 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        let _cnt = 0;

        message.channel.fetchMessages().then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
        })
        .catch(console.error)
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}

function getEmbedFields(message, modify=false) {
  if(message.content == '' && message.embeds.length > 0) {
    let e = message.embeds[0].fields;
    let a = [];

    for(let i=0;i<e.length;i++) {
        a.push(`\`${e[i].name}\` - \`${e[i].value}\`\n`);
    }

    return a.join('');
  } else if(modify) {
    return message.author.lastMessage.content;
  } else {
    return message.content;
  }
}

function MessageSave(message, modify=false) {
  imgs = []
  if (message.attachments.array().length > 0) {
    message.attachments.array().forEach(x => {
      imgs.push(x.url+'\n')
    });
  }

  username = message.author.username.match(/[\u3131-\uD79D^a-zA-Z^0-9]/ugi)
  channelName = message.channel.type != 'dm' ? message.channel.name : ''
  try {
    username = username.length > 1 ? username.join('') : username
  } catch (error) {}

  try {
    channelName = channelName.length > 1 ? channelName.join('') : channelName
  } catch (error) {}

  var s = {
    ChannelType: message.channel.type,
    ChannelId: message.channel.type != 'dm' ? message.channel.id : '',
    ChannelName: channelName,
    GuildId: message.channel.type != 'dm' ? message.channel.guild.id : '',
    GuildName: message.channel.type != 'dm' ? message.channel.guild.name : '',
    Message: getEmbedFields(message, modify),
    AuthorId: message.author.id,
    AuthorUsername: username + '#' + message.author.discriminator,
    AuthorBot: Number(message.author.bot),
    Embed: Number(message.embeds.length > 0), // 0이면 false 인거다.
    CreateTime: momenttz().tz('Asia/Seoul').locale('ko').format('ll dddd LTS')
  }

  s.Message = (modify ? '[수정됨] ' : '') + imgs.join('') + s.Message

  MessageAdd(
    s.ChannelType,
    s.ChannelId,
    s.ChannelName,
    s.GuildId,
    s.GuildName,
    s.Message,
    s.AuthorId,
    s.AuthorUsername,
    s.AuthorBot,
    s.Embed,
    s.CreateTime,
  )
    // .then((res) => {
    //   console.log('db 저장을 했다.', res);
    // })
    .catch(error => console.log(error))
}


client.login(token);