import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useLearningStore } from '@/store/useLearningStore';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Clock, 
  BookOpen, 
  Trophy, 
  Flame, 
  Target,
  TrendingUp,
  Calendar,
  Star
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const mockWeeklyData = [
  { day: '周一', minutes: 30 },
  { day: '周二', minutes: 45 },
  { day: '周三', minutes: 25 },
  { day: '周四', minutes: 60 },
  { day: '周五', minutes: 40 },
  { day: '周六', minutes: 55 },
  { day: '周日', minutes: 35 },
];

const mockMonthlyData = [
  { week: '第1周', words: 50 },
  { week: '第2周', words: 120 },
  { week: '第3周', words: 180 },
  { week: '第4周', words: 250 },
];

export function Progress() {
  const { user } = useAuthStore();
  const { progress, achievements, fetchProgress, fetchAchievements } = useLearningStore();

  useEffect(() => {
    if (user) {
      fetchProgress(user.id);
      fetchAchievements(user.id);
    }
  }, [user, fetchProgress, fetchAchievements]);

  const totalProgress = Object.values(progress);
  const totalLessonsCompleted = totalProgress.reduce((acc, p) => acc + p.completedLessons.length, 0);
  const totalWordsMastered = totalProgress.reduce((acc, p) => acc + p.wordsMastered, 0);
  const totalTimeSpent = totalProgress.reduce((acc, p) => acc + p.totalTime, 0);
  const currentStreak = totalProgress.length > 0 ? totalProgress[0].streak : 0;
  const unlockedAchievements = achievements.filter((a) => a.unlocked).length;

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
          <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">查看学习进度</h2>
          <p className="text-gray-600 mb-6">
            登录后即可查看您的学习进度和成就
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            立即登录
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            学习进度
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            追踪你的学习旅程，见证自己的成长
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">完成课程</p>
                <p className="text-2xl font-bold text-gray-900">{totalLessonsCompleted}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Target className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">掌握单词</p>
                <p className="text-2xl font-bold text-gray-900">{totalWordsMastered}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
                <Clock className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">学习时长</p>
                <p className="text-2xl font-bold text-gray-900">{totalTimeSpent}分钟</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center">
                <Flame className="w-7 h-7 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">连续学习</p>
                <p className="text-2xl font-bold text-gray-900">{currentStreak}天</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Weekly Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">本周学习时长</h3>
              <span className="text-sm text-gray-500">分钟</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockWeeklyData}>
                  <defs>
                    <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none', 
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)' 
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="minutes" 
                    stroke="var(--color-primary)" 
                    fillOpacity={1} 
                    fill="url(#colorMinutes)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">本月单词掌握</h3>
              <span className="text-sm text-gray-500">个</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockMonthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none', 
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)' 
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="words" 
                    stroke="var(--color-accent)" 
                    strokeWidth={3}
                    dot={{ r: 6, fill: 'var(--color-accent)' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">成就徽章</h3>
            <span className="text-sm text-gray-500">
              已解锁 {unlockedAchievements}/{achievements.length}
            </span>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`bg-white rounded-2xl shadow-md p-6 text-center transition-all ${
                  achievement.unlocked
                    ? 'hover:shadow-lg hover:-translate-y-1'
                    : 'opacity-50 grayscale'
                }`}
              >
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                    : 'bg-gray-200'
                }`}>
                  {achievement.icon}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{achievement.name}</h4>
                <p className="text-sm text-gray-500 mb-3">{achievement.description}</p>
                {achievement.unlocked ? (
                  <span className="inline-flex items-center gap-1 text-sm text-emerald-600 font-medium">
                    <Star className="w-4 h-4 fill-emerald-600" />
                    已解锁
                  </span>
                ) : (
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-400 rounded-full"
                      style={{ width: `${(achievement.current / achievement.requirement) * 100}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="mt-8 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-2xl p-8 text-white">
          <h3 className="text-xl font-semibold mb-4">继续学习</h3>
          <p className="text-gray-200 mb-6">
            保持学习习惯，解锁更多成就徽章
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--color-primary)] font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              <BookOpen className="w-5 h-5" />
              浏览课程
            </Link>
            <Link
              to="/learn/words"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all"
            >
              <Target className="w-5 h-5" />
              记忆单词
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
