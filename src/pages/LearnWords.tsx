import { useEffect, useState } from 'react';
import { useLearningStore } from '@/store/useLearningStore';
import { useAuthStore } from '@/store/useAuthStore';
import { LANGUAGES, Language } from '@/types';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Volume2, 
  Check, 
  X,
  BookOpen,
  Star,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function LearnWords() {
  const { user } = useAuthStore();
  const { 
    currentWords, 
    currentWordIndex, 
    isFlipped, 
    fetchWords, 
    nextWord, 
    prevWord, 
    flipCard, 
    resetCard,
    isLoading 
  } = useLearningStore();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [knownWords, setKnownWords] = useState<Set<string>>(new Set());
  const [showComplete, setShowComplete] = useState(false);

  useEffect(() => {
    fetchWords(selectedLanguage);
  }, [selectedLanguage, fetchWords]);

  useEffect(() => {
    if (currentWords.length > 0 && currentWordIndex >= currentWords.length - 1) {
      setShowComplete(true);
    }
  }, [currentWordIndex, currentWords.length]);

  const currentWord = currentWords[currentWordIndex];

  const handleKnown = () => {
    if (currentWord) {
      setKnownWords((prev) => new Set([...prev, currentWord.id]));
    }
    if (currentWordIndex < currentWords.length - 1) {
      nextWord();
    } else {
      setShowComplete(true);
    }
  };

  const handleUnknown = () => {
    if (currentWordIndex < currentWords.length - 1) {
      nextWord();
    } else {
      setShowComplete(true);
    }
  };

  const handleRestart = () => {
    resetCard();
    setKnownWords(new Set());
    setShowComplete(false);
  };

  const speakWord = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage === 'en' ? 'en-US' : selectedLanguage === 'ja' ? 'ja-JP' : 'ko-KR';
    speechSynthesis.speak(utterance);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (showComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center animate-slide-up">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">学习完成！</h2>
          <p className="text-gray-600 mb-6">
            你已学习 {currentWords.length} 个单词，其中 {knownWords.size} 个已掌握
          </p>
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--color-primary)]">{currentWords.length}</div>
              <div className="text-sm text-gray-500">总单词</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-500">{knownWords.size}</div>
              <div className="text-sm text-gray-500">已掌握</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">{currentWords.length - knownWords.size}</div>
              <div className="text-sm text-gray-500">待复习</div>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleRestart}
              className="flex-1 px-6 py-3 border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-semibold rounded-xl hover:bg-[var(--color-primary)] hover:text-white transition-all"
            >
              重新学习
            </button>
            <Link
              to="/courses"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              返回课程
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/courses" className="flex items-center gap-2 text-gray-600 hover:text-[var(--color-primary)] transition-colors text-sm sm:text-base">
            <ArrowLeft className="w-4 h-4 sm:w-5 h-5" />
            <span className="hidden sm:inline">返回</span>
          </Link>
          <h1 className="text-base sm:text-lg font-semibold text-gray-900">单词记忆</h1>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 sm:w-5 h-5 text-[var(--color-primary)]" />
            <span className="text-xs sm:text-sm text-gray-600">
              {currentWordIndex + 1}/{currentWords.length}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        {/* Language Selector */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                selectedLanguage === lang.code
                  ? 'bg-[var(--color-primary)] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
              }`}
            >
              <span className="text-lg sm:text-xl">{lang.flag}</span>
              <span className="hidden sm:inline">{lang.name}</span>
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 sm:h-2 bg-gray-200 rounded-full mb-6 sm:mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full transition-all duration-500"
            style={{ width: `${((currentWordIndex + 1) / currentWords.length) * 100}%` }}
          />
        </div>

        {/* Flashcard */}
        {currentWord && (
          <div className="perspective-1000 mb-6 sm:mb-8">
            <div
              onClick={flipCard}
              className={`relative w-full max-w-lg mx-auto h-64 sm:h-80 cursor-pointer transition-transform duration-700 transform-style-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front */}
              <div
                className={`absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl bg-white shadow-xl sm:shadow-2xl p-4 sm:p-8 flex flex-col items-center justify-center backface-hidden ${
                  isFlipped ? 'invisible' : ''
                }`}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakWord(currentWord.term);
                    }}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  </button>
                </div>
                <div className="text-3xl sm:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">{currentWord.term}</div>
                <div className="text-base sm:text-lg text-gray-500 mb-2">{currentWord.pronunciation}</div>
                <div className="text-xs sm:text-sm text-gray-400">点击卡片查看释义</div>
              </div>

              {/* Back */}
              <div
                className={`absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] shadow-xl sm:shadow-2xl p-4 sm:p-8 flex flex-col items-center justify-center text-white backface-hidden ${
                  !isFlipped ? 'invisible' : ''
                }`}
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <div className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">{currentWord.translation}</div>
                <div className="text-base sm:text-lg opacity-90 mb-4 sm:mb-6 italic text-center px-2">"{currentWord.example}"</div>
                <div className="text-xs sm:text-sm opacity-70">点击卡片返回</div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-3 sm:gap-6">
          <button
            onClick={handleUnknown}
            className="flex items-center gap-1 sm:gap-2 px-4 sm:px-8 py-2 sm:py-4 bg-red-500 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-red-600 transition-all shadow-md sm:shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">不认识</span>
          </button>
          <button
            onClick={prevWord}
            disabled={currentWordIndex === 0}
            className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white shadow-md sm:shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
          <button
            onClick={nextWord}
            disabled={currentWordIndex >= currentWords.length - 1}
            className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white shadow-md sm:shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
          <button
            onClick={handleKnown}
            className="flex items-center gap-1 sm:gap-2 px-4 sm:px-8 py-2 sm:py-4 bg-emerald-500 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-emerald-600 transition-all shadow-md sm:shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <Check className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">认识</span>
          </button>
        </div>

        {/* Word Counter */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              已掌握: {knownWords.size}
            </span>
            <span>剩余: {currentWords.length - currentWordIndex - 1}</span>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </div>
  );
}
