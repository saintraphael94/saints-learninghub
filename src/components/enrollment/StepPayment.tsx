import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EnrollmentData, PAYMENT_METHODS } from "@/lib/enrollment-types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

interface Props {
  data: EnrollmentData;
  update: (d: Partial<EnrollmentData>) => void;
}

export const StepPayment = ({ data, update }: Props) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { data: authData } = await supabase.auth.getUser();
      const userId = authData.user?.id;
      if (!userId) {
        toast.error("Please sign in to upload proof of payment");
        return;
      }
      const ext = file.name.split(".").pop();
      const path = `${userId}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("payment-proofs").upload(path, file);
      if (error) throw error;
      update({ proofOfPaymentUrl: path });
      toast.success("File uploaded successfully");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Payment Information</h2>
      <div className="space-y-2">
        <Label>Payment Status</Label>
        <div className="grid grid-cols-2 gap-2">
          {["Paid", "Not Paid"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => update({ paymentStatus: s })}
              className={cn(
                "p-3 rounded-lg border text-sm font-medium transition-all",
                data.paymentStatus === s ? "border-primary bg-accent text-primary" : "border-border hover:border-primary/40"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      {data.paymentStatus === "Paid" && (
        <>
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <Select value={data.paymentMethod} onValueChange={(v) => update({ paymentMethod: v })}>
              <SelectTrigger><SelectValue placeholder="Select payment method" /></SelectTrigger>
              <SelectContent>
                {PAYMENT_METHODS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Upload Proof of Payment</Label>
            <Input type="file" accept="image/*,.pdf" onChange={handleFileUpload} disabled={uploading} />
            {uploading && <p className="text-xs text-muted-foreground">Uploading...</p>}
            {data.proofOfPaymentUrl && <p className="text-xs text-primary">✓ File uploaded</p>}
          </div>
        </>
      )}
    </Card>
  );
};
