import { useState, useEffect } from "react";
import { Link } from "react-router";
import Navbar from "@/react-app/components/layout/Navbar";
import Footer from "@/react-app/components/layout/Footer";
import SheetCard from "@/react-app/components/sheets/SheetCard";
import SheetFilters from "@/react-app/components/sheets/SheetFilters";
import { Layers, Sparkles } from "lucide-react";

interface Sheet {
  id: number;
  slug: string;
  title: string;
  description: string;
  total_problems: number;
  easy_count: number;
  medium_count: number;
  hard_count: number;
  estimated_hours: number;
  difficulty_level: string;
  is_featured: number;
  is_premium: number;
  category_name: string;
  category_slug: string;
  category_color: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
}

export default function SheetsPage() {
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [sheetsRes, categoriesRes] = await Promise.all([
          fetch("/api/sheets"),
          fetch("/api/categories"),
        ]);
        const sheetsData = await sheetsRes.json();
        const categoriesData = await categoriesRes.json();
        setSheets(sheetsData.sheets || []);
        setCategories(categoriesData.categories || []);
      } catch (error) {
        console.error("Failed to fetch sheets:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredSheets = sheets.filter((sheet) => {
    const matchesCategory =
      selectedCategory === "all" || sheet.category_slug === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "all" ||
      sheet.difficulty_level?.toLowerCase() === selectedDifficulty;
    const matchesSearch =
      searchQuery === "" ||
      sheet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sheet.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const featuredSheets = filteredSheets.filter((s) => s.is_featured);
  const regularSheets = filteredSheets.filter((s) => !s.is_featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute inset-0 noise pointer-events-none" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <Layers className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {sheets.length} Sheets Available
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              DSA Learning <span className="text-primary">Sheets</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Curated problem sets and structured learning paths designed to take you from beginner to interview-ready. Pick a sheet and start your journey.
            </p>
          </div>
        </section>

        {/* Filters & Content */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SheetFilters
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {loading ? (
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-64 rounded-2xl bg-muted/50 animate-pulse"
                  />
                ))}
              </div>
            ) : filteredSheets.length === 0 ? (
              <div className="text-center py-16">
                <Layers className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">No sheets found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
              </div>
            ) : (
              <div className="space-y-12 mt-8">
                {/* Featured Sheets */}
                {featuredSheets.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <h2 className="text-xl font-semibold">Featured Sheets</h2>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6">
                      {featuredSheets.map((sheet) => (
                        <SheetCard key={sheet.id} sheet={sheet} featured />
                      ))}
                    </div>
                  </div>
                )}

                {/* All Sheets */}
                {regularSheets.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">All Sheets</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {regularSheets.map((sheet) => (
                        <SheetCard key={sheet.id} sheet={sheet} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
