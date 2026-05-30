import { useEffect, useState } from 'react';
import { useCommunityStore } from '@/store/useCommunityStore';
import { useAuthStore } from '@/store/useAuthStore';
import { LANGUAGES, Language } from '@/types';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Send, 
  Globe,
  Image,
  Smile,
  MoreHorizontal
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function Community() {
  const { user } = useAuthStore();
  const { posts, fetchPosts, createPost, likePost, addComment, isLoading } = useCommunityStore();
  const [newPost, setNewPost] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [showComments, setShowComments] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchPosts(selectedLanguage || undefined);
  }, [selectedLanguage, fetchPosts]);

  const handleCreatePost = async () => {
    if (!user || !newPost.trim()) return;
    
    const success = await createPost(user.id, user.username, newPost, selectedLanguage || undefined);
    if (success) {
      setNewPost('');
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) return;
    await likePost(postId, user.id);
  };

  const handleComment = async (postId: string) => {
    if (!user || !commentInputs[postId]?.trim()) return;
    
    await addComment(postId, user.id, user.username, commentInputs[postId]);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const toggleComments = (postId: string) => {
    setShowComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            学习社区
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            与其他学习者交流心得，分享学习经验
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Language Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedLanguage(null)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              !selectedLanguage
                ? 'bg-[var(--color-primary)] text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
            }`}
          >
            <Globe className="w-4 h-4" />
            全部
          </button>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedLanguage === lang.code
                  ? 'bg-[var(--color-primary)] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
              }`}
            >
              <span>{lang.flag}</span>
              {lang.name}
            </button>
          ))}
        </div>

        {/* Create Post */}
        {user ? (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold text-sm">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="分享你的学习心得..."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 outline-none transition-all resize-none"
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
                      <Image className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
                      <Smile className="w-5 h-5" />
                    </button>
                  </div>
                  <button
                    onClick={handleCreatePost}
                    disabled={!newPost.trim()}
                    className="px-6 py-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white font-medium rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    发布
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8 text-center">
            <p className="text-gray-600 mb-4">登录后即可发布动态和评论</p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white font-medium rounded-xl hover:shadow-lg transition-all"
            >
              立即登录
            </Link>
          </div>
        )}

        {/* Posts */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">暂无动态</h3>
            <p className="text-gray-500">成为第一个分享的人吧！</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                {/* Post Header */}
                <div className="p-6 pb-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold text-sm">
                        {post.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{post.username}</h4>
                        <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-800 mb-4 whitespace-pre-wrap">{post.content}</p>

                  {/* Language Tag */}
                  {post.language && (
                    <div className="mb-4">
                      {(() => {
                        const lang = LANGUAGES.find((l) => l.code === post.language);
                        return lang ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                            {lang.flag} {lang.name}
                          </span>
                        ) : null;
                      })()}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="px-6 py-3 border-t border-gray-100 flex items-center gap-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      post.likedByMe
                        ? 'text-red-500'
                        : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${post.likedByMe ? 'fill-red-500' : ''}`} />
                    {post.likes > 0 ? post.likes : '点赞'}
                  </button>
                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[var(--color-primary)] transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {post.comments.length > 0 ? post.comments.length : '评论'}
                  </button>
                </div>

                {/* Comments */}
                {showComments.has(post.id) && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    {/* Comment List */}
                    {post.comments.length > 0 && (
                      <div className="mt-4 space-y-4">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold flex-shrink-0">
                              {comment.username.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 bg-gray-50 rounded-xl p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm text-gray-900">{comment.username}</span>
                                <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
                              </div>
                              <p className="text-sm text-gray-700">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Comment */}
                    {user && (
                      <div className="mt-4 flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            value={commentInputs[post.id] || ''}
                            onChange={(e) => setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))}
                            placeholder="写下你的评论..."
                            className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 outline-none transition-all text-sm"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleComment(post.id);
                              }
                            }}
                          />
                          <button
                            onClick={() => handleComment(post.id)}
                            disabled={!commentInputs[post.id]?.trim()}
                            className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-xl hover:bg-[var(--color-primary-light)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
