import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Courses } from "@/components/Courses";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div id="home" className="min-h-screen">
      <Navigation />
      <Hero />
      <Courses />
      <Portfolio />
      <Contact />
      
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 SAINTS GRAPHICS WEB. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
