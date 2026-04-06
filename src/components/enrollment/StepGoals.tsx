import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EnrollmentData, PRIMARY_GOALS } from "@/lib/enrollment-types";
import { Card } from "@/components/ui/card";

interface Props {
  data: EnrollmentData;
  update: (d: Partial<EnrollmentData>) => void;
}

export const StepGoals = ({ data, update }: Props) => (
  <Card className="p-6 space-y-4">
    <h2 className="text-xl font-semibold">Learning Goals</h2>
    <div className="space-y-2">
      <Label>Primary Goal *</Label>
      <Select value={data.primaryGoal} onValueChange={(v) => update({ primaryGoal: v })}>
        <SelectTrigger><SelectValue placeholder="Select your primary goal" /></SelectTrigger>
        <SelectContent>
          {PRIMARY_GOALS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
    <div className="space-y-2">
      <Label>What do you hope to achieve?</Label>
      <Textarea value={data.achievementGoal} onChange={(e) => update({ achievementGoal: e.target.value })} placeholder="Tell us about your goals..." className="min-h-[120px]" />
    </div>
  </Card>
);
