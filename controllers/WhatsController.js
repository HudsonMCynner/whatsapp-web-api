//chamando o gerador do qrcode
const qrcode = require('qrcode-terminal');

//chamando a lib do chatbot
const { Client, LocalAuth } = require('whatsapp-web.js');

//guarda o whats na variavel client
const client = new Client({
  authStrategy: new LocalAuth()
});

//gera o qr code para acessar o whats
client.on('qr', qr => {
  qrcode.generate(qr, {small: true});
});

const contatos = ['556791307481']
const remetente = '5567992026705'
//verifica se o whats está conectado

exports.enviarMensagem = (req, res, next) => {
  const numeros = req.body.numeros
  const mensagem = req.body.mensagem

  if (Array.isArray(numeros)) {
    numeros.forEach((numero) => {
      numero = numero.includes('@c.us') ? numero : `${numero}@c.us`;
      enviarMensagem(numero, mensagem)
    })
    res.status(200).send();
  }
}

exports.buscarContatos = (req, res, next) => {
  client.getContacts()
    .then((contatos) => {
      res.status(200).send(contatos)
    })
    .catch((e) => {
      console.log('~> Erro ao buscar contatos', e)
      res.status(400).send(e)
    })
}


exports.buscarGrupos =  (req, res, next) => {
  client.getContacts()
    .then((contatos) => {
      res.status(200).send(contatos.filter((contato) => contato.isGroup))
    })
    .catch((e) => {
      console.log('~> Erro ao buscar contatos', e)
      res.status(400).send(e)
    })
}

// Sending message.
function enviarMensagem (number, text) {
  client.isRegisteredUser(number).then(function (isRegistered) {
    if (isRegistered) {
      console.log(number + ' Registrado');
      client.sendMessage(number, text);
    }
    else {
      console.log(number + ' Não Registrado');
    }
  })
}

client.on('ready', async () => {
  console.log('~> Cliente Online')
});

client.on('authenticated', async () => {
  console.log('~> Cliente Autenticado')
});

client.on('disconnected', async () => {
  console.log('~> Cliente Desconectado')
});


client.on('message_create', async msg => {
  if (msg.body === '!todos') { // mensionar todos em um grupo
    const chat = await msg.getChat();
    let text = "teste";
    let mentions = [];
    for (let participant of chat.participants) {
      const contact = await client.getContactById(participant.id._serialized);
      mentions.push(contact);
      text += `@${participant.id.user} `;
    }
    await chat.sendMessage(text, { mentions });
  }
});


client.on('message', async msg => {
  // if (msg.body === '!todos') { // mensionar todos em um grupo
  //   const chat = await msg.getChat();
  //   let text = "teste";
  //   let mentions = [];
  //   for (let participant of chat.participants) {
  //     const contact = await client.getContactById(participant.id._serialized);
  //     mentions.push(contact);
  //     text += `@${participant.id.user} `;
  //   }
  //   await chat.sendMessage(text, { mentions });
  // }
});

client.initialize();
