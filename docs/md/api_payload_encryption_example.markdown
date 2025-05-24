// Hybrid Encryption for Secure API Endpoints

// 1. SERVER: RSA Key Generation (once)
// --------------------------------------
// Generate keys using Node.js crypto or OpenSSL
// openssl genrsa -out private.pem 2048
// openssl rsa -in private.pem -pubout -out public.pem

// 2. SERVER: Express Middleware and Secure Endpoint Router
// --------------------------------------------------------
import express from 'express';
import fs from 'fs';
import crypto from 'crypto';

const secureRouter = express.Router();
const privateKey = fs.readFileSync('./keys/private.pem', 'utf8');
const publicKey = fs.readFileSync('./keys/public.pem', 'utf8');

// a. Serve Public RSA Key for Client Encryption
secureRouter.get('/public_key', (req, res) => {
  res.type('text/plain').send(publicKey);
});

// b. Generic Middleware to Decrypt Encrypted Payloads
function decryptPayload(req, res, next) {
  try {
    const { encryptedKey, encryptedData, iv, tag } = req.body;

    // Decrypt AES key using RSA private key
    const aesKey = crypto.privateDecrypt(privateKey, Buffer.from(encryptedKey, 'base64'));

    // Decrypt encryptedData using AES-GCM
    const decipher = crypto.createDecipheriv('aes-256-gcm', aesKey, Buffer.from(iv, 'base64'));
    decipher.setAuthTag(Buffer.from(tag, 'base64'));

    let decrypted = decipher.update(Buffer.from(encryptedData, 'base64'), 'binary', 'utf8');
    decrypted += decipher.final('utf8');

    req.decryptedPayload = JSON.parse(decrypted);
    next();
  } catch (err) {
    console.error('Decryption failed:', err);
    res.status(400).json({ error: 'Invalid encrypted payload' });
  }
}

// c. Secure Search Endpoint (Expandable for Future Use)
secureRouter.post('/content/search/secure', express.json(), decryptPayload, async (req, res) => {
  const query = req.decryptedPayload;
  req.query = query;
  const {{ searchContent }} = await import('./contentController.js');
  return searchContent(req, res);
});

export default secureRouter;


// 3. CLIENT: Hybrid Encrypt Request in Browser
// --------------------------------------------
// Uses Web Crypto API
async function encryptAndSendSecureRequest(endpoint, payload) {
  const res = await fetch('/api/public_key');
  const publicKeyPem = await res.text();

  const importedKey = await window.crypto.subtle.importKey(
    'spki',
    pemToArrayBuffer(publicKeyPem),
    { name: 'RSA-OAEP', hash: 'SHA-256' },
    false,
    ['encrypt']
  );

  const aesKey = await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt']
  );

  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(JSON.stringify(payload));
  const encryptedData = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    aesKey,
    encoded
  );

  const rawKey = await window.crypto.subtle.exportKey('raw', aesKey);
  const encryptedKey = await window.crypto.subtle.encrypt(
    { name: 'RSA-OAEP' },
    importedKey,
    rawKey
  );

  await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      encryptedKey: btoa(String.fromCharCode(...new Uint8Array(encryptedKey))),
      encryptedData: btoa(String.fromCharCode(...new Uint8Array(encryptedData))),
      iv: btoa(String.fromCharCode(...iv)),
      tag: '', // Add tag if extracted manually
    })
  });
}

function pemToArrayBuffer(pem) {
  const b64 = pem.replace(/-----(BEGIN|END) PUBLIC KEY-----/g, '').replace(/\n/g, '');
  const bin = atob(b64);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return buf.buffer;
}

// Usage:
// encryptAndSendSecureRequest('/api/content/search/secure', { q: 'climate', tags: 'eco' });
