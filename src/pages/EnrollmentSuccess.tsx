import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";

const EnrollmentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courses = (location.state as any)?.courses || [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16 container mx-auto px-4 max-w-lg">
        <Card className="p-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Enrollment Successful 🎉</h1>
          <p className="text-muted-foreground">
            Thank you for enrolling! We're excited to have you join us.
          </p>

          {courses.length > 0 && (
            <div className="text-left space-y-2">
              <h3 className="font-semibold">Selected Course(s):</h3>
              <ul className="space-y-1">
                {courses.map((c: string) => (
                  <li key={c} className="text-sm text-muted-foreground flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-accent rounded-lg p-4 text-left space-y-2">
            <h3 className="font-semibold text-sm">Next Steps:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Check your email or WhatsApp for further instructions</li>
              <li>• Prepare your workspace and software</li>
              <li>• Join the student community group</li>
            </ul>
          </div>

          <Button className="w-full bg-gradient-primary hover:opacity-90" onClick={() => navigate("/")}>
            Back to Home <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default EnrollmentSuccess;
