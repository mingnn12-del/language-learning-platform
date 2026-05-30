import { create } from 'zustand';
import { Post, Language } from '@/types';

interface CommunityState {
  posts: Post[];
  isLoading: boolean;
  selectedLanguage: Language | null;
  
  fetchPosts: (language?: Language) => Promise<void>;
  createPost: (userId: string, username: string, content: string, language?: Language) => Promise<boolean>;
  likePost: (postId: string, userId: string) => Promise<void>;
  addComment: (postId: string, userId: string, username: string, content: string) => Promise<void>;
  setSelectedLanguage: (language: Language | null) => void;
}

export const useCommunityStore = create<CommunityState>((set) => ({
  posts: [],
  isLoading: false,
  selectedLanguage: null,

  fetchPosts: async (language?: Language) => {
    set({ isLoading: true });
    try {
      let url = '/api/community/posts';
      if (language) url += `?language=${language}`;
      
      const response = await fetch(url);
      if (response.ok) {
        const posts = await response.json();
        set({ posts });
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  createPost: async (userId: string, username: string, content: string, language?: Language) => {
    try {
      const response = await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, username, content, language }),
      });
      
      if (response.ok) {
        const newPost = await response.json();
        set((state) => ({ posts: [newPost, ...state.posts] }));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  likePost: async (postId: string, userId: string) => {
    try {
      const response = await fetch(`/api/community/posts/${postId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      
      if (response.ok) {
        const updatedPost = await response.json();
        set((state) => ({
          posts: state.posts.map((p) => (p.id === postId ? updatedPost : p)),
        }));
      }
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  },

  addComment: async (postId: string, userId: string, username: string, content: string) => {
    try {
      const response = await fetch(`/api/community/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, username, content }),
      });
      
      if (response.ok) {
        const updatedPost = await response.json();
        set((state) => ({
          posts: state.posts.map((p) => (p.id === postId ? updatedPost : p)),
        }));
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  },

  setSelectedLanguage: (language) => set({ selectedLanguage: language }),
}));
