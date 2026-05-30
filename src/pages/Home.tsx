import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Brain, 
  Mic, 
  Headphones, 
  TrendingUp, 
  Users, 
  Trophy,
  ArrowRight,
  Sparkles,
  Zap,
  Star
} from 'lucide-react';
import { LANGUAGES } from '@/types';

const features = [
  {
    icon: BookOpen,
    title: '单词记忆',
    description: '智能闪卡系统，间隔重复法帮助你高效记忆单词',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Brain,
    title: '语法练习',
    description: '互动式语法题目，从基础到高级逐步提升',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Mic,
    title: '口语跟读',
    description: 'AI 语音评分，实时反馈发音准确度',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Headphones,
    title: '听力训练',
    description: '精选听力材料，提升听力理解能力',
    color: 'from-green-500 to-emerald-500',
  },
];

const stats = [
  { label: '活跃学员', value: '50,000+', icon: Users },
  { label: '课程数量', value: '200+', icon: BookOpen },
  { label: '学习时长', value: '100万小时', icon: TrendingUp },
  { label: '成就解锁', value: '100万+', icon: Trophy },
];

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary-light)]">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-accent)]/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl" />
          
          {/* Floating language characters */}
          <div className="absolute top-1/4 left-1/4 text-6xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>あ</div>
          <div className="absolute top-1/3 right-1/4 text-6xl opacity-20 animate-float" style={{ animationDelay: '3s' }}>한</div>
          <div className="absolute bottom-1/4 left-1/3 text-6xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>A</div>
          <div className="absolute bottom-1/3 right-1/3 text-6xl opacity-20 animate-float" style={{ animationDelay: '4s' }}>你</div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm mb-6">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                沉浸式多语种学习平台
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                让语言学习
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                  变得简单有趣
                </span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                通过互动课程、智能复习和社区交流，掌握英语、日语、韩语等主流语言。
                开启你的语言学习之旅！
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] text-white font-semibold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  开始学习
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  免费注册
                </Link>
              </div>
            </div>

            {/* Language Cards - Desktop */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-3 gap-4">
                {LANGUAGES.map((lang, index) => (
                  <Link
                    key={lang.code}
                    to={`/courses?language=${lang.code}`}
                    className="group p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-4xl mb-3">{lang.flag}</div>
                    <div className="text-white font-semibold">{lang.name}</div>
                    <div className="text-gray-300 text-sm">{lang.nativeName}</div>
                    <div className="mt-4 flex items-center gap-1 text-sm text-white/70 group-hover:text-white transition-colors">
                      探索课程
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Language Cards - Mobile */}
            <div className="lg:hidden flex justify-center gap-4 mt-8 overflow-x-auto px-4">
              {LANGUAGES.map((lang, index) => (
                <Link
                  key={lang.code}
                  to={`/courses?language=${lang.code}`}
                  className="flex-shrink-0 flex flex-col items-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 min-w-[100px]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl mb-2">{lang.flag}</div>
                  <div className="text-white font-semibold text-sm">{lang.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              核心功能
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              全方位语言学习体验
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              我们提供多种互动学习方式，帮助你从听、说、读、写全面提升语言能力
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              用户评价
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              学员们怎么说
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              来自世界各地的语言学习者分享他们的学习体验
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: '小明',
                avatar: '👨‍💻',
                language: '英语学习者',
                content: '通过 LinguaFlow 的互动课程，我的英语口语能力提升了很多。特别是口语跟读功能，让我能够实时了解自己的发音问题。',
                rating: 5,
              },
              {
                name: 'さくら',
                avatar: '👩‍🎓',
                language: '日语学习者',
                content: '日本語の勉強がとても楽しくなりました！単語カードと文法練習のおかげで、毎日コツコツと学習できています。',
                rating: 5,
              },
              {
                name: '민수',
                avatar: '🧑‍💼',
                language: '韩语学习者',
                content: '한국어 학습에 최적화된 플랫폼입니다. 커뮤니티에서 다른 학습자들과交流하며 동기부여를 받고 있어요.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.language}</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{testimonial.content}</p>
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            准备好开始你的语言学习之旅了吗？
          </h2>
          <p className="text-xl text-white/90 mb-8">
            立即注册，免费体验所有课程功能
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[var(--color-accent)] font-bold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            免费开始
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
