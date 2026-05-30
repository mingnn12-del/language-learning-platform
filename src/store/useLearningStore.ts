import { create } from 'zustand';
import { Course, Progress, Achievement, Language, Level, Word } from '@/types';

interface LearningState {
  courses: Course[];
  currentCourse: Course | null;
  progress: Record<string, Progress>;
  achievements: Achievement[];
  currentWords: Word[];
  currentWordIndex: number;
  isFlipped: boolean;
  selectedLanguage: Language | null;
  selectedLevel: Level | null;
  isLoading: boolean;
  
  fetchCourses: (language?: Language, level?: Level) => Promise<void>;
  fetchCourseById: (id: string) => Promise<void>;
  fetchProgress: (userId: string) => Promise<void>;
  updateProgress: (userId: string, courseId: string, lessonId: string) => Promise<void>;
  fetchAchievements: (userId: string) => Promise<void>;
  fetchWords: (language: Language) => Promise<void>;
  setSelectedLanguage: (language: Language | null) => void;
  setSelectedLevel: (level: Level | null) => void;
  nextWord: () => void;
  prevWord: () => void;
  flipCard: () => void;
  resetCard: () => void;
}

export const useLearningStore = create<LearningState>((set, get) => ({
  courses: [],
  currentCourse: null,
  progress: {},
  achievements: [],
  currentWords: [],
  currentWordIndex: 0,
  isFlipped: false,
  selectedLanguage: null,
  selectedLevel: null,
  isLoading: false,

  fetchCourses: async (language?: Language, level?: Level) => {
    set({ isLoading: true });
    try {
      let url = '/api/courses';
      const params = new URLSearchParams();
      if (language) params.append('language', language);
      if (level) params.append('level', level);
      if (params.toString()) url += `?${params.toString()}`;
      
      const response = await fetch(url);
      if (response.ok) {
        const courses = await response.json();
        set({ courses });
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCourseById: async (id: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/courses/${id}`);
      if (response.ok) {
        const course = await response.json();
        set({ currentCourse: course });
      }
    } catch (error) {
      console.error('Failed to fetch course:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProgress: async (userId: string) => {
    try {
      const response = await fetch(`/api/progress/${userId}`);
      if (response.ok) {
        const progressData = await response.json();
        const progressMap: Record<string, Progress> = {};
        progressData.forEach((p: Progress) => {
          progressMap[p.courseId] = p;
        });
        set({ progress: progressMap });
      }
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    }
  },

  updateProgress: async (userId: string, courseId: string, lessonId: string) => {
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, courseId, lessonId }),
      });
      if (response.ok) {
        const updatedProgress = await response.json();
        set((state) => ({
          progress: {
            ...state.progress,
            [courseId]: updatedProgress,
          },
        }));
      }
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  },

  fetchAchievements: async (userId: string) => {
    try {
      const response = await fetch(`/api/achievements/${userId}`);
      if (response.ok) {
        const achievements = await response.json();
        set({ achievements });
      }
    } catch (error) {
      console.error('Failed to fetch achievements:', error);
    }
  },

  fetchWords: async (language: Language) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/words/${language}`);
      if (response.ok) {
        const words = await response.json();
        set({ currentWords: words, currentWordIndex: 0, isFlipped: false });
      }
    } catch (error) {
      console.error('Failed to fetch words:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedLanguage: (language) => set({ selectedLanguage: language }),
  setSelectedLevel: (level) => set({ selectedLevel: level }),

  nextWord: () => {
    const { currentWordIndex, currentWords } = get();
    if (currentWordIndex < currentWords.length - 1) {
      set({ currentWordIndex: currentWordIndex + 1, isFlipped: false });
    }
  },

  prevWord: () => {
    const { currentWordIndex } = get();
    if (currentWordIndex > 0) {
      set({ currentWordIndex: currentWordIndex - 1, isFlipped: false });
    }
  },

  flipCard: () => set((state) => ({ isFlipped: !state.isFlipped })),
  resetCard: () => set({ currentWordIndex: 0, isFlipped: false }),
}));
