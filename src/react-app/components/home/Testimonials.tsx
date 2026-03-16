import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { getJson } from "@/react-app/lib/api";

type Testimonial = {
  id: number;
  name: string;
  role: string | null;
  company: string | null;
  avatar_url: string | null;
  content: string;
  rating: number;
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getJson<{ testimonials: Testimonial[] }>(
          "/api/testimonials",
        );
        setTestimonials(data.testimonials ?? []);
      } catch (e) {
        console.error("Failed to fetch testimonials", e);
      }
    }
    load();
  }, []);

  const next = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Trusted by <span className="text-primary">50,000+</span> Developers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers who've landed their dream jobs using CodePathway
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-6">
            {testimonials.slice(0, 4).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="lg:hidden">
            {testimonials.length > 0 ? (
              <TestimonialCard testimonial={testimonials[currentIndex]} />
            ) : (
              <div className="h-48 rounded-2xl bg-muted/50 animate-pulse" />
            )}
            
            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prev}
                disabled={testimonials.length === 0}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                disabled={testimonials.length === 0}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Company Logos */}
        <div className="mt-16 pt-12 border-t border-border">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Our learners have been placed at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 opacity-60">
            {["Google", "Amazon", "Microsoft", "Meta", "Apple", "Netflix"].map((company) => (
              <div key={company} className="text-xl font-semibold tracking-tight">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 lg:p-8">
      {/* Quote Icon */}
      <Quote className="w-10 h-10 text-primary/20 mb-4" />

      {/* Content */}
      <p className="text-foreground/90 mb-6 leading-relaxed">
        "{testimonial.content}"
      </p>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center gap-4">
        <img
          src={
            testimonial.avatar_url ??
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
          }
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold">{testimonial.name}</div>
          <div className="text-sm text-muted-foreground">
            {testimonial.role ? `${testimonial.role}${testimonial.company ? ` · ${testimonial.company}` : ""}` : testimonial.company ?? ""}
          </div>
        </div>
      </div>
    </div>
  );
}
