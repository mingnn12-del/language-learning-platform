import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useLearningStore } from '@/store/useLearningStore';
import { 
  User, 
  Mail, 
  Calendar, 
  BookOpen, 
  Trophy, 
  Flame,
  Target,
  Settings,
  LogOut,
  ChevronRight,
  Star,
  TrendingUp
} from 'lucide-react';
import { LANGUAGES } from '@/types';

export function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { progress, achievements, fetchProgress, fetchAchievements } = useLearningStore();

  useEffect(() => {
    if (user) {
      fetchProgress(user.id);
      fetchAchievements(user.id);
    }
  }, [user, fetchProgress, fetchAchievements]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">个人中心</h2>
          <p className="text-gray-600 mb-6">
            登录后即可查看个人信息和学习统计
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

  const totalProgress = Object.values(progress);
  const totalLessonsCompleted = totalProgress.reduce((acc, p) => acc + p.completedLessons.length, 0);
  const totalWordsMastered = totalProgress.reduce((acc, p) => acc + p.wordsMastered, 0);
  const currentStreak = totalProgress.length > 0 ? totalProgress[0].streak : 0;
  const unlockedAchievements = achievements.filter((a) => a.unlocked).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = [
    { label: '完成课程', value: totalLessonsCompleted, icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
    { label: '掌握单词', value: totalWordsMastered, icon: Target, color: 'bg-emerald-100 text-emerald-600' },
    { label: '连续学习', value: `${currentStreak}天`, icon: Flame, color: 'bg-orange-100 text-orange-600' },
    { label: '解锁成就', value: unlockedAchievements, icon: Trophy, color: 'bg-purple-100 text-purple-600' },
  ];

  const menuItems = [
    { label: '我的课程', icon: BookOpen, path: '/courses', description: '查看已报名的课程' },
    { label: '学习进度', icon: TrendingUp, path: '/progress', description: '查看详细学习数据' },
    { label: '成就徽章', icon: Trophy, path: '/progress', description: '查看已获得的成就' },
    { label: '学习社区', icon: User, path: '/community', description: '与其他学习者交流' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-bold text-white">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-white mb-1">{user.username}</h1>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-gray-200">
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  加入于 {new Date(user.createdAt).toLocaleDateString('zh-CN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md p-4 text-center">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Learning Languages */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">学习语言</h2>
          <div className="flex flex-wrap gap-3">
            {LANGUAGES.map((lang) => (
              <div
                key={lang.code}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl"
              >
                <span className="text-2xl">{lang.flag}</span>
                <div>
                  <div className="font-medium text-gray-900">{lang.name}</div>
                  <div className="text-sm text-gray-500">{lang.nativeName}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">最近成就</h2>
            <Link to="/progress" className="text-sm text-[var(--color-primary)] hover:underline">
              查看全部
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {achievements
              .filter((a) => a.unlocked)
              .slice(0, 4)
              .map((achievement) => (
                <div key={achievement.id} className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <div className="font-medium text-sm text-gray-900">{achievement.name}</div>
                </div>
              ))}
            {achievements.filter((a) => a.unlocked).length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                <Trophy className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>继续学习解锁成就</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                index < menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.label}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-4 bg-white rounded-2xl shadow-md text-red-600 font-medium hover:bg-red-50 transition-colors mb-8"
        >
          <LogOut className="w-5 h-5" />
          退出登录
        </button>
      </div>
    </div>
  );
}
