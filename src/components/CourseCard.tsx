import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Award } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  duration: string;
  students: string;
  level: string;
  icon: React.ReactNode;
}

export const CourseCard = ({ title, description, duration, students, level, icon }: CourseCardProps) => {
  return (
    <Card className="group overflow-hidden bg-card border-border hover:shadow-hover transition-all duration-300">
      <div className="p-6 space-y-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform">
          {icon}
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{students}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span>{level}</span>
          </div>
        </div>

        <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
          Enroll Now
        </Button>
      </div>
    </Card>
  );
};
