import { CreatePassKeyCredentialOptions, Address, PasskeyRegistrationResult } from './types';

class LiquidAPI {
  private apiBaseUrl: string;
  private apiKey: string;

  constructor() {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const apiKey = process.env.EXPO_PUBLIC_API_KEY;

    if (!apiUrl || !apiKey) {
      throw new Error('API URL or API key is not set');
    }

    this.apiBaseUrl = apiUrl;
    this.apiKey = apiKey;
  }

  private async fetchWithErrorHandling(url: string, options: RequestInit) {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async getRegistrationOptions(username: string): Promise<CreatePassKeyCredentialOptions> {
    return this.fetchWithErrorHandling(`${this.apiBaseUrl}/registration/options?user=${encodeURIComponent(username)}`, { method: 'GET' });
  }

  async verifyRegistration(
    username: string,
    registrationResponse: PasskeyRegistrationResult
  ): Promise<{ verified: boolean; publicKey: string }> {
    return this.fetchWithErrorHandling(`${this.apiBaseUrl}/registration/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: username, registrationResponse }),
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
}

export default new LiquidAPI();
