import { Link } from "react-router";
import { Progress } from "@/react-app/components/ui/progress";
import { Button } from "@/react-app/components/ui/button";
import {
  BookOpen,
  Clock,
  Star,
  Lock,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

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
  category_color: string;
}

interface SheetCardProps {
  sheet: Sheet;
  featured?: boolean;
}

const difficultyConfig: Record<string, { label: string; color: string }> = {
  beginner: { label: "Beginner", color: "text-green-500" },
  intermediate: { label: "Intermediate", color: "text-amber-500" },
  advanced: { label: "Advanced", color: "text-red-500" },
};

export default function SheetCard({ sheet, featured }: SheetCardProps) {
  const difficulty = difficultyConfig[sheet.difficulty_level?.toLowerCase()] || {
    label: "Mixed",
    color: "text-muted-foreground",
  };

  const estimatedWeeks = Math.ceil(sheet.estimated_hours / 20);
  const timeLabel =
    estimatedWeeks <= 2
      ? `${estimatedWeeks} week${estimatedWeeks > 1 ? "s" : ""}`
      : `${Math.ceil(estimatedWeeks / 4)} month${Math.ceil(estimatedWeeks / 4) > 1 ? "s" : ""}`;

  return (
    <Link
      to={`/sheets/${sheet.slug}`}
      className={`group relative bg-card rounded-2xl border border-border p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 flex flex-col ${
        featured ? "lg:flex-row lg:items-center lg:gap-8" : ""
      }`}
    >
      {/* Gradient accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className={featured ? "lg:flex-1" : ""}>
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {sheet.is_featured === 1 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </span>
          )}
          {sheet.is_premium === 1 ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-medium">
              <Lock className="w-3 h-3" />
              Premium
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">
              Free
            </span>
          )}
          {sheet.category_name && (
            <span
              className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${sheet.category_color}15`,
                color: sheet.category_color,
              }}
            >
              {sheet.category_name}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {sheet.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-5 line-clamp-2">
          {sheet.description}
        </p>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center gap-4 mb-5">
          <div className="flex items-center gap-1.5 text-sm">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{sheet.total_problems}</span>
            <span className="text-muted-foreground">Problems</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{timeLabel}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <span className={difficulty.color}>{difficulty.label}</span>
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="flex items-center gap-4 mb-5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-easy" />
            <span className="text-xs text-muted-foreground">
              Easy{" "}
              <span className="font-medium text-foreground">
                {sheet.easy_count}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-medium" />
            <span className="text-xs text-muted-foreground">
              Medium{" "}
              <span className="font-medium text-foreground">
                {sheet.medium_count}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-hard" />
            <span className="text-xs text-muted-foreground">
              Hard{" "}
              <span className="font-medium text-foreground">
                {sheet.hard_count}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Progress & CTA */}
      <div className={featured ? "lg:w-64 lg:flex-shrink-0" : ""}>
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Your Progress</span>
            <span className="font-medium">0%</span>
          </div>
          <Progress value={0} className="h-2" />
        </div>

        <Button className="w-full group/btn">
          Start Learning
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </Link>
  );
}
