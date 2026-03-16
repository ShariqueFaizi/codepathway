import { Button } from "@/react-app/components/ui/button";
import { ArrowRight, Sparkles, Users, BookOpen, Trophy } from "lucide-react";

const stats = [
  { label: "Problems Covered", value: "450+", icon: BookOpen },
  { label: "Active Learners", value: "50K+", icon: Users },
  { label: "Success Stories", value: "2,500+", icon: Trophy },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
      <div className="absolute inset-0 noise pointer-events-none" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>New: System Design Roadmap 2024</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Master Coding Interviews with{" "}
              <span className="relative">
                <span className="text-gradient">Structured Roadmaps</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C50 4 100 2 150 6C200 10 250 8 298 4"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeOpacity="0.5"
                  />
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Stop scattered learning. Follow our curated DSA sheets, system design guides, and interview prep resources used by engineers at top tech companies.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12">
              <Button size="lg" className="w-full sm:w-auto glow text-base px-8">
                Start Learning Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8">
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Sheets
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 lg:gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                    <stat.icon className="w-5 h-5 text-primary" />
                    <span className="text-2xl sm:text-3xl font-bold">{stat.value}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden lg:block">
            {/* Code Card */}
            <div className="relative bg-card rounded-2xl border border-border shadow-2xl shadow-primary/10 overflow-hidden">
              {/* Window Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-muted-foreground font-mono">two-sum.js</span>
                </div>
              </div>
              
              {/* Code Content */}
              <div className="p-6 font-mono text-sm leading-relaxed">
                <div className="text-muted-foreground">{"// Two Sum - O(n) Solution"}</div>
                <div className="mt-2">
                  <span className="text-purple-400">function</span>{" "}
                  <span className="text-yellow-400">twoSum</span>
                  <span className="text-foreground">(nums, target) {"{"}</span>
                </div>
                <div className="ml-4">
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-foreground">map</span>{" "}
                  <span className="text-purple-400">=</span>{" "}
                  <span className="text-purple-400">new</span>{" "}
                  <span className="text-yellow-400">Map</span>
                  <span className="text-foreground">();</span>
                </div>
                <div className="ml-4 mt-1">
                  <span className="text-purple-400">for</span>{" "}
                  <span className="text-foreground">(</span>
                  <span className="text-purple-400">let</span>{" "}
                  <span className="text-foreground">i = 0; i {"<"} nums.length; i++) {"{"}</span>
                </div>
                <div className="ml-8">
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-foreground">complement</span>{" "}
                  <span className="text-purple-400">=</span>{" "}
                  <span className="text-foreground">target - nums[i];</span>
                </div>
                <div className="ml-8">
                  <span className="text-purple-400">if</span>{" "}
                  <span className="text-foreground">(map.</span>
                  <span className="text-yellow-400">has</span>
                  <span className="text-foreground">(complement))</span>
                </div>
                <div className="ml-12">
                  <span className="text-purple-400">return</span>{" "}
                  <span className="text-foreground">[map.</span>
                  <span className="text-yellow-400">get</span>
                  <span className="text-foreground">(complement), i];</span>
                </div>
                <div className="ml-8">
                  <span className="text-foreground">map.</span>
                  <span className="text-yellow-400">set</span>
                  <span className="text-foreground">(nums[i], i);</span>
                </div>
                <div className="ml-4">
                  <span className="text-foreground">{"}"}</span>
                </div>
                <div>
                  <span className="text-foreground">{"}"}</span>
                </div>
              </div>

              {/* Status Bar */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/30 text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Accepted
                  </span>
                  <span>Runtime: 4ms (98%)</span>
                </div>
                <span>JavaScript</span>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-green-500/20 text-green-500 px-4 py-2 rounded-xl text-sm font-medium border border-green-500/30 shadow-lg">
              ✓ Easy
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card border border-border px-4 py-3 rounded-xl shadow-lg">
              <div className="text-xs text-muted-foreground mb-1">Progress</div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-primary to-accent rounded-full" />
                </div>
                <span className="text-sm font-medium">75%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
