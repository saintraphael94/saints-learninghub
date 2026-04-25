import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent border border-border rounded-full text-sm font-medium text-accent-foreground">
            <GraduationCap className="w-4 h-4" />
            <span>Professional Digital Skills Training</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Welcome to
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Saints Graphics Web
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Master practical skills in design, data, and productivity tools.
            Join hundreds of learners building profitable careers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 h-12"
              onClick={() => navigate("/enroll")}
            >
              Enroll Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 h-12"
              onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Courses
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto pt-8">
            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-bold text-primary">200+</div>
              <div className="text-xs text-muted-foreground">Students Trained</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-bold text-secondary">10+</div>
              <div className="text-xs text-muted-foreground">Expert Courses</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-bold text-primary">98%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
