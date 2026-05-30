import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ToastContainer } from '@/components/common/Toast';
import { useAuthStore } from '@/store/useAuthStore';
import { useToastStore } from '@/store/useToastStore';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';
import { Courses } from '@/pages/Courses';
import { CourseDetail } from '@/pages/CourseDetail';
import { LearnWords } from '@/pages/LearnWords';
import { LearnGrammar } from '@/pages/LearnGrammar';
import { LearnSpeaking } from '@/pages/LearnSpeaking';
import { LearnListening } from '@/pages/LearnListening';
import { Progress } from '@/pages/Progress';
import { Community } from '@/pages/Community';
import { Profile } from '@/pages/Profile';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';

function App() {
  const { checkAuth } = useAuthStore();
  const { toasts, removeToast } = useToastStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <ErrorBoundary>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:id" element={<CourseDetail />} />
            <Route path="progress" element={<Progress />} />
            <Route path="community" element={<Community />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/learn/words" element={<LearnWords />} />
          <Route path="/learn/grammar" element={<LearnGrammar />} />
          <Route path="/learn/speaking" element={<LearnSpeaking />} />
          <Route path="/learn/listening" element={<LearnListening />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
