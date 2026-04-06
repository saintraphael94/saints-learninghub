import { CourseCard } from "./CourseCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { COURSES } from "@/lib/enrollment-types";

export const Courses = () => {
  const navigate = useNavigate();

  return (
    <section id="courses" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Our <span className="bg-gradient-primary bg-clip-text text-transparent">Digital Skills</span> Courses
          </h2>
          <p className="text-muted-foreground">
            Choose from our comprehensive range of courses designed to equip you with in-demand digital skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {COURSES.map((course) => (
            <CourseCard key={course.name} name={course.name} icon={course.icon} description="" />
          ))}
        </div>

        <div className="text-center mt-10">
          <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity" onClick={() => navigate("/enroll")}>
            Start Enrollment <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
