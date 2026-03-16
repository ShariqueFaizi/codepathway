import { Link } from "react-router";
import {
  Layers,
  Users,
  Cpu,
  Code2,
  PlayCircle,
  Swords,
  FileText,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    title: "DSA Sheets",
    description: "Curated problem sets with structured learning paths from basics to advanced",
    icon: Layers,
    href: "/sheets",
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    stats: "8 Sheets · 450+ Problems",
  },
  {
    title: "Interview Experiences",
    description: "Real interview experiences from FAANG and top tech companies",
    icon: Users,
    href: "/interviews",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
    stats: "500+ Experiences",
  },
  {
    title: "Core CS Subjects",
    description: "DBMS, OS, Networks, OOPs - everything for technical rounds",
    icon: Cpu,
    href: "/subjects",
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    stats: "4 Subjects · 100+ Topics",
  },
  {
    title: "System Design",
    description: "Scalable architecture patterns and real-world case studies",
    icon: Code2,
    href: "/system-design",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    stats: "Beginner to Advanced",
  },
  {
    title: "DSA Playlist",
    description: "Video tutorials covering every data structure and algorithm",
    icon: PlayCircle,
    href: "/playlist",
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    stats: "200+ Videos",
  },
  {
    title: "Competitive Programming",
    description: "Level up your CP skills with contests and practice problems",
    icon: Swords,
    href: "/cp",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    stats: "Weekly Contests",
  },
  {
    title: "Blogs & Articles",
    description: "In-depth tutorials, tips, and career guidance",
    icon: FileText,
    href: "/blogs",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
    stats: "100+ Articles",
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-primary">Crack Interviews</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From data structures to system design, we've got all your interview preparation covered with structured learning paths.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              to={category.href}
              className={`group relative p-6 rounded-2xl border ${category.borderColor} ${category.bgColor} hover:border-opacity-40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                index === 0 ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-lg`}
              >
                <category.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {category.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {category.description}
              </p>

              {/* Stats & Arrow */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {category.stats}
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
