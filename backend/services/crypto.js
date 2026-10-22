const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();
function deriveUserVaultKey(password, salt) {
  return crypto.pbkdf2Sync(
    password,
    salt,
    100000,
    32,
    'sha256'
  );
}

function getServerVaultKey() {
  const secret = process.env.SERVER_VAULT_SECRET;

  if (!secret || !/^[0-9a-fA-F]{64}$/.test(secret)) {
    throw new Error(
      'SERVER_VAULT_SECRET must be a 32-byte key encoded as 64 hexadecimal characters'
    );
  }

  return Buffer.from(secret, 'hex');
}

function wrapVaultKey(userVaultKey) {
  if (!Buffer.isBuffer(userVaultKey) || userVaultKey.length !== 32) {
    throw new Error('User vault key must be a 32-byte Buffer');
  }

  const serverKey = getServerVaultKey();
  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv(
    'aes-256-gcm',
    serverKey,
    iv
  );

  const encryptedKey = Buffer.concat([
    cipher.update(userVaultKey),
    cipher.final()
  ]);

  const authTag = cipher.getAuthTag();

  return {
    iv: iv.toString('base64'),
    authTag: authTag.toString('base64'),
    encryptedKey: encryptedKey.toString('base64')
  };
}

function unwrapVaultKey(wrappedKey) {
  const serverKey = getServerVaultKey();

  const iv = Buffer.from(wrappedKey.iv, 'base64');
  const authTag = Buffer.from(wrappedKey.authTag, 'base64');
  const encryptedKey = Buffer.from(
    wrappedKey.encryptedKey,
    'base64'
  );

  if (iv.length !== 12 || authTag.length !== 16 ||
      encryptedKey.length !== 32) {
    throw new Error('Invalid wrapped vault key format');
  }

  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    serverKey,
    iv
  );

  decipher.setAuthTag(authTag);

  const userVaultKey = Buffer.concat([
    decipher.update(encryptedKey),
    decipher.final()
  ]);

  return userVaultKey;
}


function encryptPassword(plainPassword, vaultKey) {
    if (!Buffer.isBuffer(vaultKey) || vaultKey.length !== 32) {
        throw new Error('Vault key must be a 32-byte Buffer');
    }

    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv(
        'aes-256-gcm',
        vaultKey,
        iv
    );

    const encryptedPassword = Buffer.concat([
        cipher.update(plainPassword, 'utf8'),
        cipher.final()
    ]);

    const authTag = cipher.getAuthTag();

    return {
        encryptedPassword: encryptedPassword.toString('base64'),
        iv: iv.toString('base64'),
        authTag: authTag.toString('base64')
    };
}

function decryptPassword(encryptedData, vaultKey) {
    if (!Buffer.isBuffer(vaultKey) || vaultKey.length !== 32) {
        throw new Error('Vault key must be a 32-byte Buffer');
    }

    const iv = Buffer.from(encryptedData.iv, 'base64');
    const authTag = Buffer.from(encryptedData.authTag, 'base64');
    const ciphertext = Buffer.from(
        encryptedData.encryptedPassword,
        'base64'
    );

    if (iv.length !== 12 || authTag.length !== 16) {
        throw new Error('Invalid encrypted password format');
    }

    const decipher = crypto.createDecipheriv(
        'aes-256-gcm',
        vaultKey,
        iv
    );

    decipher.setAuthTag(authTag);

    const plainPassword = Buffer.concat([
        decipher.update(ciphertext),
        decipher.final()
    ]);

    return plainPassword.toString('utf8');
}

module.exports = {
    deriveUserVaultKey,
    wrapVaultKey,
    unwrapVaultKey,
    encryptPassword,
    decryptPassword
};