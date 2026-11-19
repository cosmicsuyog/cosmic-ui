export interface OTPOptions {
  digits?: boolean;
  lowerCase?: boolean;
  upperCase?: boolean;
  symbols?: boolean;
}
/** Generates a cryptographically secure one-time code in supported runtimes. */
export function generateOTP(length: number, options: OTPOptions = { digits: true }): string {
  if (!Number.isSafeInteger(length) || length <= 0)
    throw new TypeError("length must be a positive integer.");
  const pools = [
    [options.digits, "0123456789"],
    [options.lowerCase, "abcdefghijklmnopqrstuvwxyz"],
    [options.upperCase, "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
    [options.symbols, "!@#$%^&*()_+[]{}<>?"],
  ] as const;
  const characters = pools
    .filter(([enabled]) => enabled)
    .map(([, chars]) => chars)
    .join("");
  if (!characters) throw new Error("At least one character set must be enabled.");
  if (!globalThis.crypto?.getRandomValues)
    throw new Error("Secure random generation is unavailable in this runtime.");
  const limit = Math.floor(0x100000000 / characters.length) * characters.length;
  let result = "";
  while (result.length < length) {
    const values = new Uint32Array(length - result.length);
    globalThis.crypto.getRandomValues(values);
    for (const value of values) if (value < limit) result += characters[value % characters.length];
  }
  return result;
}
