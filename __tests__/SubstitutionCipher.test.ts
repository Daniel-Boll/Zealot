import SubstituitionCipher from "../src/substituitionCipher/substituitionCipher";

describe("Substituition Cipher unit test", () => {
  // ===================== Caesar Cipher =====================
  it("Encrypt zealot in rot 22", () => {
    expect(
      new SubstituitionCipher().plaintext("zealot").mode("encrypt").rotN(22)
        .output,
    ).toBe("vawhkp");
  });

  it("Encrypt xyz in rot 3", () => {
    expect(
      new SubstituitionCipher().plaintext("xyz").mode("encrypt").rotN(3).output,
    ).toBe("abc");
  });

  it("Decrypt abc in rot 3", () => {
    expect(
      new SubstituitionCipher().plaintext("abc").mode("decrypt").rotN(3).output,
    ).toBe("xyz");
  });

  it("Encrypt XYZ in rot 3", () => {
    expect(
      new SubstituitionCipher()
        .plaintext("XYZ")
        .alphabetLength("upperletters")
        .mode("encrypt")
        .rotN(3).output,
    ).toBe("ABC");
  });

  it("Decrypt ABC in rot 3", () => {
    expect(
      new SubstituitionCipher()
        .plaintext("ABC")
        .alphabetLength("upperletters")
        .mode("decrypt")
        .rotN(3).output,
    ).toBe("XYZ");
  });
  // ========================================================

  // ===================== Vigenère Cipher =====================
  it("Encrypt zealot in vigenère with key greather than plaintext", () => {
    expect(
      new SubstituitionCipher()
        .plaintext("zealot")
        .mode("encrypt")
        .alphabetLength("lowerletters")
        .vigenere("greater").output,
    ).toBe("fvelhx");
  });

  it("Encrypt zealot in vigenère with key smaller than plaintext", () => {
    expect(
      new SubstituitionCipher()
        .plaintext("zealot")
        .mode("encrypt")
        .alphabetLength("lowerletters")
        .vigenere("small").output,
    ).toBe("rqawzl");
  });

  it("Decrypt fvelhx in vigenère with key greather than plaintext", () => {
    expect(
      new SubstituitionCipher()
        .plaintext("fvelhx")
        .mode("decrypt")
        .alphabetLength("lowerletters")
        .vigenere("greater").output,
    ).toBe("zealot");
  });

  it("Decrypt rqawzl in vigenère with key smaller than plaintext", () => {
    expect(
      new SubstituitionCipher()
        .plaintext("rqawzl")
        .mode("decrypt")
        .alphabetLength("lowerletters")
        .vigenere("small").output,
    ).toBe("zealot");
  });
  // ===========================================================
});
