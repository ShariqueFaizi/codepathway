import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Navbar from "@/react-app/components/layout/Navbar";
import Footer from "@/react-app/components/layout/Footer";
import { ChevronLeft, Clock, FileText } from "lucide-react";
import { getJson } from "@/react-app/lib/api";

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  content: string | null;
  summary: string | null;
  thumbnail_url: string | null;
  author_name: string;
  reading_time_minutes: number;
  created_at: string;
};

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getJson<{ post: BlogPost | null }>(
          `/api/blog-posts/${slug}`,
        );
        setPost(data.post ?? null);
      } catch (e) {
        console.error("Failed to fetch blog post", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Blogs
          </Link>

          {loading ? (
            <div className="h-48 rounded-2xl bg-muted/50 animate-pulse" />
          ) : !post ? (
            <div className="text-center py-16">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <h1 className="text-2xl font-bold mb-2">Post not found</h1>
              <p className="text-muted-foreground">This blog post doesn’t exist (or isn’t published).</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                <span>{post.author_name}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.reading_time_minutes} min read
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-6">{post.title}</h1>
              <article className="prose prose-invert max-w-none">
                {post.content ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : (
                  <p className="text-muted-foreground">{post.summary ?? ""}</p>
                )}
              </article>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

