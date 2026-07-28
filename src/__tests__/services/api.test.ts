import { apiService } from '@/services/api.service';
import { AuthCredentials } from '@/types';

// Mock fetch
global.fetch = jest.fn();

describe('ApiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('login', () => {
    it('successfully logs in user', async () => {
      const mockResponse = {
        success: true,
        data: {
          user: { id: 1, email: 'test@example.com', name: 'Test User' },
          token: 'mock-token',
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse.data,
      });

      const credentials: AuthCredentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await apiService.login(credentials);

      expect(result.success).toBe(true);
      expect(result.data?.user.email).toBe('test@example.com');
      expect(localStorage.getItem('omusika_token')).toBe('mock-token');
    });

    it('handles login error', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ message: 'Invalid credentials' }),
      });

      const credentials: AuthCredentials = {
        email: 'test@example.com',
        password: 'wrong-password',
      };

      const result = await apiService.login(credentials);

      expect(result.success).toBe(false);
      expect(result.error?.message).toBe('Invalid credentials');
    });
  });
});