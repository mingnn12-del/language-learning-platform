import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLearningStore } from '@/store/useLearningStore';
import { useAuthStore } from '@/store/useAuthStore';
import { LANGUAGES, LEVELS } from '@/types';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Users, 
  Star,
  Play,
  CheckCircle,
  Lock,
  Brain,
  Mic,
  Headphones
} from 'lucide-react';

const lessonTypeIcons = {
  words: BookOpen,
  grammar: Brain,
  speaking: Mic,
  listening: Headphones,
};

const lessonTypeLabels = {
  words: '单词学习',
  grammar: '语法练习',
  speaking: '口语跟读',
  listening: '听力训练',
};

export function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const { currentCourse, fetchCourseById, progress, updateProgress, isLoading } = useLearningStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (id) {
      fetchCourseById(id);
    }
  }, [id, fetchCourseById]);

  if (isLoading || !currentCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const lang = LANGUAGES.find((l) => l.code === currentCourse.language);
  const level = LEVELS.find((l) => l.value === currentCourse.level);
  const courseProgress = progress[currentCourse.id];
  const completedLessons = courseProgress?.completedLessons || [];
  const totalLessons = currentCourse.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const progressPercent = totalLessons > 0 ? (completedLessons.length / totalLessons) * 100 : 0;

  const handleStartLesson = async (lessonId: string) => {
    if (user) {
      await updateProgress(user.id, currentCourse.id, lessonId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={currentCourse.imageUrl}
          alt={currentCourse.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              返回课程列表
            </Link>
            
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                {lang?.flag} {lang?.name}
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                {level?.label}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {currentCourse.title}
            </h1>
            
            <p className="text-gray-200 max-w-2xl mb-6">
              {currentCourse.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <span className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                {totalLessons} 课时
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {currentCourse.duration}
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                1,234 名学员
              </span>
              <span className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                4.8 评分
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button - Mobile */}
        <div className="lg:hidden mb-6">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[var(--color-primary)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            返回课程列表
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Bar */}
            {user && (
              <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">学习进度</h3>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {completedLessons.length}/{totalLessons} 已完成
                  </span>
                </div>
                <div className="w-full h-3 sm:h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  {progressPercent.toFixed(0)}% 完成
                </p>
              </div>
            )}

            {/* Chapters */}
            <div className="space-y-4 sm:space-y-6">
              {currentCourse.chapters.map((chapter, chapterIndex) => (
                <div key={chapter.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <div className="p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-white border-b">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      第 {chapterIndex + 1} 章：{chapter.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {chapter.lessons.length} 个课时
                    </p>
                  </div>
                  
                  <div className="divide-y">
                    {chapter.lessons.map((lesson) => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      const Icon = lessonTypeIcons[lesson.type];
                      
                      return (
                        <div
                          key={lesson.id}
                          className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-600'
                              : 'bg-gray-100 text-gray-400'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <Icon className="w-5 h-5" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                            <p className="text-sm text-gray-500">
                              {lessonTypeLabels[lesson.type]}
                            </p>
                          </div>
                          
                          <Link
                            to={`/learn/${lesson.type}?course=${currentCourse.id}&lesson=${lesson.id}`}
                            onClick={() => handleStartLesson(lesson.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              isCompleted
                                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)]'
                            }`}
                          >
                            {isCompleted ? '复习' : '开始'}
                            <Play className="w-4 h-4" />
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Course Info Card */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">课程信息</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-gray-500">语言</span>
                    <span className="font-medium">{lang?.flag} {lang?.name}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-gray-500">级别</span>
                    <span className="font-medium">{level?.label}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-gray-500">课时数</span>
                    <span className="font-medium">{totalLessons} 课时</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-gray-500">学习时长</span>
                    <span className="font-medium">{currentCourse.duration}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-500">学员数</span>
                    <span className="font-medium">1,234</span>
                  </div>
                </div>
              </div>

              {/* Recommended Courses */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">推荐课程</h3>
                <div className="space-y-4">
                  {['日语入门', '韩语基础'].map((title, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{title}</h4>
                        <p className="text-sm text-gray-500">初级课程</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
