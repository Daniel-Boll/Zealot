import TranspositionCipher from "../src/transpositionCipher/transpositionCipher";

describe("Transposition Cipher unit test", () => {
  // ===================== Columnar =====================
  it("Encrypt zealot with columnar transposition with key hack", () => {
    expect(
      new TranspositionCipher()
        .plaintext("zealot")
        .mode("encrypt")
        .columnar("hack").output,
    ).toBe("etaxz olx");
  });

  it("Encrypt zealot with columnar transposition with key hack", () => {
    expect(
      new TranspositionCipher()
        .plaintext("The tomato is a plant in the nightshade family")
        .mode("encrypt")
        .columnar("tomato").output,
    ).toBe("tines axeoa htfxh tlthe ymaii aixTa pngdl ostnh mx");
  });
  // ===========================================================
});
