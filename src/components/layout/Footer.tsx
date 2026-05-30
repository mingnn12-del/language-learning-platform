import { Link } from 'react-router-dom';
import { Globe, Heart, Github, Twitter, BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[var(--color-primary-dark)] to-[#0A1628] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">LinguaFlow</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              沉浸式多语种学习平台，让语言学习变得简单而有趣。
              通过互动课程、智能复习和社区交流，帮助你掌握英语、日语、韩语等主流语言。
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <BookOpen className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              快速链接
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-white transition-colors text-sm">
                  浏览课程
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-300 hover:text-white transition-colors text-sm">
                  学习社区
                </Link>
              </li>
              <li>
                <Link to="/progress" className="text-gray-300 hover:text-white transition-colors text-sm">
                  学习进度
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-white transition-colors text-sm">
                  个人中心
                </Link>
              </li>
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              支持语言
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300 text-sm">
                <span>🇺🇸</span> English
              </li>
              <li className="flex items-center gap-2 text-gray-300 text-sm">
                <span>🇯🇵</span> 日本語
              </li>
              <li className="flex items-center gap-2 text-gray-300 text-sm">
                <span>🇰🇷</span> 한국어
              </li>
              <li className="flex items-center gap-2 text-gray-300 text-sm">
                <span>🇫🇷</span> Français (即将推出)
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 LinguaFlow. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for language learners
          </p>
        </div>
      </div>
    </footer>
  );
}
