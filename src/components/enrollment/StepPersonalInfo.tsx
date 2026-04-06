import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EnrollmentData, COUNTRIES } from "@/lib/enrollment-types";
import { Card } from "@/components/ui/card";

interface Props {
  data: EnrollmentData;
  update: (d: Partial<EnrollmentData>) => void;
}

export const StepPersonalInfo = ({ data, update }: Props) => (
  <Card className="p-6 space-y-4">
    <h2 className="text-xl font-semibold">Personal Information</h2>
    <div className="space-y-2">
      <Label>Full Name *</Label>
      <Input value={data.fullName} onChange={(e) => update({ fullName: e.target.value })} placeholder="John Doe" />
    </div>
    <div className="space-y-2">
      <Label>Email Address *</Label>
      <Input type="email" value={data.email} onChange={(e) => update({ email: e.target.value })} placeholder="john@example.com" />
    </div>
    <div className="space-y-2">
      <Label>Phone Number *</Label>
      <Input value={data.phone} onChange={(e) => update({ phone: e.target.value })} placeholder="+234..." />
    </div>
    <div className="space-y-2">
      <Label>Country *</Label>
      <Select value={data.country} onValueChange={(v) => update({ country: v })}>
        <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
        <SelectContent>
          {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
    <div className="space-y-2">
      <Label>City</Label>
      <Input value={data.city} onChange={(e) => update({ city: e.target.value })} placeholder="Lagos" />
    </div>
  </Card>
);
