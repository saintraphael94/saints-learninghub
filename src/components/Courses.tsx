import { CourseCard } from "./CourseCard";
import { Code2, Palette, Globe, Smartphone, Database, Camera } from "lucide-react";

export const Courses = () => {
  const courses = [
    {
      title: "Web Development",
      description: "Master HTML, CSS, JavaScript, and modern frameworks like React and Vue.",
      duration: "12 weeks",
      students: "250+",
      level: "Beginner to Advanced",
      icon: <Code2 className="w-6 h-6" />,
    },
    {
      title: "Graphic Design",
      description: "Learn Adobe Creative Suite, UI/UX design principles, and branding.",
      duration: "10 weeks",
      students: "180+",
      level: "All Levels",
      icon: <Palette className="w-6 h-6" />,
    },
    {
      title: "Digital Marketing",
      description: "SEO, social media marketing, content strategy, and analytics.",
      duration: "8 weeks",
      students: "200+",
      level: "Beginner",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: "Mobile App Development",
      description: "Build native and cross-platform mobile apps with React Native.",
      duration: "14 weeks",
      students: "150+",
      level: "Intermediate",
      icon: <Smartphone className="w-6 h-6" />,
    },
    {
      title: "Database Management",
      description: "SQL, NoSQL, database design, and data modeling fundamentals.",
      duration: "8 weeks",
      students: "120+",
      level: "Intermediate",
      icon: <Database className="w-6 h-6" />,
    },
    {
      title: "Photography & Editing",
      description: "Professional photography techniques and advanced photo editing.",
      duration: "6 weeks",
      students: "90+",
      level: "All Levels",
      icon: <Camera className="w-6 h-6" />,
    },
  ];

  return (
    <section id="courses" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Our <span className="bg-gradient-primary bg-clip-text text-transparent">ICT Courses</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose from our comprehensive range of courses designed to equip you with in-demand digital skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};
