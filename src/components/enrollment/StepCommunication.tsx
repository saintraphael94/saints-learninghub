import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EnrollmentData, COMMUNICATION_CHANNELS, REFERRAL_SOURCES } from "@/lib/enrollment-types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  data: EnrollmentData;
  update: (d: Partial<EnrollmentData>) => void;
}

export const StepCommunication = ({ data, update }: Props) => (
  <Card className="p-6 space-y-4">
    <h2 className="text-xl font-semibold">Communication & Referral</h2>
    <div className="space-y-2">
      <Label>Preferred Communication Channel *</Label>
      <div className="grid grid-cols-3 gap-2">
        {COMMUNICATION_CHANNELS.map((ch) => (
          <button
            key={ch}
            type="button"
            onClick={() => update({ communicationChannel: ch })}
            className={cn(
              "p-3 rounded-lg border text-sm font-medium transition-all",
              data.communicationChannel === ch ? "border-primary bg-accent text-primary" : "border-border hover:border-primary/40"
            )}
          >
            {ch}
          </button>
        ))}
      </div>
    </div>
    <div className="space-y-2">
      <Label>How did you hear about us?</Label>
      <Select value={data.referralSource} onValueChange={(v) => update({ referralSource: v })}>
        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
        <SelectContent>
          {REFERRAL_SOURCES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  </Card>
);
