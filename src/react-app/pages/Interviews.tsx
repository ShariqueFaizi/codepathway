import { useEffect, useState } from "react";
import { Link } from "react-router";
import Navbar from "@/react-app/components/layout/Navbar";
import Footer from "@/react-app/components/layout/Footer";
import { Users, Building2, BadgeCheck, ArrowRight } from "lucide-react";

type InterviewListItem = {
  id: number;
  title: string;
  slug: string;
  company: string;
  role: string | null;
  experience_level: string | null;
  interview_year: number | null;
  difficulty: string | null;
  result: string | null;
  summary: string | null;
  author_name: string | null;
  is_anonymous: number;
  is_featured: number;
  created_at: string;
};

export default function InterviewsPage() {
  const [items, setItems] = useState<InterviewListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/interviews");
        const data = await res.json();
        setItems(data.interviews ?? []);
      } catch (e) {
        console.error("Failed to fetch interviews", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {loading ? "Loading…" : `${items.length} Experiences`}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Interview <span className="text-primary">Experiences</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Real rounds, real questions, and honest lessons learned—so you know what to expect.
            </p>
          </div>
        </section>

        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-56 rounded-2xl bg-muted/50 animate-pulse" />
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16">
                <Users className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">No experiences yet</h3>
                <p className="text-muted-foreground">Seed the database to populate interviews.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((it) => (
                  <Link
                    key={it.id}
                    to={`/interviews/${it.slug}`}
                    className="group bg-card/50 border border-border/50 rounded-2xl p-6 hover:border-primary/40 hover:bg-card/80 transition-all"
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Building2 className="w-3.5 h-3.5" />
                        {it.company}
                      </span>
                      {it.result ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-primary">
                          <BadgeCheck className="w-3.5 h-3.5" />
                          {it.result}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {it.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{it.summary ?? ""}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm text-primary">
                      Read <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

