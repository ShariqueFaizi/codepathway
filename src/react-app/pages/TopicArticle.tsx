import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router";
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

// Code block component with syntax highlighting and copy button
function CodeBlock({ code, language = "javascript" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-border bg-[#0d1117] my-6">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-muted/30">
        <span className="text-xs text-muted-foreground font-mono uppercase">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code ref={codeRef} className={`language-${language} text-sm`}>
          {code}
        </code>
      </pre>
    </div>
  );
}

// Callout component for tips, warnings, etc.
function Callout({ type, title, children }: { type: "tip" | "warning" | "info"; title?: string; children: React.ReactNode }) {
  const styles = {
    tip: { icon: Lightbulb, bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400" },
    warning: { icon: AlertCircle, bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-400" },
    info: { icon: Zap, bg: "bg-primary/10", border: "border-primary/30", text: "text-primary" },
  };
  const style = styles[type];
  const Icon = style.icon;

  return (
    <div className={`${style.bg} ${style.border} border rounded-xl p-4 my-6`}>
      <div className={`flex items-center gap-2 ${style.text} font-medium mb-2`}>
        <Icon className="w-5 h-5" />
        {title || type.charAt(0).toUpperCase() + type.slice(1)}
      </div>
      <div className="text-muted-foreground text-sm">{children}</div>
    </div>
  );
}

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
            <ArticleContent content={topic.article_content} />
          ) : (
            <DefaultArticleContent topic={topic} />
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

// Parse and render article content (simple markdown-like parsing)
function ArticleContent({ content }: { content: string }) {
  // For now, render raw content - in production this would parse markdown
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

// Default article content when no article exists
function DefaultArticleContent({ topic }: { topic: Topic }) {
  return (
    <div className="space-y-8">
      {/* Problem Statement */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          Problem Overview
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {topic.description}. This is a {topic.difficulty?.toLowerCase() || 'medium'} level problem that tests your understanding of fundamental data structures and algorithms.
        </p>
      </section>

      <Callout type="info" title="What You'll Learn">
        By solving this problem, you'll strengthen your skills in problem decomposition, 
        pattern recognition, and writing efficient code. These skills directly translate 
        to coding interviews at top tech companies.
      </Callout>

      {/* Approach */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Approach</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Let's break down the problem step by step and develop an optimal solution.
        </p>
        
        <h3 className="text-xl font-semibold mb-3">Step 1: Understand the Problem</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Before diving into code, make sure you understand what the problem is asking. 
          Identify the inputs, expected outputs, and any constraints mentioned.
        </p>

        <h3 className="text-xl font-semibold mb-3">Step 2: Identify the Pattern</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Most DSA problems follow common patterns. For this problem, consider which 
          data structures and techniques might be applicable.
        </p>

        <h3 className="text-xl font-semibold mb-3">Step 3: Implement the Solution</h3>
        <p className="text-muted-foreground leading-relaxed">
          Once you have a clear approach, translate it into code. Focus on correctness 
          first, then optimize.
        </p>
      </section>

      {/* Sample Code */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Solution Code</h2>
        <p className="text-muted-foreground mb-4">
          Here's a well-commented solution to help you understand the approach:
        </p>
        
        <CodeBlock 
          language="javascript"
          code={`// ${topic.title} - Solution
function solve(input) {
  // Step 1: Initialize data structures
  // Use the appropriate data structure based on the problem
  
  // Step 2: Process the input
  // Iterate through the input and apply the algorithm
  
  // Step 3: Return the result
  return result;
}

// Time Complexity: O(n)
// Space Complexity: O(1)`}
        />
      </section>

      <Callout type="tip" title="Pro Tip">
        When practicing, try to solve the problem on your own first before looking at the solution. 
        If you get stuck, read just the approach section and try again. This active recall 
        technique significantly improves retention.
      </Callout>

      {/* Complexity Analysis */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Complexity Analysis</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-muted/30 border border-border">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Time Complexity
            </h4>
            <p className="text-muted-foreground text-sm">
              The solution runs in O(n) time, where n is the size of the input. 
              This is optimal for this type of problem.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-muted/30 border border-border">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Space Complexity
            </h4>
            <p className="text-muted-foreground text-sm">
              The solution uses O(1) extra space, not counting the input. 
              This makes it memory efficient.
            </p>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
        <ul className="space-y-3">
          {[
            "Understanding the problem constraints helps choose the right approach",
            "Always consider edge cases before implementing",
            "Practice similar problems to reinforce the pattern",
            "Time yourself to simulate interview conditions"
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {topic.problem_url && (
        <Callout type="info" title="Practice Makes Perfect">
          Now that you understand the approach, head over to the practice problem 
          and try implementing the solution yourself. Coding it from scratch will 
          help solidify your understanding.
        </Callout>
      )}
    </div>
  );
}
