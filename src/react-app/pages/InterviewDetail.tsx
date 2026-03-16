import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Navbar from "@/react-app/components/layout/Navbar";
import Footer from "@/react-app/components/layout/Footer";
import { ChevronLeft, Users, Building2 } from "lucide-react";
import { getJson } from "@/react-app/lib/api";

type InterviewExperience = {
  id: number;
  title: string;
  slug: string;
  company: string;
  role: string | null;
  experience_level: string | null;
  interview_year: number | null;
  interview_rounds: string | null;
  difficulty: string | null;
  result: string | null;
  content: string | null;
  summary: string | null;
  tips: string | null;
  author_name: string | null;
  is_anonymous: number;
};

export default function InterviewDetailPage() {
  const { slug } = useParams();
  const [interview, setInterview] = useState<InterviewExperience | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getJson<{ interview: InterviewExperience | null }>(
          `/api/interviews/${slug}`,
        );
        setInterview(data.interview ?? null);
      } catch (e) {
        console.error("Failed to fetch interview", e);
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
            to="/interviews"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Interviews
          </Link>

          {loading ? (
            <div className="h-48 rounded-2xl bg-muted/50 animate-pulse" />
          ) : !interview ? (
            <div className="text-center py-16">
              <Users className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <h1 className="text-2xl font-bold mb-2">Experience not found</h1>
              <p className="text-muted-foreground">This interview post doesn’t exist (or isn’t published).</p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  {interview.company}
                </span>
                {interview.role ? <span>• {interview.role}</span> : null}
                {interview.interview_year ? <span>• {interview.interview_year}</span> : null}
                {interview.difficulty ? <span>• {interview.difficulty}</span> : null}
                {interview.result ? <span>• {interview.result}</span> : null}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-6">{interview.title}</h1>

              {interview.summary ? (
                <p className="text-lg text-muted-foreground mb-6">{interview.summary}</p>
              ) : null}

              <article className="prose prose-invert max-w-none">
                {interview.content ? (
                  <div dangerouslySetInnerHTML={{ __html: interview.content }} />
                ) : (
                  <p className="text-muted-foreground">No content yet.</p>
                )}
              </article>

              {interview.tips ? (
                <div className="mt-10 border-t border-border pt-8">
                  <h2 className="text-xl font-semibold mb-3">Tips</h2>
                  <div className="prose prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: interview.tips }} />
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

