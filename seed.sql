-- Local/dev seed data for D1 (SQLite)
-- Safe to re-run: uses INSERT OR IGNORE on unique slugs.

-- Categories
INSERT OR IGNORE INTO categories (name, slug, description, icon, color, sort_order) VALUES
  ('DSA Sheets', 'dsa', 'Structured DSA learning paths and curated problem sets.', 'Layers', '#06b6d4', 1),
  ('Core CS', 'core-cs', 'DBMS, OS, Computer Networks, and OOPs for interviews.', 'Cpu', '#10b981', 2),
  ('System Design', 'system-design', 'Scalable architecture patterns and case studies.', 'Code2', '#f59e0b', 3);

-- Sheets (DSA + Core CS + System Design)
INSERT OR IGNORE INTO sheets (
  category_id, title, slug, description, short_description,
  estimated_time, total_problems, easy_count, medium_count, hard_count,
  is_premium, is_featured, is_published, sort_order
) VALUES
  (
    (SELECT id FROM categories WHERE slug='dsa'),
    'A2Z DSA Sheet',
    'a2z-dsa',
    'Complete roadmap from zero to hero covering all DSA topics with 450+ problems.',
    'Zero to hero DSA roadmap.',
    '3-4 months', 456, 150, 200, 106,
    0, 1, 1, 1
  ),
  (
    (SELECT id FROM categories WHERE slug='dsa'),
    'Blind 75',
    'blind-75',
    'The famous 75 must-do problems for coding interviews.',
    '75 essential interview problems.',
    '2-3 weeks', 75, 20, 40, 15,
    0, 0, 1, 2
  ),
  (
    (SELECT id FROM categories WHERE slug='dsa'),
    'SDE Sheet',
    'sde',
    'Curated 180 problems covering important patterns for SDE roles.',
    'Curated patterns for SDE roles.',
    '6-8 weeks', 180, 45, 90, 45,
    0, 0, 1, 3
  ),
  (
    (SELECT id FROM categories WHERE slug='core-cs'),
    'DBMS Interview Notes',
    'dbms',
    'Concise, interview-focused DBMS notes with diagrams, FAQs, and revision checklists.',
    'Interview-focused DBMS revision notes.',
    '1-2 weeks', 0, 0, 0, 0,
    0, 1, 1, 1
  ),
  (
    (SELECT id FROM categories WHERE slug='core-cs'),
    'Operating Systems (OS) Notes',
    'os',
    'OS concepts explained with examples: processes, threads, scheduling, deadlocks, memory.',
    'OS fundamentals for interviews.',
    '1-2 weeks', 0, 0, 0, 0,
    0, 0, 1, 2
  ),
  (
    (SELECT id FROM categories WHERE slug='core-cs'),
    'Computer Networks (CN) Notes',
    'cn',
    'Networking fundamentals: TCP/UDP, HTTP, DNS, routing, and common interview questions.',
    'CN fundamentals + common questions.',
    '1 week', 0, 0, 0, 0,
    0, 0, 1, 3
  ),
  (
    (SELECT id FROM categories WHERE slug='core-cs'),
    'OOPs Notes',
    'oops',
    'OOP principles with examples, UML quick primer, and common interview prompts.',
    'OOP principles for interviews.',
    '4-5 days', 0, 0, 0, 0,
    0, 0, 1, 4
  ),
  (
    (SELECT id FROM categories WHERE slug='system-design'),
    'System Design Foundations',
    'system-design-foundations',
    'Learn core concepts: scalability, caching, databases, queues, sharding, and tradeoffs.',
    'Core SD concepts + tradeoffs.',
    '2-3 weeks', 0, 0, 0, 0,
    1, 1, 1, 1
  );

-- Sheet sections
INSERT OR IGNORE INTO sheet_sections (sheet_id, title, slug, description, sort_order) VALUES
  ((SELECT id FROM sheets WHERE slug='a2z-dsa'), 'Arrays & Hashing', 'arrays-hashing', 'Build foundations with arrays, hashing, and two pointers.', 1),
  ((SELECT id FROM sheets WHERE slug='a2z-dsa'), 'Stacks & Queues', 'stacks-queues', 'Core linear DS patterns used in interviews.', 2),
  ((SELECT id FROM sheets WHERE slug='a2z-dsa'), 'Trees', 'trees', 'Traversals, BST patterns, and recursion depth.', 3),

  ((SELECT id FROM sheets WHERE slug='dbms'), 'SQL Essentials', 'sql-essentials', 'Queries, joins, grouping, indexing basics.', 1),
  ((SELECT id FROM sheets WHERE slug='dbms'), 'Transactions & Indexes', 'transactions-indexes', 'ACID, isolation, indexing strategies.', 2),

  ((SELECT id FROM sheets WHERE slug='system-design-foundations'), 'Core Concepts', 'core-concepts', 'Throughput, latency, availability, and consistency.', 1),
  ((SELECT id FROM sheets WHERE slug='system-design-foundations'), 'Building Blocks', 'building-blocks', 'Caching, queues, storage, search, and rate limiting.', 2);

