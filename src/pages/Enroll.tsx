import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { EnrollmentData, initialEnrollmentData } from "@/lib/enrollment-types";
import { StepPersonalInfo } from "@/components/enrollment/StepPersonalInfo";
import { StepCourseSelection } from "@/components/enrollment/StepCourseSelection";
import { StepSkillLevel } from "@/components/enrollment/StepSkillLevel";
import { StepGoals } from "@/components/enrollment/StepGoals";
import { StepTechReadiness } from "@/components/enrollment/StepTechReadiness";
import { StepPayment } from "@/components/enrollment/StepPayment";
import { StepCommunication } from "@/components/enrollment/StepCommunication";
import { StepConsent } from "@/components/enrollment/StepConsent";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const STEPS = [
  "Personal Info",
  "Courses",
  "Skill Level",
  "Goals",
  "Tech Readiness",
  "Payment",
  "Communication",
  "Consent",
];

const Enroll = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<EnrollmentData>(initialEnrollmentData);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const update = (partial: Partial<EnrollmentData>) => setData((d) => ({ ...d, ...partial }));

  const validateStep = (): boolean => {
    switch (step) {
      case 0:
        if (!data.fullName || !data.email || !data.phone || !data.country) {
          toast.error("Please fill all required fields");
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(data.email)) {
          toast.error("Please enter a valid email");
          return false;
        }
        return true;
      case 1:
        if (data.selectedCourses.length === 0 || !data.learningMode) {
          toast.error("Select at least one course and learning mode");
          return false;
        }
        return true;
      case 2:
        if (!data.skillLevel) {
          toast.error("Select your skill level");
          return false;
        }
        return true;
      case 3:
        if (!data.primaryGoal) {
          toast.error("Select your primary goal");
          return false;
        }
        return true;
      case 4:
        if (!data.internetStrength) {
          toast.error("Select your internet strength");
          return false;
        }
        return true;
      case 5:
        return true;
      case 6:
        if (!data.communicationChannel) {
          toast.error("Select a communication channel");
          return false;
        }
        return true;
      case 7:
        if (!data.consentRequirements) {
          toast.error("You must acknowledge the course requirements");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("enrollments").insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        country: data.country,
        city: data.city,
        selected_courses: data.selectedCourses,
        learning_mode: data.learningMode,
        cohort_start_date: data.cohortStartDate,
        skill_level: data.skillLevel,
        occupation: data.occupation,
        prior_experience: data.priorExperience,
        primary_goal: data.primaryGoal,
        achievement_goal: data.achievementGoal,
        has_laptop: data.hasLaptop,
        internet_strength: data.internetStrength,
        software_access: data.softwareAccess,
        payment_status: data.paymentStatus,
        payment_method: data.paymentMethod,
        proof_of_payment_url: data.proofOfPaymentUrl,
        communication_channel: data.communicationChannel,
        referral_source: data.referralSource,
        consent_updates: data.consentUpdates,
        consent_requirements: data.consentRequirements,
      });
      if (error) throw error;
      navigate("/enrollment-success", { state: { courses: data.selectedCourses } });
    } catch (err: any) {
      toast.error("Submission failed. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  const renderStep = () => {
    switch (step) {
      case 0: return <StepPersonalInfo data={data} update={update} />;
      case 1: return <StepCourseSelection data={data} update={update} />;
      case 2: return <StepSkillLevel data={data} update={update} />;
      case 3: return <StepGoals data={data} update={update} />;
      case 4: return <StepTechReadiness data={data} update={update} />;
      case 5: return <StepPayment data={data} update={update} />;
      case 6: return <StepCommunication data={data} update={update} />;
      case 7: return <StepConsent data={data} update={update} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16 container mx-auto px-4 max-w-2xl">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold text-center">Course Enrollment</h1>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {step + 1} of {STEPS.length}</span>
              <span>{STEPS[step]}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="flex gap-1 overflow-x-auto pb-2">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={`text-xs px-2 py-1 rounded-full whitespace-nowrap transition-colors ${
                  i === step ? "bg-primary text-primary-foreground" : i < step ? "bg-accent text-primary" : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="w-3 h-3 inline mr-1" /> : null}
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="min-h-[400px]">{renderStep()}</div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 0}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          {step === STEPS.length - 1 ? (
            <Button className="bg-gradient-primary hover:opacity-90" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Submitting..." : "Complete Enrollment"}
              <Check className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button className="bg-gradient-primary hover:opacity-90" onClick={handleNext}>
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Enroll;
