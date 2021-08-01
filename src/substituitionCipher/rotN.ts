// export const _rotN = (
//   k: number,
//   plaintext: string = this.#plaintext,
// ): string => {
//   const shiftNPos = (character: string, shift: number): string => {
//     const operation =
//       this.#mode === "encrypt"
//         ? character.charCodeAt(0) + shift
//         : character.charCodeAt(0) - shift;
//     return String.fromCharCode(
//       mod(operation - this.#LOWER_BOUND, this.#ALPHABET_RANGE) +
//         this.#LOWER_BOUND,
//     );
//   };
//
//   return [...plaintext]
//     .map((character: string) => shiftNPos(character, k))
//     .join("");
// };
//
// export const rotN = (k: number): this => {
//   this.isChained();
//   this.#output = this._rotN(k);
//
//   return this;
// };
