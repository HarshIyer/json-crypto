import { convertToAES, convertFromAES } from "../index.js";
import { describe, it, expect } from "vitest";

describe("Test JSON-Crypto", () => {
    it("Should encrypt and decrypt data"), () => {
        const data = {
        InsuranceCompanies:{
            source: "investopedia.com",
        },
        };
        var log = convertToAES(data, "mysuperlongpassword");
        expect(log).toBeDefined();
        expect(log.aesString).toBeDefined();
        expect(log.salt).toBeDefined();
        expect(log.sha256key).toBeDefined();
        expect(log.derivedKey).toBeDefined();
        expect(log.aesString).toBeString();
        expect(log.salt).toBeString();
        expect(log.sha256key).toBeString();
        expect(log.derivedKey).toBeString();
        expect(log.aesString).not.toBeEmpty();
        expect(log.salt).not.toBeEmpty();
        expect(log.sha256key).not.toBeEmpty();
        expect(log.derivedKey).not.toBeEmpty();
        var decryptedData = convertFromAES(log.aesString, "mysuperlongpassword", log.salt);
        expect(decryptedData).toBeDefined();
        expect(decryptedData).toBeObject();
        expect(decryptedData.InsuranceCompanies).toBeDefined();
        expect(decryptedData.InsuranceCompanies).toBeObject();
        expect(decryptedData.InsuranceCompanies.source).toBeDefined();
        expect(decryptedData.InsuranceCompanies.source).toBeString();
        expect(decryptedData.InsuranceCompanies.source).toBe("investopedia.com");
        expect(decryptedData).toEqual(JSON.stringify(data));
    }
});
