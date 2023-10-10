const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; // Usando AES com chave de 256 bits em modo CBC
const key = crypto.randomBytes(32); // Gere uma chave de 32 bytes (256 bits)
const iv = crypto.randomBytes(16); // Vetor de inicialização de 16 bytes (128 bits)

exports.encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

exports.decrypt = (text) => {
  const ivBuffer = Buffer.from(text.iv, 'hex');
  const encryptedText = Buffer.from(text.encryptedData, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), ivBuffer);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

const originalText = 'Texto para criptografar';
const encryptedData = this.encrypt(originalText);
console.log('Texto Criptografado:', encryptedData);

const decryptedText = this.decrypt(encryptedData);
console.log('Texto Descriptografado:', decryptedText);
