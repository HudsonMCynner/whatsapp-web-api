# Whatsapp Web API

## Funcionalidades
- Autenticação por QR Code
- Envio de mensagens em massa.
- Busca de Contatos

## Recursos
- [node.js] - E/S de eventos para o back-end
- [Express] - estrutura rápida de aplicativo de rede node.js
- [whatsapp-web,js] - API Whatsapp para envio de mensagem

## Installation
Aplicação exige [Node.js](https://nodejs.org/) v12+ para funcionar.
Instale as dependências e devDependencies e inicie o servidor.

```sh
npm i
npm run start
```

Para ambientes de produção...

```sh
npm install --production
NODE_ENV=production node app
```

# Uso da API

#### Envio de Mensagem
```sh
GET: http://localhost:3000/whats/enviar
body: {
    "numeros": ["string_numero"],
    "mensagem": "string_mensagem"
}
```

#### Busca de Contatos
```sh
GET: http://localhost:3000/whats/contatos
200-OK (Retorna no corpo de resposta uma lista de contatos vinculados ao cliente autenticado)
```

## License
