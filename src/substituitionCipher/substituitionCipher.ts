import { mod } from "../utils/math";

/**
 *
 * SubstituitionCipher()
 *   .plaintext("zealot")
 *   .mode("encrypt")
 *   .caeser_cypher(2)
 *   .mode("decrypt")
 *   .vigenere("alo")
 *   .show()
 *
 *
 * SubstituitionCipher("zealot")
 *   .mode("encrypt")
 *   .caeser_cypher(2)
 *   .mode("decrypt")
 *   .vigenere("alo")
 *   .show()
 *
 */
export default class SubstituitionCipher {
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

  private isChained(): void {
    if (this.#output !== "") this.#plaintext = this.#output;
  }

  public plaintext(plaintext: string): this {
    this.#plaintext = plaintext;
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

  private _rotN(k: number, plaintext: string = this.#plaintext): string {
    const shiftNPos = (character: string, shift: number): string => {
      const operation =
        this.#mode === "encrypt"
          ? character.charCodeAt(0) + shift
          : character.charCodeAt(0) - shift;
      return String.fromCharCode(
        mod(operation - this.#LOWER_BOUND, this.#ALPHABET_RANGE) +
          this.#LOWER_BOUND,
      );
    };

    return [...plaintext]
      .map((character: string) => shiftNPos(character, k))
      .join("");
  }

  // TODO: Add the isChained as a decorator. Haha
  // @isChainded() <----- Look at this 🤣
  // From here downwards is fuck
  public rotN(k: number): this {
    this.isChained();
    this.#output = this._rotN(k);

    return this;
  }

  /**
   * vigenere
   */
  public vigenere(k: string): this {
    this.isChained();
    const kAdjusted = "".padStart(this.#plaintext.length, k);

    this.#output = [...kAdjusted]
      .map((key: string, index: number) => {
        const result = this._rotN(
          key.charCodeAt(0) - this.#LOWER_BOUND,
          this.#plaintext.charAt(index),
        );

        return result;
      })
      .join("");

    return this;
  }

  // const arrayChunks = (array, chunkSize) => Array(Math.ceil(array.length / chunkSize)).fill().map((_, index) => index * chunkSize).map(begin => array.slice(begin, begin + chunkSize));

  // const standardize = (word) => word.replace(/\s/g, "");

  // const getAlphabet = () => Array.from({ length: 26 }).map((_, index) => (index+10).toString(36)).join("").replace(/j/, "");

  // const processKey = (key) => {
  //   const reconstructKey = [...new Set(key).values()].join("");

  //   return [...new Set(`${reconstructKey}${getAlphabet()}`).values()];
  // }

  // const treatMessage = (message) => {
  //   const pairment = message.toLowerCase().replace(/\s/g, "").match(/.{1,2}/g);
  //   const repeated = pairment.filter(pair => pair[0] === pair[1]);

  //   if(!repeated.length) return pairment;

  //   return treatMessage(pairment.join("").replace(/(.)\1/g, "$1x$1"));
  // }

  // const indexOf = (pair) => on = (table) => [...pair].map(letter => table.map((row, index) => {
  //     const inRow = row.indexOf(letter);
  //     if (inRow === -1) return null;
  //     return [inRow, index];
  //   }).filter(res => res));

  // const encrypt = (pair, resultTable) => {
  //   const [[firstLetterPos], [secondLetterPos]] = indexOf(pair)(resultTable);

  //   const [fCol, fRow] = firstLetterPos;
  //   const [sCol, sRow] = secondLetterPos;

  //   // Square
  //   if(fRow !== sRow && fCol !== sCol) return `${resultTable[fRow][sCol]}${resultTable[sRow][fCol]}`;

  //   // Same row
  //   if(fRow === sRow) return `${resultTable[fRow][(fCol + 1) % 5]}${resultTable[sRow][(sCol + 1) % 5]}`;

  //   // Same column
  //   if(fCol === sCol) return `${resultTable[(fRow + 1) % 5][fCol]}${resultTable[(sRow + 1) % 5][sCol]}`;
  // }

  // const [engine, path, key, message] = process.argv;

  // // ================ Main process ================
  // const pfTable = processKey(standardize(key));

  // const resultTable = arrayChunks(pfTable, 5);

  // const treatedMessage = treatMessage(message);

  // const encryption = treatedMessage.map(pair => encrypt(pair, resultTable)).join("");

  // console.log(encryption);
  // // ==============================================

  public show(): this {
    console.log(`${this.#plaintext} ==(${this.#mode})==> ${this.#output}`);
    return this;
  }

  public get output(): string {
    return this.#output;
  }
}
