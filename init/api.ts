import { PoolResponse } from '@/store/pools/types';
import { CreatePassKeyCredentialOptions, Address, PoolType, VerifyRegistration, AuthCredentialOptions } from './types';
import { AuthenticationResponseJSON } from 'react-native-passkeys/build/ReactNativePasskeys.types';

import { apiKey, apiUrl } from '@/constants/env';

class LiquidAPI {
  private apiBaseUrl: string;
  private apiKey: string;

  constructor() {
    this.apiBaseUrl = apiUrl;
    this.apiKey = apiKey;
  }

  private async fetchWithErrorHandling(url: string, options: RequestInit) {
    console.log('fetchWithErrorHandling', url);
    const response = await fetch(url, options);

    if (!response.ok || response.status !== 200) {
      const errorData = await response.text();
      const errorMessage = `HTTP error - status: ${response.status} - ${errorData}`;
      throw new Error(errorMessage);
    }
    return response.json();
  }

  async getRegistrationOptions(username: string): Promise<CreatePassKeyCredentialOptions> {
    return this.fetchWithErrorHandling(`${this.apiBaseUrl}/registration/options?username=${encodeURIComponent(username)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getAuthenticationOptions(username: string): Promise<AuthCredentialOptions> {
    return this.fetchWithErrorHandling(`${this.apiBaseUrl}/authentication/options?username=${encodeURIComponent(username)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async verifyRegistration(data: VerifyRegistration): Promise<{ verified: boolean; publicKey: string }> {
    return this.fetchWithErrorHandling(`${this.apiBaseUrl}/registration/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async verifyAuthentication(
    username: string,
    data: AuthenticationResponseJSON
  ): Promise<{ verified: boolean; userName: string; publicKey: string; userAddress: string }> {
    return this.fetchWithErrorHandling(`${this.apiBaseUrl}/authentication/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, authenticationResponse: data }),
    });
  }

  async updateUserAddress(username: string, userAddress: Address): Promise<{ success: boolean }> {
    return this.fetchWithErrorHandling(`${this.apiBaseUrl}/user/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
      },
      body: JSON.stringify({ userName: username, userAddress }),
    });
  }

  async getPools(type: PoolType, query?: string): Promise<PoolResponse> {
    return this.fetchWithErrorHandling(`${this.apiBaseUrl}/pools/${type}${query || ''}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async searchPools(query: string): Promise<PoolResponse> {
    return this.fetchWithErrorHandling(`${this.apiBaseUrl}/pools/search?symbol=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default new LiquidAPI();
