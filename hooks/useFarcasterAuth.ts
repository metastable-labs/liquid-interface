import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { WebViewNavigation } from 'react-native-webview';

// Define the hook
const useFarcasterAuth = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [followersCount, setFollowersCount] = useState<number | null>(null);

  // OAuth URL to start the authentication
  const authorizationUrl =
    'https://farcaster-api-domain.com/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=read write';

  // extract the authorization code
  const handleWebViewNavigationStateChange = useCallback((navState: WebViewNavigation) => {
    const { url } = navState;
    if (url.includes('YOUR_REDIRECT_URI')) {
      const urlObj = new URL(url);
      const code: string | null = urlObj.searchParams.get('code');
      if (code) {
        fetchToken(code);
      }
    }
  }, []);

  // Fetch the OAuth token using the authorization code
  const fetchToken = async (code: string) => {
    try {
      const response = await fetch('https://farcaster-api-domain.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          client_id: 'YOUR_CLIENT_ID',
          client_secret: 'YOUR_CLIENT_SECRET',
          redirect_uri: 'YOUR_REDIRECT_URI',
        }),
      });

      const data = await response.json();
      if (data.access_token) {
        setAuthToken(data.access_token);
        Alert.alert('Success', 'You are now connected!');
        getFollowersCount(data.access_token);
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  // Step 4: Fetch the user's follower count
  const getFollowersCount = async (accessToken: string) => {
    try {
      const response = await fetch('https://farcaster-api-domain.com/api/v1/me/followers', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (data && data.count) {
        setFollowersCount(data.count);
      }
    } catch (error) {
      console.error('Error fetching followers:', error);
    }
  };

  // Step 5: Create a new post
  const createPost = async (content: string) => {
    if (!authToken) {
      Alert.alert('Error', 'You are not authenticated!');
      return;
    }

    try {
      const response = await fetch('https://farcaster-api-domain.com/api/v1/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          content: content,
        }),
      });

      const data = await response.json();
      if (data && data.success) {
        Alert.alert('Success', 'Your post has been created!');
      } else {
        Alert.alert('Error', 'Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return {
    authToken,
    authorizationUrl,
    handleWebViewNavigationStateChange,
    followersCount,
    createPost,
  };
};

export default useFarcasterAuth;
