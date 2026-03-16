
-- Tags table
CREATE TABLE tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  color TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tags_slug ON tags(slug);

-- Content tags junction table
CREATE TABLE content_tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tag_id INTEGER NOT NULL,
  content_type TEXT NOT NULL,
  content_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_content_tags_content ON content_tags(content_type, content_id);
CREATE INDEX idx_content_tags_tag ON content_tags(tag_id);

-- Testimonials table
CREATE TABLE testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  avatar_url TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  is_featured BOOLEAN DEFAULT 0,
  is_published BOOLEAN DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Interview experiences table
CREATE TABLE interview_experiences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  company TEXT NOT NULL,
  company_logo_url TEXT,
  role TEXT,
  experience_level TEXT,
  interview_year INTEGER,
  interview_rounds TEXT,
  difficulty TEXT,
  result TEXT,
  content TEXT,
  summary TEXT,
  tips TEXT,
  author_name TEXT,
  is_anonymous BOOLEAN DEFAULT 0,
  is_featured BOOLEAN DEFAULT 0,
  is_published BOOLEAN DEFAULT 1,
  view_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_interview_experiences_company ON interview_experiences(company);

-- Blog posts table
CREATE TABLE blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  summary TEXT,
  thumbnail_url TEXT,
  author_name TEXT DEFAULT 'CodePathway Team',
  reading_time_minutes INTEGER DEFAULT 5,
  is_featured BOOLEAN DEFAULT 0,
  is_published BOOLEAN DEFAULT 1,
  view_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