-- Topics (sample content across tabs)
INSERT OR IGNORE INTO topics (
  section_id, title, slug, description, difficulty, video_url, article_url, problem_url,
  estimated_minutes, sort_order, is_premium
) VALUES
  -- A2Z DSA
  ((SELECT id FROM sheet_sections WHERE slug='arrays-hashing' AND sheet_id=(SELECT id FROM sheets WHERE slug='a2z-dsa')),
    'Two Sum', 'two-sum', 'Use hashing to find a pair that sums to target.', 'Easy', NULL, NULL, 'https://leetcode.com/problems/two-sum/', 25, 1, 0),
  ((SELECT id FROM sheet_sections WHERE slug='arrays-hashing' AND sheet_id=(SELECT id FROM sheets WHERE slug='a2z-dsa')),
    'Longest Substring Without Repeating Characters', 'longest-unique-substring', 'Sliding window with frequency tracking.', 'Medium', NULL, NULL, 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', 35, 2, 0),
  ((SELECT id FROM sheet_sections WHERE slug='stacks-queues' AND sheet_id=(SELECT id FROM sheets WHERE slug='a2z-dsa')),
    'Valid Parentheses', 'valid-parentheses', 'Use a stack to validate bracket ordering.', 'Easy', NULL, NULL, 'https://leetcode.com/problems/valid-parentheses/', 20, 1, 0),
  ((SELECT id FROM sheet_sections WHERE slug='trees' AND sheet_id=(SELECT id FROM sheets WHERE slug='a2z-dsa')),
    'Lowest Common Ancestor of a BST', 'lca-bst', 'Exploit BST ordering to find LCA.', 'Easy', NULL, NULL, 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', 30, 1, 0),

  -- DBMS
  ((SELECT id FROM sheet_sections WHERE slug='sql-essentials' AND sheet_id=(SELECT id FROM sheets WHERE slug='dbms')),
    'INNER vs LEFT JOIN', 'joins-inner-vs-left', 'When do you lose rows? How NULLs appear.', 'Easy', NULL, NULL, NULL, 20, 1, 0),
  ((SELECT id FROM sheet_sections WHERE slug='transactions-indexes' AND sheet_id=(SELECT id FROM sheets WHERE slug='dbms')),
    'ACID & Isolation Levels', 'acid-isolation', 'Dirty reads, non-repeatable reads, phantom reads.', 'Medium', NULL, NULL, NULL, 30, 1, 0),

  -- System Design
  ((SELECT id FROM sheet_sections WHERE slug='core-concepts' AND sheet_id=(SELECT id FROM sheets WHERE slug='system-design-foundations')),
    'CAP Theorem', 'cap-theorem', 'Consistency vs availability under partition.', 'Medium', NULL, NULL, NULL, 30, 1, 1),
  ((SELECT id FROM sheet_sections WHERE slug='building-blocks' AND sheet_id=(SELECT id FROM sheets WHERE slug='system-design-foundations')),
    'Caching Strategies', 'caching-strategies', 'Write-through, write-back, TTL, and invalidation.', 'Medium', NULL, NULL, NULL, 35, 1, 1);

-- Articles (HTML content for TopicArticle page)
INSERT OR IGNORE INTO articles (
  topic_id, title, slug, content, summary, thumbnail_url, reading_time_minutes, is_premium, is_published
) VALUES
  (
    (SELECT id FROM topics WHERE slug='two-sum'),
    'Two Sum: Hashing Pattern',
    'two-sum-hashing',
    '<h2>Intuition</h2><p>Use a hash map from value → index. For each number <code>x</code>, look for <code>target-x</code>.</p><h2>Algorithm</h2><ol><li>Initialize empty map.</li><li>Scan left to right. If complement exists, return indices.</li><li>Otherwise store current value.</li></ol><h2>Complexity</h2><p>Time: O(n). Space: O(n).</p>',
    'A classic hashing pattern for pair-sum problems.',
    NULL, 6, 0, 1
  ),
  (
    (SELECT id FROM topics WHERE slug='acid-isolation'),
    'ACID & Isolation Levels (Interview Notes)',
    'acid-isolation-notes',
    '<h2>ACID</h2><ul><li><b>A</b>tomicity</li><li><b>C</b>onsistency</li><li><b>I</b>solation</li><li><b>D</b>urability</li></ul><h2>Isolation Anomalies</h2><ul><li>Dirty Read</li><li>Non-repeatable Read</li><li>Phantom Read</li></ul><p>Know how <code>READ COMMITTED</code> and <code>SERIALIZABLE</code> differ.</p>',
    'Quick notes to nail DBMS transaction questions.',
    NULL, 8, 0, 1
  );

-- Testimonials (used on Home)
INSERT OR IGNORE INTO testimonials (name, role, company, avatar_url, content, rating, is_featured, is_published, sort_order) VALUES
  ('Priya Sharma', 'SDE II', 'Amazon', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', 'The A2Z DSA sheet made my prep structured and fast. I felt interview-ready in weeks.', 5, 1, 1, 1),
  ('Rahul Verma', 'Software Engineer', 'Google', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', 'System design foundations and tradeoffs were explained clearly. Helped me in L4 rounds.', 5, 1, 1, 2),
  ('Ananya Patel', 'SDE', 'Microsoft', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', 'Blind 75 was perfect for time-constrained prep. Clean UI + great topic breakdown.', 5, 0, 1, 3);

-- Blog posts (Blogs tab)
INSERT OR IGNORE INTO blog_posts (title, slug, content, summary, thumbnail_url, author_name, reading_time_minutes, is_featured, is_published) VALUES
  (
    'How to Study DSA Without Burning Out',
    'study-dsa-without-burning-out',
    '<h2>Make it sustainable</h2><p>Consistency beats intensity. Use weekly goals, spaced repetition, and a small set of patterns.</p><h3>Weekly template</h3><ul><li>3 days: new topics</li><li>2 days: revision</li><li>1 day: mock</li></ul>',
    'A practical plan to stay consistent and improve steadily.',
    NULL,
    'CodePathway Team',
    6,
    1,
    1
  ),
  (
    'Top 20 DBMS Interview Questions (With Crisp Answers)',
    'top-dbms-interview-questions',
    '<h2>DBMS quick hits</h2><p>These are the most common DBMS questions and the mental models to answer them.</p><ol><li>ACID</li><li>Indexing</li><li>Normalization</li></ol>',
    'The questions you will almost certainly be asked.',
    NULL,
    'CodePathway Team',
    8,
    0,
    1
  );

-- Interview experiences (Interviews tab)
INSERT OR IGNORE INTO interview_experiences (
  title, slug, company, company_logo_url, role, experience_level, interview_year,
  interview_rounds, difficulty, result, content, summary, tips, author_name,
  is_anonymous, is_featured, is_published
) VALUES
  (
    'Google SWE (L4) — A realistic prep story',
    'google-swe-l4-realistic-prep-story',
    'Google',
    NULL,
    'Software Engineer (L4)',
    'Mid',
    2025,
    'Online assessment → 3 technical rounds → Googliness',
    'Medium',
    'Offer',
    '<h2>Round 1</h2><p>Sliding window + edge cases.</p><h2>Round 2</h2><p>Tree traversal with pruning.</p><h2>Round 3</h2><p>System design: cache + DB sharding tradeoffs.</p>',
    'A balanced experience: not easy, but very doable with patterns.',
    '<ul><li>Practice explaining solutions out loud.</li><li>Be crisp on complexity.</li><li>Bring tradeoffs in system design.</li></ul>',
    'Anonymous',
    1,
    1,
    1
  ),
  (
    'Amazon SDE — Bar raiser focus areas',
    'amazon-sde-bar-raiser-focus-areas',
    'Amazon',
    NULL,
    'SDE I/II',
    'Mid',
    2024,
    'OA → 2 DSA rounds → Bar raiser',
    'Hard',
    'Offer',
    '<h2>Bar raiser</h2><p>Deep dive on projects + leadership principles, plus a tricky graph question.</p>',
    'Expect LPs + a hard DSA round. Prepare stories.',
    '<ul><li>Prepare 8-10 LP stories.</li><li>Graph + DP revision helps.</li></ul>',
    'CodePathway Team',
    0,
    0,
    1
  );
