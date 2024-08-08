const moment = require('moment-timezone');
const PhoneNumber = require('awesome-phonenumber');
const fs = require('fs');
const fetch = require('node-fetch');

let menulist = async (m, { conn, text, usedPrefix, command, args }) => {

let who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat

  const perintah = args[0] || 'tags';
  const tagCount = {};
  const tagHelpMapping = {};
  
  Object.keys(global.features)
    .filter(plugin => !plugin.disabled)
    .forEach(plugin => {
      const tagsArray = Array.isArray(global.features[plugin].tags)
        ? global.features[plugin].tags
        : [];

      if (tagsArray.length > 0) {
        const helpArray = Array.isArray(global.features[plugin].help)
          ? global.features[plugin].help
          : [global.features[plugin].help];

        tagsArray.forEach(tag => {
          if (tag) {
            if (tagCount[tag]) {
              tagCount[tag]++;
              tagHelpMapping[tag].push(...helpArray);
            } else {
              tagCount[tag] = 1;
              tagHelpMapping[tag] = [...helpArray];
            }
          }
        });
      }
    });

  let help = Object.values(global.features).filter(plugin => !plugin.disabled).map(plugin => {
    return {
      help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit,
      premium: plugin.premium,
      enabled: !plugin.disabled,
    }
  });

  if (perintah === 'tags') {
    const daftarTag = Object.keys(tagCount)
    .sort()
      .join('\n ✎ ' + usedPrefix + command + '  ');
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(4001);
    let _mpt;
    if (process.send) {
      process.send('uptime');
      _mpt = await new Promise(resolve => {
        process.once('message', resolve);
        setTimeout(resolve, 1000);
      }) * 1000;
    }
    let mpt = clockString(_mpt);
    let name = m.pushName || conn.getName(m.sender);
    let list = `Hi @${m.sender.split("@")[0]} 👋️ *I'm Assistent
    *
What can I help you?

*✧ List Menu ✧*
 ✎ ${usedPrefix + command} all
 ✎ ${usedPrefix + command} ${daftarTag}
`;
    const pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://www.bing.com/images/search?view=detailV2&ccid=NnLkFuVA&id=8EF678FAA341B678A8D6798D296E001431C14B7C&thid=OIP.NnLkFuVA6WbRxGuplS8ERgHaHZ&mediaurl=https%3a%2f%2fcf.shopee.vn%2ffile%2fvn-11134103-22060-g6opl3dy5udv7b&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.3672e416e540e966d1c46ba9952f0446%3frik%3dfEvBMRQAbimNeQ%26pid%3dImgRaw%26r%3d0&exph=489&expw=490&q=anya+hai&simid=608001824730645901&FORM=IRPRST&ck=08E798481DDF4FCD41759EFD6DB8EB66&selectedIndex=45&itb=0");

    conn.sendMessage(m.chat, {
      text: list,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: namebot,
          body: wm,
          thumbnailUrl: thumb,
          sourceUrl: sourceurl,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });
    
  } else if (tagCount[perintah]) {
    const daftarHelp = tagHelpMapping[perintah].map((helpItem, index) => {
      return `.${helpItem}`;
    }).join('\n ✎ '  + '');
    const list2 =  `✧ *MENU ${perintah.toUpperCase()}* ✧\n\n ✎ ${daftarHelp}`;
    const pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://www.bing.com/images/search?view=detailV2&ccid=NnLkFuVA&id=8EF678FAA341B678A8D6798D296E001431C14B7C&thid=OIP.NnLkFuVA6WbRxGuplS8ERgHaHZ&mediaurl=https%3a%2f%2fcf.shopee.vn%2ffile%2fvn-11134103-22060-g6opl3dy5udv7b&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.3672e416e540e966d1c46ba9952f0446%3frik%3dfEvBMRQAbimNeQ%26pid%3dImgRaw%26r%3d0&exph=489&expw=490&q=anya+hai&simid=608001824730645901&FORM=IRPRST&ck=08E798481DDF4FCD41759EFD6DB8EB66&selectedIndex=45&itb=0");

    conn.sendMessage(m.chat, {
      text: list2,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: namebot,
          body: wm,
          thumbnailUrl: thumb,
          sourceUrl: sourceurl,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });
    conn.sendFile(m.chat, './mp3/menu.mp3', '', null, m, true, null);
  } else if (perintah === 'all') {
    let name = m.pushName || conn.getName(m.sender);
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(4001);
    const allTagsAndHelp = Object.keys(tagCount).map(tag => {
      const daftarHelp = tagHelpMapping[tag].map((helpItem, index) => {
        return ` ✎ .${helpItem}`;
      }).join('\n '  + '');
      return `✧ *MENU ${tag.toUpperCase()}* ✧\n\n ${daftarHelp}`;
    }).join('\n\n');

    let all = `
➤ *Name*: ${namebot}  
➤ *Version*: ${version} 
➤ *Status*: ${global.opts['self'] ? 'Self' : 'Public'}  
➤ *Clock*: ${await DateNow(new Date)}
➤ *Count User*: ${Object.keys(db.data.users).length}  
➤ *Menu Length*: ${Object.keys(tagCount).length}  

_I am Assistent bot, How can I assist you today?_\n\n`
    + allTagsAndHelp;

    const pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://www.bing.com/images/search?view=detailV2&ccid=NnLkFuVA&id=8EF678FAA341B678A8D6798D296E001431C14B7C&thid=OIP.NnLkFuVA6WbRxGuplS8ERgHaHZ&mediaurl=https%3a%2f%2fcf.shopee.vn%2ffile%2fvn-11134103-22060-g6opl3dy5udv7b&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.3672e416e540e966d1c46ba9952f0446%3frik%3dfEvBMRQAbimNeQ%26pid%3dImgRaw%26r%3d0&exph=489&expw=490&q=anya+hai&simid=608001824730645901&FORM=IRPRST&ck=08E798481DDF4FCD41759EFD6DB8EB66&selectedIndex=45&itb=0");

    conn.sendMessage(m.chat, {
      text: all,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: namebot,
          body: wm,
          thumbnailUrl: thumb,
          sourceUrl: sourceurl,
          mediaType: 1,
          renderLargerThumbnail: true
        },
      }
    }, { quoted: m });
    conn.sendFile(m.chat, './mp3/menu.mp3', '', null, m, true, m);
  } else {
    await conn.reply(m.chat, `*MENU Not found:*`, m);
  }
}

menulist.help = ['menu'];
menulist.tags = ['main'];
menulist.command = ['menu'];
module.exports = menulist;

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

function DateNow(date) {
  let offset = 7;
  let utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  let jakartaTime = new Date(utc + (3600000 * offset));  
  let month = jakartaTime.getMonth() + 1;
  let day = jakartaTime.getDate();
  let year = jakartaTime.getFullYear();
  let hours = jakartaTime.getHours() < 10 ? "0" + jakartaTime.getHours() : jakartaTime.getHours();
  let minutes = jakartaTime.getMinutes() < 10 ? "0" + jakartaTime.getMinutes() : jakartaTime.getMinutes();
  let seconds = jakartaTime.getSeconds() < 10 ? "0" + jakartaTime.getSeconds() : jakartaTime.getSeconds();

  return `*${hours}:${minutes}:${seconds}*`;
};