var crypto = require("crypto");
var CryptoJS = require("crypto-js");
var sha256 = require("crypto-js/sha256");

function convertToAES(payload, key) {
  const base64 = btoa(payload);

  const salt = new crypto.randomBytes(20).toString("hex");

  const derivedKey = crypto
    .pbkdf2Sync(key, salt, 1000, 16, "sha256")
    .toString("hex");

  var aesString = CryptoJS.AES.encrypt(base64, derivedKey).toString();
  var sha256key = sha256(key).toString();
  return {
    derivedKey,
    salt,
    aesString,
    sha256key,
  };
}

module.exports = convertToAES;