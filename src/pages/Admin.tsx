import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Search, Users, BookOpen, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Enrollment {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  selected_courses: string[];
  learning_mode: string;
  skill_level: string;
  payment_status: string;
  created_at: string;
}

const Admin = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
  }, []);

  useEffect(() => {
    if (!session) return;
    fetchEnrollments();
  }, [session]);

  const fetchEnrollments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("enrollments")
      .select("id, full_name, email, phone, country, selected_courses, learning_mode, skill_level, payment_status, created_at")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load enrollments");
    } else {
      setEnrollments(data || []);
    }
    setLoading(false);
  };

  const exportCSV = () => {
    if (enrollments.length === 0) return;
    const headers = ["Name", "Email", "Phone", "Country", "Courses", "Learning Mode", "Skill Level", "Payment", "Date"];
    const rows = filtered.map((e) => [
      e.full_name, e.email, e.phone, e.country,
      e.selected_courses.join("; "), e.learning_mode,
      e.skill_level, e.payment_status,
      new Date(e.created_at).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `enrollments_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = enrollments.filter(
    (e) =>
      e.full_name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase())
  );

  if (!session) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 container mx-auto px-4 max-w-md">
          <AdminLogin onLogin={() => supabase.auth.getSession().then(({ data }) => setSession(data.session))} />
        </div>
      </div>
    );
  }

  const totalEnrollments = enrollments.length;
  const paidCount = enrollments.filter((e) => e.payment_status === "Paid").length;
  const courseCount = new Set(enrollments.flatMap((e) => e.selected_courses)).size;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16 container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportCSV}>
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
            <Button variant="outline" onClick={() => { supabase.auth.signOut(); setSession(null); }}>
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalEnrollments}</p>
              <p className="text-sm text-muted-foreground">Total Enrollments</p>
            </div>
          </Card>
          <Card className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{paidCount}</p>
              <p className="text-sm text-muted-foreground">Paid Enrollments</p>
            </div>
          </Card>
          <Card className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{courseCount}</p>
              <p className="text-sm text-muted-foreground">Courses Selected</p>
            </div>
          </Card>
        </div>

        <div className="mb-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-10" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={9} className="text-center py-8">Loading...</TableCell></TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={9} className="text-center py-8 text-muted-foreground">No enrollments yet</TableCell></TableRow>
                ) : (
                  filtered.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell className="font-medium">{e.full_name}</TableCell>
                      <TableCell>{e.email}</TableCell>
                      <TableCell>{e.phone}</TableCell>
                      <TableCell>{e.country}</TableCell>
                      <TableCell className="max-w-[200px]">
                        <div className="flex flex-wrap gap-1">
                          {e.selected_courses.map((c) => (
                            <span key={c} className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">{c.split(" with ")[0]}</span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{e.learning_mode}</TableCell>
                      <TableCell>{e.skill_level}</TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-1 rounded-full ${e.payment_status === "Paid" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                          {e.payment_status}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">{new Date(e.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      onLogin();
    }
    setLoading(false);
  };

  return (
    <Card className="p-8 space-y-6">
      <h2 className="text-2xl font-bold text-center">Admin Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full bg-gradient-primary" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Card>
  );
};

export default Admin;
