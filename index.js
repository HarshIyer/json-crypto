var crypto = require("crypto");
var CryptoJS = require("crypto-js");
var sha256 = require("crypto-js/sha256");

function splitObject(obj) {
  const keys = [];
  const values = [];
  for (const [key, value] of Object.entries(obj)) {
    keys.push(key);
    values.push(value);
  }
  return { keys, values };
}

function generateDerivedKey(key, salt) {
  return crypto.pbkdf2Sync(key, salt, 1000, 16, "sha256").toString("hex");
}

function combineArrays(keys, values) {
  const obj = {};
  if (keys.length !== values.length) {
    throw new Error("The keys and values arrays must have the same length.");
  }
  for (let i = 0; i < keys.length; i++) {
    obj[keys[i]] = values[i];
  }
  return obj;
}

function convertToAES(inputJSON, key) {
  const { keys, values } = splitObject(inputJSON);
  const minifiedJSONKeys = JSON.stringify(keys);
  const minifiedJSONValues = JSON.stringify(values);
  const minifiedJSON = JSON.stringify({
    minifiedJSONKeys,
    minifiedJSONValues,
  });
  const base64 = btoa(minifiedJSON);
  const salt = new crypto.randomBytes(20).toString("hex");

  const derivedKey = generateDerivedKey(key, salt);

  const aesString = CryptoJS.AES.encrypt(base64, derivedKey).toString();
  const sha256key = sha256(key).toString();
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
  return combineArrays(
    JSON.parse(JSON.parse(originalText).minifiedJSONKeys),
    JSON.parse(JSON.parse(originalText).minifiedJSONValues)
  );
}

module.exports = {
  convertToAES,
  convertFromAES,
};
