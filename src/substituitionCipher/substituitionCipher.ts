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

	public rotN(k: number): this {
		this.#output = this._rotN(k);

		return this;
	}

	/**
	 * vigenere
	 */
	public vigenere(k: string): this {
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

	public show(): this {
		console.log(`${this.#plaintext} ==(${this.#mode})==> ${this.#output}`);
		return this;
	}

	public get output(): string {
		return this.#output;
	}
}
