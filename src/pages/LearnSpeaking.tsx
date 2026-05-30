import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mic, 
  MicOff, 
  Play, 
  RotateCcw, 
  Volume2,
  CheckCircle,
  Star,
  Sparkles
} from 'lucide-react';
import { LANGUAGES, Language } from '@/types';

interface SpeakingExercise {
  id: string;
  phrase: string;
  translation: string;
  pronunciation: string;
  audioUrl?: string;
}

const speakingExercises: Record<Language, SpeakingExercise[]> = {
  en: [
    { id: 's1', phrase: 'Hello, how are you?', translation: '你好，你好吗？', pronunciation: '/həˈloʊ, haʊ ɑːr juː/' },
    { id: 's2', phrase: 'Nice to meet you.', translation: '很高兴认识你。', pronunciation: '/naɪs tuː miːt juː/' },
    { id: 's3', phrase: 'Where is the library?', translation: '图书馆在哪里？', pronunciation: '/wɛr ɪz ðə ˈlaɪbrɛri/' },
  ],
  ja: [
    { id: 'sj1', phrase: 'こんにちは、お元気ですか？', translation: '你好，你好吗？', pronunciation: 'konnichiwa, ogenki desu ka?' },
    { id: 'sj2', phrase: 'はじめまして、よろしくお願いします。', translation: '初次见面，请多关照。', pronunciation: 'hajimemashite, yoroshiku onegaishimasu.' },
    { id: 'sj3', phrase: '図書館はどこですか？', translation: '图书馆在哪里？', pronunciation: 'toshokan wa doko desu ka?' },
  ],
  ko: [
    { id: 'sk1', phrase: '안녕하세요, 어떻게 지내세요?', translation: '你好，你好吗？', pronunciation: 'annyeonghaseyo, eotteoke jinaeseyo?' },
    { id: 'sk2', phrase: '만나서 반갑습니다.', translation: '很高兴认识你。', pronunciation: 'mannaseo bangapseumnida.' },
    { id: 'sk3', phrase: '도서관은 어디에 있나요?', translation: '图书馆在哪里？', pronunciation: 'doseoganeun eodie innayo?' },
  ],
};

export function LearnSpeaking() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [showResult, setShowResult] = useState(false);

  const exercises = speakingExercises[selectedLanguage];
  const currentExercise = exercises[currentExerciseIndex];

  const speakPhrase = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage === 'en' ? 'en-US' : selectedLanguage === 'ja' ? 'ja-JP' : 'ko-KR';
    speechSynthesis.speak(utterance);
  };

  const startRecording = () => {
    setIsRecording(true);
    setHasRecorded(false);
    setScore(null);
    
    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      setHasRecorded(true);
      // Simulate score
      const randomScore = Math.floor(Math.random() * 30) + 70;
      setScore(randomScore);
      setCompletedExercises((prev) => new Set([...prev, currentExercise.id]));
    }, 3000);
  };

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setHasRecorded(false);
      setScore(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentExerciseIndex(0);
    setHasRecorded(false);
    setScore(null);
    setCompletedExercises(new Set());
    setShowResult(false);
  };

  if (showResult) {
    const avgScore = Math.round(Array.from(completedExercises).length * 85);
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center animate-slide-up">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">练习完成！</h2>
          <p className="text-gray-600 mb-6">
            你完成了 {completedExercises.size}/{exercises.length} 个练习
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            <span className="text-4xl font-bold text-[var(--color-primary)]">{avgScore}</span>
            <span className="text-gray-500">分</span>
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
          <h1 className="text-lg font-semibold text-gray-900">口语跟读</h1>
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-[var(--color-primary)]" />
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
            {/* Phrase */}
            <div className="text-center mb-8">
              <div className="text-3xl font-bold text-gray-900 mb-4">
                {currentExercise.phrase}
              </div>
              <div className="text-lg text-gray-500 mb-2">
                {currentExercise.pronunciation}
              </div>
              <div className="text-gray-400">
                {currentExercise.translation}
              </div>
            </div>

            {/* Listen Button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={() => speakPhrase(currentExercise.phrase)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all"
              >
                <Volume2 className="w-5 h-5" />
                听发音
              </button>
            </div>

            {/* Recording Area */}
            <div className="flex flex-col items-center">
              {!hasRecorded ? (
                <button
                  onClick={startRecording}
                  disabled={isRecording}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                    isRecording
                      ? 'bg-red-500 animate-pulse'
                      : 'bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] hover:scale-110'
                  }`}
                >
                  {isRecording ? (
                    <MicOff className="w-10 h-10 text-white" />
                  ) : (
                    <Mic className="w-10 h-10 text-white" />
                  )}
                </button>
              ) : (
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  {score !== null && (
                    <div className="mb-4">
                      <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">{score}分</div>
                      <div className="flex items-center justify-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-6 h-6 ${
                              i < Math.round(score / 20)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-500 mt-2">
                        {score >= 90 ? '太棒了！发音非常标准！' :
                         score >= 80 ? '很好！继续练习！' :
                         score >= 70 ? '不错，还有提升空间！' :
                         '加油，多练习几次！'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {isRecording && (
                <p className="text-red-500 font-medium mt-4 animate-pulse">
                  正在录音...
                </p>
              )}
            </div>
          </div>

          {/* Navigation */}
          {hasRecorded && (
            <div className="flex justify-end animate-fade-in">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                {currentExerciseIndex < exercises.length - 1 ? '下一个' : '查看结果'}
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
