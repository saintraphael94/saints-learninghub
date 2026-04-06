import { Label } from "@/components/ui/label";
import { EnrollmentData, COURSES, LEARNING_MODES } from "@/lib/enrollment-types";
import { Card } from "@/components/ui/card";
import { CourseCard } from "@/components/CourseCard";
import { cn } from "@/lib/utils";

interface Props {
  data: EnrollmentData;
  update: (d: Partial<EnrollmentData>) => void;
}

export const StepCourseSelection = ({ data, update }: Props) => {
  const toggleCourse = (name: string) => {
    const courses = data.selectedCourses.includes(name)
      ? data.selectedCourses.filter((c) => c !== name)
      : [...data.selectedCourses, name];
    update({ selectedCourses: courses });
  };

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Course Selection</h2>
      <div className="space-y-2">
        <Label>Select Course(s) *</Label>
        <div className="grid gap-3">
          {COURSES.map((c) => (
            <CourseCard
              key={c.name}
              name={c.name}
              icon={c.icon}
              selectable
              selected={data.selectedCourses.includes(c.name)}
              onSelect={() => toggleCourse(c.name)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Preferred Learning Mode *</Label>
        <div className="grid grid-cols-3 gap-2">
          {LEARNING_MODES.map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => update({ learningMode: mode })}
              className={cn(
                "p-3 rounded-lg border text-sm font-medium transition-all",
                data.learningMode === mode
                  ? "border-primary bg-accent text-primary"
                  : "border-border hover:border-primary/40"
              )}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Preferred Cohort Start Date</Label>
        <div className="grid grid-cols-3 gap-2">
          {["January 2025", "April 2025", "July 2025"].map((date) => (
            <button
              key={date}
              type="button"
              onClick={() => update({ cohortStartDate: date })}
              className={cn(
                "p-3 rounded-lg border text-sm transition-all",
                data.cohortStartDate === date
                  ? "border-primary bg-accent text-primary"
                  : "border-border hover:border-primary/40"
              )}
            >
              {date}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};
