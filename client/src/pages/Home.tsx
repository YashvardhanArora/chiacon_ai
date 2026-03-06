import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Brain, LineChart, MessageSquare, Sparkles, ArrowRight, Zap, Target, Loader2, CheckCircle2, ExternalLink } from "lucide-react";
import { useGenerateUseCase } from "@/hooks/use-use-cases";
import { api, type GenerateUseCaseInput } from "@shared/routes";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";

const chiaconLogo = "/logo.png";

export default function Home() {
  const { mutate: generateUseCase, isPending, data: result, error } = useGenerateUseCase();
  const resultRef = useRef<HTMLDivElement>(null);

  const form = useForm<GenerateUseCaseInput>({
    resolver: zodResolver(api.useCases.generate.input),
    defaultValues: {
      businessProblem: "",
    },
  });

  const onSubmit = (data: GenerateUseCaseInput) => {
    generateUseCase(data);
  };

  // Scroll to result when it's ready
  useEffect(() => {
    if (result && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [result]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="relative min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/5 blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/20 bg-white/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          <img src={chiaconLogo} alt="Chiacon" className="h-8 w-auto" data-testid="img-logo" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
              <Sparkles className="w-4 h-4" />
              <span>Next-Generation AI Solutions</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold font-display tracking-tight text-foreground leading-[1.1] mb-6">
              Transform Your Business <br className="hidden md:block" />
              with <span className="text-gradient">Intelligent AI</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
              Chiacon bridges the gap between complex business problems and cutting-edge artificial intelligence. We build custom, scalable AI solutions that drive real ROI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-base rounded-full shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300" asChild>
                <a href="#demo">
                  Try the AI Generator <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Static Capabilities Section */}
      <section id="capabilities" className="py-24 px-6 bg-slate-50/50 border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">Enterprise AI Use Cases</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Effective AI use cases for modern organizations to implement.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <LineChart className="w-6 h-6 text-blue-500" />,
                title: "Automated Reporting",
                desc: "Transform raw data into narrative insights instantly. AI parses millions of rows to generate executive-ready briefings.",
                featured: false,
              },
              {
                icon: <MessageSquare className="w-6 h-6 text-indigo-400" />,
                title: "Concise CV: AI Resume Screening",
                desc: "AI automatically analyzes large volumes of resumes and extracts key insights, helping HR teams identify top candidates faster and make data-driven hiring decisions.",
                featured: true,
              },
              {
                icon: <Brain className="w-6 h-6 text-purple-500" />,
                title: "Predictive Analytics",
                desc: "Identify supply chain bottlenecks and demand spikes before they happen using machine learning models trained on your history.",
                featured: false,
              }
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariants} className={feature.featured ? "md:-translate-y-3" : ""}>
                <a
                  href={feature.featured ? "https://www.chiacon.com/concise-cv" : undefined}
                  target={feature.featured ? "_blank" : undefined}
                  rel={feature.featured ? "noopener noreferrer" : undefined}
                  className={feature.featured ? "block h-full" : "block h-full pointer-events-none"}
                  data-testid={feature.featured ? "link-concise-cv" : undefined}
                >
                <Card className={`h-full transition-all duration-300 group ${
                  feature.featured
                    ? "border-indigo-100 shadow-xl shadow-indigo-100/60 bg-gradient-to-b from-white to-indigo-50/60 backdrop-blur-sm"
                    : "border-border/50 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:border-border bg-white/50 backdrop-blur-sm"
                }`}>
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                        feature.featured ? "bg-indigo-50" : "bg-slate-100"
                      }`}>
                        {feature.icon}
                      </div>
                      {feature.featured && (
                        <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
                          Chiacon Product
                        </span>
                      )}
                    </div>
                    <h3 className={`text-xl font-bold font-display mb-3 ${feature.featured ? "text-indigo-700 group-hover:underline underline-offset-2 decoration-indigo-300 inline-flex items-center gap-1.5" : "text-foreground"}`}>
                      {feature.title}
                      {feature.featured && <ExternalLink className="w-4 h-4 shrink-0 opacity-60" />}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">AI Use Case Generator</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Describe a business challenge you're facing, and our AI will instantly architect a strategic solution, complete with implementation opportunities and expected impact.
            </p>
          </div>

          <Card className="border-border/60 shadow-2xl shadow-slate-200/50 overflow-hidden bg-white/80 backdrop-blur-xl">
            <div className="p-1 border-b border-border/50 bg-slate-50 flex items-center gap-2 px-4">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-2 text-xs font-mono text-muted-foreground">chiacon-ai-engine.exe</span>
            </div>
            
            <CardContent className="p-6 md:p-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="businessProblem"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative group">
                            <Textarea
                              placeholder="e.g., 'Our FMCG company is struggling with manual data entry for regional sales reporting, taking 40 hours a week.'"
                              className="min-h-[140px] resize-none text-lg p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 focus-visible:ring-0 focus-visible:border-primary transition-all shadow-inner"
                              {...field}
                            />
                            <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity" />
                          </div>
                        </FormControl>
                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={isPending || !form.watch("businessProblem")}
                      className="h-12 px-8 rounded-full bg-foreground text-background hover:bg-primary transition-colors text-base"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Generate Solution <Sparkles className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>

              {error && (
                <div className="mt-6 p-4 rounded-xl bg-destructive/10 text-destructive border border-destructive/20 flex items-start gap-3">
                  <div className="mt-0.5 font-bold">!</div>
                  <p>{error.message}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Area */}
          <AnimatePresence>
            {result && (
              <motion.div 
                ref={resultRef}
                initial={{ opacity: 0, height: 0, y: 20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                className="mt-12 space-y-6"
              >
                {/* Summary */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-4 text-blue-700">
                    <Target className="w-6 h-6" />
                    <h3 className="text-lg font-bold font-display">Problem Summary</h3>
                  </div>
                  <p className="text-blue-950/80 leading-relaxed text-lg">
                    {result.problemSummary}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Opportunities */}
                  <div className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 text-purple-600">
                      <Zap className="w-6 h-6" />
                      <h3 className="text-lg font-bold font-display text-foreground">AI Opportunities</h3>
                    </div>
                    <ul className="space-y-4">
                      {result.aiOpportunities.map((opp, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground leading-relaxed">{opp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact */}
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 md:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-4 text-emerald-700">
                      <LineChart className="w-6 h-6" />
                      <h3 className="text-lg font-bold font-display">Expected Impact</h3>
                    </div>
                    <div className="h-full flex items-center">
                      <p className="text-emerald-900/80 leading-relaxed text-xl font-medium">
                        "{result.expectedImpact}"
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 bg-white text-center text-muted-foreground">
        <div className="flex flex-col items-center gap-3">
          <img src={chiaconLogo} alt="Chiacon" className="h-7 w-auto opacity-80" data-testid="img-footer-logo" />
        </div>
      </footer>
    </div>
  );
}
