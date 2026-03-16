import { Hono } from "hono";
import type { Env } from "./env";

const app = new Hono<{ Bindings: Env }>();

// Get all sheets with category info
app.get("/api/sheets", async (c) => {
  const db = c.env.DB;
  const category = c.req.query("category");
  const featured = c.req.query("featured");
  
  const whereClauses: string[] = ["s.is_published = 1"];
  const binds: unknown[] = [];

  if (category) {
    whereClauses.push("c.slug = ?");
    binds.push(category);
  }

  if (featured === "1" || featured === "true") {
    whereClauses.push("s.is_featured = 1");
  }

  const sheets = await db
    .prepare(
      `
    SELECT 
      s.*,
      c.name as category_name,
      c.slug as category_slug,
      c.color as category_color
    FROM sheets s
    LEFT JOIN categories c ON s.category_id = c.id
    WHERE ${whereClauses.join(" AND ")}
    ORDER BY s.is_featured DESC, s.sort_order ASC
  `
    )
    .bind(...binds)
    .all();
  
  return c.json({ sheets: sheets.results });
});

// Get all categories
app.get("/api/categories", async (c) => {
  const db = c.env.DB;
  
  const categories = await db.prepare(`
    SELECT * FROM categories ORDER BY sort_order ASC
  `).all();
  
  return c.json({ categories: categories.results });
});

// Get testimonials (Home + social proof)
app.get("/api/testimonials", async (c) => {
  const db = c.env.DB;
  const featured = c.req.query("featured");

  const where = ["is_published = 1"];
  if (featured === "1" || featured === "true") where.push("is_featured = 1");

  const testimonials = await db
    .prepare(
      `
      SELECT *
      FROM testimonials
      WHERE ${where.join(" AND ")}
      ORDER BY is_featured DESC, sort_order ASC, created_at DESC
    `
    )
    .all();

  return c.json({ testimonials: testimonials.results });
});

// Blogs list + detail
app.get("/api/blog-posts", async (c) => {
  const db = c.env.DB;
  const featured = c.req.query("featured");

  const where = ["is_published = 1"];
  if (featured === "1" || featured === "true") where.push("is_featured = 1");

  const posts = await db
    .prepare(
      `
      SELECT id, title, slug, summary, thumbnail_url, author_name, reading_time_minutes, is_featured, created_at, view_count
      FROM blog_posts
      WHERE ${where.join(" AND ")}
      ORDER BY is_featured DESC, created_at DESC
    `
    )
    .all();

  return c.json({ posts: posts.results });
});

app.get("/api/blog-posts/:slug", async (c) => {
  const db = c.env.DB;
  const slug = c.req.param("slug");

  const post = await db
    .prepare(
      `
      SELECT *
      FROM blog_posts
      WHERE slug = ? AND is_published = 1
    `
    )
    .bind(slug)
    .first();

  if (!post) return c.json({ error: "Post not found" }, 404);

  return c.json({ post });
});

// Interview experiences list + detail
app.get("/api/interviews", async (c) => {
  const db = c.env.DB;
  const featured = c.req.query("featured");

  const where = ["is_published = 1"];
  if (featured === "1" || featured === "true") where.push("is_featured = 1");

  const interviews = await db
    .prepare(
      `
      SELECT
        id, title, slug, company, company_logo_url, role, experience_level, interview_year,
        difficulty, result, summary, author_name, is_anonymous, is_featured, created_at, view_count
      FROM interview_experiences
      WHERE ${where.join(" AND ")}
      ORDER BY is_featured DESC, created_at DESC
    `
    )
    .all();

  return c.json({ interviews: interviews.results });
});

app.get("/api/interviews/:slug", async (c) => {
  const db = c.env.DB;
  const slug = c.req.param("slug");

  const interview = await db
    .prepare(
      `
      SELECT *
      FROM interview_experiences
      WHERE slug = ? AND is_published = 1
    `
    )
    .bind(slug)
    .first();

  if (!interview) return c.json({ error: "Interview not found" }, 404);

  return c.json({ interview });
});

// Get single sheet with sections and topics
app.get("/api/sheets/:slug", async (c) => {
  const db = c.env.DB;
  const slug = c.req.param("slug");
  
  // Get sheet details
  const sheet = await db.prepare(`
    SELECT 
      s.*,
      c.name as category_name,
      c.slug as category_slug,
      c.color as category_color
    FROM sheets s
    LEFT JOIN categories c ON s.category_id = c.id
    WHERE s.slug = ? AND s.is_published = 1
  `).bind(slug).first();
  
  if (!sheet) {
    return c.json({ error: "Sheet not found" }, 404);
  }
  
  // Get sections for this sheet
  const sections = await db.prepare(`
    SELECT * FROM sheet_sections
    WHERE sheet_id = ?
    ORDER BY sort_order ASC
  `).bind(sheet.id).all();
  
  // Get all topics for all sections
  const sectionIds = sections.results.map((s: any) => s.id);
  
  let topics: any[] = [];
  if (sectionIds.length > 0) {
    const placeholders = sectionIds.map(() => '?').join(',');
    const topicsResult = await db.prepare(`
      SELECT * FROM topics
      WHERE section_id IN (${placeholders})
      ORDER BY sort_order ASC
    `).bind(...sectionIds).all();
    topics = topicsResult.results;
  }
  
  // Organize topics by section
  const sectionsWithTopics = sections.results.map((section: any) => ({
    ...section,
    topics: topics.filter((t: any) => t.section_id === section.id)
  }));
  
  return c.json({ 
    sheet,
    sections: sectionsWithTopics
  });
});

// Get single topic with article content
app.get("/api/topics/:sheetSlug/:topicSlug", async (c) => {
  const db = c.env.DB;
  const { sheetSlug, topicSlug } = c.req.param();
  
  // Get topic with sheet and section info
  const topic = await db.prepare(`
    SELECT 
      t.*,
      ss.title as section_title,
      ss.slug as section_slug,
      s.title as sheet_title,
      s.slug as sheet_slug,
      a.id as article_id,
      a.content as article_content,
      a.summary as article_summary,
      a.reading_time_minutes
    FROM topics t
    JOIN sheet_sections ss ON t.section_id = ss.id
    JOIN sheets s ON ss.sheet_id = s.id
    LEFT JOIN articles a ON a.topic_id = t.id
    WHERE s.slug = ? AND t.slug = ?
  `).bind(sheetSlug, topicSlug).first();
  
  if (!topic) {
    return c.json({ error: "Topic not found" }, 404);
  }
  
  // Get adjacent topics for navigation
  const adjacentTopics = await db.prepare(`
    SELECT t.id, t.title, t.slug, t.sort_order, ss.slug as section_slug
    FROM topics t
    JOIN sheet_sections ss ON t.section_id = ss.id
    JOIN sheets s ON ss.sheet_id = s.id
    WHERE s.slug = ?
    ORDER BY ss.sort_order ASC, t.sort_order ASC
  `).bind(sheetSlug).all();
  
  const topicsList = adjacentTopics.results as any[];
  const currentIndex = topicsList.findIndex((t: any) => t.slug === topicSlug);
  
  const prevTopic = currentIndex > 0 ? topicsList[currentIndex - 1] : null;
  const nextTopic = currentIndex < topicsList.length - 1 ? topicsList[currentIndex + 1] : null;
  
  return c.json({ 
    topic,
    prevTopic,
    nextTopic
  });
});

export default app;
