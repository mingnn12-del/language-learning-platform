import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLearningStore } from '@/store/useLearningStore';
import { Language, Level, LANGUAGES, LEVELS } from '@/types';
import { 
  BookOpen, 
  Clock, 
  ChevronRight, 
  Filter,
  Search,
  Star,
  Users,
  ArrowRight
} from 'lucide-react';

export function Courses() {
  const [searchParams] = useSearchParams();
  const { courses, fetchCourses, isLoading } = useLearningStore();
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    (searchParams.get('language') as Language) || null
  );
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(
    (searchParams.get('level') as Level) || null
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCourses(selectedLanguage || undefined, selectedLevel || undefined);
  }, [selectedLanguage, selectedLevel, fetchCourses]);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLanguageTag = (language: Language) => {
    const lang = LANGUAGES.find((l) => l.code === language);
    return lang ? `${lang.flag} ${lang.name}` : language;
  };

  const getLevelTag = (level: Level) => {
    const lvl = LEVELS.find((l) => l.value === level);
    return lvl?.label || level;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            探索语言课程
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            从入门到精通，选择适合你的课程开始学习之旅
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索课程..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 outline-none transition-all"
              />
            </div>

            {/* Language Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedLanguage(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  !selectedLanguage
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                全部语言
              </button>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedLanguage === lang.code
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {lang.flag} {lang.name}
                </button>
              ))}
            </div>

            {/* Level Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedLevel(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  !selectedLevel
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                全部级别
              </button>
              {LEVELS.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setSelectedLevel(level.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedLevel === level.value
                      ? 'bg-[var(--color-accent)] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">暂无课程</h3>
            <p className="text-gray-500">尝试调整筛选条件或搜索其他关键词</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                        {getLanguageTag(course.language)}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                        {getLevelTag(course.level)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {course.totalLessons} 课时
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[var(--color-primary)] transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
