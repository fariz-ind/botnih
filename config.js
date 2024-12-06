require("./lib/module")

// SETTING KONTAK
global.owner = "6283841442290"
global.ownername = "𝐃𝐢𝐤𝐚 𝐈𝐃"
global.nomorbot = "6283841442290"
global.namaCreator = "𝐃𝐢𝐤𝐚 𝐈𝐃"
global.autoJoin = false
global.antilink = false

// THUMBNAIL (BEBAS GANTI)
global.imageurl = 'https://i.ibb.co.com/7yzHFfh/brutality.jpg'
global.channel = 'https://whatsapp.com/channel/0029VaegLveBKfhz5g2mlg1d'

// STICKER
global.packname = "𝐒𝐭𝐢𝐜𝐤𝐞𝐫 𝐁𝐲"
global.author = "𝐁𝐫𝐮𝐭𝐚𝐥𝐢𝐭𝐲 𝐆𝐞𝐧 𝟐"
global.jumlah = "5"


















// RESPON BOT
global.onlyprem = `\`[ # ] 𝘿𝙄𝙆𝘼 𝙄𝘿\` \n*𝘊𝘰𝘮𝘮𝘢𝘯𝘥 𝘬𝘩𝘶𝘴𝘶𝘴 𝘱𝘳𝘦𝘮𝘪𝘶𝘮*`
global.onlyown = `\`[ # ] 𝘿𝙄𝙆𝘼 𝙄𝘿\` \n*𝘊𝘰𝘮𝘮𝘢𝘯𝘥 𝘬𝘩𝘶𝘴𝘶𝘴 𝘰𝘸𝘯𝘦𝘳*`
global.onlygroup = `\`[ # ] 𝘿𝙄𝙆𝘼 𝙄𝘿\` \n*𝘊𝘰𝘮𝘮𝘢𝘯𝘥 𝘬𝘩𝘶𝘴𝘶𝘴 𝘥𝘪 𝘨𝘳𝘶𝘱*`
global.onlyadmin = `\`[ # ] 𝘿𝙄𝙆𝘼 𝙄𝘿\` \n*𝘊𝘰𝘮𝘮𝘢𝘯𝘥 𝘬𝘩𝘶𝘴𝘶𝘴 𝘢𝘥𝘮𝘪𝘯*`
global.notext = `\`[ # ] 𝘿𝙄𝙆𝘼 𝙄𝘿\` \n*𝘔𝘢𝘯𝘢 𝘵𝘦𝘬𝘴𝘯𝘺𝘢*`
global.noadmin = `\`[ # ] 𝘿𝙄𝙆𝘼 𝙄𝘿\` \n*𝘉𝘰𝘵 𝘣𝘦𝘭𝘶𝘮 𝘮𝘦𝘯𝘫𝘢𝘥𝘪 𝘢𝘥𝘮𝘪𝘯*`
global.succes = `\`[ # ] 𝘿𝙄𝙆𝘼 𝙄𝘿\` \n*𝘋𝘰𝘯𝘦 𝘣𝘢𝘯𝘨 𝘥𝘪𝘬*`
global.invalid = `\`[ # ] 𝘿𝙄𝙆𝘼 𝙄𝘿\` \n*𝘔𝘢𝘴𝘶𝘬𝘬𝘢𝘯 𝘯𝘰𝘮𝘰𝘳 𝘺𝘢𝘯𝘨 𝘷𝘢𝘭𝘪𝘥*`
global.bugrespon = `\`[ # ] 𝘿𝙄𝙆𝘼 𝙄𝘿\` \n*𝘛𝘶𝘯𝘨𝘨𝘶 𝘩𝘪𝘯𝘨𝘨𝘢 𝘣𝘰𝘵 𝘳𝘦𝘢𝘤𝘵 𝘦𝘮𝘰𝘫𝘪 ✅*`

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})