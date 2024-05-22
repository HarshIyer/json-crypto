# json-crypto
### This package can be used to convert a JSON payload and a password into a 256 Bit AES string.
> The payload is converted to Base 64 first.

> Then the password is converted to 32 bytes using the PKBDF2 algorithm using a salt that is randomly generated.

> This pkbdf2 derived key is then used to encrypt the Base64 encoded payload to return a 256 Bit AES string with its key as the pkbdf2 derived key.

### Function returns:
- PKBDF2 Derived 32 byte key,
  - Accessible by convertToAES.derivedKey
- The randomly generated salt,
  - Accessible by convertToAES.salt
- The 256 Bit AES String,
  - Accessible by convertToAES.aesString
- The original password hashed using SHA256
  - Accessible by convertToAES.sha256key

The encrypted AES string can be later decoded using 
``` javascript
var CryptoJS = require("crypto-js");

var bytes = CryptoJS.AES.decrypt(aesString, derivedKey);
var originalText = atob(bytes.toString(CryptoJS.enc.Utf8));
```