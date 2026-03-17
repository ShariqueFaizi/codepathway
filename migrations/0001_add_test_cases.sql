-- Add topic_test_cases table
CREATE TABLE topic_test_cases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  topic_id INTEGER NOT NULL,
  input TEXT NOT NULL,
  expected_output TEXT NOT NULL,
  is_hidden BOOLEAN NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (topic_id) REFERENCES topics(id)
);

-- Add some dummy test cases for an existing topic (e.g., Two Sum)
-- We'll assume the 'two-sum' topic has id 1 for now.
INSERT INTO topic_test_cases (topic_id, input, expected_output, is_hidden) VALUES
(1, '[2, 7, 11, 15], 9', '[0, 1]', 0),
(1, '[3, 2, 4], 6', '[1, 2]', 0),
(1, '[3, 3], 6', '[0, 1]', 0),
(1, '[-1, -3, 5, 90], 4', '[0, 2]', 1);
