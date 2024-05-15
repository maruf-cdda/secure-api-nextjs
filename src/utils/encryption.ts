// import CryptoJS from "crypto-js";

// const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY as string;

// export function encrypt(text: string) {
//   return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
// }

// export function decrypt(ciphertext: string): string {
//   const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
//   return bytes.toString(CryptoJS.enc.Utf8);
// }

import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY as string;

// Encrypt the data function
export function encrypt(text: string): string {
  const derivedKey = CryptoJS.SHA256(SECRET_KEY).toString();
  return CryptoJS.AES.encrypt(text, derivedKey).toString();
}

// Decrypt the data function
export function decrypt(ciphertext: string): string {
  const derivedKey = CryptoJS.SHA256(SECRET_KEY).toString();
  const bytes = CryptoJS.AES.decrypt(ciphertext, derivedKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
