import { create } from 'zustand';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

const TEST_USERS: Record<string, { password: string; user: User }> = {
  'test@example.com': {
    password: '123456',
    user: { id: 'test1', email: 'test@example.com', username: '测试用户', createdAt: '2024-01-01T00:00:00Z' },
  },
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const testUser = TEST_USERS[email];
    if (testUser && testUser.password === password) {
      localStorage.setItem('token', 'mock-jwt-token-' + testUser.user.id);
      localStorage.setItem('user', JSON.stringify(testUser.user));
      set({ user: testUser.user, isAuthenticated: true });
      return true;
    }
    
    return false;
  },

  register: async (email: string, username: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      username,
      createdAt: new Date().toISOString(),
    };
    
    localStorage.setItem('token', 'mock-jwt-token-' + newUser.id);
    localStorage.setItem('user', JSON.stringify(newUser));
    set({ user: newUser, isAuthenticated: true });
    return true;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        set({ user, isAuthenticated: true, isLoading: false });
      } catch {
        set({ isLoading: false });
      }
    } else {
      set({ isLoading: false });
    }
  },
}));
