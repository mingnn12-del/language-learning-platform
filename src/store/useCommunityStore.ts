import { create } from 'zustand';
import { Post, Language } from '@/types';
import { STATIC_POSTS } from '@/data/staticData';

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

export const useCommunityStore = create<CommunityState>((set, get) => ({
  posts: STATIC_POSTS,
  isLoading: false,
  selectedLanguage: null,

  fetchPosts: async (language?: Language) => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 200));
    let filtered = STATIC_POSTS;
    if (language) {
      filtered = filtered.filter(p => p.language === language);
    }
    set({ posts: filtered, isLoading: false });
  },

  createPost: async (userId: string, username: string, content: string, language?: Language) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const newPost: Post = {
      id: Date.now().toString(),
      userId,
      username,
      content,
      language: language || 'en',
      likes: 0,
      likedByMe: false,
      comments: [],
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ posts: [newPost, ...state.posts] }));
    return true;
  },

  likePost: async (postId: string, userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    set((state) => ({
      posts: state.posts.map((p) => 
        p.id === postId 
          ? { ...p, likes: p.likedByMe ? p.likes : p.likes + 1, likedByMe: !p.likedByMe }
          : p
      ),
    }));
  },

  addComment: async (postId: string, userId: string, username: string, content: string) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    set((state) => ({
      posts: state.posts.map((p) => 
        p.id === postId 
          ? { 
              ...p, 
              comments: [...p.comments, { 
                id: Date.now().toString(), 
                userId, 
                username, 
                content, 
                createdAt: new Date().toISOString() 
              }] 
            }
          : p
      ),
    }));
  },

  setSelectedLanguage: (language) => set({ selectedLanguage: language }),
}));
