import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  BookOpen, 
  ExternalLink,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  Bookmark,
  Share2,
  Code2,
  Lightbulb,
  AlertCircle,
  Zap
} from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import { Badge } from "@/react-app/components/ui/badge";
import Navbar from "@/react-app/components/layout/Navbar";
import Footer from "@/react-app/components/layout/Footer";
import { getJson } from "@/react-app/lib/api";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import cpp from "highlight.js/lib/languages/cpp";
import java from "highlight.js/lib/languages/java";

// Register languages
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("py", python);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("c++", cpp);
hljs.registerLanguage("java", java);

interface Topic {
  id: number;
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  problem_url: string | null;
  estimated_minutes: number;
  section_title: string;
  section_slug: string;
  sheet_title: string;
  sheet_slug: string;
  article_id: number | null;
  article_content: string | null;
  article_summary: string | null;
  reading_time_minutes: number | null;
}

interface AdjacentTopic {
  id: number;
  title: string;
  slug: string;
}

const difficultyColors: Record<string, string> = {
  Easy: "bg-easy/20 text-easy border-easy/30",
  Medium: "bg-medium/20 text-medium border-medium/30",
  Hard: "bg-hard/20 text-hard border-hard/30",
};

export default function TopicArticle() {
  const { sheetSlug, topicSlug } = useParams();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [prevTopic, setPrevTopic] = useState<AdjacentTopic | null>(null);
  const [nextTopic, setNextTopic] = useState<AdjacentTopic | null>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    async function fetchTopic() {
      try {
        const data = await getJson<{
          topic: Topic;
          prevTopic: AdjacentTopic | null;
          nextTopic: AdjacentTopic | null;
        }>(`/api/topics/${sheetSlug}/${topicSlug}`);
        setTopic(data.topic);
        setPrevTopic(data.prevTopic);
        setNextTopic(data.nextTopic);
      } catch (error) {
        console.error("Failed to fetch topic:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTopic();
  }, [sheetSlug, topicSlug]);

  useEffect(() => {
    if (topic && topic.article_content) {
      // Use a timeout to ensure the DOM is updated
      setTimeout(() => {
        document.querySelectorAll('pre code').forEach((block) => {
          hljs.highlightElement(block as HTMLElement);
        });
      }, 0);
    }
  }, [topic]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <Code2 className="w-12 h-12 text-primary" />
            <p className="text-muted-foreground">Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Topic not found</h1>
            <p className="text-muted-foreground mb-4">The topic you're looking for doesn't exist.</p>
            <Link to={`/sheets/${sheetSlug}`}>
              <Button>Back to Sheet</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link to="/sheets" className="hover:text-foreground transition-colors">DSA Sheets</Link>
          <span>/</span>
          <Link to={`/sheets/${topic.sheet_slug}`} className="hover:text-foreground transition-colors">
            {topic.sheet_title}
          </Link>
          <span>/</span>
          <span className="text-foreground">{topic.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge className={`${difficultyColors[topic.difficulty] || difficultyColors.Medium} border`}>
                  {topic.difficulty}
                </Badge>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {topic.reading_time_minutes || topic.estimated_minutes} min read
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3">{topic.title}</h1>
              <p className="text-lg text-muted-foreground">{topic.description}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <Button
              variant={completed ? "default" : "outline"}
              size="sm"
              onClick={() => setCompleted(!completed)}
              className="gap-2"
            >
              {completed ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
              {completed ? "Completed" : "Mark Complete"}
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Bookmark className="w-4 h-4" />
              Bookmark
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            {topic.problem_url && (
              <a href={topic.problem_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Practice Problem
                </Button>
              </a>
            )}
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-invert max-w-none">
          {topic.article_content ? (
            <div dangerouslySetInnerHTML={{ __html: topic.article_content }} />
          ) : (
            <div>Loading...</div>
          )}
        </article>

        {/* Navigation */}
        <nav className="flex items-center justify-between mt-12 pt-8 border-t border-border">
          {prevTopic ? (
            <Link 
              to={`/sheets/${sheetSlug}/topic/${prevTopic.slug}`}
              className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group max-w-[45%]"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <div className="text-right">
                <div className="text-xs text-muted-foreground mb-1">Previous</div>
                <div className="font-medium text-sm truncate">{prevTopic.title}</div>
              </div>
            </Link>
          ) : <div />}
          
          {nextTopic ? (
            <Link 
              to={`/sheets/${sheetSlug}/topic/${nextTopic.slug}`}
              className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group max-w-[45%]"
            >
              <div className="text-left">
                <div className="text-xs text-muted-foreground mb-1">Next</div>
                <div className="font-medium text-sm truncate">{nextTopic.title}</div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ) : <div />}
        </nav>
      </main>

      <Footer />
    </div>
  );
}
