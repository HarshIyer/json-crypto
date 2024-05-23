# json-crypto
### This package can be used to convert a JSON payload and a password into a compressed 256 Bit AES string which can be later reversed to obtain the original payload.

### Sample:
``` javascript
const {convertToAES, convertFromAES} = require('@harshiyer/json-crypto');
const object = {
  name:"John Doe",
  age:35
}
const encodedJSON = convertToAES(object , 'testpassword')
console.log(encodedJSON) // Returns derivedKey, salt, aesString, sha256key

//Now to reverse it, 
const aesString = encodedJSON.aesString;
const derivedKey = encodedJSON.derivedKey;

const retrievedText = convertFromAES(aesString, derivedKey);
console.log(retrievedText) // Returns the original JSON which was encrypted

```

> **The original JSON is first split into 2 separate arrays, one containing all keys and one containing all values.**

> **Now these 2 arrays are individually minified and then combined into 1 super string which is then converted to base64 to get encrypted into 256Bit AES.** 

> **Then the password is converted to 32 bytes using the PKBDF2 algorithm using a salt that is randomly generated.**

> **This pkbdf2 derived key is then used to encrypt the Base64 encoded payload to return a 256 Bit AES string with its key as the pkbdf2 derived key.**

### Reversal
> **The AES string is then reversed using the derived key which returns us a base64 string.**

> **This base64 string contains 2 individual arrays, one containing all keys and one containing all values.**

> **Now these 2 arrays are then combined using ``` combineArrays() ``` which returns a javascript object which is then parsed to JSON format.**

### Compression
> **Converting the parent JSON payload into 2 separate individual arrays is essential for saving memory since in test cases with test payloads, while a JSON formatted object was taking upto 336 bytes in memory, 2 individual arrays added to a total of 248 bytes, thus marking a significant 26% in memory savings.**


### Function returns:
- PKBDF2 Derived 32 byte key,
  - Accessible by convertToAES.derivedKey
- The randomly generated salt,
  - Accessible by convertToAES.salt
- The 256 Bit AES String,
  - Accessible by convertToAES.aesString
- The original password hashed using SHA256
  - Accessible by convertToAES.sha256key

The encrypted AES string can be later decoded using the function convertFromAES(aesString, derivedKey)

