import { create } from 'zustand';
import { Course, Progress, Achievement, Language, Level, Word } from '@/types';
import { getCourses, getCourseById, getWords, STATIC_ACHIEVEMENTS } from '@/data/staticData';

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
  achievements: STATIC_ACHIEVEMENTS,
  currentWords: [],
  currentWordIndex: 0,
  isFlipped: false,
  selectedLanguage: null,
  selectedLevel: null,
  isLoading: false,

  fetchCourses: async (language?: Language, level?: Level) => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 200));
    const courses = getCourses(language, level);
    set({ courses, isLoading: false });
  },

  fetchCourseById: async (id: string) => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 200));
    const course = getCourseById(id) || null;
    set({ currentCourse: course, isLoading: false });
  },

  fetchProgress: async (userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 100));
  },

  updateProgress: async (userId: string, courseId: string, lessonId: string) => {
    await new Promise(resolve => setTimeout(resolve, 100));
  },

  fetchAchievements: async (userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    set({ achievements: STATIC_ACHIEVEMENTS });
  },

  fetchWords: async (language: Language) => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 200));
    const words = getWords(language);
    set({ currentWords: words, currentWordIndex: 0, isFlipped: false, isLoading: false });
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
