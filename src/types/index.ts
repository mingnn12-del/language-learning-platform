export type Language = 'en' | 'ja' | 'ko';
export type Level = 'beginner' | 'intermediate' | 'advanced';
export type LessonType = 'words' | 'grammar' | 'speaking' | 'listening';

export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  createdAt: string;
}

export interface Word {
  id: string;
  term: string;
  translation: string;
  pronunciation: string;
  example: string;
  exampleTranslation?: string;
  imageUrl?: string;
}

export interface GrammarQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  content?: unknown;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  language: Language;
  level: Level;
  title: string;
  description: string;
  chapters: Chapter[];
  imageUrl: string;
  totalLessons: number;
  duration: string;
}

export interface Progress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  totalTime: number;
  wordsMastered: number;
  streak: number;
  lastStudied: string;
  dailyGoal: number;
  dailyProgress: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  requirement: number;
  current: number;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  content: string;
  language?: Language;
  likes: number;
  likedByMe: boolean;
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  color: string;
}

export const LANGUAGES: LanguageConfig[] = [
  { code: 'en', name: '英语', nativeName: 'English', flag: '🇺🇸', color: 'var(--color-english)' },
  { code: 'ja', name: '日语', nativeName: '日本語', flag: '🇯🇵', color: 'var(--color-japanese)' },
  { code: 'ko', name: '韩语', nativeName: '한국어', flag: '🇰🇷', color: 'var(--color-korean)' },
];

export const LEVELS: { value: Level; label: string; description: string }[] = [
  { value: 'beginner', label: '初级', description: '适合零基础学习者' },
  { value: 'intermediate', label: '中级', description: '掌握基础后进阶学习' },
  { value: 'advanced', label: '高级', description: '深入学习高级内容' },
];
