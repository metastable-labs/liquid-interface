import base64 from '@hexagon/base64';
import { Hex } from 'viem';

// ! taken from https://github.com/MasterKale/SimpleWebAuthn/blob/e02dce6f2f83d8923f3a549f84e0b7b3d44fa3da/packages/browser/src/helpers/bufferToBase64URLString.ts
/**
 * Convert the given array buffer into a Base64URL-encoded string. Ideal for converting various
 * credential response ArrayBuffers to string for sending back to the server as JSON.
 *
 * Helper method to compliment `base64URLStringToBuffer`
 */
export function bufferToBase64URLString(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let str = '';

  for (const charCode of bytes) {
    str += String.fromCharCode(charCode);
  }

  const base64String = btoa(str);

  return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// ! taken from https://github.com/MasterKale/SimpleWebAuthn/blob/e02dce6f2f83d8923f3a549f84e0b7b3d44fa3da/packages/browser/src/helpers/utf8StringToBuffer.ts
/**
 * A helper method to convert an arbitrary string sent from the server to an ArrayBuffer the
 * authenticator will expect.
 */
export function utf8StringToBuffer(value: string): ArrayBuffer {
  return new TextEncoder().encode(value);
}

/**
 * Decode a base64url string into its original string
 */
export function base64UrlToString(base64UrlString: string): string {
  return base64.toString(base64UrlString, true);
}

// Base64 strings typically have a length that is a multiple of 4 and may end with one or two = characters for padding
function isBase64(str: string): boolean {
  const base64Regex = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
  return base64Regex.test(str);
}

export function base64URLStringToBuffer(base64URLString: string): ArrayBuffer {
  if (!isBase64(base64URLString)) {
    throw new Error('Invalid base64URLString');
  }

  // Convert base64url to standard base64
  const base64String = base64URLString.replace(/-/g, '+').replace(/_/g, '/');

  // Decode base64 to a string
  const decodedString = base64.toString(base64String);

  // Convert the string to an ArrayBuffer
  const buffer = new ArrayBuffer(decodedString.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < decodedString.length; i++) {
    view[i] = decodedString.charCodeAt(i);
  }

  return buffer;
}

/**
 * Convert a base64 string to Uint8Array bytes
 * This is specifically for handling WebAuthn clientDataJSON
 */
export function base64ToBytes(base64String: string): Uint8Array {
  // Add padding if needed
  const paddedBase64 = base64String.padEnd(base64String.length + ((4 - (base64String.length % 4)) % 4), '=');

  // Convert base64url to standard base64
  const standardBase64 = paddedBase64.replace(/-/g, '+').replace(/_/g, '/');

  // Decode base64
  const binaryString = atob(standardBase64);

  // Convert binary string to Uint8Array
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}

export function getPublicKeyHex(publicKey: string): Hex {
  const pubkeybuff = utf8StringToBuffer('UJ8_2cTDtiu4B3LvUMx4h_TTzXBP4rtUAw-4YIvxbVcazvTZvk-k7T2stTYZGsh9WxHdFUw_jZGFGFCy6j2qrg');

  console.log(pubkeybuff, 'buff');
  const publicKeyBuffer = utf8StringToBuffer(publicKey);
  return `0x${Array.from(new Uint8Array(publicKeyBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')}` as Hex;
}
