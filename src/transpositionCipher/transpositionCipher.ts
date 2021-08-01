import { mod } from "../utils/math";

export default class TranspositionCipher {
  #plaintext: string;
  #mode: string;
  #output: string;

  #LOWER_BOUND: number;
  #UPPER_BOUND: number;
  #ALPHABET_RANGE: number;

  constructor() {
    this.#plaintext = "";
    this.#mode = "";
    this.#output = "";

    this.#LOWER_BOUND = 97;
    this.#UPPER_BOUND = 122;
    this.#ALPHABET_RANGE = 122 - 97 + 1;
  }

  public plaintext(plaintext: string): this {
    this.#plaintext = plaintext.replace(/\s/g, "");
    return this;
  }

  public mode(mode: string): this {
    this.#mode = mode;
    return this;
  }

  /**
   * Change the alphabet length based on the mode.
   *
   * @param {string} modes
   *       - FullAscii
   *           All printable characters from ascii table
   *           Dec   Hex Char
   *            33    21    !
   *           126    7E    ~
   *       - UpperLetters
   *           All uppercase letters from ascii table
   *           Dec   Hex Char
   *            65    41    A
   *            90    5A    Z
   *       - LowerLetters
   *           All lowercase letters from ascii table
   *           Dec   Hex Char
   *            97    61    a
   *           122    7A    z
   *       - FullLetters <WIP>
   *           All printable letters from ascii table
   *
   * */
  public alphabetLength(mode = "FullAscii"): this {
    const currentMode: string = mode.toLowerCase();

    if (currentMode === "fullascii") {
      this.#LOWER_BOUND = 33;
      this.#UPPER_BOUND = 126;
    } else if (currentMode === "upperletters") {
      this.#LOWER_BOUND = 65;
      this.#UPPER_BOUND = 90;
    } else if (currentMode === "lowerletters") {
      this.#LOWER_BOUND = 97;
      this.#UPPER_BOUND = 122;
    } else {
      if (typeof mode !== "string")
        throw new Error("Sorry, mode must be a string. Check docs.");
      throw new Error("Sorry, mode must be one of allowed modes. Check docs.");
    }

    this.#ALPHABET_RANGE = this.#UPPER_BOUND - this.#LOWER_BOUND + 1;

    return this;
  }

  private arrayChunks(
    array: Array<string>,
    chunkSize: number,
  ): Array<Array<string>> {
    return Array(Math.ceil(array.length / chunkSize))
      .fill(0)
      .map((_, index) => index * chunkSize)
      .map((begin) => array.slice(begin, begin + chunkSize));
  }

  public columnar(key: string): this {
    const padding = Math.ceil(this.#plaintext.length / key.length) * key.length;

    const table = [...this.#plaintext.padEnd(padding, "x")];

    const resultTable = this.arrayChunks(table, key.length);

    const translateToKey = [...key]
      .map((character, index) => [character, index])
      .sort();

    const res = translateToKey
      .map(([_, idx]: any) =>
        resultTable.map((arr: string[]) => arr[idx]).join(""),
      )
      .join("")
      .replace(/.{5}/g, "$& ");

    this.#output = res;

    return this;
  }

  public show(): this {
    console.log(`${this.#plaintext} ==(${this.#mode})==> ${this.#output}`);
    return this;
  }

  public get output(): string {
    return this.#output;
  }
}
