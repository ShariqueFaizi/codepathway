import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router";
import Navbar from "@/react-app/components/layout/Navbar";
import Footer from "@/react-app/components/layout/Footer";
import { 
  ChevronLeft, 
  Clock, 
  BookOpen, 
  FileText, 
  ExternalLink,
  Lock,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Code2
} from "lucide-react";

interface Topic {
  id: number;
  title: string;
  slug: string;
  description: string;
  difficulty: string;

  article_url: string | null;
  problem_url: string | null;
  estimated_minutes: number;
  is_premium: number;
}

interface Section {
  id: number;
  title: string;
  slug: string;
  description: string;
  topics: Topic[];
}

interface Sheet {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  estimated_time: string;
  total_problems: number;
  easy_count: number;
  medium_count: number;
  hard_count: number;
  is_premium: number;
  category_name: string;
  category_slug: string;
  category_color: string;
}

export function SheetDetail() {
  const { slug } = useParams();
  const [sheet, setSheet] = useState<Sheet | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const sectionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    async function fetchSheet() {
      try {
        const res = await fetch(`/api/sheets/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setSheet(data.sheet);
          setSections(data.sections);
          // Expand all sections by default
          setExpandedSections(new Set(data.sections.map((s: Section) => s.id)));
          if (data.sections.length > 0) {
            setActiveSection(data.sections[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch sheet:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSheet();
  }, [slug]);

  const toggleSection = (sectionId: number) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const scrollToSection = (sectionId: number) => {
    setActiveSection(sectionId);
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-easy bg-easy/10 border-easy/30';
      case 'medium': return 'text-medium bg-medium/10 border-medium/30';
      case 'hard': return 'text-hard bg-hard/10 border-hard/30';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const totalTopics = sections.reduce((acc, s) => acc + s.topics.length, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-muted-foreground">Loading sheet...</div>
        </div>
      </div>
    );
  }

  if (!sheet) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-muted-foreground">Sheet not found</p>
          <Link to="/sheets" className="text-primary hover:underline">
            ← Back to sheets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            to="/sheets" 
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Sheets
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span 
                  className="px-2 py-1 text-xs font-medium rounded-md"
                  style={{ 
                    backgroundColor: `${sheet.category_color}15`,
                    color: sheet.category_color
                  }}
                >
                  {sheet.category_name}
                </span>
                {sheet.is_premium === 1 && (
                  <span className="px-2 py-1 text-xs font-medium rounded-md bg-amber-500/10 text-amber-500 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Premium
                  </span>
                )}
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-foreground mb-2">
                {sheet.title}
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                {sheet.description}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 lg:gap-6">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{sheet.estimated_time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{totalTopics} Topics</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs rounded bg-easy/10 text-easy border border-easy/30">
                  {sheet.easy_count} Easy
                </span>
                <span className="px-2 py-0.5 text-xs rounded bg-medium/10 text-medium border border-medium/30">
                  {sheet.medium_count} Med
                </span>
                <span className="px-2 py-0.5 text-xs rounded bg-hard/10 text-hard border border-hard/30">
                  {sheet.hard_count} Hard
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-24 bg-card/50 border border-border/50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Sections</h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between group ${
                      activeSection === section.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <span className="truncate">{section.title}</span>
                    <span className="text-xs opacity-60">{section.topics.length}</span>
                  </button>
                ))}
              </nav>
              
              {/* Progress Summary */}
              <div className="mt-6 pt-4 border-t border-border/50">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground font-medium">0/{totalTopics}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full transition-all duration-500"
                    style={{ width: '0%' }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Sign in to track your progress
                </p>
              </div>
            </div>
          </aside>
          
          {/* Topics */}
          <main className="flex-1 min-w-0">
            <div className="space-y-6">
              {sections.map((section) => (
                <div 
                  key={section.id}
                  ref={el => sectionRefs.current[section.id] = el}
                  className="scroll-mt-24"
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-4 bg-card/50 border border-border/50 rounded-xl hover:bg-card/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {expandedSections.has(section.id) ? (
                        <ChevronDown className="w-5 h-5 text-primary" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      )}
                      <div className="text-left">
                        <h2 className="font-semibold text-foreground">{section.title}</h2>
                        {section.description && (
                          <p className="text-sm text-muted-foreground mt-0.5">{section.description}</p>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {section.topics.length} topics
                    </span>
                  </button>
                  
                  {expandedSections.has(section.id) && (
                    <div className="mt-2 space-y-2">
                      {section.topics.map((topic, index) => (
                        <TopicCard key={topic.id} topic={topic} index={index} sheetSlug={slug || ''} getDifficultyColor={getDifficultyColor} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

function TopicCard({ 
  topic, 
  index, 
  sheetSlug,
  getDifficultyColor 
}: { 
  topic: Topic; 
  index: number;
  sheetSlug: string;
  getDifficultyColor: (d: string) => string;
}) {
  const isCompleted = false; // Will be dynamic with auth

  return (
    <Link 
      to={`/sheets/${sheetSlug}/topic/${topic.slug}`}
      className="flex items-center gap-4 p-4 bg-card/30 border border-border/30 rounded-lg hover:bg-card/50 hover:border-primary/30 transition-all group"
    >
      {/* Status */}
      <div className="flex-shrink-0">
        {isCompleted ? (
          <CheckCircle2 className="w-5 h-5 text-easy" />
        ) : (
          <Circle className="w-5 h-5 text-muted-foreground/50" />
        )}
      </div>
      
      {/* Index */}
      <span className="w-8 h-8 flex items-center justify-center text-sm font-medium text-muted-foreground bg-muted/50 rounded-lg flex-shrink-0">
        {index + 1}
      </span>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">{topic.title}</h3>
          {topic.is_premium === 1 && (
            <Lock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
          )}
        </div>
        {topic.description && (
          <p className="text-sm text-muted-foreground truncate mt-0.5">{topic.description}</p>
        )}
      </div>
      
      {/* Difficulty */}
      <span className={`px-2 py-1 text-xs font-medium rounded border flex-shrink-0 capitalize ${getDifficultyColor(topic.difficulty)}`}>
        {topic.difficulty || 'N/A'}
      </span>
      
      {/* Time */}
      <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
        <Clock className="w-3.5 h-3.5" />
        {topic.estimated_minutes}m
      </div>
      
      {/* Action Links */}
      <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <span
          className="p-1.5 rounded-md bg-primary/10 text-primary transition-colors"
          title="Read Article"
        >
          <FileText className="w-4 h-4" />
        </span>

        {topic.problem_url && (
          <a
            href={topic.problem_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 rounded-md bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            title="Practice Problem"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </Link>
  );
}