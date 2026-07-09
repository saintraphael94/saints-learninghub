import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Facebook } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", course: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", { body: form });
      if (error) throw error;
      toast.success("Thank you! Your message has been sent.");
      setForm({ name: "", email: "", course: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Could not send message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
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
                <Input
                  placeholder="John Doe"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Course of Interest</label>
                <Input
                  placeholder="e.g., Web Development"
                  required
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="Tell us about your goals and interests..."
                  className="min-h-[120px]"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                {submitting ? "Sending..." : "Send Message"}
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
                <p className="text-muted-foreground">raphael.datalab@gmail.com</p>
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
                  href="https://facebook.com/saintsinnovationhub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Saints Innovation Hub
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
