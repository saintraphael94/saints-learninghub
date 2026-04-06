import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EnrollmentData, SKILL_LEVELS } from "@/lib/enrollment-types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  data: EnrollmentData;
  update: (d: Partial<EnrollmentData>) => void;
}

export const StepSkillLevel = ({ data, update }: Props) => (
  <Card className="p-6 space-y-4">
    <h2 className="text-xl font-semibold">Skill Level & Background</h2>
    <div className="space-y-2">
      <Label>Skill Level *</Label>
      <div className="grid grid-cols-3 gap-2">
        {SKILL_LEVELS.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => update({ skillLevel: level })}
            className={cn(
              "p-3 rounded-lg border text-sm font-medium transition-all",
              data.skillLevel === level ? "border-primary bg-accent text-primary" : "border-border hover:border-primary/40"
            )}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
    <div className="space-y-2">
      <Label>Occupation</Label>
      <Input value={data.occupation} onChange={(e) => update({ occupation: e.target.value })} placeholder="e.g. Student, Designer" />
    </div>
    <div className="space-y-2">
      <Label>Prior Experience</Label>
      <Textarea value={data.priorExperience} onChange={(e) => update({ priorExperience: e.target.value })} placeholder="Describe any relevant experience..." className="min-h-[100px]" />
    </div>
  </Card>
);
