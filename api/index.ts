import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database file path
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// Helper functions
const readDB = () => {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
};

const writeDB = (data: any) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// Generate simple ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// ==================== Auth Routes ====================

// Register
app.post('/api/auth/register', (req, res) => {
  try {
    const { email, username, password } = req.body;
    const db = readDB();
    
    // Check if user exists
    const existingUser = db.users.find((u: any) => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    // Create user
    const newUser = {
      id: generateId(),
      email,
      username,
      password,
      createdAt: new Date().toISOString(),
    };
    
    db.users.push(newUser);
    writeDB(db);
    
    const { password: _, ...userWithoutPassword } = newUser;
    res.json({ user: userWithoutPassword, token: 'mock-jwt-token-' + newUser.id });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const db = readDB();
    
    const user = db.users.find((u: any) => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword, token: 'mock-jwt-token-' + user.id });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// ==================== Course Routes ====================

// Get all courses
app.get('/api/courses', (req, res) => {
  try {
    const db = readDB();
    let courses = db.courses;
    
    const { language, level } = req.query;
    if (language) {
      courses = courses.filter((c: any) => c.language === language);
    }
    if (level) {
      courses = courses.filter((c: any) => c.level === level);
    }
    
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get course by ID
app.get('/api/courses/:id', (req, res) => {
  try {
    const db = readDB();
    const course = db.courses.find((c: any) => c.id === req.params.id);
    
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// ==================== Word Routes ====================

// Get words by language
app.get('/api/words/:language', (req, res) => {
  try {
    const db = readDB();
    const words = db.words[req.params.language as keyof typeof db.words] || [];
    res.json(words);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch words' });
  }
});

// ==================== Progress Routes ====================

// Get progress by user ID
app.get('/api/progress/:userId', (req, res) => {
  try {
    const db = readDB();
    const userProgress = db.progress.filter((p: any) => p.userId === req.params.userId);
    res.json(userProgress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// Update progress
app.post('/api/progress', (req, res) => {
  try {
    const { userId, courseId, lessonId } = req.body;
    const db = readDB();
    
    let progress = db.progress.find((p: any) => p.userId === userId && p.courseId === courseId);
    
    if (!progress) {
      progress = {
        id: generateId(),
        userId,
        courseId,
        completedLessons: [],
        totalTime: 0,
        wordsMastered: 0,
        streak: 1,
        lastStudied: new Date().toISOString(),
        dailyGoal: 30,
        dailyProgress: 0,
      };
      db.progress.push(progress);
    }
    
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      progress.totalTime += 10;
      progress.dailyProgress += 10;
    }
    
    progress.lastStudied = new Date().toISOString();
    writeDB(db);
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// ==================== Achievement Routes ====================

// Get achievements by user ID
app.get('/api/achievements/:userId', (req, res) => {
  try {
    const db = readDB();
    const userAchievements = db.achievements.map((a: any) => ({
      ...a,
      unlocked: a.current >= a.requirement,
    }));
    res.json(userAchievements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});

// ==================== Community Routes ====================

// Get all posts
app.get('/api/community/posts', (req, res) => {
  try {
    const db = readDB();
    let posts = db.posts;
    
    const { language } = req.query;
    if (language) {
      posts = posts.filter((p: any) => p.language === language);
    }
    
    res.json(posts.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Create post
app.post('/api/community/posts', (req, res) => {
  try {
    const { userId, username, content, language } = req.body;
    const db = readDB();
    
    const newPost = {
      id: generateId(),
      userId,
      username,
      content,
      language,
      likes: 0,
      likedByMe: false,
      comments: [],
      createdAt: new Date().toISOString(),
    };
    
    db.posts.push(newPost);
    writeDB(db);
    
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Like post
app.post('/api/community/posts/:postId/like', (req, res) => {
  try {
    const db = readDB();
    const post = db.posts.find((p: any) => p.id === req.params.postId);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    post.likes += 1;
    post.likedByMe = true;
    writeDB(db);
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to like post' });
  }
});

// Add comment
app.post('/api/community/posts/:postId/comments', (req, res) => {
  try {
    const { userId, username, content } = req.body;
    const db = readDB();
    const post = db.posts.find((p: any) => p.id === req.params.postId);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const newComment = {
      id: generateId(),
      userId,
      username,
      content,
      createdAt: new Date().toISOString(),
    };
    
    post.comments.push(newComment);
    writeDB(db);
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
