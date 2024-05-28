var crypto = require("crypto");
var CryptoJS = require("crypto-js");


function generateDerivedKey(key, salt) {
  return crypto.pbkdf2Sync(key, salt, 1000, 16, "sha256").toString("hex");
}

function convertToAES(inputJSON, key) {

  const minifiedJSON = JSON.stringify({
    inputJSON,
  });
  const base64 = btoa(minifiedJSON);
  const salt = new crypto.randomBytes(20).toString("hex");

  const derivedKey = generateDerivedKey(key, salt);

  const aesString = CryptoJS.AES.encrypt(base64, derivedKey).toString();
  const sha256key = crypto.createHash("sha256").update(key).digest("hex");
  return {
    derivedKey,
    salt,
    aesString,
    sha256key,
  };
}

function convertFromAES(aesString, key, salt) {
  const derivedKey = generateDerivedKey(key, salt);
  const bytes = CryptoJS.AES.decrypt(aesString, derivedKey);
  const originalText = atob(bytes.toString(CryptoJS.enc.Utf8));
  return JSON.parse(originalText);
}

module.exports = {
  convertToAES,
  convertFromAES,
};
