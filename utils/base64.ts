import { bytesToBigInt, hexToBytes, type Hex } from 'viem';

// ! taken from https://github.com/MasterKale/SimpleWebAuthn/blob/e02dce6f2f83d8923f3a549f84e0b7b3d44fa3da/packages/browser/src/helpers/base64URLStringToBuffer.ts
/**
 * Convert from a Base64URL-encoded string to an Array Buffer. Best used when converting a
 * credential ID from a JSON string to an ArrayBuffer, like in allowCredentials or
 * excludeCredentials
 *
 * Helper method to compliment `bufferToBase64URLString`
 */
export function base64URLStringToBuffer(base64URLString: string): ArrayBuffer {
  // Convert from Base64URL to Base64
  const base64 = base64URLString.replace(/-/g, '+').replace(/_/g, '/');
  /**
   * Pad with '=' until it's a multiple of four
   * (4 - (85 % 4 = 1) = 3) % 4 = 3 padding
   * (4 - (86 % 4 = 2) = 2) % 4 = 2 padding
   * (4 - (87 % 4 = 3) = 1) % 4 = 1 padding
   * (4 - (88 % 4 = 0) = 4) % 4 = 0 padding
   */
  const padLength = (4 - (base64.length % 4)) % 4;
  const padded = base64.padEnd(base64.length + padLength, '=');

  // Convert to a binary string
  const binary = atob(padded);

  // Convert binary string to buffer
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return buffer;
}

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

export function hexToBuffer(hexString: Hex): ArrayBuffer {
  const bytes =
    hexString
      .slice(2)
      .match(/.{1,2}/g)
      ?.map((byte) => parseInt(byte, 16)) ?? [];
  return Uint8Array.from(bytes);
}

export function bufferToHex(buffer: ArrayBuffer): Hex {
  return `0x${[...new Uint8Array(buffer)].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
}

export function base64URLStringToHex(base64URLString: string): Hex {
  return bufferToHex(base64URLStringToBuffer(base64URLString));
}

export function hexToBase64URLString(hexString: Hex): string {
  return bufferToBase64URLString(hexToBuffer(hexString));
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

export function parseAndNormalizeSig(sig: Hex): { r: bigint; s: bigint } {
  const bSig = hexToBytes(sig);
  // assert(bSig.length === 64, "signature is not 64 bytes");
  const bR = bSig.slice(0, 32);
  const bS = bSig.slice(32);

  // Avoid malleability. Ensure low S (<= N/2 where N is the curve order)
  const r = bytesToBigInt(bR);
  let s = bytesToBigInt(bS);
  const n = BigInt('0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551');
  if (s > n / 2n) {
    s = n - s;
  }
  return { r, s };
}
