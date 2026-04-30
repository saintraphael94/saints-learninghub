import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Facebook } from "lucide-react";
import { toast } from "sonner";

export const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll get back to you soon.");
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Get in <span className="bg-gradient-primary bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Ready to start your ICT journey? Contact us today or enroll in your preferred course
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input placeholder="John Doe" required />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" placeholder="john@example.com" required />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Course of Interest</label>
                <Input placeholder="e.g., Web Development" required />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea 
                  placeholder="Tell us about your goals and interests..." 
                  className="min-h-[120px]"
                  required 
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                Send Message
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 flex items-start gap-4 hover:shadow-card transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email Us</h3>
                <p className="text-muted-foreground">info@saintsgraphicsweb.com</p>
              </div>
            </Card>

            <Card className="p-6 flex items-start gap-4 hover:shadow-card transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Call Us</h3>
                <p className="text-muted-foreground">+234 (0) 9077201874</p>
              </div>
            </Card>

            <Card className="p-6 flex items-start gap-4 hover:shadow-card transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                <Facebook className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Find us on Facebook</h3>
                <a
                  href="https://facebook.com/saintsgraphicsweb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Saints Graphics Web
                </a>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-primary text-primary-foreground">
              <h3 className="text-xl font-bold mb-2">Ready to Start Learning?</h3>
              <p className="mb-4 opacity-90">
                Join hundreds of students who have transformed their careers with our ICT courses.
              </p>
              <Button variant="secondary" className="w-full">
                Enroll Today
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
