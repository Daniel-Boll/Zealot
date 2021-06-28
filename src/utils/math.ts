/*
 * TypeScript implementation of the modulo operator
 *
 * @param {number} n - Left-hand side of the operation
 * @param {number} m - Right-hand side of the operation
 * */
export const mod = (n: number, m: number): number => ((n % m) + m) % m;
