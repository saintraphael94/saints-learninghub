import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Palette } from "lucide-react";

export const Hero = () => {
  const scrollToCourses = () => {
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-full text-sm font-medium">
            <Code className="w-4 h-4 text-primary" />
            <span>Professional ICT Training</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Welcome to{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              SAINTS GRAPHICS WEB
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Master the digital world with our comprehensive ICT courses. From web development to graphic design, we've got you covered.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8"
              onClick={scrollToCourses}
            >
              Explore Courses
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 border-2"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Palette className="mr-2 w-5 h-5" />
              View Portfolio
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Students Trained</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-secondary">15+</div>
              <div className="text-sm text-muted-foreground">ICT Courses</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-accent">98%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
