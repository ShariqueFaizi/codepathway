import { Link } from "react-router";
import { Button } from "@/react-app/components/ui/button";
import { Progress } from "@/react-app/components/ui/progress";
import { ArrowRight, BookOpen, Clock, Star, Lock } from "lucide-react";

const sheets = [
  {
    id: "a2z-dsa",
    title: "A2Z DSA Sheet",
    description: "Complete roadmap from zero to hero covering all DSA topics with 450+ problems",
    totalProblems: 456,
    easy: 150,
    medium: 200,
    hard: 106,
    estimatedTime: "3-4 months",
    progress: 0,
    isPremium: false,
    isFeatured: true,
  },
  {
    id: "blind-75",
    title: "Blind 75 Sheet",
    description: "The famous 75 must-do problems for coding interviews",
    totalProblems: 75,
    easy: 20,
    medium: 40,
    hard: 15,
    estimatedTime: "2-3 weeks",
    progress: 0,
    isPremium: false,
    isFeatured: false,
  },
  {
    id: "sde",
    title: "SDE Sheet",
    description: "Curated 180 problems covering all important patterns for SDE roles",
    totalProblems: 180,
    easy: 45,
    medium: 90,
    hard: 45,
    estimatedTime: "6-8 weeks",
    progress: 0,
    isPremium: false,
    isFeatured: false,
  },
  {
    id: "system-design",
    title: "System Design Sheet",
    description: "Master system design with real-world case studies and architecture patterns",
    totalProblems: 30,
    easy: 10,
    medium: 12,
    hard: 8,
    estimatedTime: "4-6 weeks",
    progress: 0,
    isPremium: true,
    isFeatured: false,
  },
];

export default function FeaturedSheets() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              Popular Learning <span className="text-primary">Sheets</span>
            </h2>
            <p className="text-muted-foreground">
              Start with our most popular structured learning paths
            </p>
          </div>
          <Link to="/sheets">
            <Button variant="outline" className="group">
              View All Sheets
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Sheets Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {sheets.map((sheet) => (
            <Link
              key={sheet.id}
              to={`/sheets/${sheet.id}`}
              className={`group relative bg-card rounded-2xl border border-border p-6 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 ${
                sheet.isFeatured ? "md:col-span-2" : ""
              }`}
            >
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                {sheet.isFeatured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </span>
                )}
                {sheet.isPremium ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-medium">
                    <Lock className="w-3 h-3" />
                    Premium
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">
                    Free
                  </span>
                )}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {sheet.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                {sheet.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5 text-sm">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{sheet.totalProblems}</span>
                  <span className="text-muted-foreground">Problems</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{sheet.estimatedTime}</span>
                </div>
              </div>

              {/* Difficulty Breakdown */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-easy" />
                  <span className="text-xs text-muted-foreground">
                    Easy <span className="font-medium text-foreground">{sheet.easy}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-medium" />
                  <span className="text-xs text-muted-foreground">
                    Medium <span className="font-medium text-foreground">{sheet.medium}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-hard" />
                  <span className="text-xs text-muted-foreground">
                    Hard <span className="font-medium text-foreground">{sheet.hard}</span>
                  </span>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{sheet.progress}%</span>
                </div>
                <Progress value={sheet.progress} className="h-2" />
              </div>

              {/* CTA */}
              <div className="mt-6 flex items-center gap-2">
                <Button className="flex-1 sm:flex-none">
                  Start Learning
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
