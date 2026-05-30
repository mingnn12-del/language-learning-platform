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

<<<<<<< HEAD
const TEST_USERS: Record<string, { password: string; user: User }> = {
  'test@example.com': {
    password: '123456',
    user: { id: 'test1', email: 'test@example.com', username: '测试用户', createdAt: '2024-01-01T00:00:00Z' },
  },
};

=======
>>>>>>> 0affdd6380984f95e4036306e6be343bc12129b5
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (email: string, password: string) => {
<<<<<<< HEAD
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
=======
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        set({ user: data.user, isAuthenticated: true });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  register: async (email: string, username: string, password: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        set({ user: data.user, isAuthenticated: true });
        return true;
      }
      return false;
    } catch {
      return false;
    }
>>>>>>> 0affdd6380984f95e4036306e6be343bc12129b5
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
