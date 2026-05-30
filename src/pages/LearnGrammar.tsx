import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  Brain,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { LANGUAGES, Language } from '@/types';

interface GrammarQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const grammarQuestions: Record<Language, GrammarQuestion[]> = {
  en: [
    {
      id: 'e1',
      question: 'Choose the correct form: "She ___ to school every day."',
      options: ['go', 'goes', 'going', 'went'],
      correctAnswer: 1,
      explanation: '第三人称单数（she/he/it）需要在动词后加 -s/-es。',
    },
    {
      id: 'e2',
      question: 'Which sentence is correct?',
      options: [
        'I have been to Paris last year.',
        'I went to Paris last year.',
        'I go to Paris last year.',
        'I am going to Paris last year.',
      ],
      correctAnswer: 1,
      explanation: '过去发生的动作应该使用一般过去时，"last year" 是过去时间标志词。',
    },
    {
      id: 'e3',
      question: 'Fill in the blank: "This is ___ book."',
      options: ['my', 'me', 'I', 'mine'],
      correctAnswer: 0,
      explanation: '名词前需要使用形容词性物主代词 "my"，而不是名词性物主代词 "mine"。',
    },
  ],
  ja: [
    {
      id: 'j1',
      question: '「私は毎日学校___行きます。」正しい助詞は？',
      options: ['を', 'に', 'で', 'は'],
      correctAnswer: 1,
      explanation: '「学校に行きます」表示去学校的方向，应该使用助词「に」。',
    },
    {
      id: 'j2',
      question: '「昨日、映画___見ました。」正しい助詞は？',
      options: ['を', 'に', 'で', 'が'],
      correctAnswer: 0,
      explanation: '「映画を見る」表示看电影，「を」用于表示动作的对象。',
    },
    {
      id: 'j3',
      question: '「これは___ですか？」正しい言葉は？',
      options: ['なん', 'なに', 'どこ', 'だれ'],
      correctAnswer: 0,
      explanation: '询问「这是什么？」应该使用「何（なん）」。',
    },
  ],
  ko: [
    {
      id: 'k1',
      question: '"나는 학교___ 갑니다." 올바른 조사는?',
      options: ['을', '에', '에서', '이'],
      correctAnswer: 1,
      explanation: '"학교에 갑니다"는 학교로 향하는 방향을 나타내므로 조사 "에"를 사용합니다.',
    },
    {
      id: 'k2',
      question: '"어제 영화___ 봤습니다." 올바른 조사는?',
      options: ['를', '에', '에서', '이'],
      correctAnswer: 0,
      explanation: '"영화를 보다"는 영화를 본다는 뜻으로 목적어에 조사 "를"을 사용합니다.',
    },
    {
      id: 'k3',
      question: '"이것은___ 입니까?" 올바른 말은?',
      options: ['무엇', '어디', '누구', '언제'],
      correctAnswer: 0,
      explanation: '"이것은 무엇입니까?"는 이것은 무엇입니까?라는 뜻입니다.',
    },
  ],
};

export function LearnGrammar() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = grammarQuestions[selectedLanguage];
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    if (index === currentQuestion.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectCount(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center animate-slide-up">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">练习完成！</h2>
          <p className="text-gray-600 mb-6">
            你答对了 {correctCount}/{questions.length} 题
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
                strokeDasharray={`${(correctCount / questions.length) * 283} 283`}
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
                {Math.round((correctCount / questions.length) * 100)}%
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
          <h1 className="text-lg font-semibold text-gray-900">语法练习</h1>
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="text-sm text-gray-600">
              {currentQuestionIndex + 1}/{questions.length}
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
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {currentQuestion.question}
            </h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
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

            {/* Explanation */}
            {showExplanation && (
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 animate-fade-in">
                <h3 className="font-semibold text-blue-800 mb-2">解析</h3>
                <p className="text-blue-700">{currentQuestion.explanation}</p>
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
                {currentQuestionIndex < questions.length - 1 ? '下一题' : '查看结果'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
