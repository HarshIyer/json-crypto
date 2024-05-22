var crypto = require("crypto");
var CryptoJS = require("crypto-js");
var sha256 = require("crypto-js/sha256");

function convertToAES(inputString, key) {
  
  const base64 = btoa(inputString);
  const salt = new crypto.randomBytes(20).toString("hex");

  const derivedKey = crypto
    .pbkdf2Sync(key, salt, 1000, 16, "sha256")
    .toString("hex");

  const aesString = CryptoJS.AES.encrypt(base64, derivedKey).toString();
  const sha256key = sha256(key).toString();
  return {
    derivedKey,
    salt,
    aesString,
    sha256key,
  };
}

function convertFromAES(aesString, derivedKey) {
  const bytes = CryptoJS.AES.decrypt(aesString, derivedKey);
  const originalText = atob(bytes.toString(CryptoJS.enc.Utf8));
  return originalText;
}

module.exports = {
  convertToAES,
  convertFromAES,
};
