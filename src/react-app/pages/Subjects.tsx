import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import Navbar from "@/react-app/components/layout/Navbar";
import Footer from "@/react-app/components/layout/Footer";
import SheetCard from "@/react-app/components/sheets/SheetCard";
import { Cpu } from "lucide-react";
import { getJson } from "@/react-app/lib/api";

type Sheet = {
  id: number;
  slug: string;
  title: string;
  description: string;
  total_problems: number;
  easy_count: number;
  medium_count: number;
  hard_count: number;
  is_featured: number;
  is_premium: number;
  category_name: string;
  category_slug: string;
  category_color: string;
};

export default function SubjectsPage() {
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getJson<{ sheets: Sheet[] }>(
          "/api/sheets?category=core-cs",
        );
        setSheets(data.sheets ?? []);
      } catch (e) {
        console.error("Failed to fetch Core CS sheets", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const featured = useMemo(() => sheets.filter((s) => s.is_featured), [sheets]);
  const regular = useMemo(() => sheets.filter((s) => !s.is_featured), [sheets]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <Cpu className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {loading ? "Loading…" : `${sheets.length} Subjects`}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Core CS <span className="text-primary">Subjects</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Crisp notes and interview-ready explanations for DBMS, OS, Networks, and OOPs.
            </p>
          </div>
        </section>

        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-64 rounded-2xl bg-muted/50 animate-pulse" />
                ))}
              </div>
            ) : sheets.length === 0 ? (
              <div className="text-center py-16">
                <Cpu className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">No subjects found</h3>
                <p className="text-muted-foreground">Seed the database to populate Core CS content.</p>
              </div>
            ) : (
              <div className="space-y-12">
                {featured.length > 0 ? (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Featured</h2>
                    <div className="grid lg:grid-cols-2 gap-6">
                      {featured.map((sheet) => (
                        <SheetCard key={sheet.id} sheet={sheet as any} featured />
                      ))}
                    </div>
                  </div>
                ) : null}

                {regular.length > 0 ? (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">All Subjects</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {regular.map((sheet) => (
                        <SheetCard key={sheet.id} sheet={sheet as any} />
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="text-sm text-muted-foreground">
                  Want quick access?{" "}
                  <Link to="/sheets/dbms" className="text-primary hover:underline">
                    DBMS
                  </Link>
                  {" · "}
                  <Link to="/sheets/os" className="text-primary hover:underline">
                    OS
                  </Link>
                  {" · "}
                  <Link to="/sheets/cn" className="text-primary hover:underline">
                    CN
                  </Link>
                  {" · "}
                  <Link to="/sheets/oops" className="text-primary hover:underline">
                    OOPs
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

