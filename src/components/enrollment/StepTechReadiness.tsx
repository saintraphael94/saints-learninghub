import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { EnrollmentData, INTERNET_STRENGTHS, SOFTWARE_OPTIONS } from "@/lib/enrollment-types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  data: EnrollmentData;
  update: (d: Partial<EnrollmentData>) => void;
}

export const StepTechReadiness = ({ data, update }: Props) => {
  const toggleSoftware = (sw: string) => {
    const list = data.softwareAccess.includes(sw)
      ? data.softwareAccess.filter((s) => s !== sw)
      : [...data.softwareAccess, sw];
    update({ softwareAccess: list });
  };

  return (
    <Card className="p-6 space-y-5">
      <h2 className="text-xl font-semibold">Technical Readiness</h2>
      <div className="flex items-center justify-between">
        <Label>Do you have a laptop?</Label>
        <Switch checked={data.hasLaptop} onCheckedChange={(v) => update({ hasLaptop: v })} />
      </div>
      <div className="space-y-2">
        <Label>Internet Strength *</Label>
        <div className="grid grid-cols-3 gap-2">
          {INTERNET_STRENGTHS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => update({ internetStrength: s })}
              className={cn(
                "p-3 rounded-lg border text-sm font-medium transition-all",
                data.internetStrength === s ? "border-primary bg-accent text-primary" : "border-border hover:border-primary/40"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <Label>Software Access</Label>
        {SOFTWARE_OPTIONS.map((sw) => (
          <div key={sw} className="flex items-center gap-3">
            <Checkbox checked={data.softwareAccess.includes(sw)} onCheckedChange={() => toggleSoftware(sw)} />
            <span className="text-sm">{sw}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
