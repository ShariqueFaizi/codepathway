import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/react-app/components/ui/accordion";

const faqs = [
  {
    question: "Is CodePathway free to use?",
    answer:
      "Yes! Most of our content is completely free, including the A2Z DSA Sheet, Blind 75, SDE Sheet, Core CS subjects, and all blog articles. We offer premium content for advanced system design and exclusive interview experiences, but you can prepare thoroughly for interviews using our free resources.",
  },
  {
    question: "How is CodePathway different from LeetCode or other platforms?",
    answer:
      "While LeetCode is great for practicing problems, CodePathway provides structured learning paths with curated problem sets, detailed text-based explanations, interactive examples, and a clear roadmap from basics to advanced topics. We focus on teaching concepts and patterns, not just problem-solving.",
  },
  {
    question: "How should I use the DSA sheets?",
    answer:
      "Start with the A2Z DSA Sheet if you're a beginner - it covers everything from basics to advanced. If you're short on time, use the Blind 75 or SDE Sheet. Follow the order of topics, don't skip sections, and make sure you understand the patterns before moving on. Track your progress and revisit problems you struggled with.",
  },
  {
    question: "Do I need to solve every problem in the sheets?",
    answer:
      "Quality over quantity! Focus on understanding patterns rather than memorizing solutions. For the A2Z sheet, aim to solve at least 70-80% of problems. For Blind 75 and SDE sheets, try to complete all problems as they're already curated for essential patterns.",
  },
  {
    question: "How long does it take to complete the A2Z DSA Sheet?",
    answer:
      "For someone dedicating 3-4 hours daily, expect 3-4 months to complete the A2Z sheet thoroughly. If you're already familiar with basics, you might finish faster. The Blind 75 can be completed in 2-3 weeks with consistent effort.",
  },
  {
    question: "Are the solutions available in multiple programming languages?",
    answer:
      "Yes! We provide solutions in C++, Java, Python, and JavaScript for most problems. You can toggle between languages based on your preference. We recommend sticking to one language for consistency during interview prep.",
  },
  {
    question: "How do I track my progress?",
    answer:
      "Create a free account to track your progress across all sheets. You can mark problems as completed, add notes, bookmark difficult problems for revision, and see your completion percentage. Your progress syncs across devices.",
  },
  {
    question: "Can I contribute interview experiences?",
    answer:
      "Absolutely! We encourage our community to share their interview experiences. After creating an account, you can submit your interview experience which helps others prepare. Detailed experiences with specific questions and tips are most valuable.",
  },
];

export default function FAQ() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about CodePathway
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50"
            >
              <AccordionTrigger className="text-left py-5 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                <span className="font-medium pr-4">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help.
          </p>
          <a
            href="mailto:support@codepathway.com"
            className="text-primary hover:underline font-medium"
          >
            Contact Support →
          </a>
        </div>
      </div>
    </section>
  );
}
