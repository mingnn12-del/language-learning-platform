import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  Play, 
  Pause,
  CheckCircle, 
  XCircle, 
  Headphones,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { LANGUAGES, Language } from '@/types';

interface ListeningExercise {
  id: string;
  audioText: string;
  question: string;
  options: string[];
  correctAnswer: number;
  translation: string;
}

const listeningExercises: Record<Language, ListeningExercise[]> = {
  en: [
    {
      id: 'l1',
      audioText: 'Good morning, how are you today?',
      question: 'What did you hear?',
      options: ['Good morning, how are you today?', 'Good evening, how are you?', 'Good morning, where are you?', 'Good night, how are you today?'],
      correctAnswer: 0,
      translation: '早上好，你今天怎么样？',
    },
    {
      id: 'l2',
      audioText: 'I would like a cup of coffee, please.',
      question: 'What does the speaker want?',
      options: ['A cup of tea', 'A cup of coffee', 'A glass of water', 'A cup of juice'],
      correctAnswer: 1,
      translation: '请给我一杯咖啡。',
    },
    {
      id: 'l3',
      audioText: 'The meeting is at three o\'clock in the afternoon.',
      question: 'When is the meeting?',
      options: ['At 2 PM', 'At 3 PM', 'At 4 PM', 'At 5 PM'],
      correctAnswer: 1,
      translation: '会议在下午三点。',
    },
  ],
  ja: [
    {
      id: 'lj1',
      audioText: 'おはようございます、今日もいい天気ですね。',
      question: '何を聞きましたか？',
      options: ['おはようございます、今日もいい天気ですね。', 'こんばんは、今日もいい天気ですね。', 'おはようございます、明日もいい天気ですね。', 'おやすみなさい、今日もいい天気ですね。'],
      correctAnswer: 0,
      translation: '早上好，今天也是好天气呢。',
    },
    {
      id: 'lj2',
      audioText: 'コーヒーを一杯お願いします。',
      question: '話者は何を望んでいますか？',
      options: ['お茶を一杯', 'コーヒーを一杯', '水を一杯', 'ジュースを一杯'],
      correctAnswer: 1,
      translation: '请给我一杯咖啡。',
    },
    {
      id: 'lj3',
      audioText: '会議は午後三時です。',
      question: '会議は何時ですか？',
      options: ['午後二時', '午後三時', '午後四時', '午後五時'],
      correctAnswer: 1,
      translation: '会议在下午三点。',
    },
  ],
  ko: [
    {
      id: 'lk1',
      audioText: '좋은 아침이에요, 오늘도 좋은 날씨네요.',
      question: '무엇을 들었나요?',
      options: ['좋은 아침이에요, 오늘도 좋은 날씨네요.', '좋은 저녁이에요, 오늘도 좋은 날씨네요.', '좋은 아침이에요, 내일도 좋은 날씨네요.', '안녕히 주무세요, 오늘도 좋은 날씨네요.'],
      correctAnswer: 0,
      translation: '早上好，今天也是好天气呢。',
    },
    {
      id: 'lk2',
      audioText: '커피 한 잔 주세요.',
      question: '화자는 무엇을 원하나요?',
      options: ['차 한 잔', '커피 한 잔', '물 한 잔', '주스 한 잔'],
      correctAnswer: 1,
      translation: '请给我一杯咖啡。',
    },
    {
      id: 'lk3',
      audioText: '회의는 오후 세 시입니다.',
      question: '회의는 몇 시인가요?',
      options: ['오후 두 시', '오후 세 시', '오후 네 시', '오후 다섯 시'],
      correctAnswer: 1,
      translation: '会议在下午三点。',
    },
  ],
};

export function LearnListening() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showFinalResult, setShowFinalResult] = useState(false);

  const exercises = listeningExercises[selectedLanguage];
  const currentExercise = exercises[currentExerciseIndex];

  const playAudio = () => {
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(currentExercise.audioText);
    utterance.lang = selectedLanguage === 'en' ? 'en-US' : selectedLanguage === 'ja' ? 'ja-JP' : 'ko-KR';
    utterance.onend = () => setIsPlaying(false);
    speechSynthesis.speak(utterance);
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === currentExercise.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setShowFinalResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentExerciseIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectCount(0);
    setShowFinalResult(false);
  };

  if (showFinalResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center animate-slide-up">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">练习完成！</h2>
          <p className="text-gray-600 mb-6">
            你答对了 {correctCount}/{exercises.length} 题
          </p>
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(correctCount / exercises.length) * 283} 283`}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-primary)" />
                  <stop offset="100%" stopColor="var(--color-accent)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-[var(--color-primary)]">
                {Math.round((correctCount / exercises.length) * 100)}%
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleRestart}
              className="flex-1 px-6 py-3 border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-semibold rounded-xl hover:bg-[var(--color-primary)] hover:text-white transition-all"
            >
              重新练习
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
          <Link to="/courses" className="flex items-center gap-2 text-gray-600 hover:text-[var(--color-primary)] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            返回
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">听力训练</h1>
          <div className="flex items-center gap-2">
            <Headphones className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="text-sm text-gray-600">
              {currentExerciseIndex + 1}/{exercises.length}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Language Selector */}
        <div className="flex justify-center gap-4 mb-8">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setSelectedLanguage(lang.code);
                handleRestart();
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                selectedLanguage === lang.code
                  ? 'bg-[var(--color-primary)] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              {lang.name}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full transition-all duration-500"
            style={{ width: `${((currentExerciseIndex + 1) / exercises.length) * 100}%` }}
          />
        </div>

        {/* Exercise Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            {/* Audio Player */}
            <div className="flex flex-col items-center mb-8">
              <button
                onClick={playAudio}
                disabled={isPlaying}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                  isPlaying
                    ? 'bg-[var(--color-primary)] animate-pulse'
                    : 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] hover:scale-110'
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </button>
              <p className="text-gray-500 mt-4">点击播放音频</p>
            </div>

            {/* Question */}
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              {currentExercise.question}
            </h2>

            {/* Options */}
            <div className="space-y-4">
              {currentExercise.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentExercise.correctAnswer;
                const showFeedback = selectedAnswer !== null;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                      showFeedback
                        ? isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : isSelected
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 bg-gray-50 text-gray-400'
                        : 'border-gray-200 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        showFeedback
                          ? isCorrect
                            ? 'bg-emerald-500 text-white'
                            : isSelected
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 text-gray-400'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {showFeedback ? (
                          isCorrect ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : isSelected ? (
                            <XCircle className="w-5 h-5" />
                          ) : (
                            String.fromCharCode(65 + index)
                          )
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Translation */}
            {showResult && (
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 animate-fade-in">
                <h3 className="font-semibold text-blue-800 mb-2">翻译</h3>
                <p className="text-blue-700">{currentExercise.translation}</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          {selectedAnswer !== null && (
            <div className="flex justify-end animate-fade-in">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                {currentExerciseIndex < exercises.length - 1 ? '下一题' : '查看结果'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
