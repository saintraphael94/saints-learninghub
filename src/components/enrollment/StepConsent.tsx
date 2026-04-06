import { Checkbox } from "@/components/ui/checkbox";
import { EnrollmentData } from "@/lib/enrollment-types";
import { Card } from "@/components/ui/card";

interface Props {
  data: EnrollmentData;
  update: (d: Partial<EnrollmentData>) => void;
}

export const StepConsent = ({ data, update }: Props) => (
  <Card className="p-6 space-y-6">
    <h2 className="text-xl font-semibold">Consent & Agreement</h2>
    <div className="flex items-start gap-3">
      <Checkbox
        checked={data.consentUpdates}
        onCheckedChange={(v) => update({ consentUpdates: v === true })}
        className="mt-1"
      />
      <span className="text-sm">I agree to receive updates and course communication</span>
    </div>
    <div className="flex items-start gap-3">
      <Checkbox
        checked={data.consentRequirements}
        onCheckedChange={(v) => update({ consentRequirements: v === true })}
        className="mt-1"
      />
      <span className="text-sm">I understand the course requirements *</span>
    </div>
    <p className="text-xs text-muted-foreground">
      By submitting this form, you agree to our terms of service and privacy policy.
    </p>
  </Card>
);
