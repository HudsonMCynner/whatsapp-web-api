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

exports.buscarContatos = async (req, res, next) => {
  const contacts = await client.getContacts()
  res.status(200).send(contacts);
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
  // const contacts = await client.getContacts()
  // console.table(contacts)
  console.log('Client is ready!');

  // // Number and Text.
  // var number = "+55.67.9.9130.7481";
  // var text = "Teste!";
  //
  // //Cleaning to only numbers
  // number = number.replace(/\D/g, "");
  // //console.log(number);
  //
  // //Remove Contry Code (Brazil 55) to make it more simple
  // if (Array.from(number)[0] == "5" && Array.from(number)[1] == "5" && number.length > 11) {
  //   number = number.substring(2);
  //   //console.log(number);
  // }
  // else {
  //   number = number;
  //   //console.log(number);
  // }
  //
  // //Removing 0 from beggin (In Brazil old people put that)
  // if (Array.from(number)[0] == "0") {
  //   number = number.substring(1);
  //   //console.log(number);
  // }
  // else {
  //   number = number;
  //   //console.log(number);
  // }
  //
  // //Creating two numbers (In Brazil we change recentily to 11 digits, put one 9 more)
  // var number2 = "";
  // if (number && /^\d{11,}$/.test(number.trim())) {
  //   //console.log('Tem 11');
  //   number2 = number.slice(0, 2) + number.slice(3);
  //   //console.log(number2);
  // }
  // else if (number && /^\d{10,}$/.test(number.trim())) {
  //   //console.log('Tem 10');
  //   number2 = number.slice(0, 2) + "9" + number.slice(2);
  //   //console.log(number2);
  // }
  // else {
  //   console.log('Não Tem 11 ou 10');
  // }
  //
  // //Add Brazil code (55) and whatsapp ending
  // number = "55" + number + "@c.us";
  // number2 = "55" + number2 + "@c.us";
  // //console.log(number);
  // //console.log(number2);
  // var number_array = [number, number2]
  // number_array.forEach(element => console.log(element));
  //
  //
  //
  // contatos.forEach(number => {
  //   enviarMensagem(number.includes('@c.us') ? number : `${number}@c.us`, text)
  // });
});


//teste if script is working. User send !ping e script return pong
client.on('message', msg => {
  if (msg.body == '!ping') {
    msg.reply('pong');
  }
});

client.initialize();
